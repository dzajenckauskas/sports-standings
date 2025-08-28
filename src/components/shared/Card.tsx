import React from "react";

type Props = {
    children: React.ReactNode;
    title: string;
    primaryColor?: string;
    icon?: React.ReactNode;
    actions?: React.ReactNode;         // right-side header actions
    stickyHeader?: boolean;            // keep header fixed when body scrolls
    scrollBody?: boolean;              // scroll only body content
    maxBodyHeight?: number | string;   // used when scrollBody is true (e.g., "60vh" or 320)
    footer?: React.ReactNode;          // optional footer area
    className?: string;
    style?: React.CSSProperties;
};

const Card: React.FC<Props> = ({
    children,
    title,
    icon,
    actions,
    primaryColor = "#2563eb", // default accent (blue)
    stickyHeader = false,
    scrollBody = false,
    maxBodyHeight = "60vh",
    footer,
    className,
    style,
}) => {
    return (
        <div
            className={`card ${className ?? ""}`}
            style={
                {
                    "--card-accent": primaryColor,
                    ...style,
                } as React.CSSProperties
            }
        >
            <header className={`card-header ${stickyHeader ? "card-header--sticky" : ""}`}>
                <div className="card-header-left">
                    {icon && <span className="card-icon">{icon}</span>}
                    <h2 className="card-title" title={title}>
                        {title}
                    </h2>
                </div>
                {actions && <div className="card-actions">{actions}</div>}
            </header>

            <div
                className="card-body"
                style={
                    scrollBody
                        ? {
                            maxHeight: typeof maxBodyHeight === "number" ? `${maxBodyHeight}px` : maxBodyHeight,
                            overflowY: "auto",
                            paddingRight: 6, // avoid scrollbar overlap
                        }
                        : undefined
                }
            >
                {children}
            </div>

            {footer && <div className="card-footer">{footer}</div>}

            <style>{`
        .card {
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 10px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 6px 18px rgba(16, 24, 40, 0.06);
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 10px 12px;
          color: #fff;
          /* gradient using accent */
          background: linear-gradient(
            90deg,
            var(--card-accent) 0%,
            color-mix(in oklab, var(--card-accent) 85%, black) 100%
          );
        }

        /* Fallback for browsers without color-mix */
        @supports not (background: color-mix(in oklab, red 50%, white)) {
          .card-header {
            background: var(--card-accent);
          }
        }

        .card-header--sticky {
          position: sticky;
          top: 0;
          z-index: 2;
        }

        .card-header-left {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0; /* allow title to truncate */
        }

        .card-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .card-title {
          margin: 0;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .card-body {
          padding: 16px;
        }

        .card-footer {
          padding: 12px 16px;
          border-top: 1px solid #eef2f7;
          background: #fafafa;
        }

        /* Responsive tweaks */
        @media (max-width: 480px) {
          .card-header {
            padding: 8px 10px;
          }
          .card-title {
            font-size: 15px;
          }
          .card-body {
            padding: 12px;
          }
          .card-footer {
            padding: 10px 12px;
          }
        }
      `}</style>
        </div>
    );
};

export default Card;