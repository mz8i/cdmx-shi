import { SketchPicker } from 'react-color';
import { useRecoilState } from 'recoil';

import { wetlandsBackdropColorState, wetlandsBackdropOpacityState } from './recoil/debugging';

const wetlandsOptions = [
    { color: '#13313A', opacity: 0.6 },
    { color: '#fff', opacity: 1.0 },
    { color: '#FFBA9E', opacity: 0.1 },
    { color: '#2A344B', opacity: 0.55 },
];

export function DebugPanel({}) {
    const [wetlandsColor, setWetlandsColor] = useRecoilState(wetlandsBackdropColorState);
    const [wetlandsOpacity, setWetlandsOpacity] = useRecoilState(wetlandsBackdropOpacityState);

    return (
        <div className="absolute top-40 left-2 z-50 outline-black">
            <h2 className="text-lg">Wetlands backdrop color?</h2>
            <div className="flex flex-row gap-1 m-1">
                {wetlandsOptions.map(({ color, opacity }, i) => (
                    <button
                        className="bg-gray-500 text-white rounded"
                        onClick={() => {
                            setWetlandsColor(color);
                            setWetlandsOpacity(opacity);
                        }}
                    >
                        Opt. {i + 1}
                    </button>
                ))}
            </div>
            <div>
                <h3>Opacity</h3>
                <input
                    type="range"
                    id="wetlands-color"
                    min={0}
                    max={1}
                    step={0.05}
                    value={wetlandsOpacity}
                    onChange={e => setWetlandsOpacity(parseFloat(e.target.value))}
                ></input>{' '}
                {wetlandsOpacity}
            </div>
            <div>
                <h3>Color</h3>
                <SketchPicker
                    color={wetlandsColor}
                    onChange={color => setWetlandsColor(color.hex)}
                    disableAlpha={true}
                    presetColors={[]}
                />
                {/* <input
                    type="text"
                    id="wetlands-opacity"
                    minLength={4}
                    maxLength={7}
                    value={wetlandsColor}
                    onChange={e => setWetlandsColor(e.target.value)}
                ></input> */}
            </div>
        </div>
    );
}
