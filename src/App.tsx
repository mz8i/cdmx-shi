import './App.css';

import React from 'react';
import { Helmet } from 'react-helmet';
import { useRecoilValue } from 'recoil';

import { IndexVariableSelection } from './controls/IndexVariableSelection';
import { TimeSelection } from './controls/TimeSelection';
import { WetlandsVariableSelection } from './controls/WetlandsVariableSelection';
import { BreakpointIndicator } from './debugging/BreakpointIndicator';
import { DebugPanel } from './debugging/DebugPanel';
import { Legend } from './legend/Legend';
import { MexicoMap } from './map/MexicoMap';
import { Benefits } from './panels/Benefits';
import { DataList } from './panels/DataList';
import { HoverDetailsPane } from './panels/details/HoverDetailsPane';
import { SidebarContent } from './panels/SidebarContent';
import { Supporters } from './panels/Supporters';
import { currentVariableState, geoLevelState } from './recoil/data-selection-state';
import { walkthroughPhaseState } from './recoil/walkthrough-state';

function App() {
    const geoLevel = useRecoilValue(geoLevelState);
    const variable = useRecoilValue(currentVariableState);

    const walkthroughPhase = useRecoilValue(walkthroughPhaseState);

    return (
        <>
            <Helmet>
                <title>Socio-Hydrological Vulnerability in Mexico City</title>
            </Helmet>
            <div className="absolute inset-0 md:grid md:grid-cols-12">
                <div className="relative z-20 md:col-span-4 lg:col-span-3 bg-white p-4 md:max-h-full md:max-w-md">
                    <SidebarContent />
                </div>
                <div className="absolute inset-0 z-0 md:relative md:col-span-3 lg:col-span-9">
                    <MexicoMap />
                    <div className="absolute top-0 left-0 my-4 mx-8 z-50 bg-none w-52">
                        <div className="flex flex-column gap-4 w-full">
                            {(walkthroughPhase === 'scenarios' ||
                                walkthroughPhase === 'impact') && (
                                <div className="flex-0">
                                    <h3 className="text-center">Indices</h3>
                                    <IndexVariableSelection />
                                </div>
                            )}
                            {walkthroughPhase === 'solutions' && (
                                <div className="flex-0 w-24">
                                    <h3 className="text-center">Constructed Wetlands</h3>
                                    <WetlandsVariableSelection />
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
                    <div className="absolute top-10 right-10 z-50 flex-column nowrap w-96">
                        <div className="bg-white p-4 mb-6 w-full flex-0">
                            <HoverDetailsPane />
                        </div>
                        <div className="mb-6 w-full flex-0">
                            {/* <DataList height={350} itemHeight={70} /> */}
                        </div>
                    </div>
                    {false && (
                        <div className="absolute bottom-0 left-0 my-4 mx-8 w-64 z-50">
                            {geoLevel === 'colonias' &&
                                (variable === 'CW_sqm' || variable === 'population_impacted') && (
                                    <div className="p-4 mb-6 w-full bg-blue-900 bg-opacity-90 filter brightness-125 text-white rounded-xl flex-0">
                                        <h2>Constructed Wetlands Benefits</h2>
                                        <Benefits />
                                    </div>
                                )}
                        </div>
                    )}
                    <div className="invisible xl:visible absolute bottom-0 left-1/2 transform -translate-x-1/2 z-50 m-3">
                        <Supporters />
                    </div>
                    <DebugPanel />
                </div>
                <BreakpointIndicator />
            </div>
        </>
    );
}

export default App;
