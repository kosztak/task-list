export default function Option({ value, children, ...props }) {
  return (
    <option
      value={value}
      className="bg-yellow text-dark hover:bg-orange hover:text-white"
      {...props}
    >
      {children}
    </option>
  );
}
