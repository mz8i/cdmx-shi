import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';

import './App.css';
import { BudgetName, GeoLevel, WeightingName, TimeName, VariableName, VariableSpec } from './config/variables';

import { ScenarioSelection } from './controls/ScenarioSelection';
import { BudgetSelection } from './controls/BudgetSelection';
import { VariableSelection } from './controls/VariableSelection';
import { TimeSelection } from './controls/TimeSelection';
import { GeoLevelSelection } from './controls/GeoLevelSelection';
import { MexicoMap } from './map/MexicoMap';
import { useFeatureDataValue } from './data/use-feature-data';
import { DataList } from './DataList';

function App() {
  const [geoLevel, setGeoLevel] = useState<GeoLevel>("colonias");

  const [coloniasVariable, setColoniasVariable] = useState<VariableName>("SHI");
  const [time, setTime] = useState<TimeName>("c");
  const [weighting, setWeighting] = useState<WeightingName>("w1");
  const [budget, setBudget] = useState<BudgetName>("b2");

  const [featureHover, setFeatureHover] = useState<any>();

  const variable = geoLevel === "colonias" ? coloniasVariable : "CW_budget";

  const variableSpec = useMemo<VariableSpec>(
    () => ({
      dataset: geoLevel,
      variable,
      dimensions: {
        time,
        weighting,
        budget,
      },
    }),
    [geoLevel, variable, time, weighting, budget]
  );

  const cattailVariableSpec = useMemo<VariableSpec>(
    () => ({
      dataset: "colonias",
      variable: "cattail_plants_yearly",
      dimensions: variableSpec.dimensions,
    }),
    [variableSpec]
  );

  const getCattailData = useFeatureDataValue(cattailVariableSpec);


  const getFeatureData = useFeatureDataValue(variableSpec);

  const [highlightedRegions, setHighlightedRegions] = useState<any>([]);

  return (
      <>
          <Helmet>
              <title>Socio-Hydrological Vulnerability in Mexico City</title>
          </Helmet>
          <div className="absolute inset-0 grid grid-cols-12">
              <div className="col-span-3 bg-white p-4">
                  <h1 className="text-3xl uppercase font-extrabold my-4 text-blue-900">
                      Socio-Hydrological Vulnerability Index (SHI)
                  </h1>
                  <p className="my-4">
                      Indicator based method of evaluating the vulnerability of the
                      socio-hydrological system, based on a{' '}
                      <strong className="font-extrabold text-wsi-800">
                          Water Stress Index (WSI)
                      </strong>
                      , or ability to meet human and ecological demands for fresh water and an{' '}
                      <strong className="font-extrabold text-aci-800">
                          Adaptive Capacity Index (ACI)
                      </strong>
                      , or ability of environmental and social systems to adjust and respond to
                      potential pressures.
                  </p>
                  <div>
                      <figure>WSI diagram</figure>
                      <figure>ACI diagram</figure>
                  </div>
                  <section className="my-4 mt-10">
                      <h2 className="text-xl uppercase my-4 text-blue-900">
                          <span className="font-bold">01|</span> Scenarios
                      </h2>
                      <p className="my-4">
                          Choose scenario based on the weights of the indicators within the{' '}
                          <strong className="font-extrabold text-wsi-800">Water Stress</strong> and
                          the{' '}
                          <strong className="font-extrabold text-aci-800">Adaptive Capacity</strong>
                          .
                      </p>
                      <ScenarioSelection value={weighting} onChange={setWeighting} />
                  </section>
                  <section className="my-4 mt-10">
                      <h2 className="text-xl uppercase my-4 text-blue-900">
                          <span className="font-bold">02|</span> Decentralised Solutions
                      </h2>
                      <p className="my-4">
                          Choose amount of{' '}
                          <strong className="font-bold">Constructed Wetlands (CW)</strong> based on
                          budget.
                      </p>
                      <BudgetSelection value={budget} onChange={setBudget} />
                  </section>
              </div>
              <div className="h-screen col-span-9 relative">
                  <MexicoMap
                      geoLevel={geoLevel}
                      variableSpec={variableSpec}
                      highlightedRegions={highlightedRegions}
                      onFeatureHover={setFeatureHover}
                      featureHover={featureHover}
                  />
                  <div className="absolute top-0 left-0 m-8 z-50 bg-none w-52">
                      <div className=" rounded mb-4">
                          <h3>Geography</h3>
                          <GeoLevelSelection value={geoLevel} onChange={setGeoLevel} />
                      </div>
                      <div className=" rounded mb-4">
                          <h3>Current / future</h3>
                          <TimeSelection value={time} onChange={setTime} />
                      </div>
                      <div className="rounded mb-4">
                          <h3>Variable</h3>
                          <VariableSelection
                              geoLevel={geoLevel}
                              value={variable}
                              onChange={setColoniasVariable}
                          />
                      </div>
                  </div>
                  <div className="absolute top-4 right-4 z-50">
                      <div className="bg-white p-4 mb-4 w-96">
                          <section>
                              <h3>Colonia:</h3>
                              <div className="font-bold h-8">
                                  {featureHover?.properties?.Colonia}
                              </div>
                          </section>
                          <section>
                              <h3>Alcaldia:</h3>
                              <div className="font-bold h-8">
                                  {featureHover?.properties?.Municipality}
                              </div>
                          </section>
                          <section>
                              <h3>Value:</h3>
                              <div className="font-bold h-8">
                                  {featureHover && getFeatureData(featureHover)}
                              </div>
                              <h3>Population:</h3>
                              <div className="font-bold h-8">{featureHover?.properties.pop}</div>
                              <h3>Cattail plants yearly:</h3>
                              <div className="font-bold h-8">
                                  {featureHover && getCattailData(featureHover)}
                              </div>
                          </section>
                      </div>
                      <div className="bg-white p-4 mb-4 w-96">
                          <DataList 
                            geoLevel={geoLevel}
                            featureHover={featureHover}
                            onItemHover={x => x == null ? setHighlightedRegions([]) : setHighlightedRegions([x])}
                            variableSpec={variableSpec}
                          />
                      </div>
                  </div>
              </div>
          </div>
      </>
  );
}

export default App;
