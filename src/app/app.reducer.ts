import { combineReducers } from 'redux';
import {
  homeReducer,
  homeCategoriesReducer,
} from './pages/posts/posts.reducer';

const reducers = {
  posts: homeReducer,
  categories: homeCategoriesReducer,
};

const appReducer = combineReducers({ ...reducers });
export default appReducer;
