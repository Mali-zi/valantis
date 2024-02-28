export interface IProduct {
  ids: string[];
  items: IItem[] | null;
  total: null | number;
  total_pages: null | number;
  status: string;
  errors: {
    errCode: string;
    errMessage: string;
  } | null;
  curentPage: number;
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
