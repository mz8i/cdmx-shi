import { VariableSpec } from '../config/variables';
import { DataFeature } from '../data/data-context';
import {
    useDataClass,
    useDataColor,
    useDataTextColorTheme,
    useFeatureDataValue,
} from '../data/use-feature-data';

interface ValueIndicatorProps {
    variableSpec: VariableSpec;
    feature: DataFeature | null;
}

export const ValueIndicator: React.FC<ValueIndicatorProps> = ({ variableSpec, feature }) => {
    const getData = useFeatureDataValue(variableSpec);
    const getDataColor = useDataColor(variableSpec);
    const getDataTextColor = useDataTextColorTheme(variableSpec);
    const getDataClass = useDataClass(variableSpec);

    const value = feature && getData(feature);
    const color = value != null ? getDataColor(value) : undefined;
    const textColorTheme = value && color && getDataTextColor(value, color);
    const dataClass = value && getDataClass(value);

    const dataTextColor = textColorTheme === 'light' ? 'text-white' : 'text-gray-700';

    const hasData = value != null && color != null;

    return (
        <div
            className={`flex-1 flex flex-row text-center items-center transition-colors duration-500 h-16 ${
                hasData ? '' : 'border-2 border-gray-200 border-dashed'
            }`}
            style={{ backgroundColor: color }}
        >
            <div
                className={`flex-auto ${
                    hasData ? dataTextColor : 'text-gray-300'
                } font-bold text-xl flex-row align-middle justify-center flex transition-colors ease-out duration-200`}
            >
                {hasData ? dataClass ?? value : <span className="text-normal">NO DATA</span>}
                {/* {feature && (getDataClass?.(value) ?? value ?? '')} */}
            </div>
        </div>
    );
};
