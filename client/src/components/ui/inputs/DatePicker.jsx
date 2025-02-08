export default function DatePicker({ text, name, style, defaultValue, ...props }) {
    const currentDate = new Date().toISOString().split('T')[0];

    if(defaultValue) {
        defaultValue = defaultValue.split('T')[0];
    }

    return (
        <div className="flex flex-col" style={style}>
            <label htmlFor={name} className="font-semibold">{text}</label>
            <input
                type="date"
                className="border-gray-600 border-2 p-1 rounded"
                name={name}
                min={currentDate}
                defaultValue={defaultValue? defaultValue : currentDate}
                {...props}
            />
        </div>
    );
}