import React from "react";

type Variant = "light" | "dark";
type FieldSize = "sm" | "md" | "lg";

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
        const sizes: Record<FieldSize, string> = {
            sm: "select-sm",
            md: "select-md",
            lg: "select-lg",
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

                <div className="select-wrapper">
                    <select
                        ref={ref}
                        {...rest}
                        className={`select ${sizes[fieldSize]} select-${variant}`}
                        style={style}
                    >
                        {placeholder && (
                            <option value="" disabled>
                                {placeholder}
                            </option>
                        )}
                        {children}
                    </select>

                    {/* custom chevron */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="select-arrow"
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

                <style>{`
          .select-wrapper {
            position: relative;
            width: 100%;
          }

          .select {
            width: 100%;
            border-radius: 8px;
            border: 1px solid #d1d5db;
            outline: none;
            padding: 0 32px 0 10px;
            display: block;
            appearance: none;
            transition: border 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          }

          .select-sm { height: 32px; font-size: 13px; }
          .select-md { height: 38px; font-size: 14px; }
          .select-lg { height: 46px; font-size: 15px; }

          /* Variants */
          .select-light { background: #fff; color: #111; }
          .select-dark { background: #1a2d23; color: #fff; border: 1px solid rgba(255,255,255,0.2); }

          /* Hover */
          .select:hover:not(:disabled) {
            border-color: #2563eb;
          }

          /* Focus */
          .select:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.3);
          }

          /* Disabled */
          .select:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          /* Active (open dropdown on some browsers) */
          .select:active {
            transform: scale(0.99);
          }

          /* Arrow */
          .select-arrow {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            pointer-events: none;
            color: #555;
            transition: transform 0.2s ease;
          }

          /* Animate arrow on focus */
          .select:focus + .select-arrow {
            transform: translateY(-50%) rotate(180deg);
          }
        `}</style>
            </div>
        );
    }
);