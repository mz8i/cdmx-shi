import {
    ALL_DIMENSIONS,
    DIMENSIONS_VALUES,
    GeoLevel,
    VARIABLES,
    VariableName,
} from '../config/variables';
import { DatasetFeatureCollection } from './data-context';
import { getVariableFullKey } from './use-feature-data';

function cartesian(args: any[][]) {
    var r: any[] = [],
        max = args.length - 1;
    function helper(arr, i) {
        for (var j = 0, l = args[i].length; j < l; j++) {
            var a = arr.slice(0); // clone arr
            a.push(args[i][j]);
            if (i === max) r.push(a);
            else helper(a, i + 1);
        }
    }
    helper([], 0);
    return r;
}

// function getUniqueInputDimensions(inputs, datasetName) {
//     return  _(inputs)
//       .flatMap((d) => VARIABLES[datasetName]?.[d].dimensions)
//       .filter()
//       .uniq()
//       .value();
// }

function dimensionCombinations(allDimensions) {
    const dimValues = allDimensions.map(dim => DIMENSIONS_VALUES[dim]);
    const dimProduct = cartesian(dimValues);

    const results: any[] = [];
    for (const prod of dimProduct) {
        const res = {};
        for (let i = 0; i < allDimensions.length; i++) {
            res[allDimensions[i]] = prod[i];
        }
        results.push(res);
    }
    return results;
}

// function filterDimensionsForVariable(dimensions: Record<Dim, any>, variable, dataset) {
//     return _.pickBy(dimensions, (dimVal, dim) =>
//       VARIABLES[dataset][variable].dimensions?.includes(dim)
//     ) as Record<Dim, any>;
// }
const DIMENSION_COMBINATIONS = dimensionCombinations(ALL_DIMENSIONS);

export function transformDataset(geoJson: DatasetFeatureCollection, dataset: GeoLevel) {
    const vars = VARIABLES[dataset];
    if (vars == null) {
        return geoJson;
    } else {
        for (const [varName, varDef] of Object.entries(vars)) {
            if ('fn' in varDef) {
                const variable = varName as VariableName;
                const hasDimensions = varDef.inputs.some(vd => vars[vd].dimensions);

                const keySets: any[] = [];

                if (hasDimensions) {
                    for (const dimensions of DIMENSION_COMBINATIONS) {
                        const outputKey = getVariableFullKey({ variable, dimensions, dataset });
                        const inputKeys = varDef.inputs.map(inp =>
                            getVariableFullKey({
                                variable: inp as VariableName,
                                dimensions,
                                dataset,
                            }),
                        );
                        keySets.push([outputKey, inputKeys]);
                    }
                } else {
                    keySets.push([variable, varDef.inputs]);
                }

                for (const [outputKey, inputKeys] of keySets) {
                    for (const feature of geoJson.features) {
                        const inputValues = inputKeys.map(ik => feature.properties[ik]);
                        feature.properties[outputKey] = varDef.fn(...inputValues);
                    }
                }
            }
        }
        return geoJson;
    }
}
