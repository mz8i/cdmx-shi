import { useRecoilState } from 'recoil';

import { geoLevelState } from '../recoil/data-selection';
import { ToggleButton } from '../ui/ToggleButton';

export function GeoLevelSelection() {
    const [geoLevel, setGeoLevel] = useRecoilState(geoLevelState);

    return (
        <div className="border-none rounded-none my-1 mx-1">
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
                Alcaldias
            </ToggleButton>
        </div>
    );
}
