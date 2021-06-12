import { useMemo, useState } from "react";
import { GeoLevel, VariableSpec } from "./config/variables";
import { DataFeature, useData } from "./data/data-context";
import { useFeatureDataValue } from "./data/use-feature-data";

interface DataListProps {
    geoLevel: GeoLevel;
    variableSpec: VariableSpec;
    featureHover: DataFeature;
    onItemHover: (x: DataFeature | null) => void;
}
export function DataList({
    geoLevel,
    variableSpec,
    featureHover,
    onItemHover,
}: DataListProps) {
    const { data: currentData } = useData(geoLevel);
    const getFeatureData = useFeatureDataValue(variableSpec);

    const sortedFilteredRegions = useMemo(
        () => currentData?.features
            .filter(x => (getFeatureData(x) ?? 0) !== 0)
            .slice()
            .sort((a, b) => getFeatureData(b) - getFeatureData(a))
        ,[currentData, getFeatureData]
    );

    const [itemHover, setItemHover] = useState<DataFeature | null>(null);

    return (
        <div className="bg-white p-4 mb-4 w-80 h-96">
            <h3>All regions in descending order:</h3>
            <ul className="max-h-full overflow-y-scroll list-none pl-0 text-white">
                {sortedFilteredRegions?.map(x => (
                    <li
                        key={
                            geoLevel === 'colonias'
                                ? x.properties.ID_colonia
                                : x.properties.Municipality
                        }
                        className={`w-full cursor-pointer p-2 border border-white ${
                            (featureHover === x || itemHover === x) ? 'bg-gray-500' : 'bg-gray-700'
                        }`}
                        onMouseOver={() => {
                            setItemHover(x);
                            onItemHover(x);
                        }}
                        onMouseOut={() => {
                            setItemHover(null);
                            onItemHover(null);
                        }}
                    >
                        {x.properties.Colonia ?? ''}
                        <br />({x.properties.Municipality})
                    </li>
                ))}
            </ul>
        </div>
    );
}