type LocalParams = {
  minState: [number, React.Dispatch<React.SetStateAction<number>>];
  maxState: [number, React.Dispatch<React.SetStateAction<number>>];
};

const RangePicker = ({ minState, maxState }: LocalParams) => {
  const [minStateValue, setMinState] = minState;
  const [maxStateValue, setMaxState] = maxState;

  const handleMinBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (newValue > maxStateValue) setMaxState(newValue + 100);
    if (newValue < 0) setMinState(0);
  };

  const handleMaxBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (newValue < minStateValue) setMaxState(minStateValue + 1);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">від</label>
        <input
          type="number"
          value={minStateValue}
          onChange={(e) => setMinState(Number(e.target.value))}
          onBlur={handleMinBlur}
          className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">до</label>
        <input
          type="number"
          value={maxStateValue}
          onChange={(e) => setMaxState(Number(e.target.value))}
          onBlur={handleMaxBlur}
          className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
        />
      </div>
    </div>
  );
};

export default RangePicker;
