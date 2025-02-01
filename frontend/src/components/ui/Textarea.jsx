export function Textarea({ placeholder, value, onChange, className = "" }) {
    return (
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border px-3 py-2 rounded ${className}`}
      />
    );
  }
  