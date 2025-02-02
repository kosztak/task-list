export default function Button({ onClick, children, ...props }) {
    return(
        <button className="bg-gray-600 hover:bg-gray-800 text-white hover:text-amber-300 rounded p-2" onClick={onClick} {...props}>
            { children }
        </button>
    )
}