import { CartService } from '../shared/services/cart';

const mockData = {
  apple: {
    id: 1,
    name: 'Product 1',
    price: 100,
    discounts: [
      {
        quantity: 1,
        discount: 0.05,
      },
      {
        quantity: 2,
        discount: 0.1,
      },
    ],
  },
  orange: {
    id: 2,
    name: 'Product 2',
    price: 200,
    discounts: [
      {
        quantity: 2,
        discount: 0.5,
      },
    ],
  },
};

describe('CartService', () => {
  const cartService: CartService = new CartService();

  describe('Test addToCart function', () => {
    beforeEach(() => {
      cartService.clear();
    });

    it('Should add new line item to cart', () => {
      const lineItem = cartService.addToCart(mockData.apple, 1);
      expect(cartService.cart.lineItems.length).toBe(1);

      expect(cartService.cart.lineItems[0]).toEqual(lineItem);
      expect(lineItem.product).toEqual(mockData.apple);
      expect(lineItem.quantity).toBe(1);

      cartService.addToCart(mockData.orange, 5);
      expect(cartService.cart.lineItems.length).toBe(2);
      expect(cartService.cart.lineItems[1].product).toEqual(mockData.orange);
    });

    it('Should add existed item to cart with correct total price', () => {
      const item = cartService.addToCart(mockData.apple, 1);
      expect(cartService.cart.lineItems.length).toBe(1);
      expect(item.price).toBe(95);

      cartService.addToCart(mockData.apple, 2);
      expect(item.price).toBe(270);

      cartService.addToCart(mockData.apple, 1);
      expect(item.price).toBe(360);
    });
  });

  describe('Test updateQuantity function', () => {
    beforeEach(() => {
      cartService.clear();
    });

    it('Should update quantity of existed line item', () => {
      cartService.addToCart(mockData.apple, 1);
      cartService.addToCart(mockData.apple, 2);
      cartService.addToCart(mockData.apple, 1);

      const item = cartService.cart.lineItems[0];
      expect(item.quantity).toBe(4);
      expect(item.price).toBe(360);

      cartService.updateQuantity(mockData.apple, 2);
      expect(item.quantity).toBe(2);
      expect(item.price).toBe(180);
    });

    it('Should return false if line item not existed', () => {
      const result = cartService.updateQuantity(mockData.apple, 2);
      expect(result).toBe(false);
    });
  });

  describe('Test removeFromCart function', () => {
    beforeEach(() => {
      cartService.clear();
    });

    it('Should remove existed line item', () => {
      cartService.addToCart(mockData.apple, 1);
      cartService.addToCart(mockData.apple, 2);
      cartService.addToCart(mockData.apple, 1);

      const item = cartService.cart.lineItems[0];
      expect(item.quantity).toBe(4);
      expect(item.price).toBe(360);

      cartService.removeFromCart(mockData.apple);
      expect(cartService.cart.lineItems.length).toBe(0);
    });

    it('Should return false if line item not existed', () => {
      const result = cartService.removeFromCart(mockData.apple);
      expect(result).toBe(false);
    });
  });

  describe('Test calculateTotalPayment function', () => {
    beforeEach(() => {
      cartService.clear();
    });

    it('Should return correct total payment', () => {
      const item = cartService.addToCart(mockData.apple, 1);
      cartService.addToCart(mockData.apple, 2);
      cartService.addToCart(mockData.apple, 1);

      expect(item.quantity).toBe(4);
      expect(item.price).toBe(360);
      expect(cartService.solveTotal()).toBe(360);
      expect(cartService.cart.lineItems.length).toBe(1);

      cartService.addToCart(mockData.orange, 2);
      cartService.addToCart(mockData.orange, 1);
      expect(cartService.cart.lineItems.length).toBe(2);
      expect(cartService.cart.lineItems[1].quantity).toBe(3);
      expect(cartService.cart.lineItems[1].price).toBe(300);

      expect(cartService.solveTotal()).toBe(660);
    });
  });
});
