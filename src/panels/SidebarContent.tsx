import { BudgetSelection } from '../controls/BudgetSelection';
import { ScenarioSelection } from '../controls/ScenarioSelection';
import { IndexDiagramShape } from '../ui/icons';

function IndexDiagram({ mainName, dependencies, color }) {
    return (
        <figure className="flex flex-row nowrap items-center h-16 my-1 w-54 ">
            <div className={`flex-0 ${color} font-extrabold text-sm`}>{mainName}</div>
            <IndexDiagramShape className="max-h-full -m-4" />
            <div className="flex flex-col nowrap gap-1">
                <div className={`flex-0 ${color} text-xs font-light whitespace-nowrap`}>
                    {dependencies[0]}
                </div>
                <div className={`flex-0 ${color} text-xs font-light whitespace-nowrap`}>
                    {dependencies[1]}
                </div>
                <div className={`flex-0 ${color} text-xs font-light whitespace-nowrap`}>
                    {dependencies[2]}
                </div>
                <div className={`flex-0 ${color} text-xs font-light whitespace-nowrap`}>
                    {dependencies[3]}
                </div>
            </div>
        </figure>
    );
}

export function SidebarContent() {
    return (
        <>
            <h1 className="text-3xl uppercase font-extrabold my-4 text-blue-900">
                Socio-Hydrological Vulnerability Index (SHI)
            </h1>
            <p className="my-4">
                Indicator based method of evaluating the vulnerability of the socio-hydrological
                system, based on a{' '}
                <strong className="font-extrabold text-wsi-800">Water Stress Index (WSI)</strong>,
                or ability to meet human and ecological demands for fresh water and an{' '}
                <strong className="font-extrabold text-aci-800">
                    Adaptive Capacity Index (ACI)
                </strong>
                , or ability of environmental and social systems to adjust and respond to potential
                pressures.
            </p>
            <div className="flex flex-row justify-around flex-wrap gap-x-0 gap-y-4">
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
            </div>
            <section className="my-4 mt-10">
                <h2 className="text-xl uppercase my-4 text-blue-900">
                    <span className="font-bold">01|</span> Scenarios
                </h2>
                <p className="my-4">
                    Choose scenario based on the weights of the indicators within the{' '}
                    <strong className="font-extrabold text-wsi-800">Water Stress</strong> and the{' '}
                    <strong className="font-extrabold text-aci-800">Adaptive Capacity</strong>.
                </p>
                <ScenarioSelection />
            </section>
            <section className="my-4 mt-10">
                <h2 className="text-xl uppercase my-4 text-blue-900">
                    <span className="font-bold">02|</span> Decentralised Solutions
                </h2>
                <p className="my-4">
                    Choose amount of{' '}
                    <strong className="font-bold">Constructed Wetlands (CW)</strong> based on
                    budget.
                </p>
                <BudgetSelection />
            </section>
        </>
    );
}
