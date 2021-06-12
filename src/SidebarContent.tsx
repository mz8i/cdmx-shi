import { BudgetSelection } from './controls/BudgetSelection';
import { ScenarioSelection } from './controls/ScenarioSelection';

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
            <div>
                <figure>WSI diagram</figure>
                <figure>ACI diagram</figure>
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
