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

interface RawVariableDefinition {
    dimensions: boolean;
}

interface CalculatedVariableDefinition {
    dimensions: boolean;
    inputs: string[];
    fn: (...inputs: any[]) => any;
    description?: string;
}

type VariableDefinition = RawVariableDefinition | CalculatedVariableDefinition;

export function valueType<C>() {
    return <K extends string>(cfg: Record<K, C>) =>
        cfg as {
            [key in K]: typeof cfg[key];
        };
}

const variableDef = valueType<VariableDefinition>();

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

export const VARIABLES = {
    colonias: variableDef({
        pop: {
            dimensions: false,
        },
        SHI: {
            dimensions: true,
        },
        WSI: {
            dimensions: true,
        },
        ACI: {
            dimensions: true,
        },
        CW_perc: {
            dimensions: true,
        },
        CW_sqm: {
            dimensions: true,
        },
        population_impacted: {
            dimensions: true,
            inputs: ['CW_perc', 'pop'],
            fn: (CW_perc, pop) => CW_perc * pop,
            description: 'Population impacted',
        },
        homes_impacted: {
            dimensions: true,
            inputs: ['CW_sqm'],
            fn: CW_sqm => CW_sqm / 2,
            description: 'Homes impacted',
        },
        water_filtered_yearly: {
            dimensions: true,
            inputs: ['CW_sqm'],
            fn: CW_sqm => CW_sqm * 18000,
            description: 'Water filtered yearly',
        },
        rain_filtered_yearly: {
            dimensions: true,
            inputs: ['CW_sqm'],
            fn: CW_sqm => CW_sqm * 6000,
            description: 'Rain filtered yearly',
        },
        cattail_plants_yearly: {
            dimensions: true,
            inputs: ['CW_sqm'],
            fn: CW_sqm => CW_sqm * 3,
            description: 'Cattail plants yearly',
        },
        arum_lillies_yearly: {
            dimensions: true,
            inputs: ['CW_sqm'],
            fn: CW_sqm => CW_sqm * 32,
            description: 'Arum lillies yearly',
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
