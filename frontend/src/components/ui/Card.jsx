// components/ui/card.tsx
export function Card({ children, className = "" }) {
    return <div className={`border rounded-lg shadow p-4 ${className}`}>{children}</div>;
  }
  
  export function CardContent({ children, className = "" }) {
    return <div className={`p-2 ${className}`}>{children}</div>;
  }
  