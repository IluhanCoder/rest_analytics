import { useState } from "react";
import RangePicker from "./search-bar-components/range-picker";
import { ProductFilter } from "./product-types";
import categoriesArray from "../misc/categories-array";

type LocalParams = {
  onSubmit: (filter: ProductFilter) => void;
};

const ProductSearchBar = ({ onSubmit }: LocalParams) => {
  const minState = useState<number>(0);
  const maxState = useState<number>(0);

  const [category, setCategory] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleSubmit = () => {
    const filter: ProductFilter = {};
    if (!(minState[0] === 0 && maxState[0] === 0)) {
      filter.price = {
        gt: minState[0],
        lt: maxState[0],
      };
    }
    if (name.length > 0) {
      filter["name"] = { contains: name };
    }
    if (category.length > 0) {
      filter["category"] = { contains: category };
    }
    onSubmit(filter);
  };

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-xl px-6 pb-4 pt-3">
      <form className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between flex-wrap">
        <div className="text-lg font-semibold text-green-800">Фільтрація</div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Назва товару</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-52 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Категорія</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-52 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">всі</option>
            {categoriesArray.map((cat: string) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Діапазон ціни (грн)</label>
          <RangePicker minState={minState} maxState={maxState} />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="bg-green-600 text-white px-6 py-2 rounded-lg mt-2 md:mt-0 hover:bg-green-700 transition"
        >
          знайти
        </button>
      </form>
    </div>
  );
};

export default ProductSearchBar;
