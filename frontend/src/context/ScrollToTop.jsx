import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll ke atas setiap kali pathname berubah
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Tidak perlu merender apa pun
}
