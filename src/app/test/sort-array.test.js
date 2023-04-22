// import { describe, expect, test, beforeAll } from 'jest';

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

  describe('case valid: ', () => {
    test('Case default: true', async () => {
      const data = [1, 2, 3, 4, 5];
      expect(isArraySorted(data)).toBe(true);
    });

    test('Case default: false', async () => {
      const data = [3, 2];
      expect(isArraySorted(data)).toBe(false);
    });
  });

  describe('case invalid: ', () => {
    test('Case invalid data: falsy', async () => {
      const data = [null, 2, 3];
      expect(isArraySorted(data)).toBe(false);
    });

    test('Case invalid data: NaN', async () => {
      const data = ['b', 2, 3];
      expect(isArraySorted(data)).toBe(false);
    });
  });
});
