export default function Button({ onClick, children, ...props }) {
    return(
        <button className="bg-dark hover:bg-gray-800 text-white hover:text-yellow rounded p-2" onClick={onClick} {...props}>
            { children }
        </button>
    )
}