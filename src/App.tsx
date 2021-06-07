import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';

import './App.css';
import { DataMap } from './map/DataMap';
import { BudgetName, ScenarioName, TimeName, VariableName, VariableSpec } from './data-types';
import { useGeoJson } from './hooks/useGeoJson';

import { ScenarioSelection } from './controls/ScenarioSelection';
import { BudgetSelection } from './controls/BudgetSelection';
import { CustomControl } from './map/CustomControl';
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
    <div className="App">
      <Helmet>
        <title>Socio-Hydrological Vulnerability in Mexico City</title>
      </Helmet>
      <div className="sidebar" style={{ padding: "10px" }}>
        <h1>Socio-Hydrological Vulnerability Index (SHI)</h1>
        <p>
          Indicator based method of evaluating the vulnerability of the
          socio-hydrological system, based on a{" "}
          <dfn className="var-txt wsi">Water Stress Index (WSI)</dfn>, or ability to
          meet human and ecological demands for fresh water and an{" "}
          <dfn className="var-txt aci">Adaptive Capacity Index (ACI)</dfn>, or ability
          of environmental and social systems to adjust and respond to potential
          pressures.
        </p>
        <div>
          <figure>WSI diagram</figure>
          <figure>ACI diagram</figure>
        </div>
        <section>
          <h2>01| Scenarios</h2>
          <p>
            Choose scenario based on the weights of the indicators within the{" "}
            <strong className="var-txt wsi">Water Stress</strong> and the{" "}
            <strong className="var-txt aci">Adaptive Capacity</strong>.
          </p>
          <ScenarioSelection value={scenario} onChange={setScenario} />
        </section>
        <section>
          <h2>02| Decentralised Solutions</h2>
          <p>
            Choose amount of <dfn className="var-txt">Constructed Wetlands (CW)</dfn> based on
            budget.
          </p>
          <BudgetSelection value={budget} onChange={setBudget} />
        </section>
      </div>
      <div>
        <DataMap
          coloniasData={coloniasData}
          alcaldiasData={alcaldiasData}
          cdmxData={cdmxData}
          coloniasHighlights={highlightedColonias}
          variableSpec={variableSpec}
          onFeatureHover={setFeatureHover}
          featureHover={featureHover}
        >
          <CustomControl position="topleft">
            <VariableSelection value={variable} onChange={setVariable} />
            <br />
            <TimeSelection value={time} onChange={setTime} />
          </CustomControl>
        </DataMap>
        <div
          className="panel-group"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 1000,
          }}
        >
          <div className="panel" style={{ height: "150px" }}>
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
          <div className="panel" style={{ height: "300px" }}>
            <h3>All regions in descending order:</h3>
            <ul
              style={{
                maxHeight: "100%",
                overflowY: "scroll",
                listStyle: "none",
                paddingLeft: 0,
              }}
            >
              {sortedColoniasFeatures?.map((x) => (
                <li
                  key={x.properties.ID_colonia}
                  style={{
                    cursor: "pointer",
                    width: "100%",
                    padding: "2px",
                    borderBottom: "1px solid white",
                    color: "#eee",
                    backgroundColor: featureHover === x ? "#33a" : "#666",
                  }}
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
  );
}

export default App;
