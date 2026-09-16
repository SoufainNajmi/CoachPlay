import { useLanguage } from '../lib/language';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ActivitySelector from '../components/ActivitySelector';
import ClientForm from '../components/ClientForm';
import CoachSection from '../components/CoachSection';
import AboutSection from '../components/AboutSection';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import type { Activity } from '../data/activities';
export default function Home() {
  const { t } = useLanguage();
  const [booking,setBooking] = useState<{activity:Activity|null}|null>(null);
  return <><a className="skip-link" href="#activities">{t("Skip to activities")}</a><Navbar/><main><Hero/><div className="movement-strip"><span>{t("MOVE BETTER")}</span><ArrowUpRight/><span>{t("FEEL STRONGER")}</span><ArrowUpRight/><span>{t("PLAY MORE")}</span><ArrowUpRight/><span>{t("BE YOU")}</span><ArrowUpRight/></div><ActivitySelector onSelect={activity => setBooking({activity})}/><AboutSection/><CoachSection/><Contact onBook={() => setBooking({activity:null})}/></main><Footer/>{booking&&<ClientForm initialActivity={booking.activity} onClose={() => setBooking(null)}/>}</>;
}
