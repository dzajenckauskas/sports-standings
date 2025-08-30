import React from "react";

export type Locale = "en" | "lt";

type I18nContextType = {
  locale: Locale;
  t: (path: string, vars?: Record<string, string | number>) => string;
  setLocale: (next: Locale) => void;
  loadNamespace: (ns?: string) => Promise<void>;
  /** Returns true if every ns has been loaded for the current locale */
  areNamespacesLoaded: (ns: string | string[]) => boolean;
};

const I18nContext = React.createContext<I18nContextType | undefined>(undefined);

function format(str: string, vars?: Record<string, string | number>) {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
}

function getByPath(obj: any, path: string) {
  return path.split(".").reduce(
    (acc: any, key) => (acc && acc[key] != null ? acc[key] : undefined),
    obj
  );
}

type ProviderProps = {
  locale?: Locale;
  children: React.ReactNode;
  /** Namespaces to preload (blocking initial render). Defaults to ["common"]. */
  initialNamespaces?: string[];
  /** What to render while initial namespaces are loading. */
  fallback?: React.ReactNode;
};

export const I18nProvider: React.FC<ProviderProps> = ({
  locale = "en",
  children,
  initialNamespaces = ["common"],
  fallback = null,
}) => {
  // SSR-safe initial locale
  const [loc, setLoc] = React.useState<Locale>(() => {
    try {
      const stored = localStorage.getItem("locale") as Locale | null;
      return stored ?? locale;
    } catch {
      return locale;
    }
  });

  // dict structure: { common: {...}, dashboard: {...}, ... }
  const [dict, setDict] = React.useState<Record<string, any>>({});
  // Track which namespaces are loaded for the current locale
  const [loadedNs, setLoadedNs] = React.useState<Set<string>>(new Set());

  // Reset dict + loaded set when locale changes
  React.useEffect(() => {
    setDict({});
    setLoadedNs(new Set());
  }, [loc]);

  const markLoaded = React.useCallback((ns: string) => {
    setLoadedNs((prev) => {
      if (prev.has(ns)) return prev;
      const next = new Set(prev);
      next.add(ns);
      return next;
    });
  }, []);

  // Load an extra namespace (default "common") and merge
  const loadNamespace = React.useCallback(
    async (ns: string = "common") => {
      if (loadedNs.has(ns)) return; // de-dupe for perf
      try {
        const res = await fetch(`/locales/${loc}/${ns}.json`, { cache: "no-cache" });
        const data = await res.json();
        setDict((prev) => ({
          ...prev,
          [ns]: { ...(prev?.[ns] ?? {}), ...(data ?? {}) },
        }));
        markLoaded(ns);
      } catch {
        // ignore namespace load errors (keep previous dict)
      }
    },
    [loc, loadedNs, markLoaded]
  );

  // Helper: are the given namespaces loaded?
  const areNamespacesLoaded = React.useCallback(
    (ns: string | string[]) => {
      const arr = Array.isArray(ns) ? ns : [ns];
      return arr.every((n) => loadedNs.has(n));
    },
    [loadedNs]
  );

  // Block initial render until initial namespaces are loaded
  const [initialReady, setInitialReady] = React.useState(false);
  React.useEffect(() => {
    setInitialReady(false);
    const arr = initialNamespaces.length ? initialNamespaces : ["common"];
    Promise.all(arr.map((ns) => loadNamespace(ns))).finally(() => setInitialReady(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loc, JSON.stringify(initialNamespaces), loadNamespace]);

  // t() tries exact path, then falls back to "common.{path}"
  const t = React.useCallback(
    (path: string, vars?: Record<string, string | number>) => {
      let raw = getByPath(dict, path);
      if (typeof raw !== "string") {
        raw = getByPath(dict, `common.${path}`);
      }
      return typeof raw === "string" ? format(raw, vars) : path;
    },
    [dict]
  );

  const setLocale = React.useCallback((next: Locale) => {
    setLoc(next);
    try {
      localStorage.setItem("locale", next);
    } catch { }
  }, []);

  const value = React.useMemo<I18nContextType>(
    () => ({ locale: loc, t, setLocale, loadNamespace, areNamespacesLoaded }),
    [loc, t, setLocale, loadNamespace, areNamespacesLoaded]
  );

  if (!initialReady) return <>{fallback}</>;

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useI18n() {
  const ctx = React.useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider/>");
  return ctx;
}

/**
 * Component-level helper:
 * Ensures the given namespaces are loaded before rendering the children.
 * Returns { ready }. If not ready, you can render your own skeleton/fallback.
 */
export function useI18nReady(required: string | string[] = "common") {
  const { loadNamespace, areNamespacesLoaded, locale } = useI18n() as any;
  const key = Array.isArray(required) ? required.join("|") : required;

  const [ready, setReady] = React.useState(() => areNamespacesLoaded(required));

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      const arr = Array.isArray(required) ? required : [required];
      await Promise.all(arr.map((ns) => loadNamespace(ns)));
      if (mounted) setReady(true);
    })();
    return () => {
      mounted = false;
    };
  }, [locale, key, loadNamespace, required]);

  React.useEffect(() => {
    if (areNamespacesLoaded(required)) setReady(true);
  }, [areNamespacesLoaded, key, required]);

  return { ready };
}
