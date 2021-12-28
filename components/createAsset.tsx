import { useRouter } from "next/router";
import { useState } from "react";
import { CurrencyType, NewAssetState } from "../lib/types";

export const CreateAsset = ({ currencies }: { currencies: CurrencyType[] }) => {
  const initialState: NewAssetState = {
    amount: 0.0,
    type: currencies[0].name,
  };
  const [newAsset, setNewAsset] = useState(initialState);
  const router = useRouter();
  const refreshData = () => router.replace(router.asPath);

  const submit = async () => {
    if (newAsset.amount !== "" && newAsset.amount > 0) {
      const { type, ...restAsset } = newAsset;
      const body = { ...restAsset };
      body.currencyId = currencies.filter((c) => c.name === type)[0].id;
      await fetch("/api/asset/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      refreshData();
      setNewAsset(initialState);
    }
  };

  return (
    <div className="bg-white rounded-md p-12 shadow-md flex justify-between">
      <input
        className="bg-gray-100 w-80 py-2 rounded-md border-2 border-gray-300 text-center cursor-pointer"
        step="0.01"
        type="number"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submit();
          }
        }}
        onChange={(e) => {
          const updatedAmount = parseFloat(e.target.value) || "";
          setNewAsset((currentState) => ({
            ...currentState,
            amount: updatedAmount,
          }));
        }}
        value={newAsset.amount}
      />
      <select
        value={newAsset.type}
        onChange={(e) => {
          setNewAsset((currentState) => ({
            ...currentState,
            type: e.target.value,
          }));
        }}
        className="bg-gray-100 py-2.5 mx-2 rounded-md text-center w-20 border-2 border-gray-300 outline-none cursor-pointer"
      >
        {currencies.map((oneCurrency) => (
          <option key={oneCurrency.name}>{oneCurrency.name}</option>
        ))}
      </select>
      <button
        onClick={async (e) => {
          e.preventDefault();
          await submit();
        }}
        className="bg-purple-400 p-2 rounded-md text-white font-bold border-2 border-purple-500 outline-none cursor-pointer"
      >
        Add +
      </button>
    </div>
  );
};
