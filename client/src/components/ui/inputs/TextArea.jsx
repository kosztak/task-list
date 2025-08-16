export default function TextArea({ text, name, style, ...rest }) {
  return (
    <div className="flex flex-col" style={style}>
      <label htmlFor={name} className="font-semibold">
        {text}
      </label>
      <textarea
        className="border-dark border-2 p-1 rounded grow"
        name={name}
        {...rest}
      />
    </div>
  );
}
