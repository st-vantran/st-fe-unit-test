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
