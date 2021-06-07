export function VariableSelection({
    value,
    onChange
}){
    return (
      <div style={{ width: "100%", border: "none", borderRadius: 0 }}>
        <div style={{ width: "100%" }}>
          <button
            className="var-btn shi-bg"
            style={{ width: "100%" }}
            onClick={() => onChange("SHI")}
          >
            SHI
          </button>
          <div style={{ width: "100%", display: "flex" }}>
            <button className="var-btn wsi-bg" onClick={() => onChange("WSI")}>
              WSI
            </button>
            <button className="var-btn aci-bg" onClick={() => onChange("ACI")}>
              ACI
            </button>
          </div>
          <div style={{ textAlign: "center" }}>Selected: {value}</div>
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