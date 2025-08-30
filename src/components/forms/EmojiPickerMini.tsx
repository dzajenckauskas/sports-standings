import React from "react";
import { createPortal } from "react-dom";

type Props = {
    onSelect: (emoji: string) => void;
    emojiOptions?: string[];
    title?: string;
};

type Pos = {
    top: number;
    left: number;
    width: number;    // popover width
    maxHeight: number;
    placement: "bottom" | "top";
};

export const EmojiPickerMini: React.FC<Props> = ({ onSelect, emojiOptions, title }) => {
    const [open, setOpen] = React.useState(false);
    const [pos, setPos] = React.useState<Pos | null>(null);

    const wrapRef = React.useRef<HTMLDivElement | null>(null);
    const btnRef = React.useRef<HTMLButtonElement | null>(null);

    const pick = (e: string) => {
        onSelect(e);
        setOpen(false);
    };

    // Compute/refresh popover position
    const layout = React.useCallback(() => {
        const btn = btnRef.current;
        if (!btn) return;

        const rect = btn.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        const gutter = 8;
        const desiredWidth = 280; // base
        const width = Math.min(desiredWidth, vw - gutter * 2);

        // Prefer bottom; flip to top if not enough room
        const spaceBelow = vh - rect.bottom - gutter;
        const spaceAbove = rect.top - gutter;
        const needsFlip = spaceBelow < 180 && spaceAbove > spaceBelow;

        const top = needsFlip
            ? Math.max(gutter, rect.top - Math.min(320, spaceAbove) - 10)
            : Math.min(vh - gutter - 120, rect.bottom + 6);

        // Clamp left so it stays in viewport
        let left = rect.right - width; // right-align to button
        left = Math.max(gutter, Math.min(left, vw - gutter - width));

        const available = needsFlip ? spaceAbove - 10 : spaceBelow - 10;
        const maxHeight = Math.max(160, Math.min(320, available));

        setPos({
            top,
            left,
            width,
            maxHeight,
            placement: needsFlip ? "top" : "bottom",
        });
    }, []);

    // Close on click-away & Escape
    React.useEffect(() => {
        if (!open) return;

        const onPointerDown = (e: PointerEvent) => {
            const root = wrapRef.current;
            if (!root) return;
            const target = e.target as Node;
            // If click is neither on button nor on the portal popover, close
            const pop = document.getElementById("emoji-popover");
            if (root.contains(target)) return;
            if (pop && pop.contains(target)) return;
            setOpen(false);
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        const onReflow = () => layout();

        document.addEventListener("pointerdown", onPointerDown, { capture: true });
        document.addEventListener("keydown", onKey);
        window.addEventListener("resize", onReflow);
        window.addEventListener("scroll", onReflow, true);

        // first layout after open
        layout();

        return () => {
            document.removeEventListener("pointerdown", onPointerDown, { capture: true } as any);
            document.removeEventListener("keydown", onKey);
            window.removeEventListener("resize", onReflow);
            window.removeEventListener("scroll", onReflow, true);
        };
    }, [open, layout]);

    return (
        <div className="emoji-wrap" ref={wrapRef}>
            <button
                ref={btnRef}
                type="button"
                className="emoji-btn"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-haspopup="dialog"
                aria-controls="emoji-popover"
                title="Insert emoji"
            >
                😊
            </button>

            {open && pos &&
                createPortal(
                    <div
                        id="emoji-popover"
                        className="emoji-pop"
                        role="dialog"
                        aria-label={title || "Emoji picker"}
                        style={{
                            position: "fixed",
                            top: pos.top,
                            left: pos.left,
                            width: pos.width,
                            maxHeight: pos.maxHeight,
                        }}
                    >
                        {title && <div className="emoji-section-title">{title}</div>}

                        <div className="emoji-grid" style={{ maxHeight: pos.maxHeight }}>
                            {emojiOptions?.map((e) => (
                                <button
                                    key={e}
                                    type="button"
                                    className="emoji-item"
                                    onClick={() => pick(e)}
                                    aria-label={e}
                                >
                                    {e}
                                </button>
                            ))}
                        </div>

                        {/* subtle scroll shadows */}
                        <div className="emoji-shadow top" aria-hidden />
                        <div className="emoji-shadow bottom" aria-hidden />
                    </div>,
                    document.body
                )}

            <style>{`
        .emoji-wrap { position: relative; display: inline-block; }

        .emoji-btn {
          border: 1px solid #d1d5db;
          background: #fff;
          border-radius: 6px;
          height: 32px; width: 36px;
          display: inline-flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: box-shadow .2s, border-color .2s, background-color .2s;
        }
        .emoji-btn:hover { border-color: #2563eb; background-color: #f9fafb; }
        .emoji-btn:focus { outline: none; box-shadow: 0 0 0 3px rgba(37,99,235,.3); }

        .emoji-pop {
          z-index: 1000;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 8px;
          box-shadow: 0 12px 28px rgba(16,24,40,.16);
          overflow: hidden; /* we'll scroll inside grid */
        }

        .emoji-section-title {
          font-size: 12px; color: #6b7280; margin: 6px 4px 8px;
          position: sticky; top: 0; background: #fff;
        }

        .emoji-grid {
          overflow: auto;
          padding: 4px;
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 6px;
        }
        @media (max-width: 480px) {
          .emoji-grid { grid-template-columns: repeat(6, 1fr); }
        }
        @media (max-width: 360px) {
          .emoji-grid { grid-template-columns: repeat(5, 1fr); }
        }

        .emoji-item {
          height: 32px; width: 32px;
          border: none; background: transparent; cursor: pointer;
          border-radius: 8px;
          font-size: 20px; line-height: 1;
          display: inline-flex; align-items: center; justify-content: center;
          transition: background .12s ease, transform .06s ease;
        }
        .emoji-item:hover { background: #f3f4f6; }
        .emoji-item:active { transform: scale(0.96); }

        /* scroll shadows for better affordance */
        .emoji-shadow {
          position: sticky; left: 0; right: 0; height: 10px; pointer-events: none;
        }
        .emoji-shadow.top { top: 0; background: linear-gradient(#fff, rgba(255,255,255,0)); }
        .emoji-shadow.bottom { bottom: 0; background: linear-gradient(rgba(255,255,255,0), #fff); }
      `}</style>
        </div>
    );
};