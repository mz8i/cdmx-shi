import { SliderHandle, SliderInput, SliderMarker, SliderTrack } from '@reach/slider';

export function BudgetSelection({ value, onChange }) {
    return (
        <div>
            <SliderInput
                name="budget"
                min={0}
                max={4}
                step={1}
                value={parseInt(value.substring(1), 10)}
                onChange={val => onChange(`b${val}`)}
            >
                <SliderTrack>
                    <SliderMarker value={0} title="test" />
                    <SliderMarker value={1} />
                    <SliderMarker value={2} />
                    <SliderMarker value={3} />
                    <SliderMarker value={4} />
                    <SliderHandle />
                </SliderTrack>
            </SliderInput>
        </div>
    );
}
