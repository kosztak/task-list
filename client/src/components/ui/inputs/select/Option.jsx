export default function Option({ value, children, ...props }) {
    return(
        <option 
            value={value}
            className="bg-amber-300 text-gray-900 hover:bg-amber-600 hover:text-white"
            {...props}
        >
            {children}
        </option>
    );
}