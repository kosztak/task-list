export default function RadioButton({
  text,
  name,
  value,
  defaultChecked,
  onChange,
}) {
  return (
    <div>
      <input
        type="radio"
        id={text}
        name={name}
        value={value}
        onChange={onChange}
        defaultChecked={defaultChecked}
      />
      <label htmlFor="text">{text}</label>
    </div>
  );
}
