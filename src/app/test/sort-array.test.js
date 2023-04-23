describe('isArraySorted', () => {
  const isArraySorted = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (!arr[i] || isNaN(arr[i])) {
        return false;
      }
      if (arr[i + 1] && arr[i + 1] > arr[i]) {
        continue;
      } else if (arr[i + 1] && arr[i + 1] < arr[i]) {
        return false;
      }
    }

    return true;
  };

  beforeAll(async () => {});

  describe('Case valid:', () => {
    test('Case default: true', async () => {
      const data = [1, 2, 3, 4, 5];
      expect(isArraySorted(data)).toBe(true);
    });

    test('Case default: false', async () => {
      const data = [3, 2];
      expect(isArraySorted(data)).toBe(false);
    });
  });

  describe('Case invalid:', () => {
    test('Case invalid data: falsy', async () => {
      const data = [null, 2, 3];
      expect(isArraySorted(data)).toBe(false);
    });

    test('Case invalid data: NaN', async () => {
      const data = ['b', 2, 3];
      expect(isArraySorted(data)).toBe(false);
    });
  });

  describe('Other cases', () => {
    it('returns true if the array is sorted in ascending order', () => {
      const arr = [1, 2, 3, 4, 5];
      expect(isArraySorted(arr)).toBe(true);
    });

    it('returns true if the array is sorted in descending order', () => {
      const arr = [5, 4, 3, 2, 1];
      expect(isArraySorted(arr)).toBe(false);
    });

    it('returns false if the array is not sorted', () => {
      const arr = [3, 2, 1, 4, 5];
      expect(isArraySorted(arr)).toBe(false);
    });

    it('returns true if the array has only one element', () => {
      const arr = [1];
      expect(isArraySorted(arr)).toBe(true);
    });

    it('returns true if the array is empty', () => {
      const arr = [];
      expect(isArraySorted(arr)).toBe(true);
    });
  });
});
