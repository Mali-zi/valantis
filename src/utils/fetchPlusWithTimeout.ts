import {
  AsyncThunkConfig,
  GetThunkAPI,
} from '@reduxjs/toolkit/dist/createAsyncThunk';
import { IOptions } from './models';
import { fetchWithTimeout } from './fetchWithTimeout';

export async function fetchPlusWithTimeout(
  url: string,
  options: IOptions,
  retries: number,
  timeout: number,
  thunkApi: GetThunkAPI<AsyncThunkConfig>
) {
  const { rejectWithValue, fulfillWithValue } = thunkApi;

  try {
    const response = await fetchWithTimeout(url, options, timeout);
    if (response.ok) {
      const resp = await response.json();
      return fulfillWithValue(resp.result);
    }

    if (retries > 0) {
      console.log(
        '',
        'Идентификатор ошибки:',
        response.status,
        response.statusText,
        '\n',
        'Выполняется повторная попытка запроса.'
      );
      return fetchPlusWithTimeout(url, options, retries - 1, timeout, thunkApi);
    } else {
      console.log('Превышено максимальное количество повторных попыток.');
      return rejectWithValue({
        errCode: response.status,
        errMessage: response.statusText,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      throw rejectWithValue({
        errCode: '',
        errMessage: error.message,
      });
    }
    throw rejectWithValue({
      errCode: '',
      errMessage: 'Возникла непредвиденная ошибка.',
    });
  }
}
