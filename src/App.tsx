import './App.css';

import React from 'react';
import { useRecoilValue } from 'recoil';

import { IndexVariableSelection } from './controls/IndexVariableSelection';
import { TimeSelection } from './controls/TimeSelection';
import { WetlandsVariableSelection } from './controls/WetlandsVariableSelection';
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
        <div className="absolute inset-0 sm:flex sm:flex-nowrap ">
            <div className="relative z-50 sm:max-w-sm xl:max-w-lg bg-white sm:h-screen sm:max-h-screen sm:overflow-x-visible sm:overflow-y-auto">
                <div className="p-3">
                    <h1 className="my-10 text-center sm:text-left sm:my-0 sm:mb-4 text-3xl uppercase font-extrabold text-blue-900">
                        Socio-Hydrological Vulnerability Index (SHI)
                    </h1>
                    <p className="my-4 text-sm">
                        This online tool presents an indicator-based method of evaluating the
                        vulnerability of the socio-hydrological system of Mexico City.
                    </p>
                </div>
                <SidebarContent />
            </div>
            <div className="absolute inset-0 z-0 sm:relative sm:flex-1 sm:col-span-7 lg:col-span-8">
                <MexicoMap />
                <div className="absolute top-0 left-0 my-4 mx-8 z-50 bg-none w-32">
                    <div className="mb-4 w-full">
                        <h3 className="text-center">Year</h3>
                        <TimeSelection />
                    </div>
                    <div className="flex flex-column gap-4 w-full">
                        {(walkthroughPhase === 'scenarios' || walkthroughPhase === 'impact') && (
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
                <div className="absolute top-0 right-1/2 m-4 z-50"></div>
                <div className="absolute bottom-0 left-0 m-5 z-50">
                    {variable === 'CW_sqm' ? (
                        <div className="p-4 mb-1 w-full bg-blue-900 bg-opacity-90 filter brightness-125 text-white rounded-xl flex-0">
                            <h2>Constructed Wetlands Benefits</h2>
                            <Benefits />
                        </div>
                    ) : (
                        <Legend variable={variable} dataset={geoLevel} />
                    )}
                </div>
                <div className="absolute top-0 right-0 m-5 z-50 flex-column nowrap w-80">
                    <div className="bg-white p-2 mb-6 w-full flex-0 rounded-xl border-2 border-gray-200">
                        <HoverDetailsPane />
                    </div>
                    <div className="mb-6 w-full flex-0 hidden lg:block">
                        <DataList height={300} itemHeight={40} />
                    </div>
                </div>
                <div className="invisible 2xl:visible absolute bottom-0 left-1/2 transform -translate-x-1/2 z-50 m-3">
                    <Supporters />
                </div>
            </div>
        </div>
    );
}

export default App;
