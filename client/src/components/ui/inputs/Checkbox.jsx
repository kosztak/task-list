export default function Checkbox({ text, name, value, defaultChecked }) {
    return(
        <div>
            <input type="checkbox" id={text} name={name} value={value} defaultChecked={defaultChecked} />
            <label htmlFor="text">{text}</label>
        </div>
    );
}