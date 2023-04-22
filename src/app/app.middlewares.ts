import { all } from 'redux-saga/effects';
import { watchPosts } from './pages/posts/posts.middlewares';

export default function* appMiddleware() {
  yield all([watchPosts()]);
}
