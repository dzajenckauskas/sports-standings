import React, { useImperativeHandle, useRef } from "react";
import { Input } from "../shared/Input";
import { EmojiPickerMini } from "./EmojiPickerMini";
import { TType } from "../../types/TType";
import { useTheme } from "styled-components";
import { FieldSize, heights } from "../../types/CommonTypes";
import { EmojiType } from "../../types/EmojiType";

export type EmojiInputProps = React.ComponentProps<typeof Input> & {
    adornmentOffset?: number;
    onEmojiSelect?: (emoji: string) => void;
    t: TType;
    emojiOptions?: EmojiType[];
};

export const EmojiInput = React.forwardRef<HTMLInputElement, EmojiInputProps>(
    ({ style, adornmentOffset = 8, onEmojiSelect, t, emojiOptions, ...rest }, ref) => {
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
        const theme = useTheme() as any;
        const hasError = Boolean((rest as any)?.error);
        const dividerColor = theme?.palette?.divider?.dark || "#e5e7eb";
        const focusColor = theme?.palette?.primary?.main || "#2563eb";
        const errorColor = theme?.palette?.error?.main || "#dc2626";

        // Make adornment match the input height by using fieldSize + heights tokens
        const resolvedSize: FieldSize = (rest.fieldSize as FieldSize) || theme.ui?.layout?.inputsSize || "md";
        const adornmentH = heights[resolvedSize];

        return (
            <div className={`emoji-input${hasError ? " is-error" : ""}`} style={{ position: "relative", width: "100%" }}>
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
                        transform: "none",
                        display: "flex",
                        alignItems: "center",
                        height: adornmentH,
                        zIndex: 9
                    }}
                >
                    <EmojiPickerMini t={t}
                        onSelect={insertAtCursor}
                        emojiOptions={emojiOptions}
                    />
                </div>

                <style>{`
          .emoji-input .emoji-btn {
            height: 100%;
            width: 36px;
            border: none;
            background: transparent;
            border-left: 1px solid ${dividerColor};
            border-radius: 0 7px 7px 0;
            cursor: pointer;
            font-size: 18px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: background .15s ease, border-color .2s ease;
          }
          .emoji-input .emoji-btn:hover { background: transparent !important; }
          .emoji-input .emoji-btn:focus { outline: none; box-shadow: none; }

          .emoji-input:focus-within .emoji-btn { border-left-color: ${focusColor}; }
          
          .emoji-input.is-error .emoji-btn,
          .emoji-input.is-error:focus-within .emoji-btn { border-left-color: ${errorColor} !important; }
        `}</style>
            </div>
        );
    }
);
