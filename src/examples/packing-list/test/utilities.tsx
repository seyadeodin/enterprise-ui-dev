import { Provider } from 'react-redux';
import { PropsWithChildren } from 'react';
import { createStore } from '../store';
import { render as baseRender, screen } from 'test/utilities';

export const render: typeof baseRender = (Component, options) => {
  const store = createStore();

  const Wrapper = ({ children }: PropsWithChildren) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return baseRender(Component, { ...options, wrapper: Wrapper });
};
