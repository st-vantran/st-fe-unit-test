import { Cart, LineItem } from '../types/cart';
import { EProduct } from '../types/product';

export class CartService {
  cart: Cart;

  constructor() {
    this.cart = new Cart();
  }

  getCart(): Cart {
    return this.cart;
  }

  solvePrice(product: EProduct, quantity: number): number {
    let discount = 0;

    product.discounts.forEach((item) => {
      if (quantity >= item.quantity) {
        discount = item.discount;
      }
    });
    return product.price * quantity - product.price * quantity * discount;
  }

  addToCart(product: EProduct, quantity: number): LineItem {
    let item = this.cart?.lineItems.find(
      (item) => item.product.id === product.id
    );
    if (item) {
      item.quantity += quantity;
      item.price = this.solvePrice(product, item.quantity);
    } else {
      item = {
        id: this.cart.lineItems.length + 1,
        product,
        quantity,
        price: this.solvePrice(product, quantity),
      };
      this.cart.lineItems.push(item);
    }
    this.cart.totalPayment = this.solveTotal();
    return item;
  }

  updateQuantity(product: EProduct, quantity: number): boolean {
    const lineItemExisted = this.cart.lineItems.find(
      (item) => item.product.id === product.id
    );
    if (lineItemExisted) {
      lineItemExisted.quantity = quantity;
      lineItemExisted.price = this.solvePrice(
        product,
        lineItemExisted.quantity
      );
      this.cart.totalPayment = this.solveTotal();
      return true;
    }
    return false;
  }

  removeFromCart(product: EProduct): boolean {
    const lineItemExisted = this.cart.lineItems.find(
      (item) => item.product.id === product.id
    );
    if (lineItemExisted) {
      this.cart.lineItems = this.cart.lineItems.filter(
        (item) => item.product.id !== product.id
      );
      this.cart.totalPayment = this.solveTotal();
      return true;
    }
    return false;
  }

  solveTotal(): number {
    return this.cart.lineItems.reduce((acc, item) => acc + item.price, 0);
  }

  clear(): boolean {
    this.cart = new Cart();
    return true;
  }
}
