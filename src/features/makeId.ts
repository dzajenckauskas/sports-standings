// src/utils/id.ts
import { v4 as uuidv4 } from "uuid";

/**
 * Generate a UUID v4 in all environments.
 * Falls back to a Math.random()-based UUID if something very old breaks.
 */
export function makeId(): string {
    try {
        // Most modern browsers
        if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
            return (crypto as any).randomUUID();
        }
    } catch {
        // ignore and fall back to uuidv4
    }

    // Preferred cross-env implementation
    try {
        return uuidv4();
    } catch {
        // Ultra-fallback (non-cryptographic)
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
            const r = (Math.random() * 16) | 0;
            const v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
}