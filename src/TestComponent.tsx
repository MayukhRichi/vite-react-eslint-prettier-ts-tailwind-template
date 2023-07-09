import { useReducer } from "react";

export default function TestComponent() {
  const [balance, dispatch] = useReducer(
    (state: number, action: { type: string }) => {
      if (action.type == "deposite") return state + 10;
      else if (action.type == "withdraw")
        return state < 10 ? state : state - 10;
      else throw new Error("action_type_unknown");
    },
    0
  );

  return (
    <div className="m-4 rounded-lg border-4 border-zinc-600 bg-zinc-800 p-4">
      <h2
        data-testid="balance"
        className="m-4 text-2xl font-extrabold text-zinc-400"
      >
        Balance: <span className="text-zinc-200">{balance}.0$</span>
      </h2>
      <button
        data-testid="deposite"
        className="success-button mx-2"
        onClick={() => {
          dispatch({ type: "deposite" });
        }}
      >
        Deposite 10.0$
      </button>
      <button
        data-testid="withdraw"
        className="danger-button mx-2"
        onClick={() => {
          dispatch({ type: "withdraw" });
        }}
      >
        Withdraw 10.0$
      </button>
    </div>
  );
}
