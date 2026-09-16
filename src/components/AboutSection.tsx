import { ArrowUpRight, Handshake, MousePointer2, Zap } from 'lucide-react';
import { useLanguage } from '../lib/language';

export default function AboutSection() {
  const { t } = useLanguage();
  const steps = [
    { icon: MousePointer2, title: 'YOU CHOOSE.', text: 'Pick the activity that matches your mood and your goals.' },
    { icon: Handshake, title: 'WE CONNECT.', text: 'Send your request. Your coach gets in touch to plan your session.' },
    { icon: Zap, title: 'WE MAKE MOVES.', text: 'Meet in real life. Move, challenge yourself and enjoy the moment.' },
  ];

  return (
    <section id="about" className="about-section" aria-labelledby="about-title">
      <div className="container">
        <div className="section-kicker">
          <span className="red-line" /> {t('SIMPLE BY DESIGN')}
          <span className="section-number">{t('02 / THE APPROACH')}</span>
        </div>
        <div className="about-heading">
          <h2 id="about-title">{t('REAL MOVEMENT.')}<br />{t('REAL')} <span className="red-text">{t('CONNECTION.')}</span></h2>
          <div className="about-intro">
            <p>{t('No pressure to be perfect.')}<br />{t('Just a reason to show up for yourself.')}</p>
            <a href="#activities" className="about-link">{t('CHOOSE YOUR ACTIVITY')} <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
        </div>

        <div className="about-gallery">
          <figure className="about-photo about-photo-community">
            <div className="about-photo-frame">
              <img src="/assets/img/1.jpeg" alt={t('A shared moment at the sports club')} loading="lazy" decoding="async" width="1280" height="720" />
              <span className="about-photo-badge"><span className="status-dot" />{t('ALL LEVELS WELCOME')}</span>
            </div>
            <figcaption><span>01 / {t('THE TEAM SPIRIT')}</span><ArrowUpRight size={18} aria-hidden="true" /></figcaption>
          </figure>
          <figure className="about-photo">
            <div className="about-photo-frame">
              <img src="/assets/img/Screenshot%20from%202026-09-16%2000-04-24.png" alt={t('Coach and athlete holding a certificate at the club')} loading="lazy" decoding="async" width="686" height="578" />
            </div>
            <figcaption><span>02 / {t('EVERY STEP COUNTS')}</span></figcaption>
          </figure>
          <figure className="about-photo">
            <div className="about-photo-frame">
              <img src="/assets/img/WhatsApp%20Image%202026-08-16%20at%2020.02.28.png" alt={t('Two athletes with medals at a sporting event')} loading="lazy" decoding="async" width="512" height="602" />
            </div>
            <figcaption><span>03 / {t('SHARED PRIDE')}</span></figcaption>
          </figure>
        </div>

        <div className="steps about-steps">
          {steps.map((step, index) => (
            <div key={step.title}>
              <div className="step-top"><step.icon size={25} aria-hidden="true" /><span>0{index + 1}</span></div>
              <h3>{t(step.title)}</h3>
              <p>{t(step.text)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
