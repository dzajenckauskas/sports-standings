import React from "react";


type Props = {
    onSelect: (emoji: string) => void;
    emojiOptions?: string[];
    title?: string;
};

export const EmojiPickerMini: React.FC<Props> = ({ onSelect, emojiOptions, title }) => {
    const [open, setOpen] = React.useState(false);
    const wrapRef = React.useRef<HTMLDivElement | null>(null);

    const pick = (e: string) => {
        onSelect(e);
        setOpen(false);
    };

    // Close on click-away and Escape
    React.useEffect(() => {
        if (!open) return;
        const onPointerDown = (e: PointerEvent) => {
            const root = wrapRef.current;
            if (!root) return;
            if (!root.contains(e.target as Node)) setOpen(false);
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("pointerdown", onPointerDown, { capture: true });
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("pointerdown", onPointerDown, { capture: true } as any);
            document.removeEventListener("keydown", onKey);
        };
    }, [open]);

    return (
        <div className="emoji-wrap" ref={wrapRef}>
            <button
                type="button"
                className="emoji-btn"
                onClick={() => setOpen(o => !o)}
                aria-expanded={open}
                aria-haspopup="dialog"
            >
                😊
            </button>

            {open && (
                <div className="emoji-pop">
                    <div className="emoji-section-title">{title}</div>
                    <div className="emoji-grid">
                        {emojiOptions?.map(e => (
                            <button key={e} type="button" className="emoji-item" onClick={() => pick(e)}>{e}</button>
                        ))}
                    </div>
                </div>
            )}

            <style>{`
        .emoji-wrap { position: relative; display: inline-block; }
        .emoji-btn {
          border: 1px solid #d1d5db; background: #fff; border-radius: 6px;
          height: 32px; width: 36px; display: inline-flex; align-items: center; justify-content: center;
          cursor: pointer; transition: box-shadow .2s, border-color .2s;
        }
        .emoji-btn:hover { border-color: #2563eb;  background-color: 'transpatent';}
        .emoji-btn:focus { outline: none; box-shadow: 0 0 0 3px rgba(37,99,235,.3); }

        .emoji-pop {
          position: absolute; top: 40px; right: 0; z-index: 20;
          width: 240px; max-height: 260px; overflow: auto;
          background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px;
          box-shadow: 0 10px 20px rgba(16,24,40,.12);
        }
        .emoji-section-title { font-size: 12px; color: #6b7280; margin: 6px 4px; }
        .emoji-divider { height: 1px; background: #e5e7eb; margin: 6px 0; }
        .emoji-grid {
          display: grid; grid-template-columns: repeat(8, 1fr); gap: 4px;
        }
        .emoji-item {
          height: 28px; border: none; background: transparent; cursor: pointer; border-radius: 6px;
          font-size: 18px; line-height: 1; display: inline-flex; align-items: center; justify-content: center;
          transition: background .15s ease;
        }
        .emoji-item:hover { background: #f3f4f6; }
      `}</style>
        </div>
    );
};
