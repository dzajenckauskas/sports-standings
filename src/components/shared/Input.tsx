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
    (
        { error, label, variant = "light", fieldSize = "md", placeHolder, ...rest },
        ref
    ) => {
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
                    className={`input input-${variant} input-${fieldSize} ${error ? "input-error" : ""
                        }`}
                />

                {error && (
                    <div style={{ marginTop: 4 }}>
                        <ErrorMessage error={error} />
                    </div>
                )}

                <style>{`
          .input {
            width: 100%;
            box-sizing: border-box;
            border-radius: 8px;
            padding: 0 10px;
            outline: none;
            border: 1px solid #d1d5db;
            transition: border 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, transform 0.1s ease;
          }

          /* Sizes */
          .input-sm { height: ${heights.sm}px; font-size: 13px; }
          .input-md { height: ${heights.md}px; font-size: 14px; }
          .input-lg { height: ${heights.lg}px; font-size: 15px; }

          /* Variants */
          .input-light { background: #fff; color: #111; }
          .input-dark { background: #1a2d23; color: #fff; border: 1px solid rgba(255,255,255,0.2); }

          /* Hover */
          .input:hover:not(:disabled):not(.input-error) {
            border-color: #2563eb;
          }

          /* Focus */
          .input:focus:not(.input-error) {
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.3);
          }

          /* Disabled */
          .input:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          /* Active (slight press animation) */
          .input:active:not(:disabled) {
            transform: scale(0.99);
          }

          /* Error state */
          .input-error {
            border-color: #dc2626 !important;
          }
          .input-error:focus {
            box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.3);
          }
        `}</style>
            </div>
        );
    }
);