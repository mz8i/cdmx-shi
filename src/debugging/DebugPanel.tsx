import { SketchPicker } from 'react-color';
import Draggable from 'react-draggable';
import { useRecoilState, useRecoilValue } from 'recoil';

import {
    mapPositionState,
    wetlandsBackdropColorState,
    wetlandsBackdropOpacityState,
} from '../recoil/debugging';

const wetlandsOptions = [
    { color: '#13313A', opacity: 0.6 },
    { color: '#fff', opacity: 1.0 },
    { color: '#FFBA9E', opacity: 0.1 },
    { color: '#2A344B', opacity: 0.55 },
];

export function DebugPanel() {
    const [wetlandsColor, setWetlandsColor] = useRecoilState(wetlandsBackdropColorState);
    const [wetlandsOpacity, setWetlandsOpacity] = useRecoilState(wetlandsBackdropOpacityState);
    // const mapPosition = useRecoilValue(mapPositionState);

    return (
        <Draggable cancel=".draggable-no">
            <div className="absolute top-4 left-40 z-50 outline-black bg-gray-50 rounded-xl p-3 pt-5 cursor-move">
                <div className="draggable-no cursor-auto">
                    {/* {mapPosition} */}
                    <h2 className="text-lg">Wetlands backdrop color</h2>
                    <div className="flex flex-row gap-1 m-1">
                        {wetlandsOptions.map(({ color, opacity }, i) => (
                            <button
                                key={i}
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
                    <div className="m-2">
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
                        <div className="inline-block w-5">{wetlandsOpacity.toFixed(2)}</div>
                    </div>
                    <div>
                        <h3>Color</h3>
                        <SketchPicker
                            color={wetlandsColor}
                            onChange={color => setWetlandsColor(color.hex)}
                            disableAlpha={true}
                            presetColors={[]}
                        />
                    </div>
                </div>
            </div>
        </Draggable>
    );
}
