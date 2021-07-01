import './App.css';

import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { IndexVariableSelection } from './controls/IndexVariableSelection';
import { TimeSelection } from './controls/TimeSelection';
import { WetlandsVariableSelection } from './controls/WetlandsVariableSelection';
import { Benefits } from './legend/Benefits';
import { Legend } from './legend/Legend';
import { MexicoMap } from './map/MexicoMap';
import { DataList } from './panels/DataList';
import { HoverDetailsPane } from './panels/details/HoverDetailsPane';
import { SidebarContent } from './panels/SidebarContent';
import { Supporters } from './panels/Supporters';
import { currentVariableState, geoLevelState } from './recoil/data-selection-state';
import { walkthroughPhaseState } from './recoil/walkthrough-state';

const PageTitle = ({ children }) => (
    <h1 className="p-4 text-center sm:text-left sm:my-0 sm:mb-4 text-3xl uppercase font-extrabold text-blue-900">
        {children}
    </h1>
);

const Sidebar = ({ children }) => (
    <div className="bg-none z-50 sm:relative sm:max-w-sm xl:max-w-lg sm:bg-white sm:h-screen sm:max-h-screen sm:overflow-x-visible sm:overflow-y-scroll">
        {children}
    </div>
);

function App() {
    const geoLevel = useRecoilValue(geoLevelState);
    const variable = useRecoilValue(currentVariableState);
    const walkthroughPhase = useRecoilValue(walkthroughPhaseState);

    const [showBenefits, setShowBenefits] = useState(false);

    return (
        <div className="absolute inset-0 sm:flex sm:flex-nowrap ">
            <Sidebar>
                <div className="h-1/6 sm:h-auto bg-white">
                    <PageTitle>Socio-Hydrological Vulnerability Index (SHI)</PageTitle>
                </div>
                <div className="absolute h-2/6 bottom-0 left-0 right-0 sm:h-auto sm:w-full sm:static overflow-y-auto">
                    <p className="mx-4 mb-4 sm:my-4 text-sm">
                        This online tool presents an indicator-based method to evaluate the
                        socio-hydrological vulnerability of Mexico City considering perspectives
                        from stakeholders, environmental and social experts. The tool provides the
                        optimal spatial distribution of constructed wetlands for a range of budgets,
                        allowing the user to assess the impact of different mitigation strategies
                        through the changes in the index. A forecast scenario accounting for the
                        impact of climate, land-uses and population changes for 2050 is presented,
                        considering that no intervention is made before that year.
                    </p>
                    <SidebarContent />
                    <div className="text-xs text-gray-700 p-3  bg-white text-right">
                        For more information{' '}
                        <a className="text-blue-900 underline" href="https://www.mexicoshr.com/">
                            click here
                        </a>
                    </div>
                </div>
            </Sidebar>
            <div className="relative h-3/6 z-0 sm:h-full sm:flex-1">
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
                <div className="hidden sm:block absolute bottom-0 left-0 m-5 z-50">
                    {variable === 'CW_sqm' ? (
                        <div className="p-4 mb-1 w-full bg-blue-900 bg-opacity-90 filter brightness-125 text-white rounded-xl flex-0">
                            <h2>Constructed Wetlands Benefits</h2>
                            <Benefits />
                        </div>
                    ) : (
                        <Legend variable={variable} dataset={geoLevel} />
                    )}
                </div>
                <div className="hidden sm:block absolute top-0 right-0 m-5 z-50 flex-column nowrap w-80">
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
