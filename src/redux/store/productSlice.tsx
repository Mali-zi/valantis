import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { md5 } from 'js-md5';
import { limit, password, url } from '../../utils/const';
import { IItem, IProduct } from '../../utils/models';
import unique from '../../utils/unique';

const timeStamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
const hash = md5(`${password}_${timeStamp}`);

export const fetchIds = createAsyncThunk(
  'product/fetchIds',
  async (curentPage: number, thunkApi) => {
    const { rejectWithValue, fulfillWithValue } = thunkApi;
    const timeStamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const hash = md5(`${password}_${timeStamp}`);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-auth': hash,
        },
        body: JSON.stringify({
          action: 'get_ids',
          params: { offset: curentPage, limit: limit },
        }),
      });

      if (!response.ok) {
        return rejectWithValue(response);
      }
      const resp = await response.json();
      console.log('resp', resp);

      return fulfillWithValue(resp);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const fetchItems = createAsyncThunk(
  'product/fetchItems',
  async (curentIds: string[], thunkApi) => {
    const { rejectWithValue, fulfillWithValue } = thunkApi;

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
        return rejectWithValue(response.status);
      }
      const resp = await response.json();
      console.log('resp_Items', resp);

      return fulfillWithValue(resp);
    } catch (error: unknown) {
      return rejectWithValue(error);
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
          state.ids = action.payload.result;
        } else {
          state.errors = 'ids не могут быть загружены..';
        }
      })
      .addCase(fetchIds.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchIds.rejected, (state, action) => {
        state.status = 'rejected';

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
        } else {
          state.errors = 'Товары не могут быть загружены.';
        }
      })
      .addCase(fetchItems.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'rejected';

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
