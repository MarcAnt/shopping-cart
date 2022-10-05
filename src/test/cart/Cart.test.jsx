// @vitest-environment happy-dom
import {
  render,
  screen,
  cleanup,
  waitFor,
  waitForElementToBeRemoved,
  fireEvent,
} from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";

import { Provider } from "react-redux";
import { store } from "@/redux/store";

import { Cart } from "../../components/cart/Cart";
import App from "../../App";

describe("Shopping Cart UI", () => {
  // afterEach(cleanup);

  beforeEach(() => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );
    // debug();
  });

  it("should render button Shopping Cart correctly", () => {
    screen.getByText("Shopping Cart");
  });

  it("should open cart UI after click on Shopping", async () => {
    const buttonOpenCart = screen.getByText(/Shopping cart/i);

    userEvent.click(buttonOpenCart);
    await waitFor(
      () => {
        expect(screen.getByText("Your Shopping Cart")).toBeDefined();
      },
      { timeout: 3000 }
    );
  });

  it("should not display Clear Cart button if cart is empty", async () => {
    const buttonOpenCart = screen.getByText(/Shopping cart/i);

    userEvent.click(buttonOpenCart);
    waitFor(() => {
      expect(screen.getByText(/Clear Cart/i)).not.toBeDefined();
    });
  });

  it("should display message if cart is empty", async () => {
    const buttonOpenCart = screen.getByText(/Shopping cart/i);

    userEvent.click(buttonOpenCart);
    waitFor(() => {
      expect(
        screen.getByText(
          /Hi! Your shopping cart is empty. Please, add some products./i
        )
      ).toBeDefined();
    });
  });

  it("should display 0 items and 0,00 € if cart is empty", async () => {
    const buttonOpenCart = screen.getByText(/Shopping cart/i);

    userEvent.click(buttonOpenCart);
    waitFor(() => {
      expect(screen.getByText(/Items: 0/i)).toBeDefined();
      expect(screen.getByText(/Total: 0,00 €/i)).toBeDefined();
    });
  });
});
