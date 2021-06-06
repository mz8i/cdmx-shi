import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';

import './App.css';
import { DataMap } from './map/DataMap';
import { BudgetName, ScenarioName, TimeName, VariableName, VariableSpec } from './data-types';
import { useGeoJson } from './hooks/useGeoJson';

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
      <header className="App-header">
        <DataMap
          coloniasData={coloniasData}
          alcaldiasData={alcaldiasData}
          cdmxData={cdmxData}
          coloniasHighlights={highlightedColonias}
          variableSpec={variableSpec}
          onFeatureHover={setFeatureHover}
          featureHover={featureHover}
        />
        <div
          className="panel-group"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 1000,
          }}
        >
          <div className="panel">
            <label htmlFor="variable">Index</label>
            <br />
            <select
              id="variable"
              value={variable}
              onChange={(e) => setVariable(e.target.value as VariableName)}
            >
              <option value="SHI">SHI</option>
              <option value="WSI">WSI</option>
              <option value="ACI">ACI</option>
            </select>
            <br />
            <br />

            <label htmlFor="time">Year</label>
            <br />
            <input
              type="radio"
              id="time-c"
              name="time"
              value="c"
              checked={time === "c"}
              onChange={(e) => setTime(e.target.value as TimeName)}
            />
            <label htmlFor="time-c">Present (2020)</label>
            <br />
            <input
              type="radio"
              id="time-f"
              name="time"
              value="f"
              checked={time === "f"}
              onChange={(e) => setTime(e.target.value as TimeName)}
            />
            <label htmlFor="time-f">Future (2050)</label>
            <br />
            <br />

            <label htmlFor="budget">Budget</label>
            <br />
            <input
              type="range"
              id="budget"
              name="budget"
              min="0"
              max="4"
              value={parseInt(budget.substring(1), 10)}
              onChange={(e) => setBudget(`b${e.target.value}` as BudgetName)}
            />
            <br />
            <br />

            <label htmlFor="scenario">Scenario</label>
            <br />
            <input
              type="range"
              id="scenario"
              name="scenario"
              min="1"
              max="3"
              value={parseInt(scenario.substring(1), 10)}
              onChange={(e) =>
                setScenario(`w${e.target.value}` as ScenarioName)
              }
            />
          </div>
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
            <div style={{ maxHeight: "100%", overflowY: "scroll" }}>
              {sortedColoniasFeatures?.map((x) => (
                <div
                  // key={x.properties.ID_colonia}
                  style={{
                    cursor: "pointer",
                    width: "100%",
                    padding: "2px",
                    borderBottom: "1px solid white",
                    color: "#eee",
                    backgroundColor: featureHover === x ? "#33a" : "#ddd",
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
