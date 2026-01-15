import { render as baseRender } from 'test/utilities';
import {axe, toHaveNoViolations} from 'jest-axe'
import { PackingList } from '.';
import { PropsWithChildren } from 'react';
import { createStore } from './store';
import { Provider } from 'react-redux';

expect.extend(toHaveNoViolations);

const render = (ui: React.ReactElement) => {
  return baseRender(<Provider store={createStore()}>
    {ui}
  </Provider>
  );

}

it('should have no accessibility violations', async () => {
  const {container} = render(<PackingList/>);
  
  const results = await axe(container);

  expect(results).toHaveNoViolations();
})
