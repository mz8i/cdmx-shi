import './App.css';

import React from 'react';
import { Helmet } from 'react-helmet';

import { GeoLevelSelection } from './controls/GeoLevelSelection';
import { TimeSelection } from './controls/TimeSelection';
import { VariableSelection } from './controls/VariableSelection';
import { MexicoMap } from './map/MexicoMap';
import { Benefits } from './panels/Benefits';
import { DataList } from './panels/DataList';
import { DetailsPane } from './panels/DetailsPane';
import { SidebarContent } from './SidebarContent';

function App() {
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
                    <div className="absolute top-0 left-0 m-8 z-50 bg-none w-52">
                        <div className=" rounded mb-4">
                            <h3>Geography</h3>
                            <GeoLevelSelection />
                        </div>
                        <div className=" rounded mb-4">
                            <h3>Current / future</h3>
                            <TimeSelection />
                        </div>
                        <div className="rounded mb-4">
                            <h3>Variable</h3>
                            <VariableSelection />
                        </div>
                    </div>
                    <div className="absolute top-4 right-4 z-50">
                        <div className="bg-white p-4 mb-4 w-96">
                            <DetailsPane />
                        </div>
                        <div className="bg-white p-4 mb-4 w-96">
                            <Benefits />
                        </div>
                        <div className="bg-white p-4 mb-4 w-96">
                            <DataList />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
