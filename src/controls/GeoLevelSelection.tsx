import { ToggleButton } from "../ui/ToggleButton";

export function GeoLevelSelection({ value, onChange }) {
  return (
    <div className="border-none rounded-none my-1 mx-1">
      <ToggleButton
        value="colonias"
        toggleValue={value}
        onChange={onChange}
        selectedColor={"border-blue-900"}
      >
        Colonias
      </ToggleButton>
      <ToggleButton
        value="alcaldias"
        toggleValue={value}
        onChange={onChange}
        selectedColor={"border-blue-900"}
      >
        Alcaldias
      </ToggleButton>
    </div>
  );
}
