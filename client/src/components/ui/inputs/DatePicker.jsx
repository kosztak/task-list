export default function DatePicker({ name, ...props }) {
    const currentDate = new Date().toISOString().split('T')[0];    

    return (
        <input
            type="date"
            className="border-gray-600 border-2 p-1 rounded"
            name={name}
            min={currentDate}
            defaultValue={currentDate}
            {...props}
        />
    );
}