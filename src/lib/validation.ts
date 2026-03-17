export function validateRequired(fields: Record<string, unknown>, required: string[]): string | null {
    for (const field of required) {
        const val = fields[field];
        if (val === null || val === undefined || (typeof val === "string" && val.trim() === "")) {
            return `${field} is required`;
        }
    }
    return null;
}

export function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateUrl(url: string): boolean {
    if (!url) return true; // empty is OK (optional field)
    if (url.startsWith("/")) return true;
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

export function validateMaxLength(value: string, max: number, fieldName: string): string | null {
    if (value && value.length > max) {
        return `${fieldName} must be ${max} characters or less`;
    }
    return null;
}
