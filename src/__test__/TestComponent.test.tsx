import { describe, it, expect, afterEach } from "vitest";
import { render, fireEvent, cleanup } from "@testing-library/react";

import TestComponent from "../TestComponent";

describe("#TestComponent", async () => {
  afterEach(async () => {
    await cleanup();
  });

  it("should show 0 balance at the very beginning", async () => {
    const root = render(<TestComponent />);
    const balance = await root.findByTestId("balance");

    expect(balance.textContent).toBe("Balance: 0.0$");
  });

  it("increases the balance by 10$ when deposite button is clicked", async () => {
    const root = render(<TestComponent />);
    const balance = await root.findByTestId("balance");
    const deposite = await root.findByTestId("deposite");

    for (let i = 0; i < 3; i++) fireEvent.click(deposite);

    expect(balance.textContent).toBe("Balance: 30.0$");
  });

  it("should have no effect when withdraw button is clicked but the balance is 0", async () => {
    const root = render(<TestComponent />);
    const balance = await root.findByTestId("balance");
    const withdraw = await root.findByTestId("withdraw");

    for (let i = 0; i < 3; i++) fireEvent.click(withdraw);

    expect(balance.textContent).toBe("Balance: 0.0$");
  });

  it("decreases the balance by 10$ when withdraw button is clicked", async () => {
    const root = render(<TestComponent />);
    const balance = await root.findByTestId("balance");
    const deposite = await root.findByTestId("deposite");
    const withdraw = await root.findByTestId("withdraw");

    for (let i = 0; i < 5; i++) fireEvent.click(deposite);
    for (let i = 0; i < 3; i++) fireEvent.click(withdraw);

    expect(balance.textContent).toBe("Balance: 20.0$");
  });
});
