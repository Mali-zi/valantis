import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { HTTP_TIMEOUT, MAX_RETRIES, limit, url } from '../../utils/const';
import { IError, IItem, IOptions, IProduct } from '../../utils/models';
import { fetchPlusWithTimeout } from '../../utils/fetchPlusWithTimeout';
import uniqueId from '../../utils/uniqueId';
import uniqueItem from '../../utils/uniqueItem';

export const fetchIds = createAsyncThunk(
  'product/fetchIds',
  async (options: IOptions, thunkApi) => {
    return fetchPlusWithTimeout(
      url,
      options,
      MAX_RETRIES,
      HTTP_TIMEOUT,
      thunkApi
    );
  }
);

export const fetchItems = createAsyncThunk(
  'product/fetchItems',
  async (options: IOptions, thunkApi) => {
    return fetchPlusWithTimeout(
      url,
      options,
      MAX_RETRIES,
      HTTP_TIMEOUT,
      thunkApi
    );
  }
);

const initialState: IProduct = {
  ids: [],
  items: [],
  total_ids: 0,
  total_pages: 0,
  status: 'idle',
  errors: null,
  curentPage: 1,
  curentIds: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setCurentPage: (state, action) => {
      state.curentPage = action.payload;
      state.curentIds = state.ids.slice(
        (action.payload - 1) * limit,
        action.payload * limit
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchIds.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        const uniqueIds = uniqueId(action.payload as string[]);
        state.ids = uniqueIds;
        state.errors = null;
        state.total_ids = uniqueIds.length;
        state.total_pages =
          uniqueIds.length > 0 ? Math.ceil(uniqueIds.length / limit) : 0;
        state.curentIds = uniqueIds.slice(0, limit);
        state.curentPage = 1;

        if (state.ids.length === 0) {
          state.items = [];
        }
      })
      .addCase(fetchIds.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchIds.rejected, (state, action) => {
        state.status = 'rejected';
        state.errors = action.payload as IError | null;
        console.log(
          '',
          'Error:',
          state.errors?.errMessage,
          '\n',
          'Идентификатор ошибки:',
          state.errors && state.errors.errCode.length > 0
            ? state.errors.errCode
            : 'нет'
        );
      })

      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        if (action.payload) {
          state.items = uniqueItem(action.payload as IItem[]);
          state.errors = null;
        } else {
          state.errors = {
            errCode: '',
            errMessage: 'Товары не могут быть загружены.',
          };
        }
      })
      .addCase(fetchItems.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'rejected';
        state.errors = action.payload as IError | null;
        console.log(
          '',
          'Error:',
          state.errors?.errMessage,
          '\n',
          'Идентификатор ошибки:',
          state.errors && state.errors.errCode.length > 0
            ? state.errors.errCode
            : 'нет'
        );
      });
  },
});

export const { setCurentPage } = productSlice.actions;
export default productSlice.reducer;
