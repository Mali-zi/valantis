import { md5 } from 'js-md5';

export const password = 'Valantis';
export const limit = 50;
export const url = '/api';
export const HTTP_TIMEOUT = 10000;
export const MAX_RETRIES = 5;
export const timeStamp = new Date()
  .toISOString()
  .split('T')[0]
  .replace(/-/g, '');
export const hash = md5(`${password}_${timeStamp}`);
