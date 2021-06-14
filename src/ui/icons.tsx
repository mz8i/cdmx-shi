import { ReactComponent as ArumIcon } from '../assets/icon_benefits_arum.svg';
import { ReactComponent as CattailIcon } from '../assets/icon_benefits_cattail.svg';
import { ReactComponent as FilteredRainIcon } from '../assets/icon_benefits_filteredrain.svg';
import { ReactComponent as FilteredWaterIcon } from '../assets/icon_benefits_filteredwater.svg';
import { ReactComponent as HomesIcon } from '../assets/icon_benefits_homes.svg';
import { ReactComponent as MaintenanceIcon } from '../assets/icon_benefits_maintenance.svg';
import { ReactComponent as ManufactureIcon } from '../assets/icon_benefits_manufacture.svg';
import { ReactComponent as PopulationIcon } from '../assets/icon_benefits_population.svg';
import { ReactComponent as W1Icon } from '../assets/icon_w1.svg';
import { ReactComponent as W2Icon } from '../assets/icon_w2.svg';
import { ReactComponent as W3Icon } from '../assets/icon_w3.svg';

export { W1Icon, W2Icon, W3Icon };

const benefitIcons = {
    arum_lillies_yearly: ArumIcon,
    cattail_plants_yearly: CattailIcon,
    homes_impacted: HomesIcon,
    maintenance_jobs: MaintenanceIcon,
    manufacture_jobs: ManufactureIcon,
    population_impacted: PopulationIcon,
    rain_filtered_yearly: FilteredRainIcon,
    water_filtered_yearly: FilteredWaterIcon,
};

export function BenefitIcon({ icon, ...otherProps }) {
    const Icon = benefitIcons[icon];

    return Icon && <Icon {...otherProps} />;
}
