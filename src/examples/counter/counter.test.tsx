// @vitest-environment happy-dom
import { screen, render } from '@testing-library/react';
import Counter from '.';
import { setup } from './test/utilities';

test('it should render the component', () => {
  render(<Counter/>)
  //screen.debug(document.body) // serializes DOM
});

test(
  'it should increment when the "Increment" button is pressed',
  async () => {
    const { user } = setup(<Counter/>);
    const currentCount = await screen.findByTestId("current-count");
    expect(currentCount).toHaveTextContent("0");

    await user.click(screen.getByRole("button", {name: /increment/i }))
    expect(currentCount).toHaveTextContent("1");
  },
);

