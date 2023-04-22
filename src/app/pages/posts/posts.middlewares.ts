import axios, { AxiosResponse } from 'axios';
import { put, takeLatest, all } from 'redux-saga/effects';
import {
  getPostsSuccess,
  getPostsError,
  getCategoriesSuccess,
  getCategoriesError,
} from './posts.actions';

import * as TYPES from '../../shared/types';

const ENDPOINT = 'https://6088e20da6f4a300174271e7.mockapi.io';

export function* getPosts() {
  try {
    const res: AxiosResponse<any> = yield axios.get(`${ENDPOINT}/products`);
    yield put(getPostsSuccess(res.data));
  } catch (error) {
    yield put(getPostsError(error));
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
    takeLatest(TYPES.GET_PRODUCTS, getPosts),
    takeLatest(TYPES.GET_CATEGORIES, getCategories),
  ]);
}
