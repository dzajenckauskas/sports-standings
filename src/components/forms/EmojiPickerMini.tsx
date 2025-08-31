import React from "react";
import { createPortal } from "react-dom";
import { Input } from "../shared/Input";
import { EmojiType } from "../../types/EmojiType";
import { TType } from "../../types/TType";

type Props = {
    onSelect: (emoji: string) => void;
    emojiOptions?: EmojiType[];
    title?: string;
    t: TType;
};

type Position = {
    top: number;
    left: number;
    width: number; // popover width
    maxHeight: number;
    placement: "bottom" | "top";
};

export const EmojiPickerMini: React.FC<Props> = ({
    onSelect,
    emojiOptions = [],
    title,
    t,
}) => {
    const [open, setOpen] = React.useState(false);
    const [position, setPosition] = React.useState<Position | null>(null);
    const [query, setQuery] = React.useState("");

    // keyboard nav state
    const [focusedIndex, setFocusedIndex] = React.useState<number>(-1);
    const [cols, setCols] = React.useState<number>(7);

    const wrapRef = React.useRef<HTMLDivElement | null>(null);
    const btnRef = React.useRef<HTMLButtonElement | null>(null);
    const searchRef = React.useRef<HTMLInputElement | null>(null);
    const gridRef = React.useRef<HTMLDivElement | null>(null);
    const btnRefs = React.useRef<Array<HTMLButtonElement | null>>([]);

    const pick = (e: string) => {
        onSelect(e);
        setOpen(false);
        setQuery("");
        setFocusedIndex(-1);
    };

    // Compute/refresh popover position
    const layout = React.useCallback(() => {
        const btn = btnRef.current;
        if (!btn) return;

        const rect = btn.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        const gutter = 8;
        const desiredWidth = 280;
        const width = Math.min(desiredWidth, vw - gutter * 2);

        const spaceBelow = vh - rect.bottom - gutter;
        const spaceAbove = rect.top - gutter;
        const needsFlip = spaceBelow < 180 && spaceAbove > spaceBelow;

        const top = needsFlip
            ? Math.max(gutter, rect.top - Math.min(320, spaceAbove) - 10)
            : Math.min(vh - gutter - 120, rect.bottom + 6);

        let left = rect.right - width;
        left = Math.max(gutter, Math.min(left, vw - gutter - width));

        const available = needsFlip ? spaceAbove - 10 : spaceBelow - 10;
        const maxHeight = Math.max(160, Math.min(320, available));

        setPosition({
            top,
            left,
            width,
            maxHeight,
            placement: needsFlip ? "top" : "bottom",
        });
    }, []);

    // Detect current number of columns from the grid's computed style
    const measureCols = React.useCallback(() => {
        const grid = gridRef.current;
        if (!grid) return;
        const style = window.getComputedStyle(grid);
        const template = style.getPropertyValue("grid-template-columns");
        // count columns by counting commas/spaces segments
        // template like: "32px 32px 32px 32px 32px 32px 32px" (7 cols)
        const count = template.trim().split(/\s+/).filter(Boolean).length;
        if (count > 0) setCols(count);
    }, []);

    // Close on click-away & Escape; reflow listeners; set initial focus in search
    React.useEffect(() => {
        if (!open) return;

        const onPointerDown = (e: PointerEvent) => {
            const root = wrapRef.current;
            if (!root) return;
            const target = e.target as Node;
            const pop = document.getElementById("emoji-popover");
            if (root.contains(target)) return;
            if (pop && pop.contains(target)) return;
            setOpen(false);
            setQuery("");
            setFocusedIndex(-1);
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpen(false);
                setQuery("");
                setFocusedIndex(-1);
            }
        };
        const onReflow = () => {
            layout();
            // re-measure columns after layout/resize/scroll
            requestAnimationFrame(measureCols);
        };

        document.addEventListener("pointerdown", onPointerDown, { capture: true });
        document.addEventListener("keydown", onKey);
        window.addEventListener("resize", onReflow);
        window.addEventListener("scroll", onReflow, true);

        layout();
        // focus the search field on open
        searchRef.current?.focus();
        // measure columns once opened
        requestAnimationFrame(measureCols);

        return () => {
            document.removeEventListener(
                "pointerdown",
                onPointerDown,
                { capture: true }
            );
            document.removeEventListener("keydown", onKey);
            window.removeEventListener("resize", onReflow);
            window.removeEventListener("scroll", onReflow, true);
        };
    }, [open, layout, measureCols]);

    // Derived list
    const filtered = React.useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return emojiOptions;
        return emojiOptions.filter((e) =>
            e.name?.toLowerCase().includes(q));
    }, [emojiOptions, query]);

    // Keep refs array length in sync
    React.useEffect(() => {
        btnRefs.current = btnRefs.current.slice(0, filtered.length);
        // reset focus index when filter changes
        if (focusedIndex >= filtered.length) {
            setFocusedIndex(-1);
        }
    }, [filtered.length, focusedIndex]);

    // Focus helper
    const focusAt = (idx: number) => {
        if (idx < 0 || idx >= filtered.length) return;
        setFocusedIndex(idx);
        requestAnimationFrame(() => btnRefs.current[idx]?.focus());
    };

    // Keyboard: from search field – Down jumps into the grid
    const onSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            if (filtered.length > 0) focusAt(0);
        }
    };

    // Keyboard: inside the grid – arrows move around
    const onGridKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (filtered.length === 0) return;

        let next = focusedIndex;
        if (e.key === "ArrowRight") {
            e.preventDefault();
            next = Math.min(filtered.length - 1, (focusedIndex < 0 ? 0 : focusedIndex) + 1);
            focusAt(next);
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            next = Math.max(0, (focusedIndex < 0 ? 0 : focusedIndex) - 1);
            focusAt(next);
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            next = (focusedIndex < 0 ? 0 : focusedIndex) + cols;
            if (next >= filtered.length) next = filtered.length - 1;
            focusAt(next);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            next = (focusedIndex < 0 ? 0 : focusedIndex) - cols;
            if (next < 0) {
                // jump back to search input if we go above the first row
                searchRef.current?.focus();
                setFocusedIndex(-1);
                return;
            }
            focusAt(next);
        } else if (e.key === "Home") {
            e.preventDefault();
            focusAt(0);
        } else if (e.key === "End") {
            e.preventDefault();
            focusAt(filtered.length - 1);
        } else if (e.key === "Enter" || e.key === " ") {
            if (focusedIndex >= 0) {
                e.preventDefault();
                pick(filtered[focusedIndex].emoji);
            }
        }
    };


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

            {open &&
                position &&
                createPortal(
                    <div
                        id="emoji-popover"
                        className="emoji-pop"
                        role="dialog"
                        aria-label={title || "Emoji picker"}
                        style={{
                            position: "fixed",
                            top: position.top,
                            left: position.left,
                            width: position.width,
                            maxHeight: position.maxHeight,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {title && <div className="emoji-section-title">{title}</div>}

                        {/* Search field */}
                        <div className="emoji-search">
                            <Input
                                ref={searchRef}
                                style={{ width: "100%" }}
                                type="text"
                                placeholder={`${t("actions.search")}`}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={onSearchKeyDown}
                                autoFocus
                            />
                        </div>

                        <div
                            ref={gridRef}
                            className={filtered.length === 0 ? "" : "emoji-grid"}
                            style={{ maxHeight: position.maxHeight, flex: 1 }}
                            onKeyDown={onGridKeyDown}
                            role="listbox"
                            aria-label="Emoji list"
                        >
                            {filtered?.map((e, idx) => (
                                <button
                                    key={e.name}
                                    type="button"
                                    className="emoji-item"
                                    ref={(el) => {
                                        btnRefs.current[idx] = el;
                                    }}
                                    tabIndex={idx === focusedIndex ? 0 : -1}
                                    onClick={() => pick(e.emoji)}
                                    onMouseEnter={() => setFocusedIndex(idx)}
                                >
                                    {e.emoji}
                                </button>
                            ))}
                            {filtered.length === 0 && (
                                <p className="emoji-empty">{t('messages.noResults')}</p>
                            )}
                        </div>

                        <style>{`
              .emoji-search { margin: 6px 8px 4px; }
              .emoji-empty { text-align: left; color: #6b7280; font-size: 13px; padding: 10px; width: 100%; }

              .emoji-wrap { position: relative; display: inline-block; }
              .emoji-btn {
                border: 1px solid #d1d5db; background: #fff; border-radius: 6px;
                height: 32px; width: 36px; display: inline-flex; align-items: center; justify-content: center;
                cursor: pointer; transition: box-shadow .2s, border-color .2s, background-color .2s;
              }
              .emoji-btn:hover { border-color: #2563eb; background-color: #f9fafb; }
              .emoji-btn:focus { outline: none; box-shadow: 0 0 0 3px rgba(37,99,235,.3); }

              .emoji-pop {
                z-index: 1000; background: #fff; border: 1px solid #e5e7eb; border-radius: 10px;
                padding: 8px; box-shadow: 0 12px 28px rgba(16,24,40,.16); overflow: hidden;
              }

              .emoji-section-title {
                font-size: 12px; color: #6b7280; margin: 6px 4px 8px; position: sticky; top: 0; background: #fff;
              }

              .emoji-grid {
                overflow: auto; padding: 4px; display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px;
              }
              @media (max-width: 480px) { .emoji-grid { grid-template-columns: repeat(6, 1fr); } }
              @media (max-width: 360px) { .emoji-grid { grid-template-columns: repeat(5, 1fr); } }

              .emoji-item {
                height: 32px; width: 32px; border: none; background: transparent; cursor: pointer;
                border-radius: 8px; font-size: 20px; line-height: 1;
                display: inline-flex; align-items: center; justify-content: center;
                transition: background .12s ease, transform .06s ease;
              }
              .emoji-item:hover, .emoji-item[aria-selected="true"] { background: #f3f4f6; }
              .emoji-item:active { transform: scale(0.96); }
            `}</style>
                    </div>,
                    document.body
                )}
        </div>
    );
};