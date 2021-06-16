import { WEIGHTED_VARIABLES, WEIGHTING_SCENARIOS } from '../../config/weightings';
import { CircularGauge } from '../../ui/CircularGauge';

const WSIVariables = Object.keys(WEIGHTED_VARIABLES).filter(
    x => WEIGHTED_VARIABLES[x].parentVariable === 'WSI',
);
const ACIVariables = Object.keys(WEIGHTED_VARIABLES).filter(
    x => WEIGHTED_VARIABLES[x].parentVariable === 'ACI',
);

type HSL = [number, number, number];

const ACIColor0: HSL = [174, 24.4, 69.4];
const ACIColor1: HSL = [175, 100.0, 20.8];

const WSIColor0: HSL = [204, 35.6, 70.8];
const WSIColor1: HSL = [203, 100, 26.7]; // this is probably wrong

function interpolateColor(color0: HSL, color1: HSL, ratio: number) {
    const [h0, s0, l0] = color0;
    const [h1, s1, l1] = color1;

    const dh = h1 - h0;
    const ds = s1 - s0;
    const dl = l1 - l0;

    return `hsl(${h0 + dh * ratio},${s0 + ds * ratio}%,${l0 + dl * ratio}%)`;
}

export function ScenarioWeightings({ scenario }) {
    const weighting = WEIGHTING_SCENARIOS[scenario];

    return (
        <>
            <div className="flex flex-row justify-around">
                {WSIVariables.map(v => {
                    return (
                        <CircularGauge
                            key={v}
                            className="flex-shrink-1"
                            radius={30}
                            strokeWidth={7}
                            strokeColor={interpolateColor(WSIColor0, WSIColor1, weighting[v])}
                            ratio={weighting[v]}
                            tooltip={`${WEIGHTED_VARIABLES[v].fullName} - ${weighting[v]}`}
                        >
                            <span
                                // title={WEIGHTED_VARIABLES[v].fullName}
                                className="text-wsi-900 font-bold text-sm"
                            >
                                {v}
                            </span>
                        </CircularGauge>
                    );
                })}
            </div>
            <div className="flex flex-row justify-around">
                {ACIVariables.map(v => {
                    return (
                        <CircularGauge
                            key={v}
                            className="flex-shrink-1"
                            radius={30}
                            strokeWidth={7}
                            strokeColor={interpolateColor(ACIColor0, ACIColor1, weighting[v])}
                            ratio={weighting[v]}
                            tooltip={`${WEIGHTED_VARIABLES[v].fullName} - ${weighting[v]}`}
                        >
                            <span
                                // title={WEIGHTED_VARIABLES[v].fullName}
                                className="text-aci-900 font-bold text-sm"
                            >
                                {v}
                            </span>
                        </CircularGauge>
                    );
                })}
            </div>
        </>
    );
}
