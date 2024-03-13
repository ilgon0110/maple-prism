type ChaosInputProps = {
  stat: string;
  value: number | null;
  onAddValue: (stat: string) => void;
  onDescendValue: (stat: string) => void;
};

const ChaosInput = ({
  stat,
  value,
  onAddValue,
  onDescendValue,
}: ChaosInputProps) => {
  return (
    <div>
      <span>{stat}</span>
      <div className="border border-slate-200 rounded flex flex-row justify-stretch w-full py-1">
        <div className="w-full text-center pt-[1px]">
          {value === null ? null : value}
        </div>
        <div className="flex flex-row w-full justify-end gap-4 text-xl px-4 text-gray-500">
          <button
            className="hover:text-black"
            onClick={() => onDescendValue(stat)}
          >
            -
          </button>
          <button className="hover:text-black" onClick={() => onAddValue(stat)}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChaosInput;
