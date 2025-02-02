export default function TextArea({ placeholder, ...rest }) {
    return (
        <textarea
            className="border-gray-600 border-2 p-1 rounded"
            placeholder={placeholder}
            {...rest}
        />
    );
}