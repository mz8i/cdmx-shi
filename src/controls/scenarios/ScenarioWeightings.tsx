import { WEIGHTED_VARIABLES, WEIGHTING_SCENARIOS } from '../../config/weightings';
import { CircularGauge } from '../../ui/CircularGauge';

const WSIVariables = Object.keys(WEIGHTED_VARIABLES).filter(
    x => WEIGHTED_VARIABLES[x].parentVariable === 'WSI',
);
const ACIVariables = Object.keys(WEIGHTED_VARIABLES).filter(
    x => WEIGHTED_VARIABLES[x].parentVariable === 'ACI',
);

export function ScenarioWeightings({ scenario }) {
    const weighting = WEIGHTING_SCENARIOS[scenario];

    return (
        <>
            <div className="flex flex-row">
                {WSIVariables.map(v => {
                    return (
                        <CircularGauge
                            key={v}
                            className="flex-0 m-2"
                            radius={30}
                            strokeWidth={7}
                            strokeColor="blue"
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
            <div className="flex flex-row">
                {ACIVariables.map(v => {
                    return (
                        <CircularGauge
                            key={v}
                            className="flex-0 m-2"
                            radius={30}
                            strokeWidth={7}
                            strokeColor="green"
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
