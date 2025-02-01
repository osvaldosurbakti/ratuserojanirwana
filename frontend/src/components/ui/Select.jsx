export function Select({ children, value, onChange, className = "" }) {
    return (
      <select value={value} onChange={onChange} className={`border px-3 py-2 rounded ${className}`}>
        {children}
      </select>
    );
  }
  export function SelectItem({ value, children }) {
    return <option value={value}>{children}</option>;
  }  