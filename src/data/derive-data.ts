import { DatasetName } from "../config/data-sources";
import { transformations } from "../config/transformations";

// export function deriveData(geoJson, transformations) {

// }


export function transformDataset(geoJson, datasetName: DatasetName) {
    return geoJson;
    // const trans = transformations[datasetName];
    // if(trans == null) {
    //     return geoJson;
    // } else {
    //     for (const varName of trans) {
    //         const varDef = trans[varName];

    //         const deps = varDef.
    //     }
    // }

}