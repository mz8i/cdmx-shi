import React, { useCallback, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';

import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { config } from './config';
import { VisualMap } from './VisualMap';
import { BudgetName, ScenarioName, TimeName, VariableName, VariableSpec } from './data-types';
import { HtmlOverlay, HtmlOverlayItem } from '@nebula.gl/overlays';

function getVariableName(spec: VariableSpec): string {
  return `${spec.variable}_${spec.time}_${spec.scenario}_${spec.budget}`;
}

function App() {
  const [variable, setVariable] = useState<VariableName>('SHI');
  const [time, setTime] = useState<TimeName>('c');
  const [scenario, setScenario] = useState<ScenarioName>('w1');
  const [budget, setBudget] = useState<BudgetName>('b1');

  const [mapHoverInfo, setMapHoverInfo] = useState<any>({});

  const variableName = getVariableName({
    variable,
    time,
    scenario,
    budget,
  });

  return (
    <div className="App">
      <Helmet>
        <title>Socio-Hydrological Vulnerability in Mexico City</title>
      </Helmet>
      <header className="App-header">
        <VisualMap
          variable={variable}
          time={time}
          scenario={scenario}
          budget={budget}
          variableName={variableName}
          setHoverInfo={setMapHoverInfo}
        >
          <HtmlOverlay>
            <HtmlOverlayItem
              style={{ pointerEvents: 'all'}}
              coordinates={[config.initialViewport.longitude, config.initialViewport.latitude]}>
              <div className="panel" onMouseMove={e => {
                console.log("html", e.clientX, e.clientY);
                e.preventDefault();
                return false;
              }}>
                he he
              </div>
            </HtmlOverlayItem>
          </HtmlOverlay>
          {/* {mapHoverInfo?.object && (
            <div
              style={{
                position: "absolute",
                zIndex: 1,
                pointerEvents: "none",
                left: mapHoverInfo.x,
                top: mapHoverInfo.y,
              }}
            >
              <div className="panel">
                {mapHoverInfo?.object?.properties?.[variableName]}

              </div>
            </div>
          )} */}
        </VisualMap>
        <div
          className="panel-group"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
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
          <div className="panel">
            Colonia:
            <br />
            {mapHoverInfo?.object?.properties?.Colonia}
            <br />
            Alcaldia:
            <br />
            {mapHoverInfo?.object?.properties?.Municipality}
            <br />
            Value:
            <br />
            {mapHoverInfo?.object?.properties?.[variableName]}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
