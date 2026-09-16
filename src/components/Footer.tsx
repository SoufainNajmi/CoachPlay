import { useLanguage } from '../lib/language';
import { Brand } from './Navbar';
export default function Footer() {
  const { t } = useLanguage(); return <footer><div className="container footer-inner"><Brand/><span>{t("MOVE WITH PURPOSE. ENJOY THE PROCESS.")}</span><small>&copy; {new Date().getFullYear()} {t("PULSE. All rights reserved.")}</small></div></footer>; }
