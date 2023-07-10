import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TestComponent from "../TestComponent";

describe("#TestComponent", async () => {
  afterEach(cleanup);

  it("should show 0 balance at the very beginning", async () => {
    render(<TestComponent />);
    const balance = screen.getByRole("heading");

    expect(balance.textContent).toBe("Balance: 0.0$");
  });

  it("increases the balance by 10$ when deposite button is clicked", async () => {
    render(<TestComponent />);
    const balance = screen.getByRole("heading");
    const deposite = screen.getByRole("button", {
      name: /deposite 10\.0\$/i,
    });

    for (let i = 0; i < 3; i++) await userEvent.click(deposite);

    expect(balance.textContent).toBe("Balance: 30.0$");
  });

  it("should have no effect when withdraw button is clicked but the balance is 0", async () => {
    render(<TestComponent />);
    const balance = screen.getByRole("heading");
    const withdraw = screen.getByRole("button", {
      name: /withdraw 10\.0\$/i,
    });

    for (let i = 0; i < 3; i++) await userEvent.click(withdraw);

    expect(balance.textContent).toBe("Balance: 0.0$");
  });

  it("decreases the balance by 10$ when withdraw button is clicked", async () => {
    render(<TestComponent />);
    const balance = screen.getByRole("heading");
    const deposite = screen.getByRole("button", {
      name: /deposite 10\.0\$/i,
    });
    const withdraw = screen.getByRole("button", {
      name: /withdraw 10\.0\$/i,
    });

    for (let i = 0; i < 5; i++) await userEvent.click(deposite);
    for (let i = 0; i < 3; i++) await userEvent.click(withdraw);

    expect(balance.textContent).toBe("Balance: 20.0$");
  });
});
