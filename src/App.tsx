import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';

import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { config } from './config';
import { COLOR_SCALES } from './config/colorScales';

type VariableName = 'SHI' | 'WSI' | 'ACI' | 'CW_perc' | 'CW_sqm';
type TimeName = 'c' | 'f';
type ScenarioName = 'w1' | 'w2' | 'w3';
type BudgetName = 'b0' | 'b1' | 'b2' | 'b3' | 'b4';

interface VariableSpec {
  variable: VariableName;
  time: TimeName;
  scenario: ScenarioName;
  budget: BudgetName;
}

function getVariableName(spec: VariableSpec): string {
  return `${spec.variable}_${spec.time}_${spec.scenario}_${spec.budget}`;
}

function App() {
  const [viewport, setViewport] = useState(config.initialViewport);

  const [variable, setVariable] = useState<VariableName>('SHI');
  const [time, setTime] = useState<TimeName>('c');
  const [scenario, setScenario] = useState<ScenarioName>('w1');
  const [budget, setBudget] = useState<BudgetName>('b1');

  const variableName = getVariableName({
    variable,
    time,
    scenario,
    budget
  });
  
  const [hoveredObject, setHoveredObject] = useState<any>({});

  const fillFunction = x => COLOR_SCALES[variable](x.properties[variableName]);

  return (
    <div className="App">
      <Helmet>
        <title>Socio-Hydrological Vulnerability in Mexico City</title>
      </Helmet>
      <header className="App-header">
        <DeckGL
          initialViewState={viewport}
          onViewStateChange={({viewState}) => setViewport(viewState)}
          layers={[
            new GeoJsonLayer({
              id: variableName,
              data: '/data/colonias.geojson',
              getFillColor: fillFunction,
              lineWidthUnits: 'pixels',
              getLineWidth: () => 0.5,
              filled: true,
              pickable: true
            }),
            new GeoJsonLayer({
              id: 'boundary',
              data: '/data/alcaldias.geojson',
              filled: false,
              lineWidthUnits: 'pixels',
            }),
            new GeoJsonLayer({
              id: 'boundary',
              data: '/data/spatial/cdmx.geojson',
              filled: false,
              lineWidthUnits: 'pixels',
            })
          ]}
          onHover={(info: any, e) => setHoveredObject(info?.object)}
          controller={{
            scrollZoom: {
              smooth: true,
              speed: 0.5
            }
          }}
        >
          <StaticMap mapboxApiAccessToken={config.mapboxAccessToken} />
        </DeckGL>
        <div className="panel-group" style={{
            position: 'absolute',
            top: 10,
            right: 10
          }}>
          <div className="panel">
            <label htmlFor="variable">Index</label>
            <br />
            <select id="variable" value={variable} onChange={e => setVariable(e.target.value as VariableName)}>
              <option value="SHI">SHI</option>
              <option value="WSI">WSI</option>
              <option value="ACI">ACI</option>
            </select>
            <br />
            <br />

            <label htmlFor="time">
              Year
            </label>
            <br />
            <input type="radio" id="time-c" name="time" value="c"
              checked={time === 'c'}
              onChange={e => setTime(e.target.value as TimeName)}/>
            <label htmlFor="time-c">Present (2020)</label>
            <br />
            <input type="radio" id="time-f" name="time" value="f"
              checked={time === 'f'}
              onChange={e => setTime(e.target.value as TimeName)}
            />
            <label htmlFor="time-f">Future (2050)</label>
            <br />
            <br />

            <label htmlFor="budget">Budget</label>
            <br />
            <input type="range" id="budget" name="budget" min="0" max="4" 
              value={parseInt(budget.substring(1), 10)}
              onChange={e => setBudget(`b${e.target.value}` as BudgetName)}
            />
            <br />
            <br />

            <label htmlFor="scenario">Scenario</label>
            <br />
            <input type="range" id="scenario" name="scenario" min="1" max="3" 
              value={parseInt(scenario.substring(1), 10)}
              onChange={e => setScenario(`w${e.target.value}` as ScenarioName)}
            />
          </div>
          <div className="panel">
            Colonia:
            <br />
            {hoveredObject?.properties?.Colonia}
<br />
            Alcaldia:
            <br />
            {hoveredObject?.properties?.Municipality}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
