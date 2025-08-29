export type Country = {
  name: string;
  code: string; // 3-letter sports code shown in the UI reference
  flag: string; // emoji flag
};

export const EUROBASKET_2025_COUNTRIES: Country[] = [
  { name: "Belgium", code: "BEL", flag: "🇧🇪" },
  { name: "Bosnia and Herzegovina", code: "BIH", flag: "🇧🇦" },
  { name: "Cyprus", code: "CYP", flag: "🇨🇾" },
  { name: "Czechia", code: "CZE", flag: "🇨🇿" },
  { name: "Estonia", code: "EST", flag: "🇪🇪" },
  { name: "Finland", code: "FIN", flag: "🇫🇮" },
  { name: "France", code: "FRA", flag: "🇫🇷" },
  { name: "Georgia", code: "GEO", flag: "🇬🇪" },
  { name: "Germany", code: "GER", flag: "🇩🇪" },
  { name: "Great Britain", code: "GBR", flag: "🇬🇧" },
  { name: "Greece", code: "GRE", flag: "🇬🇷" },
  { name: "Iceland", code: "ISL", flag: "🇮🇸" },
  { name: "Israel", code: "ISR", flag: "🇮🇱" },
  { name: "Italy", code: "ITA", flag: "🇮🇹" },
  { name: "Latvia", code: "LAT", flag: "🇱🇻" },
  { name: "Lithuania", code: "LTU", flag: "🇱🇹" },
  { name: "Montenegro", code: "MNE", flag: "🇲🇪" },
  { name: "Poland", code: "POL", flag: "🇵🇱" },
  { name: "Portugal", code: "POR", flag: "🇵🇹" },
  { name: "Serbia", code: "SRB", flag: "🇷🇸" },
  { name: "Slovenia", code: "SLO", flag: "🇸🇮" },
  { name: "Spain", code: "ESP", flag: "🇪🇸" },
  { name: "Sweden", code: "SWE", flag: "🇸🇪" },
  { name: "Türkiye", code: "TUR", flag: "🇹🇷" },
];

export const EUROBASKET_2025_FLAGS: string[] = EUROBASKET_2025_COUNTRIES.map(c => c.flag);

