import cn from 'classnames';

export function ToggleButton({ value, toggleValue, onChange, selectedColor, children }) {
    const isSelected = value === toggleValue;
    return (
        <button
            disabled={isSelected}
            className={cn(
                {
                    [`border-2 ${selectedColor}`]: isSelected,
                },
                `p-3 rounded bg-white text-gray-900 focus:outline-none outline-none border-2 hover:${selectedColor} w-full`
            )}
            onClick={e => {
                e.preventDefault();
                onChange(value);
            }}
        >
            {children}
        </button>
    );
}
