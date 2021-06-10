import { ToggleButton } from "../ui/ToggleButton";

export function VariableSelection({
    geoLevel,
    value,
    onChange
}){
    return (
      <div className="border-none rounded-none my-1 mx-1 flex flex-row gap-4">
        <div className="flex-1">
          <ToggleButton
            value="SHI"
            toggleValue={value}
            onChange={onChange}
            selectedColor="border-shi-700"
          >
            SHI
          </ToggleButton>
          <div className="w-full flex">
            <ToggleButton
              value="WSI"
              toggleValue={value}
              onChange={onChange}
              selectedColor="border-wsi-800"
            >
              WSI
            </ToggleButton>
            <ToggleButton
              value="ACI"
              toggleValue={value}
              onChange={onChange}
              selectedColor="border-aci-800"
            >
              ACI
            </ToggleButton>
          </div>
        </div>
        <div className="flex-1">
          <ToggleButton
            value="CW_sqm"
            toggleValue={value}
            onChange={onChange}
            selectedColor="border-green-800"
          >
            CW
          </ToggleButton>
          <ToggleButton
            value="pop"
            toggleValue={value}
            onChange={onChange}
            selectedColor="border-green-800"
          >
            Pop
          </ToggleButton>
        </div>
      </div>
    );
}