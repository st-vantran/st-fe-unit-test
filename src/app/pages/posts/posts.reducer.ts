/* eslint-disable @typescript-eslint/no-redeclare */
import * as TYPES from '../../shared/types';

const initialStateHome = {
  products: [],
  product: {},
  isLoading: false,
  error: '',
};

const initialStateCategoriesHome = {
  products: [],
  isLoading: false,
  error: '',
};

export const homeReducer = (state = initialStateHome, action: any) => {
  switch (action.type) {
    case TYPES.GET_PRODUCTS:
      return {
        ...state,
        isLoading: true,
      };

    case TYPES.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        isLoading: false,
        error: '',
      };

    case TYPES.GET_PRODUCTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case TYPES.GET_PRODUCT:
      return {
        ...state,
        isLoading: true,
      };

    case TYPES.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
        isLoading: false,
        error: '',
      };

    case TYPES.GET_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const homeCategoriesReducer = (
  state = initialStateCategoriesHome,
  action: any
) => {
  switch (action.type) {
    case TYPES.GET_CATEGORIES:
      return {
        ...state,
        isLoading: true,
      };

    case TYPES.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        products: action.payload,
        isLoading: false,
        error: '',
      };

    case TYPES.GET_CATEGORIES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
