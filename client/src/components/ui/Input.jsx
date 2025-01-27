export default function Input({ type, value, onChange, required, placeholder, ...props }) {
    return(
        <input className="border-gray-600 border-2 p-1 rounded" type={type} value={value} onChange={onChange} required={required} placeholder={placeholder} {...props} />
    )
}