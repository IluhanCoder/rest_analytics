import { useState, useEffect } from "react";
import { PairsResponse } from "./pairs-types";
import pairsService from "./pairs-service";
import { Buffer } from "buffer";
import { cardStyle } from "../styles/card-styles";
import { buttonStyle } from "../styles/button-styles";
import { inputStyle } from "../styles/form-styles";
import React, { useRef } from 'react';
import html2PDF from "jspdf-html2canvas";
import { ToastContainer, toast } from "react-toastify";
import categoriesArray from "../misc/categories-array";

const PairsPage = () => {
  const [minSupport, setMinSupport] = useState<number>(3);
  const [maxSupport, setMaxSupport] = useState<number>(6);
  const [minConfidence, setMinConfidence] = useState<number>(0.1);
  const [maxConfidence, setMaxConfidence] = useState<number>(1);
  const [category, setCategory] = useState<string>("");
  const [results, setResults] = useState<PairsResponse[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resultElement, setResultElement] = useState<HTMLElement>();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const result = await pairsService.getPares(
        minSupport,
        maxSupport,
        minConfidence,
        maxConfidence,
        category,
      );
      setIsLoading(false);
      setResults(result);
    } catch(error: any) {
      if(error.status = 401) toast.error("ви маєете бути авторизованими!");
      else toast.error(error.message);
    }
  };

  const convertImage = (image: any) => {
    return `data:image/jpeg;base64,${Buffer.from(image.data).toString(
      "base64",
    )}`;
  };

  const contentRef = useRef(null);

  const generatePdf = () => {
    const page = document.getElementById("results");
      html2PDF(page!, {
        jsPDF: {
          format: "a4",
        },
        imageType: "image/jpeg",
        output: "./pdf/generate.pdf",
      });
  };


  useEffect(() => {
    const content = document.getElementById("results");
    setResultElement(content!);
  }, [results])

  return (
    <div className="flex flex-col p-4 bg-gradient-to-b from-yellow-50 to-white">
      <ToastContainer/>
      <div className="flex justify-center">
      <form
  className={`${cardStyle} max-w-3xl w-full py-6 px-8 gap-6 flex flex-col shadow-lg rounded-2xl bg-white`}
>
  <h2 className="text-2xl font-semibold text-center text-gray-800">
    Параметри пошуку
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700">Мінімальна підтримка</label>
      <input
        className={inputStyle}
        type="number"
        value={minSupport}
        onChange={(e) => setMinSupport(Number(e.target.value))}
      />
    </div>
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700">Максимальна підтримка</label>
      <input
        className={inputStyle}
        type="number"
        value={maxSupport}
        onChange={(e) => setMaxSupport(Number(e.target.value))}
      />
    </div>
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700">Мінімальна достовірність</label>
      <input
        className={inputStyle}
        type="number"
        value={minConfidence}
        onChange={(e) => setMinConfidence(Number(e.target.value))}
      />
    </div>
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700">Максимальна достовірність</label>
      <input
        className={inputStyle}
        type="number"
        value={maxConfidence}
        onChange={(e) => setMaxConfidence(Number(e.target.value))}
      />
    </div>
    <div className="flex flex-col md:col-span-2">
      <label className="text-sm font-medium text-gray-700">Категорія</label>
      <select
        className={inputStyle}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">всі</option>
        {categoriesArray.map((cat: string, index) => (
          <option value={cat} key={index}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  </div>

  <div className="flex justify-center pt-4">
    <button className={buttonStyle} type="button" onClick={handleSubmit}>
      Здійснити аналіз
    </button>
  </div>
</form>

      </div>
      {results && <div className="flex justify-center pt-4">
            <button onClick={generatePdf} className={buttonStyle} type="button">
                Генерувати звіт
            </button>
        </div>}
      <div className="flex flex-col gap-3 py-5" id="results">
        <div className="flex justify-center text-2xl">
          Таблиця шаблоних покупок:
        </div>
        {(results &&
          ((results.length > 0 && (
            <table className="w-full border-collapse mt-4">
  <thead>
    <tr className="bg-gray-100 text-lg">
      <th className="border p-3">Продукт 1</th>
      <th className="border p-3">Продукт 2</th>
      <th className="border p-3">Підтримка</th>
      <th className="border p-3">Достовірність</th>
    </tr>
  </thead>
  <tbody>
    {results.map((result: PairsResponse, index) => (
      <tr key={index} className="hover:bg-gray-50 transition">
        {[0, 1].map((i) => (
          <td className="border p-3">
            <div className="flex items-center gap-4 justify-center">
              <img
                className="w-16 h-16 object-cover rounded shadow"
                src={convertImage(result.pair[i].image)}
                alt={`product-${i}`}
              />
              <div className="text-lg font-medium text-gray-800">{result.pair[i].name}</div>
            </div>
          </td>
        ))}
        <td className="border text-center text-lg text-gray-700 p-3">
          {result.support.toFixed(2)}
        </td>
        <td className="border text-center text-lg text-gray-700 p-3">
          {result.confidence.toFixed(2)}
        </td>
      </tr>
    ))}
  </tbody>
</table>

          )) ||
            (!isLoading && (
              <div className="flex justify-center">
                <div className="mt-16 text-center text-3xl">
                  Пари не було знайдено
                </div>
              </div>
            )))) || (
          <div className="flex justify-center">
            <div className="mt-16 text-center text-3xl">
              Введіть параметри, та натисніть "здійснити аналіз"
            </div>
          </div>
        )}
        {isLoading && (
          <div className="flex justify-center">
            <div className="mt-16 text-center text-3xl">
              Завантаження аналітики...
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center"></div>
    </div>
  );
};

export default PairsPage;
