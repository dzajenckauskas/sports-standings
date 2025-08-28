import React from "react";
import { FieldSize, Variant, heights } from "../../utils/CommonTypes";


interface SelectProps
    extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
    label?: string;
    error?: string;
    variant?: Variant;
    fieldSize?: FieldSize;
    placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    (
        {
            label,
            error,
            variant = "light",
            fieldSize = "md",
            placeholder,
            style,
            children,
            ...rest
        },
        ref
    ) => {

        const baseStyles: React.CSSProperties =
            variant === "dark"
                ? { background: "#1a2d23", border: "1px solid rgba(255,255,255,0.2)", color: "#fff" }
                : { background: "#fff", border: "1px solid #d1d5db", color: "#111" };

        return (
            <div style={{ width: "100%" }}>
                {label && (
                    <label
                        style={{
                            display: "block",
                            marginBottom: 4,
                            fontSize: 13,
                            fontWeight: 600,
                        }}
                    >
                        {label}
                    </label>
                )}

                <div style={{ position: "relative", width: "100%" }}>
                    <select
                        ref={ref}
                        {...rest}
                        style={{
                            width: "100%",
                            boxSizing: "border-box",
                            height: heights[fieldSize],
                            borderRadius: 8,
                            padding: "0 32px 0 10px", // space for arrow
                            outline: "none",
                            display: "block",
                            cursor: 'pointer',
                            appearance: "none", // remove native arrow
                            ...baseStyles,
                            ...style,
                        }}
                    >
                        {placeholder && (
                            <option value="" disabled>
                                {placeholder}
                            </option>
                        )}
                        {children}
                    </select>

                    {/* custom arrow */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        style={{
                            position: "absolute",
                            right: 10,
                            top: "50%",
                            transform: "translateY(-50%)",
                            pointerEvents: "none",
                            color: variant === "dark" ? "#ddd" : "#555",
                        }}
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.188l3.71-3.957a.75.75 0 111.08 1.04l-4.25 4.53a.75.75 0 01-1.08 0l-4.25-4.53a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>

                {error && (
                    <div style={{ marginTop: 4, color: "#dc2626", fontSize: 12 }}>
                        {error}
                    </div>
                )}
            </div>
        );
    }
);