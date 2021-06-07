export function VariableSelection({
    value,
    onChange
}){
    return (
      <div className="border-none rounded-none my-3 mx-1">
        <div>
          <button
            className="bg-shi-200 w-full p-3"
            onClick={() => onChange("SHI")}
          >
            SHI
          </button>
          <div className="w-full flex">
            <button className="bg-wsi-800 flex-1 p-3" onClick={() => onChange("WSI")}>
              WSI
            </button>
            <button className="bg-aci-800 flex-1 p-3" onClick={() => onChange("ACI")}>
              ACI
            </button>
          </div>
          <div className="text-center">Selected: {value}</div>
        </div>
        {/* <div>
                <span>CW</span>
                <div>
                    <button>CW %</button>
                    <button>CW sqm</button>
                </div>
            </div> */}
      </div>
    );
}