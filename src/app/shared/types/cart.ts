import { EProduct } from './product';

export type LineItem = {
  id: number;
  product: EProduct;
  price: number;
  quantity: number;
};

export class Cart {
  lineItems: LineItem[];
  totalPayment: number;

  constructor() {
    this.lineItems = [];
    this.totalPayment = 0;
  }
}
