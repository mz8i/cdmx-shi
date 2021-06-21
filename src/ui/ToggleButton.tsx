import cn from 'classnames';

export function ToggleButton({
    value,
    toggleValue,
    onChange,
    className = '',
    selectedClassName,
    hoverClassName,
    onMouseOver = null,
    onMouseOut = null,
    title = undefined,
    children,
}) {
    const isSelected = value === toggleValue;
    return (
        <button
            disabled={isSelected}
            className={cn(
                {
                    [`border-2 relative z-30 ${selectedClassName}`]: isSelected,
                },
                `p-2 rounded-lg bg-white text-gray-900 focus:outline-none outline-none border-2 ${hoverClassName} relative hover:z-50 w-full ${className}`,
            )}
            onClick={e => {
                e.preventDefault();
                onChange(value);
            }}
            onMouseOver={() => onMouseOver?.()}
            onMouseOut={() => onMouseOut?.()}
            title={title}
        >
            {children}
        </button>
    );
}
