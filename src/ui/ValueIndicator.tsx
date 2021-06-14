import { VariableSpec } from '../config/variables';
import { DataFeature } from '../data/data-context';
import { useDataClass, useDataColor, useFeatureDataValue } from '../data/use-feature-data';

interface ValueIndicatorProps {
    variableSpec: VariableSpec;
    feature: DataFeature | null;
}

export const ValueIndicator: React.FC<ValueIndicatorProps> = ({ variableSpec, feature }) => {
    const getData = useFeatureDataValue(variableSpec);
    const getDataColor = useDataColor(variableSpec);
    const getDataClass = useDataClass(variableSpec);

    const value = feature && getData(feature);
    const color = value && getDataColor(value);

    return (
        <div
            className={`flex-1 flex flex-row text-center items-center transition-colors duration-500 h-16`}
            style={{ backgroundColor: color }}
        >
            <div className="flex-auto text-white font-bold text-xl">
                {feature && (getDataClass?.(value) ?? value ?? '')}
            </div>
        </div>
    );
};
