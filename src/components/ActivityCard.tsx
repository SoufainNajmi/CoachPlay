import { useLanguage } from '../lib/language';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { type Activity, photo } from '../data/activities';
export default function ActivityCard({activity, index, onSelect}: {activity: Activity; index: number; onSelect: (activity: Activity) => void}) {
  const { t } = useLanguage();
  const Icon = activity.icon;
  return <motion.button className={`activity-card activity-${activity.id}`} onClick={() => onSelect(activity)} whileHover={{y:-5}} whileTap={{scale:.98}} aria-label={`${t('Select')} ${t(activity.title)}`}><img src={photo(activity.image)} alt="" loading="lazy"/><div className="card-shade"/><div className="card-top"><span>0{index+1}</span><Icon size={24}/></div><div className="card-content"><span className="card-tag">{t(activity.tag)}</span><h3>{t(activity.title)}</h3><p>{t(activity.description)}</p><div className="card-select"><span>{t("SELECT")}</span><ArrowUpRight size={20}/></div></div></motion.button>;
}
