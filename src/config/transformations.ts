export const enum Dim {
  Scenario = 's',
  Budget = 'b',
  Time = 't'
};

export const variableDimensions: Record<string, Dim[]> = {
  CW_perc: [Dim.Budget, Dim.Scenario, Dim.Time],
  CW_sqm: [Dim.Budget, Dim.Scenario, Dim.Time],
  pop: [],
};

export const transformations = {
  colonias: {
    population_impacted: {
      inputs: ["CW_perc", "pop"],
      fn: (CW_perc, pop) => CW_perc * pop,
    },
    homes_impacted: {
      inputs: ["CW_sqm"],
      fn: (CW_sqm) => CW_sqm / 2,
    },
    water_filtered_yearly: {
      inputs: ["CW_sqm"],
      fn: (CW_sqm) => CW_sqm * 18000,
    },
    rain_filtered_yearly: {
      inputs: ["CW_sqm"],
      fn: (CW_sqm) => CW_sqm * 6000,
    },
    cattail_plants_yearly: {
      inputs: ["CW_sqm"],
      fn: (CW_sqm) => CW_sqm * 3,
    },
    arum_lillies_yearly: {
      inputs: ["CW_sqm"],
      fn: (CW_sqm) => CW_sqm * 32,
    },
    maintenance_jobs: {
      inputs: ["CW_sqm"],
      fn: (CW_sqm) => CW_sqm * 0.0625,
    },
    manufacture_jobs: {
      inputs: ["CW_sqm"],
      fn: (CW_sqm) => CW_sqm * 0.0115,
    },
  }
};
