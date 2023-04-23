import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import { RenderOptions } from '@testing-library/react';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import appReducer from '../../app.reducer';
import appMiddleware from '../../app.middlewares';
import { legacy_createStore as createStore } from 'redux';

const store = createStore(appReducer, applyMiddleware(createSagaMiddleware()));
const middleware = createSagaMiddleware();

export function renderWithProviders(
  ui: any,
  {
    store = createStore(appReducer, applyMiddleware(middleware)),
    ...renderOptions
  }: any = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    middleware.run(appMiddleware);
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
