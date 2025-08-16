import { useState } from "react";

export default function Select({
  text,
  name,
  children,
  style,
  defaultValue,
  ...props
}) {
  const [value, setValue] = useState(defaultValue ? defaultValue : "day");

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <div className="flex flex-col" style={style}>
      <label htmlFor={name} className="font-semibold">
        {text}
      </label>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="bg-white border-dark border-2 p-1 rounded"
        {...props}
      >
        {children}
      </select>
    </div>
  );
}
