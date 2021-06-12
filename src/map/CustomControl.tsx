const POSITION_CLASSES = {
    bottomleft: 'leaflet-bottom leaflet-left',
    bottomright: 'leaflet-bottom leaflet-right',
    topleft: 'leaflet-top leaflet-left',
    topright: 'leaflet-top leaflet-right',
};

export function CustomControl({ position, children }) {
    const positionClass = (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;

    return (
        <div className={positionClass}>
            <div className="leaflet-control leaflet-bar">{children}</div>
        </div>
    );
}
