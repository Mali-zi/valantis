import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { md5 } from 'js-md5';
import { limit, password, url } from '../../utils/const';
import { IItem, IProduct } from '../../utils/models';
import unique from '../../utils/unique';
import {
  AsyncThunkConfig,
  GetThunkAPI,
} from '@reduxjs/toolkit/dist/createAsyncThunk';

const timeStamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
const hash = md5(`${password}_${timeStamp}`);

interface IOptions {
  method: string;
  headers: {
    'content-type': string;
    'x-auth': string;
  };
  body: string;
}

async function fetchPlusWithTimeout(
  url: string,
  options: IOptions,
  retries: number,
  thunkApi: GetThunkAPI<AsyncThunkConfig>
) {
  const { rejectWithValue, fulfillWithValue } = thunkApi;

  try {
    const response = await fetchWithTimeout(url, options, HTTP_TIMEOUT);
    if (response.ok) {
      const resp = await response.json();
      console.log('resp', resp);

      return fulfillWithValue(resp);
    }

    if (retries > 0) {
      // Retry the request with one fewer retry count
      return fetchPlusWithTimeout(url, options, retries - 1, thunkApi);
    }

    return rejectWithValue(response.status);
  } catch (error: unknown) {
    return rejectWithValue(error);
  }
}

const HTTP_TIMEOUT = 3000;
const MAX_RETRIES = 5;

async function fetchWithTimeout(
  url: string,
  options: IOptions,
  timeout: number
) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(url, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(timeoutId);
  return response;
}

export const fetchIds = createAsyncThunk(
  'product/fetchIds',
  async (curentPage: number, thunkApi) => {
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-auth': hash,
      },
      body: JSON.stringify({
        action: 'get_ids',
        params: { offset: curentPage, limit: limit },
      }),
    };

    return fetchPlusWithTimeout(url, options, MAX_RETRIES, thunkApi);
  }
);

export const fetchItems = createAsyncThunk(
  'product/fetchItems',
  async function fetchAPIData(curentIds: string[], thunkApi) {
    const { rejectWithValue, fulfillWithValue } = thunkApi;
    let retries = 0;
    let success = false;
    const maxRetries = 3;

    while (retries < maxRetries && !success) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-auth': hash,
          },
          body: JSON.stringify({
            action: 'get_items',
            params: { ids: curentIds },
          }),
        });

        if (!response.ok) {
          retries++;
          return rejectWithValue(response.status);
        }
        const resp = await response.json();
        success = true;
        console.log('resp_Items', resp);

        return fulfillWithValue(resp);
      } catch (error: unknown) {
        retries++;
        return rejectWithValue(error);
      }
    }
  }
);

const initialState: IProduct = {
  ids: [],
  items: [],
  total: null,
  total_pages: null,
  status: 'idle',
  errors: null,
  curentPage: 1,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setCurentPage: (state, action) => {
      state.curentPage = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchIds.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        if (action.payload) {
          state.ids = action.payload.result as string[];
          state.errors = null;
        } else {
          state.errors = 'ids не могут быть загружены..';
        }
      })
      .addCase(fetchIds.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchIds.rejected, (state, action) => {
        state.status = 'rejected';
        console.log('Error fetchIds', action.payload);
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors = 'Ошибка при загрузке ids.';
        }
      })

      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        if (action.payload) {
          state.items = unique(action.payload.result as IItem[]);
          state.errors = null;
        } else {
          state.errors = 'Товары не могут быть загружены.';
        }
      })
      .addCase(fetchItems.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'rejected';
        console.log('Error fetchItems', action.payload);

        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors = 'Ошибка при загрузке товаров.';
        }
      });
  },
});

export const { setCurentPage } = productSlice.actions;
export default productSlice.reducer;
