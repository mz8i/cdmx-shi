export function GeoLevelSelection({ value, onChange }) {
  return (
    <div className="border-none rounded-none my-3 mx-1">
        <div>
            <button
                className="bg-gray-400 w-full p-3"
                onClick={() => onChange("colonias")}
            >
                Colonias
            </button>
            <button
                className="bg-gray-400 w-full p-3"
                onClick={() => onChange("alcaldias")}
            >
                Alcaldias
            </button>
        </div>
        <div className="text-center">Selected: {value}</div>
    </div>
  );
}
