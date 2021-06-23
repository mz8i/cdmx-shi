import { Accordion, AccordionButton, AccordionItem, AccordionPanel } from '@reach/accordion';
import { useRecoilState } from 'recoil';

import { BudgetSelection } from '../controls/BudgetSelection';
import { ScenarioSelection } from '../controls/ScenarioSelection';
import { WalkthroughPhase, walkthroughPhaseState } from '../recoil/walkthrough-state';
import { IndexDiagramShape } from '../ui/icons';

function IndexDiagram({ mainName, dependencies, color }) {
    return (
        <figure className="flex flex-row items-center h-16 my-1 nowrap w-54 ">
            <div className={`flex-0 ${color} font-extrabold text-sm`}>{mainName}</div>
            <IndexDiagramShape className="max-h-full -m-4" />
            <div className="flex flex-col gap-1 nowrap">
                <div className={`flex-0 ${color} text-xs font-normal whitespace-nowrap`}>
                    {dependencies[0]}
                </div>
                <div className={`flex-0 ${color} text-xs font-normal whitespace-nowrap`}>
                    {dependencies[1]}
                </div>
                <div className={`flex-0 ${color} text-xs font-normal whitespace-nowrap`}>
                    {dependencies[2]}
                </div>
                <div className={`flex-0 ${color} text-xs font-normal whitespace-nowrap`}>
                    {dependencies[3]}
                </div>
            </div>
        </figure>
    );
}

const WSIDiagram = () => (
    <IndexDiagram
        mainName="WSI"
        dependencies={[
            'Water Variation (WV)',
            'Water Scarcity (WS)',
            'Water Exploitation (WE)',
            'Water Pollution (WP)',
        ]}
        color="text-wsi-900"
    />
);

const ACIDiagram = () => (
    <IndexDiagram
        mainName="ACI"
        dependencies={[
            'Natural Capacity (NC)',
            'Physical Capacity (PC)',
            'Human Resource Capacity (HC)',
            'Economic Capacity (EC)',
        ]}
        color="text-aci-900"
    />
);

const accordionWalkthrough: WalkthroughPhase[] = ['intro', 'scenarios', 'solutions', 'impact'];

export function SidebarContent() {
    const [walkthroughPhase, setWalkthroughPhase] = useRecoilState(walkthroughPhaseState);

    return (
        <section>
            <Accordion
                index={accordionWalkthrough.indexOf(walkthroughPhase)}
                onChange={index => setWalkthroughPhase(accordionWalkthrough[index])}
            >
                <StyledAccordionItem>
                    <StyledAccordionButton>
                        <span className="font-bold">01|</span> Introduction
                    </StyledAccordionButton>
                    <StyledAccordionPanel>
                        <p>
                            The method is based on a{' '}
                            <strong className="font-extrabold text-wsi-800">
                                Water Stress Index (WSI)
                            </strong>
                            , or ability to meet human and ecological demands for fresh water and an{' '}
                            <strong className="font-extrabold text-aci-800">
                                Adaptive Capacity Index (ACI)
                            </strong>
                            , or ability of environmental and social systems to adjust and respond
                            to potential pressures.
                        </p>
                        <div className="flex flex-row flex-wrap items-start justify-around max-w-md my-6 gap-x-0 gap-y-4">
                            <div className="w-56 flex-shrink-1">
                                <WSIDiagram />
                            </div>
                            <div className="w-56 flex-shrink-1">
                                <ACIDiagram />
                            </div>
                        </div>
                        <p>
                            The index components are combined based on a set of weightings
                            representing their importance. The next section describes three
                            different sets of weightings developed for this project.
                        </p>
                    </StyledAccordionPanel>
                </StyledAccordionItem>
                <StyledAccordionItem>
                    <StyledAccordionButton>
                        <span className="font-bold">02|</span> Scenarios
                    </StyledAccordionButton>
                    <StyledAccordionPanel>
                        <p className="mb-4 text-sm">
                            The three <i>scenarios</i>, or weightings for the indicator components
                            of <strong className="font-extrabold text-wsi-800">WSI</strong> and{' '}
                            <strong className="font-extrabold text-aci-800">ACI</strong>, represent
                            different perspectives on what contributes most to socio-hydrological
                            vulnerability.
                        </p>
                        <p>Switch between the scenarios to see their effect on the map.</p>
                        <ScenarioSelection />
                    </StyledAccordionPanel>
                </StyledAccordionItem>
                <StyledAccordionItem>
                    <StyledAccordionButton>
                        <span className="font-bold">03|</span> Decentralised Solutions
                    </StyledAccordionButton>
                    <StyledAccordionPanel>
                        <p className="my-4">
                            By using the slider, choose the budget for building{' '}
                            <strong className="font-bold">Constructed Wetlands (CW)</strong>.
                        </p>
                        <p>
                            The map will show the allocation of the budget to alcaldías
                            (municipalities) in and around Mexico City.
                        </p>
                        <div className="py-4">
                            <BudgetSelection />
                        </div>
                        <p>
                            Switch to a more detailed view using the{' '}
                            <i>
                                m<sup>2</sup>
                            </i>{' '}
                            button.
                        </p>
                    </StyledAccordionPanel>
                </StyledAccordionItem>
                <StyledAccordionItem>
                    <StyledAccordionButton>
                        <span className="font-bold">04|</span> Impact
                    </StyledAccordionButton>

                    <StyledAccordionPanel>
                        <p></p>
                        <div className="py-4">
                            <BudgetSelection />
                        </div>
                    </StyledAccordionPanel>
                </StyledAccordionItem>
            </Accordion>
        </section>
    );
}

const StyledAccordionButton = ({ children }) => (
    <AccordionButton className="w-full h-12 p-2 text-xl text-left text-blue-900 uppercase bg-gray-50">
        {children}
    </AccordionButton>
);

const StyledAccordionItem = ({ children }) => (
    <AccordionItem className="border-b border-gray-200">{children}</AccordionItem>
);

const StyledAccordionPanel = ({ children }) => (
    <AccordionPanel className="p-4 text-sm sm:h-3/4">{children}</AccordionPanel>
);
