import { useState } from "react";

export default function Select({ name, children }) {
    const [value, setValue] = useState('day');

    function handleChange(event) {
        setValue(event.target.value);
    }

    return(
        <select name={name} value={value} onChange={handleChange} className="bg-white border-gray-600 border-2 p-1 rounded">
            {children}
        </select>
    );
}