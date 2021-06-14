export function CircularGauge({
    radius = 60,
    strokeWidth = 10,
    strokeColor,
    ratio,
    className = '',
    tooltip = '',
    children,
}) {
    const normalizedRadius = radius - strokeWidth;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - ratio * circumference;

    return (
        <div className={`${className} relative left-0`} title={`${tooltip}`}>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {children}
            </div>
            <svg className="" height={radius * 2} width={radius * 2}>
                <circle
                    stroke="#e5e5e5"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    stroke={strokeColor}
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{
                        strokeDashoffset,
                        transition: 'stroke-dashoffset .5s linear',
                        transform: 'rotate(-90deg)',
                        transformOrigin: '50% 50%',
                    }}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
            </svg>
        </div>
    );
}
