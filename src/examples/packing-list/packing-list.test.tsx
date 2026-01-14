import { Provider } from 'react-redux';
import { render as _render, screen } from 'test/utilities';
import { PackingList } from '.';
import { createStore } from './store';

const render = (ui: React.ReactElement) => {
  return _render(<Provider store={createStore()}>
    {ui}
  </Provider>
  );

}

it('renders the Packing List application', () => {
  render(<PackingList />)
});

it('has the correct title', async () => {
  render(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  const { debug } = render(<PackingList />);
  debug(document.body);
  screen.getAllByPlaceholderText(/new item/i);
  //screen.getByLabelText(/new item/i);
});

it(
  'has a "Add New Item" button that is disabled when the input is empty',
  () => {
    render(<PackingList />);

    const inputField = screen.getByPlaceholderText(/new item/i) as any as HTMLInputElement;
    expect(inputField.textContent).toBe("");

    const addNewItemBtn = screen.getByRole("button", { name: /add new item/i }) as any as HTMLButtonElement;
    //expect(addNewItemBtn.disabled).toBe(true);
    expect(addNewItemBtn).toBeDisabled();
  },
);

it(
  'enables the "Add New Item" button when there is text in the input field',
  async () => {
    const { user } = render(<PackingList />);

    const inputField = screen.getByPlaceholderText(/new item/i) as any as HTMLInputElement;
    await user.type(inputField, "Sunglasses");

    const addNewItemBtn = screen.getByRole("button", { name: /add new item/i }) as any as HTMLInputElement;
    //expect(addNewItemBtn).toBe(false);
    expect(addNewItemBtn).toBeEnabled();
  },
);

it(
  'adds a new item to the unpacked item list when the clicking "Add New Item"',
  async () => {
    const { user, debug } = render(<PackingList />);

    const inputField = screen.getByPlaceholderText(/new item/i) as any as HTMLInputElement;
    await user.type(inputField, "Sunglasses");

    const addNewItemBtn = screen.getByRole("button", { name: /add new item/i }) as any as HTMLInputElement;
    expect(addNewItemBtn).toBeEnabled();
    await user.click(addNewItemBtn)

    const unpackedItemsList = screen.getByTestId("unpacked-items");
    //unpackedItemsList.textContent(/sunglasses/i)
    //expect(unpackedItemsList).toContainHTML("Sunglasses")
    expect(screen.getByLabelText('Sunglasses')).not.toBeChecked();
  },
);
