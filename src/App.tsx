import './App.css';

import React from 'react';
import { Helmet } from 'react-helmet';
import { useRecoilValue } from 'recoil';

import { GeoLevelSelection } from './controls/GeoLevelSelection';
import { IndexVariableSelection } from './controls/IndexVariableSelection';
import { TimeSelection } from './controls/TimeSelection';
import { WetlandsVariableSelection } from './controls/WetlandsVariableSelection';
import { Legend } from './legend/Legend';
import { MexicoMap } from './map/MexicoMap';
import { Benefits } from './panels/Benefits';
import { DataList } from './panels/DataList';
import { HoverDetailsPane } from './panels/details/HoverDetailsPane';
import { SidebarContent } from './panels/SidebarContent';
import {
    coloniasVariableState,
    currentVariableState,
    geoLevelState,
} from './recoil/data-selection';

function App() {
    const geoLevel = useRecoilValue(geoLevelState);
    const coloniasVariable = useRecoilValue(coloniasVariableState);
    const variable = useRecoilValue(currentVariableState);

    return (
        <>
            <Helmet>
                <title>Socio-Hydrological Vulnerability in Mexico City</title>
            </Helmet>
            <div className="absolute inset-0 grid grid-cols-12">
                <div className="col-span-3 bg-white p-4">
                    <SidebarContent />
                </div>
                <div className="h-screen col-span-9 relative">
                    <MexicoMap />
                    <div className="absolute top-0 left-0 my-4 mx-8 z-50 bg-none w-52">
                        <div className="mb-4 w-full">
                            <h3 className="text-center">Geography</h3>
                            <GeoLevelSelection />
                        </div>
                        <div className="flex flex-row gap-4 w-full">
                            <div className="flex-0 w-24">
                                <h3 className="text-center">Impacts</h3>
                                <WetlandsVariableSelection />
                            </div>
                            {geoLevel === 'colonias' && (
                                <div className="flex-0">
                                    <h3 className="text-center">Vulnerability</h3>
                                    <IndexVariableSelection />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="absolute top-0 right-1/2 m-4 z-50">
                        <div className="mb-4">
                            <h3>Current / Future</h3>
                            <TimeSelection />
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 m-5 mb-8 z-50">
                        <Legend variable={variable} dataset={geoLevel} />
                    </div>
                    <div className="absolute top-10 right-10 z-50 flex-column nowrap h-screen w-96">
                        <div className="bg-white p-4 mb-6 w-full flex-0">
                            <HoverDetailsPane />
                        </div>
                        <div className="mb-6 w-full flex-0">
                            <DataList height={350} itemHeight={70} />
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 my-4 mx-8 w-64 z-50">
                        {geoLevel === 'colonias' &&
                            (coloniasVariable === 'CW_sqm' ||
                                coloniasVariable === 'population_impacted') && (
                                <div className="p-4 mb-6 w-full bg-blue-900 bg-opacity-90 filter brightness-125 text-white rounded-xl flex-0">
                                    <h2>Constructed Wetlands Benefits</h2>
                                    <Benefits />
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
