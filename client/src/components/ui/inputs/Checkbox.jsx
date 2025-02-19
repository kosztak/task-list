export default function Checkbox({ text, name, value, defaultChecked, checked }) {    
    return(
        <div>
            <input type="checkbox" id={text} name={name} value={value} defaultChecked={defaultChecked} checked={checked} />
            <label htmlFor="text">{text}</label>
        </div>
    );
}