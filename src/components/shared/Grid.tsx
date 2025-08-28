import React from "react";

interface GridProps {
    children: React.ReactNode;
    cols?: number;    // default cols (mobile)
    sm?: number;  // ≥ 600px
    md?: number;  // ≥ 900px
    lg?: number;  // ≥ 1200px
    xl?: number;  // ≥ 1536px
    gap?: number;     // spacing in px
    style?: React.CSSProperties;
    className?: string;
}

export const Grid: React.FC<GridProps> = ({
    children,
    cols = 1,
    sm,
    md,
    lg,
    xl,
    gap = 16,
    style,
    className,
}) => {
    return (
        <>
            <div
                className={`grid ${className ?? ""}`}
                style={{
                    gap,
                    ...style,
                }}
            >
                {children}
            </div>

            <style>{`
        .grid {
          display: grid;
          grid-template-columns: repeat(${cols}, 1fr);
        }

        @media (min-width: 600px) {
          .grid { grid-template-columns: repeat(${sm || cols}, 1fr); }
        }
        @media (min-width: 900px) {
          .grid { grid-template-columns: repeat(${md || sm || cols}, 1fr); }
        }
        @media (min-width: 1200px) {
          .grid { grid-template-columns: repeat(${lg || md || sm || cols}, 1fr); }
        }
        @media (min-width: 1536px) {
          .grid { grid-template-columns: repeat(${xl || lg || md || sm || cols}, 1fr); }
        }
      `}</style>
        </>
    );
};