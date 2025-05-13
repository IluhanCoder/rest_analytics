import { Characteristic } from "./product-types";

type Params = {
  characteristics: Array<Characteristic>;
  onRemove?: (newList: Characteristic[]) => void;
};

const CharacteristicsMapper = ({ characteristics, onRemove }: Params) => {
  const handleRemove = (index: number) => {
    if (!onRemove) return;
    const updated = [...characteristics];
    updated.splice(index, 1);
    onRemove(updated);
  };

  return (
    <div className="flex flex-col gap-3">
      {characteristics.map((item, index) => (
        <div
          key={item.key}
          className="flex items-center justify-between bg-white border border-gray-200 rounded-xl shadow-sm px-5 py-3"
        >
          <div className="text-gray-700 font-medium">{item.key}</div>
          <div className="text-gray-600">{item.value}</div>
          {onRemove && (
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="text-red-500 hover:text-white hover:bg-red-500 transition px-3 py-1 rounded-md border border-red-300 text-sm"
            >
              видалити
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default CharacteristicsMapper;
