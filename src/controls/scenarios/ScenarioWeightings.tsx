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
        <div>
            <div className="flex flex-row">
                {WSIVariables.map(v => {
                    return (
                        <CircularGauge
                            key={v}
                            className="flex-0 h-20 w-20"
                            radius={50}
                            strokeWidth={10}
                            strokeColor="blue"
                            ratio={weighting[v]}
                            text={v}
                            tooltip={WEIGHTED_VARIABLES[v].fullName}
                        />
                    );
                })}
            </div>
            <div className="flex flex-row">
                {ACIVariables.map(v => {
                    return (
                        <CircularGauge
                            key={v}
                            className="flex-0 h-20 w-20"
                            radius={50}
                            strokeWidth={10}
                            strokeColor="green"
                            ratio={weighting[v]}
                            text={v}
                            tooltip={WEIGHTED_VARIABLES[v].fullName}
                        />
                    );
                })}
            </div>
        </div>
    );
}
