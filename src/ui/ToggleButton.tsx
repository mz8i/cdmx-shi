import cn from 'classnames';

export function ToggleButton({
    value,
    toggleValue,
    onChange,
    selectedClassName,
    hoverClassName,
    onMouseOver = null,
    onMouseOut = null,
    children,
}) {
    const isSelected = value === toggleValue;
    return (
        <button
            disabled={isSelected}
            className={cn(
                {
                    [`border-2 ${selectedClassName}`]: isSelected,
                },
                `p-2 rounded bg-white text-gray-900 focus:outline-none outline-none border-2 ${hoverClassName} w-full`,
            )}
            onClick={e => {
                e.preventDefault();
                onChange(value);
            }}
            onMouseOver={() => onMouseOver?.()}
            onMouseOut={() => onMouseOut?.()}
        >
            {children}
        </button>
    );
}
