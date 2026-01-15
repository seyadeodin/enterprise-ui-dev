import '@testing-library/jest-dom/extend-expect'
import { render, RenderOptions } from '@testing-library/react';
import userEvent  from '@testing-library/user-event';

export * from '@testing-library/react';
// option?: Parameters<typeof renderComponent>(1) [!] How to get the type of a
// parameter in a function
export const setup = (component: React.ReactElement, options?: RenderOptions) => {
  const user = userEvent.setup();
  const result = render(component, options)
  
  return {
    ...result,
    user
  }
  
}


/**
 * For a complete example, see: test/utilities.ts
 */
