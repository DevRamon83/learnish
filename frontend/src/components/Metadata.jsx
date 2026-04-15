import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLang } from "../hooks/useLang";
import { i18nAddresses } from "../constants/i18nAddresses";

export default function Metadata() {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");
  const { strings, lang } = useLang(i18nAddresses.metadata);
  const pageName = strings.titles[page];
  const pageDesc = strings.descriptions[page];

  useEffect(() => {
    const metaDescription = document.querySelector('meta[name="description"]');

    document.title = pageName
      ? `${pageName} | Learnish`
      : strings.titles.fallback;

    metaDescription.setAttribute(
      "content",
      pageDesc || strings.descriptions.fallback,
    );

    if (lang) {
      document.documentElement.lang = lang;
    }
  }, [pageName]);
}
