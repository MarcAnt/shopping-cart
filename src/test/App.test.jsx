// @vitest-environment happy-dom
import React from "react";
import {
  render,
  screen,
  cleanup,
  waitForElementToBeRemoved,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";

import App from "../App";

import { Provider } from "react-redux";
import { store } from "@/redux/store";

describe("Shopping Cart App UI", () => {
  afterEach(cleanup);

  beforeEach(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  it("should render title correctly", async () => {
    screen.getByText("List of Products");
  });

  it("should render 'Loading products...' text correctly", async () => {
    expect(screen.findByText("Loading products..."));

    waitForElementToBeRemoved(() => screen.getByText("Loading products..."));
  });

  it("should render 1 card products after loading", async () => {
    expect(screen.findByText("Loading products..."));

    waitForElementToBeRemoved(() => screen.getByText("Loading products..."), {
      timeout: 3000,
    });
    const images = await screen.findAllByRole("img");
    waitFor(() => expect(images).toHaveLength(1));
  });

  it("should first card product have disabled attribute", async () => {
    const buttons = await screen.findAllByRole("button", {
      name: "Add to Cart +",
    });

    expect(buttons[0].getAttribute("disabled")).toBe("");
  });

  it("should show one product item after select by description", async () => {
    const selectsProducts = await screen.findAllByRole("listbox");

    const selectDescription = selectsProducts[0];
    userEvent.selectOptions(
      selectDescription,
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday"
    );

    expect(
      screen.getByRole("option", {
        name: "Your perfect pack fo...",
      }).textContent
    ).toBe("Your perfect pack fo...");
  });

  it("should show one card after select one by description", async () => {
    const [selectDescription] = screen.getAllByRole("listbox");

    fireEvent.change(selectDescription, {
      target: {
        value:
          "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      },
    });

    let option = screen.getByRole("option", {
      name: "Your perfect pack fo...",
    });

    userEvent.click(option);

    await waitFor(() => expect(screen.getAllByRole("img")).toHaveLength(1));
  });

  it("should show one card item after typing 'John'", async () => {
    const searchBox = screen.getByRole("searchbox");

    userEvent.type(searchBox, "John");

    await waitFor(() => expect(screen.getAllByRole("img")).toHaveLength(1));
  });
});

describe("Cart UI Events", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
  it("should increment by and show a number in shopping cart button after click in one card", async () => {
    const buttonOpenCart = screen.getByText(/Shopping cart/i);
    const [_, secondButton] = screen.getAllByText(/ADD TO CART +/i);

    userEvent.click(secondButton);

    await waitFor(() => {
      expect(buttonOpenCart.textContent).toBe("1Shopping Cart");
    });
  });

  it("should display 1 items and double price for the same product in cart", async () => {
    const buttonOpenCart = screen.getByText(/Shopping cart/i);
    const [_, secondButton] = screen.getAllByText(/ADD TO CART +/i);

    userEvent.click(buttonOpenCart);

    waitFor(() => {
      expect(screen.getByText(/Items: 0/i)).toBeDefined();
    });

    userEvent.click(secondButton);
    userEvent.click(secondButton);

    waitFor(() => {
      expect(screen.getByText(/Items: 1/i)).toBeDefined();
      expect(screen.getByText(/Total: 1390,00 €/i)).toBeDefined();
    });
  });

  it("should show 1 Remove button CartItem component", async () => {
    const buttonOpenCart = screen.getByText(/Shopping cart/i);
    const [_, secondButton] = screen.getAllByText(/ADD TO CART +/i);
    userEvent.click(secondButton);
    waitFor(() => {
      expect(screen.getByText(/Items: 0/i)).toBeDefined();
    });
    userEvent.click(buttonOpenCart);
    waitFor(() => {
      expect(screen.getByText(/remove/i)).toBeDefined();
    });
  });

  it("should Remove CartItem after click", async () => {
    const buttonOpenCart = screen.getByText(/Shopping cart/i);
    const [_, secondButton] = screen.getAllByText(/ADD TO CART +/i);
    userEvent.click(secondButton);
    waitFor(() => {
      expect(screen.getByText(/Items: 0/i)).toBeDefined();
    });
    userEvent.click(buttonOpenCart);
    waitFor(() => {
      expect(screen.getByText(/remove/i)).toBeDefined();
      userEvent.click(screen.getByText(/remove/i));
    });

    waitFor(() => {
      expect(
        screen.getByText(
          /Hi! Your shopping cart is empty. Please, add some products./i
        )
      ).toBeDefined();
    });
  });

  it("should display 1 item and double price for the same product in cart", async () => {
    const buttonOpenCart = screen.getByText(/Shopping cart/i);
    const [_, secondButton] = screen.getAllByText(/ADD TO CART +/i);

    userEvent.click(buttonOpenCart);

    userEvent.click(secondButton);
    userEvent.click(secondButton);
    userEvent.click(secondButton);
    userEvent.click(secondButton);
    userEvent.click(secondButton);
    userEvent.click(secondButton);
    userEvent.click(secondButton);
    userEvent.click(secondButton);
    userEvent.click(secondButton);
    userEvent.click(secondButton);

    waitFor(() => {
      expect(screen.getByText(/Items: 1/i)).toBeDefined();
      expect(screen.getByText(/Quantity: 10/i)).toBeDefined();
    });
  });

  it("should clear the cart", async () => {
    const buttonOpenCart = screen.getByText(/Shopping cart/i);
    const [_, secondButton] = screen.getAllByText(/ADD TO CART +/i);
    userEvent.click(secondButton);
    waitFor(() => {
      expect(screen.getByText(/Items: 0/i)).toBeDefined();
    });
    userEvent.click(buttonOpenCart);
    waitFor(() => {
      expect(screen.getByText(/Clear Cart/i)).toBeDefined();
      userEvent.click(screen.getByText(/Clear Cart/i));
    });

    waitFor(() => {
      expect(
        screen.getByText(
          /Hi! Your shopping cart is empty. Please, add some products./i
        )
      ).toBeDefined();
    });
  });

  it("should display 2 items in cart", async () => {
    const buttonOpenCart = screen.getByText(/Shopping cart/i);
    const [_, secondButton, thirdButton, fourthButton] =
      screen.getAllByText(/ADD TO CART +/i);

    userEvent.click(buttonOpenCart);

    waitFor(() => {
      expect(screen.getByText(/Items: 0/i)).toBeDefined();
    });

    userEvent.click(secondButton);
    userEvent.click(fourthButton);

    waitFor(() => {
      expect(screen.getByText(/Items: 2/i)).toBeDefined();
    });
  });
});
