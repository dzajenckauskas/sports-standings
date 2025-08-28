import React from "react";
import ErrorMessage from "./ErrorMessage";
import { FieldSize, Variant } from "../../utils/CommonTypes";

interface SelectProps
    extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
    label?: string;
    error?: string;
    variant?: Variant;
    fieldSize?: FieldSize;
    placeholder?: string; // renders a disabled first option
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
        const heights: Record<FieldSize, number> = { sm: 32, md: 38, lg: 46 };

        const baseStyles: React.CSSProperties =
            variant === "dark"
                ? { background: "#1a2d23", border: "1px solid rgba(255,255,255,0.2)", color: "#fff" }
                : { background: "#fff", border: "1px solid #d1d5db", color: "#111" };

        return (
            <div style={{ width: "100%" }}>
                {label && (
                    <label style={{ display: "block", marginBottom: 4, fontSize: 13, fontWeight: 600 }}>
                        {label}
                    </label>
                )}

                <select
                    ref={ref}
                    {...rest}
                    style={{
                        width: "100%",
                        boxSizing: "border-box",
                        height: heights[fieldSize],
                        borderRadius: 8,
                        padding: "0 10px",
                        outline: "none",
                        display: "block",
                        appearance: "none",
                        backgroundImage:
                            'linear-gradient(45deg, transparent 50%, rgba(0,0,0,.4) 50%), linear-gradient(135deg, rgba(0,0,0,.4) 50%, transparent 50%)',
                        backgroundPosition: "calc(100% - 18px) 50%, calc(100% - 12px) 50%",
                        backgroundSize: "6px 6px, 6px 6px",
                        backgroundRepeat: "no-repeat",
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
                {error && <ErrorMessage error={error} />}
            </div>
        );
    }
);