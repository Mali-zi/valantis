export interface IProduct {
  ids: string[];
  items: IItem[];
  total_ids: number;
  total_pages: number;
  status: string;
  errors: {
    errCode: string;
    errMessage: string;
  } | null;
  curentPage: number;
  curentIds: string[];
}

export interface IItem {
  id: string;
  brand: null | string;
  price: number;
  product: string;
}

export interface IOptions {
  method: string;
  headers: {
    'content-type': string;
    'x-auth': string;
  };
  body: string;
}

export interface IError {
  errCode: string;
  errMessage: string;
}
export interface IOver {
  over: boolean;
  id: string;
}
