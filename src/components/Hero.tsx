import { useLanguage } from '../lib/language';
import { lazy, Suspense } from 'react';
import { ArrowUpRight, ArrowDown, MoveUpRight } from 'lucide-react';
import { photo } from '../data/activities';
const ThreeScene = lazy(() => import('./ThreeScene'));
export default function Hero() {
  const { t } = useLanguage();
  return <section id="home" className="hero"><img className="hero-photo" src={photo('photo-1534438327276-14e5300c3a48', 2000)} alt={t("Training floor with strength equipment")} fetchPriority="high"/><div className="hero-shade"/><Suspense fallback={null}><ThreeScene/></Suspense><div className="hero-content container"><div className="eyebrow"><span className="red-line"/> {t("PERSONAL COACHING. REAL CONNECTION.")}</div><h1>{t("TRAIN. PLAY.")}<br/>{t("heroChallenge")}<br/><span>{t("YOURSELF.")}</span></h1><p>{t("Choose what you want to do today.")}</p><a href="#activities" className="button hero-button">{t("START")} <ArrowUpRight size={22}/></a><div className="hero-note"><span className="status-dot"/> {t("YOUR NEXT MOVE STARTS HERE")}</div></div><div className="hero-bottom container"><a href="#activities" className="scroll-link"><ArrowDown size={16}/> {t("SCROLL TO EXPLORE")}</a><span>{t("YOUR PACE. YOUR GOALS.")} <strong>{t("YOUR COACH.")}</strong></span><MoveUpRight className="hero-corner" size={30}/></div></section>;
}
