export function TimeSelection({
    value,
    onChange
}) {
    return (
        <div>
            <div>
                <button onClick={e => onChange('c')}>2020</button>
                <button onClick={e => onChange('f')}>2050</button>
            </div>
            <div style={{textAlign: 'center'}}>
                Selected: {value === 'c' ? 2020 : 2050}
            </div>
        </div>

    );
}