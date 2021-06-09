import { ToggleButton } from "../ui/ToggleButton";

export function TimeSelection({
    value,
    onChange
}) {
    return (
      <div className="my-1 mx-1">
        <div className="flex">
          <ToggleButton
            value="c"
            toggleValue={value}
            onChange={onChange}
            selectedColor="border-blue-900"
          >
            2020
          </ToggleButton>
          <ToggleButton
            value="f"
            toggleValue={value}
            onChange={onChange}
            selectedColor="border-blue-900"
          >
            2050
          </ToggleButton>
        </div>
      </div>
    );
}