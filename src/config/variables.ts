import { valueType } from '../util';
import { ColorScaleName, ScaleMappingName } from './scales';

export enum Dim {
    Weighting = 'weighting',
    Budget = 'budget',
    Time = 'time',
}

export const ALL_DIMENSIONS = [Dim.Time, Dim.Weighting, Dim.Budget];

export const DIMENSIONS_VALUES = {
    [Dim.Time]: ['c', 'f'],
    [Dim.Weighting]: ['w1', 'w2', 'w3'],
    [Dim.Budget]: ['b0', 'b1', 'b2', 'b3', 'b4'],
} as const;

type AllowedValues<T extends Dim> = typeof DIMENSIONS_VALUES[T][number];

export type GeoLevel = 'colonias' | 'alcaldias' | 'cdmx';

interface BaseVariableDefinition {
    description?: string;
    unit?: string;
    dimensions: boolean;
    colorScale?: ColorScaleName;
    scaleMapping?: ScaleMappingName;

    /**
     * The default natural order of sorting values (in the data list, legend etc) is assumed to be descending,
     * because most variables are about vulnerability etc.
     * However, some variables, most notable Adaptive Capacity Index, should be sorted in the opposite direction than the others.
     */
    invertOrderToAscending?: boolean;

    /**
     * How many digits after the comma to display when formating values in the legend.
     */
    legendFractionalDigits?: number;

    /**
     * Used to format legend tooltip for every colored box - should be a simple word corresponding to the class values in the scale mapping,
     * e.g. class: Very high -- legendClassHint: vulnerability -> tooltip will be "Very high vulnerability"
     */
    legendClassHint?: string;
}
interface RawVariableDefinition extends BaseVariableDefinition {}

interface CalculatedVariableDefinition extends BaseVariableDefinition {
    inputs: string[];
    fn: (...inputs: any[]) => any;
}

export type VariableDefinition = RawVariableDefinition | CalculatedVariableDefinition;

export const METADATA = {
    colonias: {
        ID_colonia: {},
        Colonia: {},
        Municipality: {},
    },
    alcaldias: {
        Municipality: {},
    },
};

const variableDef = valueType<VariableDefinition>();

export const VARIABLES = {
    colonias: variableDef({
        pop: {
            dimensions: false,
            colorScale: 'CW',
            scaleMapping: 'pop',
            description: 'Population',
            legendFractionalDigits: 0,
        },
        SHI: {
            dimensions: true,
            colorScale: 'SHI',
            scaleMapping: 'SHI',
            description: 'Socio-Hydrological Vulnerability',
            legendClassHint: 'vulnerability',
        },
        WSI: {
            dimensions: true,
            colorScale: 'WSI',
            scaleMapping: 'WSI',
            description: 'Water Stress',
            legendClassHint: 'stress',
        },
        ACI: {
            dimensions: true,
            colorScale: 'ACI',
            scaleMapping: 'ACI',
            invertOrderToAscending: true,
            description: 'Adaptive Capacity',
            legendClassHint: 'capacity',
        },
        CW_perc: {
            dimensions: true,
        },
        CW_sqm: {
            dimensions: true,
            colorScale: 'CW',
            scaleMapping: 'CW_sqm',
            description: 'Constructed Wetlands (sq.m.)',
            legendFractionalDigits: 0,
        },
        population_impacted: {
            dimensions: true,
            inputs: ['CW_perc', 'pop'],
            fn: (CW_perc, pop) => CW_perc * pop,
            description: 'Population impacted',
            unit: 'people',

            colorScale: 'CW',
            scaleMapping: 'pop',
            legendFractionalDigits: 0,
        },
        homes_impacted: {
            dimensions: true,
            inputs: ['CW_sqm'],
            fn: CW_sqm => CW_sqm / 2,
            description: 'Homes impacted',
            unit: 'homes',
        },
        water_filtered_yearly: {
            dimensions: true,
            inputs: ['CW_sqm'],
            fn: CW_sqm => CW_sqm * 18000,
            description: 'Litres of water filtered',
            unit: 'per year',
        },
        rain_filtered_yearly: {
            dimensions: true,
            inputs: ['CW_sqm'],
            fn: CW_sqm => CW_sqm * 6000,
            description: 'Litres of rain filtered',
            unit: 'per year',
        },
        cattail_plants_yearly: {
            dimensions: true,
            inputs: ['CW_sqm'],
            fn: CW_sqm => CW_sqm * 3,
            description: 'Cattail plants',
        },
        arum_lillies_yearly: {
            dimensions: true,
            inputs: ['CW_sqm'],
            fn: CW_sqm => CW_sqm * 32,
            description: 'Arum lillies',
        },
        maintenance_jobs: {
            dimensions: true,
            inputs: ['CW_sqm'],
            fn: CW_sqm => CW_sqm * 0.0625,
            description: 'Maintenance jobs',
        },
        manufacture_jobs: {
            dimensions: true,
            inputs: ['CW_sqm'],
            fn: CW_sqm => CW_sqm * 0.0115,
            description: 'Manufacture jobs',
        },
    }),
    alcaldias: variableDef({
        CW_budget: {
            dimensions: true,
            colorScale: 'CW',
            scaleMapping: 'CW_budget',
            description: 'Constructed Wetlands Budget (Mexican pesos)',
            legendFractionalDigits: 0,
        },
    }),
    cdmx: {},
};

export type TimeName = AllowedValues<Dim.Time>;
export type WeightingName = AllowedValues<Dim.Weighting>;
export type BudgetName = AllowedValues<Dim.Budget>;

export type DimensionValue<T extends Dim = Dim> = AllowedValues<T>;

export type VariableName = keyof typeof VARIABLES['colonias'] | keyof typeof VARIABLES['alcaldias'];

// export type VariableFullKey<T extends GeoLevel> =`${VariableName<T>}_${TimeName}_${WeightingName}_${BudgetName}`;

export type DimensionSpec = {
    [key in Dim]: AllowedValues<key>;
};
export interface VariableSpec {
    dataset: GeoLevel;
    variable: VariableName;
    dimensions?: DimensionSpec;
}
