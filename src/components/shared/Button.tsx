import React from "react";

type Variant = "primary" | "secondary" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    loading?: boolean;
    active?: boolean;
    variant?: Variant;
    size?: Size;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    loading = false,
    active = false,
    variant = "primary",
    size = "md",
    ...rest
}) => {
    const sizes: Record<Size, React.CSSProperties> = {
        sm: { height: 34, fontSize: 13, padding: "0 10px" },
        md: { height: 40, fontSize: 14, padding: "0 14px" },
        lg: { height: 48, fontSize: 15, padding: "0 18px" },
    };
    const variants: Record<Variant, React.CSSProperties> = {
        primary: { background: "#2563eb", color: "#fff" },   // blue
        secondary: { background: "#6b7280", color: "#fff" }, // gray
        danger: { background: "#dc2626", color: "#fff" },    // red
    };

    return (
        <button
            disabled={loading}
            {...rest}
            style={{
                border: "none",
                borderRadius: 6,
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: active ? 0.6 : 1,
                transition: "background 0.2s, opacity 0.2s",
                ...sizes[size],
                ...variants[variant],
            }}
        >
            {loading ? "..." : children}
        </button>
    );
};