// components/ui/input.tsx
export function Input({ type = "text", placeholder, value, onChange, className = "" }) {
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border px-3 py-2 rounded ${className}`}
      />
    );
  }