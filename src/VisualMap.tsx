import React, { useCallback, useMemo, useState } from "react";
import DeckGL from "@deck.gl/react";
import { GeoJsonLayer } from "@deck.gl/layers";
import { StaticMap } from "react-map-gl";

import { config } from "./config";
import { COLOR_SCALES } from "./config/color-scales";
import { BudgetName, ScenarioName, TimeName, VariableName, VariableSpec } from "./data-types";

interface VisualMapProps {
    variable: VariableName;
    time: TimeName;
    scenario: ScenarioName;
    budget: BudgetName;
    variableName:string;

    setHoverInfo: (obj: any) => void;
}

export const VisualMap: React.FC<VisualMapProps> = ({
  variable,
  time,
  scenario,
  budget,
  variableName,
  setHoverInfo,
  children
}) => {
  const [viewport, setViewport] = useState(config.initialViewport);



  const fillFunction = useCallback(
    (x) => COLOR_SCALES[variable](x.properties[variableName]),
    [variable, variableName]
  );

  const layers = useMemo(
    () => [
      new GeoJsonLayer<{properties: {
        pop: number;
      }}>({
        id: variableName,
        data: "/data/colonias.geojson",
        getFillColor: fillFunction,
        lineWidthUnits: "pixels",
        getLineWidth: (x) => 0.5,
        filled: true,
        pickable: true,
      }),
      new GeoJsonLayer({
        id: "boundary-alcaldias",
        data: "/data/alcaldias.geojson",
        filled: false,
        lineWidthUnits: "pixels",
      }),
      new GeoJsonLayer({
        id: "boundary-cdmx",
        data: "/data/spatial/cdmx.geojson",
        filled: false,
        lineWidthUnits: "pixels",
      }),
    ],
    [variableName, fillFunction]
  );

  //
  return (
    <DeckGL
      initialViewState={viewport}
      onViewStateChange={({ viewState }) => setViewport(viewState)}
      layers={layers}
      onHover={(info, e) => {
        console.log("deck", info.x, info.y);
        setHoverInfo(info)
      }}
      controller={{
        scrollZoom: {
          smooth: true,
          speed: 0.5,
        },
      }}
    >
      <StaticMap mapboxApiAccessToken={config.mapboxAccessToken} />
      {/* <GeoJsonLayer
        id={variableName}
        data="/data/colonias.geojson"
        getFillColor={fillFunction}
        lineWidthUnits="pixels"
        getLineWidth={(x) => 0.5}
        filled={true}
        pickable={true}
        autoHighlight={true}
        highlightColor={[255,0,0]}
      /> */}
      {children}
    </DeckGL>
  );
};
