import React from "react";

type Variant = "primary" | "secondary" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  active?: boolean;
  variant?: Variant;
  size?: Size;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  active = false,
  variant = "primary",
  size = "md",
  startIcon,
  endIcon,
  ...rest
}) => {
  const sizes: Record<Size, string> = {
    sm: "btn-sm",
    md: "btn-md",
    lg: "btn-lg",
  };

  return (
    <>
      <button
        disabled={loading || rest.disabled}
        {...rest}
        className={`btn ${sizes[size]} btn-${variant} ${active ? "btn-active" : ""}`}
      >
        {loading ? (
          <span className="btn-spinner" />
        ) : (
          <>
            {startIcon && <span className="btn-icon">{startIcon}</span>}
            {children}
            {endIcon && <span className="btn-icon">{endIcon}</span>}
          </>
        )}
      </button>
      <style>{`
  .btn {
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: background 0.2s ease, opacity 0.2s ease, transform 0.1s ease;
  }

  .btn-sm { height: 34px; font-size: 13px; padding: 0 8px; }
  .btn-md { height: 40px; font-size: 14px; padding: 0 12px; }
  .btn-lg { height: 48px; font-size: 15px; padding: 0 26px; }

  /* Variants */
  .btn-primary { background: #2563eb; color: #fff; }
  .btn-secondary { background: #6b7280; color: #fff; }
  .btn-danger { background: #dc2626; color: #fff; }

  /* Hover */
  .btn-primary:hover:not(:disabled):not(.btn-active) { background: #1d4ed8; }
  .btn-secondary:hover:not(:disabled):not(.btn-active) { background: #4b5563; }
  .btn-danger:hover:not(:disabled):not(.btn-active) { background: #b91c1c; }

  /* Active (pressed OR marked active) */
  .btn:active:not(:disabled) {
    transform: scale(0.97);
  }
  .btn-primary.btn-active { background: #1e40af; }   /* darker blue */
  .btn-secondary.btn-active { background: #374151; } /* darker gray */
  .btn-danger.btn-active { background: #991b1b; }    /* darker red */

  /* Disabled */
  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Spinner for loading state */
  .btn-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.6);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .btn-icon {
    display: inline-flex;
    align-items: center;
  }
`}</style>
    </>
  );
};