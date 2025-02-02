import { useState } from "react";

export default function Select({ text, name, children, style }) {
    const [value, setValue] = useState('day');

    function handleChange(event) {
        setValue(event.target.value);
    }

    return(
        <div className="flex flex-col" style={style}>
            <label htmlFor={name} className="font-semibold">{text}</label>
            <select name={name} value={value} onChange={handleChange} className="bg-white border-gray-600 border-2 p-1 rounded">
                {children}
            </select>
        </div>
    );
}