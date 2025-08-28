import React from "react";
import ErrorMessage from "./ErrorMessage";
import { FieldSize, Variant, heights } from "../../utils/CommonTypes";

interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    error?: string;
    label?: string;
    variant?: Variant;
    fieldSize?: FieldSize;
    placeHolder?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ error, label, variant = "light", fieldSize = "md", placeHolder, ...rest }, ref) => {

        const baseStyles: React.CSSProperties =
            variant === "dark"
                ? {
                    background: "#1a2d23",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#fff",
                }
                : {
                    background: "#fff",
                    border: "1px solid #d1d5db",
                    color: "#111",
                };

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

                <input
                    ref={ref}
                    placeholder={placeHolder}
                    {...rest}
                    style={{
                        width: "100%",
                        boxSizing: 'border-box',
                        height: heights[fieldSize],
                        borderRadius: 8,
                        padding: "0 10px",
                        outline: "none",
                        ...baseStyles,
                    }}
                />

                {error && (
                    <div style={{ marginTop: 4 }}>
                        <ErrorMessage error={error} />
                    </div>
                )}
            </div>
        );
    }
);