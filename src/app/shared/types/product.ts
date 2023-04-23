export interface Product {
  email: string;
  id: string;
  name: string;
  phone: string;
  username: string;
  website: string;
  address: {
    city: string;
    street: string;
    suite: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    bs: string;
    catchPhrase: string;
  };
}

export interface Discount {
  quantity: number;
  discount: number;
}

export class EProduct {
  id: number;
  name: string;
  price: number;
  discounts: Discount[];

  constructor(id: number, name: string, price: number, discounts: Discount[]) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.discounts = discounts;
  }
}
