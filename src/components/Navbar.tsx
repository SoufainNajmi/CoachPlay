import { useState } from 'react';
import { ArrowUpRight, Menu, X, Activity } from 'lucide-react';
import { useLanguage, type Language } from '../lib/language';
export function Brand() { const { t } = useLanguage(); return <a className="brand" href="#home" aria-label={t('Pulse home')} dir="ltr"><Activity aria-hidden="true"/><span>PULSE<span className="brand-dot">.</span></span></a>; }
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  return <header className="navbar"><div className="nav-inner"><Brand/><nav className={open ? 'nav-links open' : 'nav-links'} aria-label={t('Main navigation')}>{['Home','About','Activities','Coach','Contact'].map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)}>{t(item)}</a>)}</nav><select className="language-select" aria-label={t('Language')} value={language} onChange={event => setLanguage(event.target.value as Language)}><option value="fr" lang="fr">Français</option><option value="ar" lang="ar">العربية</option><option value="en" lang="en">English</option></select><a className="button nav-cta" href="#activities">{t('START TRAINING')} <ArrowUpRight size={16}/></a><button className="menu-toggle icon-button" aria-label={open ? t('Close menu') : t('Open menu')} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button></div></header>;
}
