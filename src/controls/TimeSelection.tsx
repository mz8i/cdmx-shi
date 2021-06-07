export function TimeSelection({
    value,
    onChange
}) {
    return (
      <div className="my-3 mx-1">
        <div className="flex">
          <button
            className="flex-1 p-4 bg-gray-500 hover:bg-gray-300"
            onClick={(e) => onChange("c")}
          >
            2020
          </button>
          <button
            className="flex-1 p-4 bg-gray-500 hover:bg-gray-300"
            onClick={(e) => onChange("f")}
          >
            2050
          </button>
        </div>
        <div className="text-center">
          Selected: {value === "c" ? 2020 : 2050}
        </div>
      </div>
    );
}