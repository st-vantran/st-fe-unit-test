import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';

import Home from './pages/home/Home';
import Posts from './pages/posts/Posts';

import appReducer from './app.reducer';
import appMiddleware from './app.middlewares';
import Post from './pages/posts/Post';

function App() {
  const middleware = createSagaMiddleware();
  const store = createStore(appReducer, applyMiddleware(middleware, logger));

  middleware.run(appMiddleware);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
