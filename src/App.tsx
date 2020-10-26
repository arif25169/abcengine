import React from 'react';
import { StoreProvider } from 'easy-peasy';

import Routes from './Routes';

import store from './store';

export default function () {
  return (
    <StoreProvider store={store}>
      <Routes />
    </StoreProvider>
  )
};
