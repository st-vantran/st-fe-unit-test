import axios, { AxiosResponse } from 'axios';
import { put, takeLatest, all, call } from 'redux-saga/effects';
import {
  getPostsSuccess,
  getPostsError,
  getCategoriesSuccess,
  getCategoriesError,
  getPostSuccess,
  getPostError,
} from './posts.actions';

import * as TYPES from '../../shared/types';

export const ENDPOINT = 'https://jsonplaceholder.typicode.com';

export function* getPostsFn() {
  try {
    const res: AxiosResponse<any> = yield axios.get(`${ENDPOINT}/users`);
    yield put(getPostsSuccess(res.data));
  } catch (error) {
    yield put(getPostsError(error));
  }
}

export function* getPost(payload: any) {
  try {
    const res: AxiosResponse<any> = yield axios.get(
      `${ENDPOINT}/users/${payload.id}`
    );
    yield put(getPostSuccess(res.data));
  } catch (error) {
    yield put(getPostError(error));
  }
}

export function* getCategories() {
  try {
    const res: AxiosResponse<any> = yield axios.get(`${ENDPOINT}/categories`);
    yield put(getCategoriesSuccess(res.data));
  } catch (error) {
    yield put(getCategoriesError(error));
  }
}

export function* watchPosts() {
  yield all([
    takeLatest(TYPES.GET_PRODUCT, getPost),
    takeLatest(TYPES.GET_PRODUCTS, getPostsFn),
    takeLatest(TYPES.GET_CATEGORIES, getCategories),
  ]);
}
