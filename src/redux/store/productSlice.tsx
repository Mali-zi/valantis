import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { HTTP_TIMEOUT, MAX_RETRIES, url } from '../../utils/const';
import { IItem, IOptions, IProduct } from '../../utils/models';
import unique from '../../utils/unique';
import { fetchPlusWithTimeout } from '../../utils/fetchPlusWithTimeout';

interface IError {
  errCode: string;
  errMessage: string;
}

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
        state.ids = action.payload as string[];
        state.errors = null;
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
          state.items = unique(action.payload as IItem[]);
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
