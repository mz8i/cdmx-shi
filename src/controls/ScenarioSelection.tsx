import { Tab, TabList, TabPanel, TabPanels, Tabs, TabsOrientation } from '@reach/tabs';
import { useRecoilState } from 'recoil';

import { WeightingName } from '../config/variables';
import { weightingDimensionState } from '../recoil/data-selection-state';
import { W1Icon, W2Icon, W3Icon } from '../ui/icons';
import { ScenarioWeightings } from './scenarios/ScenarioWeightings';

export function ScenarioSelection() {
    const [value, onChange] = useRecoilState(weightingDimensionState);

    return (
        <>
            <Tabs
                className="my-4 h-72 sm:h-80 xl:h-72 rounded-2xl bg-blue-900 text-white overflow-hidden"
                orientation={TabsOrientation.Vertical}
                index={parseInt(value.substring(1), 10) - 1}
                onChange={index => onChange(`w${index + 1}` as WeightingName)}
            >
                <TabList className="bg-gray-300 rounded-2xl rounded-r-none w-18 mr-4 h-full flex flex-col justify-around">
                    <Tab
                        key="w1"
                        className={`flex-1 ${
                            value === 'w1' ? 'bg-blue-900 text-white' : 'bg-gray-300 text-gray-400'
                        }`}
                    >
                        <W1Icon fill={value === 'w1' ? 'white' : 'gray'} height={36} width={36} />
                    </Tab>
                    <Tab
                        key="w2"
                        className={`flex-1 active:ring-0 ${
                            value === 'w2' ? 'bg-blue-900' : 'bg-gray-300'
                        }`}
                    >
                        <W2Icon fill={value === 'w2' ? 'white' : 'gray'} height={36} width={36} />
                    </Tab>
                    <Tab
                        key="w3"
                        className={`flex-1 ${
                            value === 'w3' ? 'bg-blue-900 text-white' : 'bg-gray-300 text-gray-400'
                        }`}
                    >
                        <W3Icon fill={value === 'w3' ? 'white' : 'gray'} height={36} width={36} />
                    </Tab>
                </TabList>
                <TabPanels className="w-full p-3">
                    <TabPanel className="text-center p-2 rounded-xl align-middle bg-white py-2 px-3 box-border h-full relative">
                        <h3 className="text-l font-extrabold uppercase text-blue-900 text-left mb-2">
                            Stakeholder perspective
                        </h3>
                        <p className="text-xs text-black text-left">
                            Derived from surveys with different authorities of the CDMX that are
                            experts in related topics, including authorities from the Secretaría de
                            Protección Civil, Fondo para la Comunicación y Educación Ambiental, Isla
                            Urbana and Loreto y Peña Ecological Park.{' '}
                        </p>
                        {value === 'w1' && (
                            <div className="absolute bottom-3 left-0 right-0 flex flex-row align-middle justify-center">
                                <div className="flex-0">
                                    <ScenarioWeightings scenario={value} />
                                </div>
                            </div>
                        )}
                    </TabPanel>
                    <TabPanel className="text-center p-2 rounded-xl align-middle bg-white py-2 px-3 box-border h-full relative">
                        <h3 className="text-l font-extrabold uppercase text-blue-900 text-left mb-2">
                            Environmental perspective
                        </h3>
                        <p className="text-xs text-black text-left">
                            Water scarcity is considered the most important factor of water stress;
                            the natural and physical capacities of an area are essential for
                            mitigating the effects of climate change.
                        </p>
                        {value === 'w2' && (
                            <div className="absolute bottom-3 left-0 right-0 flex flex-row align-middle justify-center">
                                <div className="flex-0">
                                    <ScenarioWeightings scenario={value} />
                                </div>
                            </div>
                        )}
                    </TabPanel>
                    <TabPanel className="text-center p-2 rounded-xl align-middle bg-white py-2 px-3 box-border h-full relative">
                        <h3 className="text-l font-extrabold uppercase text-blue-900 text-left mb-2">
                            Social perspective
                        </h3>
                        <p className="text-xs text-black text-left">
                            Equal access to water is considered fundamental for water security;
                            improving social aspects related to economic and human resource
                            capacities is key to affronting climate change.
                        </p>
                        {value === 'w3' && (
                            <div className="absolute bottom-3 left-0 right-0 flex flex-row align-middle justify-center">
                                <div className="flex-0">
                                    <ScenarioWeightings scenario={value} />
                                </div>
                            </div>
                        )}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
}
