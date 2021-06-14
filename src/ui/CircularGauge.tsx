export function CircularGauge({
    radius = 60,
    strokeWidth = 10,
    strokeColor,
    ratio,
    text,
    tooltip = null,
    className = '',
}) {
    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - ratio * circumference;

    return (
        <div className={`${className} relative left-0`} title={`${tooltip}`}>
            {/* <div className="absolute top-0 left-0">{text}</div> */}
            <svg className="" height={radius * 2} width={radius * 2}>
                <circle
                    stroke="#ccc"
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
