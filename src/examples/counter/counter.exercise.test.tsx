// @vitest-environment happy-dom
import { screen } from '@testing-library/react';
import Counter from '.';
import { setup } from './test/utilities';


const renderCounter = (initialCount: number) => {
  const { user, ...rest } = render(<Counter initialCount={initialCount}/>);
  
  const currentCount = screen.getByTestId("current-count");
  const incrementButton = screen.getByRole("button", {name: /increment/i });
  const resetButton = screen.getByRole("button", { name: /reset/i})
  
  return { user, currentCount, incrementButton, resetButton, ...rest }
}

test('it should render the component', () => {
  setup(<Counter/>)
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('0');
});

test('it should increment when the "Increment" button is pressed', async () => {
  const { user } = setup(<Counter/>)

  const currentCount = screen.getByTestId('current-count');
  const incrementButton = screen.getByRole('button', { name: 'Increment' });

  await user.click(incrementButton);

  expect(currentCount).toHaveTextContent('1');
});

test('it should render the component with an initial count', () => {
  const initialCount = 5;
  const { user } = setup(<Counter initialCount={initialCount}/>);

  const currentCount = screen.getByTestId('current-count');

  expect(currentCount).toHaveTextContent(initialCount.toString());
});

test(
  'it should reset the count when the "Reset" button is pressed',
  async () => {
    const initialCount = 5;
    const { user, debug } = setup(<Counter initialCount={initialCount}/>);

    debug(document.body)

    const currentCount = screen.getByTestId('current-count');
    const incrementButton = screen.getByRole("button", { name: /increment/i });
    const resetButton = screen.getByRole('button', { name: /reset/i });

    await user.click(incrementButton);
    await user.click(incrementButton);

    expect(currentCount).toHaveTextContent((initialCount +2).toString());
    //await user.click(incrementButton)
    await user.click(resetButton)

    expect(currentCount).toHaveTextContent("0");
  },
);
