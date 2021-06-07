import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';

import './App.css';
import { DataMap } from './map/DataMap';
import { BudgetName, ScenarioName, TimeName, VariableName, VariableSpec } from './data-types';
import { useGeoJson } from './hooks/useGeoJson';

import { ScenarioSelection } from './controls/ScenarioSelection';
import { BudgetSelection } from './controls/BudgetSelection';
import { VariableSelection } from './controls/VariableSelection';
import { TimeSelection } from './controls/TimeSelection';

function getVariableName(variable, time, scenario, budget): string {
  return `${variable}_${time}_${scenario}_${budget}`;
}

function App() {
  const [variable, setVariable] = useState<VariableName>('SHI');
  const [time, setTime] = useState<TimeName>('c');
  const [scenario, setScenario] = useState<ScenarioName>('w1');
  const [budget, setBudget] = useState<BudgetName>('b1');

  const [featureHover, setFeatureHover] = useState<any>();

  const variableSpec = useMemo<VariableSpec>(
    () => ({
      variable,
      time,
      scenario,
      budget,
      fullName: getVariableName(variable, time, scenario, budget),
    }),
    [variable, time, scenario, budget]
  );

  const [coloniasData] = useGeoJson('/data/colonias.geojson');
  const [alcaldiasData] = useGeoJson('/data/alcaldias.geojson');
  const [cdmxData] = useGeoJson('/data/spatial/cdmx.geojson');

  const [highlightedColonias, setHighlightedColonias] = useState<any>([]);

  const sortedColoniasFeatures = useMemo(() => {
    if(coloniasData == null) return null;

    const coloniasCopy = [...coloniasData.features];
    coloniasCopy.sort((a,b) => b.properties[variableSpec.fullName] - a.properties[variableSpec.fullName]);
    return coloniasCopy;
  }, [coloniasData, variableSpec]);

  return (
    <>
      <Helmet>
        <title>Socio-Hydrological Vulnerability in Mexico City</title>
      </Helmet>
      <div className="absolute inset-0 grid grid-cols-12">
        <div className="col-span-3 bg-white p-4">
          <h1 className="text-2xl uppercase font-bold my-4">
            Socio-Hydrological Vulnerability Index (SHI)
          </h1>
          <p className="my-4">
            Indicator based method of evaluating the vulnerability of the
            socio-hydrological system, based on a{" "}
            <strong className="font-extrabold text-wsi-800">
              Water Stress Index (WSI)
            </strong>
            , or ability to meet human and ecological demands for fresh water
            and an{" "}
            <strong className="font-extrabold text-aci-800">
              Adaptive Capacity Index (ACI)
            </strong>
            , or ability of environmental and social systems to adjust and
            respond to potential pressures.
          </p>
          <div>
            <figure>WSI diagram</figure>
            <figure>ACI diagram</figure>
          </div>
          <section className="my-4">
            <h2 className="text-xl uppercase my-4">
              <span className="font-bold">01|</span> Scenarios
            </h2>
            <p className="my-4">
              Choose scenario based on the weights of the indicators within the{" "}
              <strong className="font-extrabold text-wsi-800">
                Water Stress
              </strong>{" "}
              and the{" "}
              <strong className="font-extrabold text-aci-800">
                Adaptive Capacity
              </strong>.
            </p>
            <ScenarioSelection value={scenario} onChange={setScenario} />
          </section>
          <section className="my-4">
            <h2 className="text-xl uppercase my-4">
              <span className="font-bold">02|</span> Decentralised Solutions
            </h2>
            <p className="my-4">
              Choose amount of{" "}
              <strong className="font-bold">Constructed Wetlands (CW)</strong>{" "}
              based on budget.
            </p>
            <BudgetSelection value={budget} onChange={setBudget} />
          </section>
        </div>
        <div className="h-screen col-span-9 relative">
          <DataMap
            coloniasData={coloniasData}
            alcaldiasData={alcaldiasData}
            cdmxData={cdmxData}
            coloniasHighlights={highlightedColonias}
            variableSpec={variableSpec}
            onFeatureHover={setFeatureHover}
            featureHover={featureHover}
          ></DataMap>
          <div className="absolute top-0 left-0 m-8 z-50 bg-white">
            <VariableSelection value={variable} onChange={setVariable} />
            <TimeSelection value={time} onChange={setTime} />
          </div>
          <div className="absolute top-4 right-4 z-50">
            <div className="bg-white p-4 mb-4 w-80 h-44">
              Colonia:
              <br />
              {featureHover?.properties?.Colonia}
              <br />
              Alcaldia:
              <br />
              {featureHover?.properties?.Municipality}
              <br />
              Value:
              <br />
              {featureHover?.properties?.[variableSpec.fullName]}
            </div>
            <div className="bg-white p-4 mb-4 w-80 h-96">
              <h3>All regions in descending order:</h3>
              <ul className="max-h-full overflow-y-scroll list-none pl-0 text-white">
                {sortedColoniasFeatures?.map((x) => (
                  <li
                    key={x.properties.ID_colonia}
                    className={`w-full cursor-pointer p-2 border border-white ${
                      featureHover === x ? "bg-gray-500" : "bg-gray-700"
                    }`}
                    onMouseOver={() => {
                      setHighlightedColonias([x]);
                      setFeatureHover(x);
                    }}
                    onMouseOut={() => {
                      setHighlightedColonias([]);
                      setFeatureHover(null);
                    }}
                  >
                    {x.properties.Colonia}
                    <br />({x.properties.Municipality})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
