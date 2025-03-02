export default function Input({ text, name, type, value, onChange, required, style, ...props }) {
    return(
        <div className="flex flex-col grow" style={style}>
            <label htmlFor={name} className="font-semibold">{text}</label>
            <input
                className="border-gray-600 border-2 p-1 rounded"
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                {...props} />
        </div>
    )
}