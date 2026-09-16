import { useLanguage } from '../lib/language';
import { ArrowDownRight } from 'lucide-react';
import { activities, type Activity } from '../data/activities';
import ActivityCard from './ActivityCard';

export default function ActivitySelector({onSelect}: {onSelect: (activity: Activity) => void}) {
  const { t } = useLanguage();
  return <section id="activities" className="activities-section container">
    <div className="section-kicker"><span className="red-line"/> {t("FIND YOUR ENERGY")} <span className="section-number">{t("01 / ACTIVITIES")}</span></div>
    <div className="section-heading">
      <h2>{t("WHAT DO YOU WANT")}<br/>{t("TO DO")} <span className="red-text">{t("TODAY?")}</span></h2>
      <div className="section-intro">
        <p>{t("Six ways to move. One decision to make.")}<br/>{t("Pick your activity. Let's make it happen.")}
        </p><ArrowDownRight size={32}/>
        </div>
        </div>
        <div className="activity-grid">{activities.map((activity,index) => <ActivityCard key={activity.id} activity={activity} index={index} onSelect={onSelect}/>)}
        </div>
        <p className="activities-footnote">
          <span className="status-dot"/>
           {t("ALL LEVELS WELCOME")}
            <span>{t("Real sessions. With a real coach. In real life.")}</span>
        </p>


  </section>;
}
