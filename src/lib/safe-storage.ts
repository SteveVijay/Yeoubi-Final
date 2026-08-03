/**
 * SSR-safe localStorage helpers.
 *
 * - Guards `typeof window === "undefined"` so SSR/hydration never throws.
 * - Replaces silent `catch {}` blocks with `console.warn` for debuggability.
 */
export const safeStorage = {
  get(key: string): string | null {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn(`[safeStorage] read failed for "${key}"`, e);
      return null;
    }
  },

  set(key: string, value: string): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn(`[safeStorage] write failed for "${key}"`, e);
    }
  },

  remove(key: string): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn(`[safeStorage] remove failed for "${key}"`, e);
    }
  },

  getJSON<T>(key: string, fallback: T): T {
    const raw = safeStorage.get(key);
    if (!raw) return fallback;
    try {
      return JSON.parse(raw) as T;
    } catch (e) {
      console.warn(`[safeStorage] JSON parse failed for "${key}"`, e);
      return fallback;
    }
  },

  setJSON<T>(key: string, value: T): void {
    try {
      safeStorage.set(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`[safeStorage] JSON stringify failed for "${key}"`, e);
    }
  },
};
