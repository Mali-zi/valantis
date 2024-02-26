export interface IProduct {
  ids: string[];
  items: IItem[] | null;
  total: null | number;
  total_pages: null | number;
  status: string;
  errors: unknown;
  curentPage: number;
}

export interface IItem {
  id: string;
  brand: null | string;
  price: number;
  product: string;
}
