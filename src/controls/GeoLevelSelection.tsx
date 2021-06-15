import { useRecoilState } from 'recoil';

import { geoLevelState } from '../recoil/data-selection-state';
import { ToggleButton } from '../ui/ToggleButton';

export function GeoLevelSelection() {
    const [geoLevel, setGeoLevel] = useRecoilState(geoLevelState);

    return (
        <div className="my-1 flex flex-row">
            <ToggleButton
                value="colonias"
                toggleValue={geoLevel}
                onChange={setGeoLevel}
                selectedClassName="border-blue-900"
                hoverClassName="hover:border-blue-900"
            >
                Colonias
            </ToggleButton>
            <ToggleButton
                value="alcaldias"
                toggleValue={geoLevel}
                onChange={setGeoLevel}
                selectedClassName="border-blue-900"
                hoverClassName="hover:border-blue-900"
            >
                Alcaldías
            </ToggleButton>
        </div>
    );
}
