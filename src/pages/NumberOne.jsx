import { useEffect, useState } from "react";
import apiClient from "../axios";

const NumberOne = () => {
  const [rate, setRate] = useState(1);
  const [field, setField] = useState("");
  const [result, setResult] = useState(0);
  const [checkedValute, setCheckedValute] = useState("USD");

  useEffect(() => {
    const fromCurrency = checkedValute === "USD" ? "EUR" : "USD";
    const toCurrency = checkedValute;

    apiClient
      .get(`/latest`, { params: { from: fromCurrency, to: toCurrency } })
      .then((data) => {
        const rate = data.rates[toCurrency];
        setRate(rate);
      })
      .catch((err) => {
        console.error("Xato yuz berdi:", err);
      });
  }, [checkedValute]);

  function handleConvert(event) {
    event.preventDefault();
    setResult((field * rate).toFixed(2));
  }

  return (
    <div className="max-w-[1100px] w-full mx-auto py-12 flex flex-col justify-center items-center gap-8 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-[30px] font-bold text-blue-600">Valyuta</h1>

      <div className="flex gap-8 mt-4">
        <label
          className="select-none cursor-pointer flex items-center gap-2 text-gray-800 font-medium"
          htmlFor="usd"
        >
          USD
          <input
            id="usd"
            name="checked"
            value={"USD"}
            onChange={(e) => {
              setCheckedValute(e.target.value);
            }}
            type="radio"
            checked={checkedValute === "USD"}
            className="accent-blue-500"
          />
        </label>
        <label
          className="select-none cursor-pointer flex items-center gap-2 text-gray-800 font-medium"
          htmlFor="eur"
        >
          EUR
          <input
            id="eur"
            name="checked"
            value={"EUR"}
            onChange={(e) => {
              setCheckedValute(e.target.value);
            }}
            type="radio"
            checked={checkedValute === "EUR"}
            className="accent-blue-500"
          />
        </label>
      </div>

      <form
        className="flex gap-4 bg-blue-500 max-w-[350px] w-full rounded-md shadow-md"
        onSubmit={handleConvert}
      >
        <input
          className="w-full px-4 py-2 border-2 border-blue-300 rounded-md focus:outline-none focus:border-blue-600 text-gray-700"
          onChange={(e) => {
            setField(e.target.value);
          }}
          type="number"
          placeholder="Enter your money.."
        />
        <button
          className="px-6 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600 transition-all duration-300"
          type="submit"
        >
          Convert
        </button>
      </form>

      <h1 className="text-gray-600 border px-3 py-1 shadow-cyan-500/ shadow-lg text-[20px] font-semibold mt-4">
        {result} {checkedValute}
      </h1>
    </div>
  );
};

export default NumberOne;
