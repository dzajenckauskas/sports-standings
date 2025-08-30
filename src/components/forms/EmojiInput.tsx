// components/shared/EmojiInput.tsx
import React, { useImperativeHandle, useRef } from "react";
import { Input } from "../shared/Input";
import { EmojiPickerMini } from "./EmojiPickerMini";

export type EmojiInputProps = React.ComponentProps<typeof Input> & {
    /** px from the right edge for the adornment button (inside the input) */
    adornmentOffset?: number;
    /** called whenever a user inserts an emoji */
    onEmojiSelect?: (emoji: string) => void;
};

export const EmojiInput = React.forwardRef<HTMLInputElement, EmojiInputProps>(
    ({ style, adornmentOffset = 8, onEmojiSelect, ...rest }, ref) => {
        const innerRef = useRef<HTMLInputElement | null>(null);

        // Expose the real input DOM node to parent (e.g., RHF register ref)
        useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

        const insertAtCursor = (emoji: string) => {
            const el = innerRef.current;
            if (!el) return;

            const start = el.selectionStart ?? el.value.length;
            const end = el.selectionEnd ?? el.value.length;
            const before = el.value.slice(0, start);
            const after = el.value.slice(end);

            // add a space after emoji if needed (so words don't stick)
            const needsSpace = before.length > 0 && !before.endsWith(" ");
            const spacer = needsSpace ? " " : "";

            const next = `${before}${emoji}${spacer}${after}`;

            // Update value and notify React/RHF by dispatching an 'input' event
            el.value = next;
            el.dispatchEvent(new Event("input", { bubbles: true }));

            // place caret right after the emoji (+ optional space)
            const pos = start + emoji.length + spacer.length;
            requestAnimationFrame(() => {
                el.setSelectionRange(pos, pos);
                el.focus();
            });

            onEmojiSelect?.(emoji);
        };

        return (
            <div className="emoji-input" style={{ position: "relative", width: "100%" }}>
                {/* Main input (adds right-padding so text doesn’t go under the button) */}
                <Input
                    {...rest}
                    ref={innerRef}
                    style={{ width: "100%", ...(style || {}) }}
                />

                {/* End-adornment: emoji button inside the input */}
                <div
                    className="emoji-input__adornment"
                    style={{
                        position: "absolute",
                        right: adornmentOffset,
                        top: 0,
                        bottom: 0,
                        display: "flex",
                        alignItems: "stretch",
                        height: "100%",
                        zIndex: 9
                    }}
                >
                    <EmojiPickerMini onSelect={insertAtCursor} />
                </div>

                {/* Make the button feel like part of the input; align popover */}
                <style>{`
          /* Tweak the mini picker's trigger to look like an input adornment */
          .emoji-input .emoji-btn {
            height: 100%;
            width: 36px;
            border: none;
            background: transparent;
            border-left: 1px solid #e5e7eb;
            border-radius: 0 8px 8px 0;
            cursor: pointer;
            font-size: 18px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: background .15s ease, border-color .2s ease;
          }
          .emoji-input .emoji-btn:hover { background: transparent !important;}
          /* Remove separate focus ring; rely on input's focus style */
          .emoji-input .emoji-btn:focus { outline: none; box-shadow: none; }

          /* When any child has focus, keep input focused look and sync seam color */
          .emoji-input:focus-within .input {
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.3);
          }
          .emoji-input:focus-within .emoji-btn { border-left-color: #2563eb; }

          /* Position the emoji popover right under the button */
          .emoji-input .emoji-pop {
            top: calc(100% + 6px);
            right: 0;
            left: auto;
          }
        `}</style>
            </div>
        );
    }
);
