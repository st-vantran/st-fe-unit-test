import * as TYPES from '../../shared/types';

export const getPosts = () => ({
  type: TYPES.GET_PRODUCTS,
});

export const getPostsSuccess = (posts: any) => ({
  type: TYPES.GET_PRODUCTS_SUCCESS,
  payload: posts,
});

export const getPostsError = (error: any) => ({
  type: TYPES.GET_PRODUCTS_ERROR,
  payload: error,
});

export const getPost = (id: string) => ({
  type: TYPES.GET_PRODUCT,
  id,
});

export const getPostSuccess = (posts: any) => ({
  type: TYPES.GET_PRODUCT_SUCCESS,
  payload: posts,
});

export const getPostError = (error: any) => ({
  type: TYPES.GET_PRODUCT_ERROR,
  payload: error,
});

export const getCategories = () => ({
  type: TYPES.GET_CATEGORIES,
});

export const getCategoriesSuccess = (posts: any) => ({
  type: TYPES.GET_CATEGORIES_SUCCESS,
  payload: posts,
});

export const getCategoriesError = (error: any) => ({
  type: TYPES.GET_CATEGORIES_ERROR,
  payload: error,
});
