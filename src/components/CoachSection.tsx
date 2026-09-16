import { useState } from 'react';
import { useLanguage } from '../lib/language';
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Award, Users, Target, Sparkles } from 'lucide-react';

const coachPhotos = [
  {
    id: 'field-1',
    src: '/assets/img/Screenshot%20from%202026-09-16%2007-09-12.png',
    tag: 'FIELD COACHING',
    captionLine1: 'IN YOUR CORNER.',
    captionLine2: 'EVERY STEP OF THE WAY.',
    alt: 'Your coach on the sports field',
  },
  {
    id: 'field-2',
    src: '/assets/img/Screenshot%20from%202026-09-16%2007-26-51.png',
    tag: 'TACTICAL FOCUS',
    captionLine1: 'STRATEGY & DISCIPLINE.',
    captionLine2: 'RESULTS THAT LAST.',
    alt: 'Tactical coaching and technique',
  },
  {
    id: 'outdoor-1',
    src: '/assets/img/Screenshot%20from%202026-09-16%2007-27-52.png',
    tag: 'OUTDOOR MOTIVATION',
    captionLine1: 'PUSH YOUR LIMITS.',
    captionLine2: 'EMBRACE THE CHALLENGE.',
    alt: 'Outdoor athletic coaching session',
  },
  {
    id: 'guidance-1',
    src: '/assets/img/Screenshot%20from%202026-09-15%2023-56-06.png',
    tag: 'PERSONAL GUIDANCE',
    captionLine1: 'TAILORED FOR YOU.',
    captionLine2: 'PERSONALIZED ATTENTION.',
    alt: 'Personal training guidance',
  },
  {
    id: 'intensity-1',
    src: '/assets/img/Screenshot%20from%202026-09-15%2023-58-36.png',
    tag: 'HIGH INTENSITY',
    captionLine1: 'PASSION & POWER.',
    captionLine2: 'UNLEASH YOUR ENERGY.',
    alt: 'High intensity workout session',
  },
  {
    id: 'performance-1',
    src: '/assets/img/Gemini_Generated_Image_13jxjl13jxjl13jx.png',
    tag: 'PERFORMANCE & FOCUS',
    captionLine1: 'BUILD STRENGTH.',
    captionLine2: 'OWN YOUR MOMENT.',
    alt: 'Performance training atmosphere',
  }
];

export default function CoachSection() {
  const { t } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);

  const currentPhoto = coachPhotos[activeIdx];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % coachPhotos.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + coachPhotos.length) % coachPhotos.length);
  };

  return (
    <section id="coach" className="coach-section">
      <div className="container coach-grid">
        {/* Left Side: Dynamic Multi-Photo Gallery */}
        <div className="coach-gallery-container">
          <div className="coach-main-card">
            <img
              key={currentPhoto.id}
              src={currentPhoto.src}
              alt={t(currentPhoto.alt)}
              className="coach-main-img"
              loading="lazy"
            />
            
            {/* Overlay Tag Badge */}
            <div className="coach-photo-tag">
              <Sparkles size={13} />
              <span>{t(currentPhoto.tag)}</span>
            </div>

            {/* Gallery Navigation Buttons */}
            <div className="coach-gallery-nav">
              <button onClick={handlePrev} className="gallery-nav-btn" aria-label="Previous photo">
                <ChevronLeft size={20} />
              </button>
              <button onClick={handleNext} className="gallery-nav-btn" aria-label="Next photo">
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Photo Caption Overlay */}
            <div className="coach-image-caption">
              <span>
                {t(currentPhoto.captionLine1)}
                <br />
                {t(currentPhoto.captionLine2)}
              </span>
              <ArrowUpRight size={36} />
            </div>
          </div>

          {/* Interactive Thumbnail Bar */}
          <div className="coach-thumbnails-bar">
            {coachPhotos.map((photo, index) => (
              <button
                key={photo.id}
                onClick={() => setActiveIdx(index)}
                className={`coach-thumb-btn ${index === activeIdx ? 'active' : ''}`}
                aria-label={`${t('SEE COACH IN ACTION')} ${index + 1}`}
              >
                <img src={photo.src} alt={t(photo.alt)} />
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Coach Narrative & Experience Metrics */}
        <div className="coach-copy">
          <div className="section-kicker">
            <span className="red-line" /> {t("THE HUMAN BEHIND THE HUSTLE")}
          </div>

          <h2>
            {t("YOUR GOALS.")}
            <br />
            {t("YOUR JOURNEY.")}
            <br />
            <span className="red-text">{t("YOUR COACH.")}</span>
          </h2>

          <p className="coach-lead">{t("Train with me, challenge yourself and have fun.")}</p>

          <p>
            {t("Some days, you want to push your limits. Others, you just want to move and feel good. Wherever you're starting, we'll find what works for you. Together.")}
          </p>

          {/* Metrics Counter */}
          <div className="coach-stats-grid">
            <div className="stat-card">
              <Award className="stat-icon" size={20} />
              <div className="stat-info">
                <strong>5+</strong>
                <span>{t("5+ Years Experience")}</span>
              </div>
            </div>
            <div className="stat-card">
              <Users className="stat-icon" size={20} />
              <div className="stat-info">
                <strong>100+</strong>
                <span>{t("100+ Athletes Guided")}</span>
              </div>
            </div>
            <div className="stat-card">
              <Target className="stat-icon" size={20} />
              <div className="stat-info">
                <strong>100%</strong>
                <span>{t("100% Personal Dedication")}</span>
              </div>
            </div>
          </div>

          <div className="coach-specialties">
            {[t("Training"), t("Cardio"), t("Running"), t("Combat"), t("Games"), t("Challenges")].map((x) => (
              <span key={x}>
                <Check size={15} />
                {x}
              </span>
            ))}
          </div>

          <a className="button" href="#activities">
            {t("CHOOSE YOUR ACTIVITY")} <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
