import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Language = 'en' | 'fr' | 'ar';
// English copy is also the fallback key, keeping translations close to the existing content.
export const translations: Record<string, [string, string]> = {
  'THE TEAM SPIRIT': ["L'ESPRIT D'ÉQUIPE", 'روح الفريق'],
  'EVERY STEP COUNTS': ['CHAQUE PAS COMPTE', 'كل خطوة مهمة'],
  'SHARED PRIDE': ['LA FIERTÉ PARTAGÉE', 'فخر نتقاسمه'],
  'Coach and athlete holding a certificate at the club': ['Un coach et un athlète avec un certificat au club', 'مدرب ورياضي يحملان شهادة في النادي'],
  'Two athletes with medals at a sporting event': ["Deux athlètes médaillés lors d'un événement sportif", 'رياضيان يحملان ميداليات في فعالية رياضية'],
  'Home': ['Accueil', 'الرئيسية'], 'About': ['À propos', 'من نحن'], 'Activities': ['Activités', 'الأنشطة'], 'Coach': ['Coach', 'المدرب'], 'Contact': ['Contact', 'تواصل معنا'],
  'Language': ['Langue', 'اللغة'], 'Main navigation': ['Navigation principale', 'القائمة الرئيسية'], 'Pulse home': ['Accueil Pulse', 'الرئيسية Pulse'], 'Open menu': ['Ouvrir le menu', 'فتح القائمة'], 'Close menu': ['Fermer le menu', 'إغلاق القائمة'], 'Close': ['Fermer', 'إغلاق'],
  'START TRAINING': ["S'ENTRAÎNER", 'ابدأ التدريب'], 'Skip to activities': ['Aller aux activités', 'انتقل إلى الأنشطة'],
  'PERSONAL COACHING. REAL CONNECTION.': ['COACHING PERSONNEL. LIEN AUTHENTIQUE.', 'تدريب شخصي. تواصل حقيقي.'],
  'TRAIN. PLAY.': ['BOUGEZ. JOUEZ.', 'تدرّب. العب.'], 'CHALLENGE': ['DÉFI', 'التحدي'], 'heroChallenge': ['DÉPASSEZ', 'تحدَّ'], 'YOURSELF.': ['VOS LIMITES.', 'نفسك.'],
  'Choose what you want to do today.': ["Choisissez ce que vous voulez faire aujourd'hui.", 'اختر ما تريد القيام به اليوم.'], 'START': ['COMMENCER', 'ابدأ'],
  'YOUR NEXT MOVE STARTS HERE': ['VOTRE PROCHAIN PAS COMMENCE ICI', 'خطوتك القادمة تبدأ هنا'], 'SCROLL TO EXPLORE': ['DÉCOUVRIR', 'اكتشف المزيد'], 'YOUR PACE. YOUR GOALS.': ['VOTRE RYTHME. VOS OBJECTIFS.', 'إيقاعك. أهدافك.'], 'YOUR COACH.': ['VOTRE COACH.', 'مدربك.'],
  'Training floor with strength equipment': ['Salle de sport et matériel de musculation', 'قاعة رياضية ومعدات تقوية العضلات'],
  'MOVE BETTER': ['BOUGEZ MIEUX', 'تحرّك أفضل'], 'FEEL STRONGER': ['DEVENEZ PLUS FORT', 'كن أقوى'], 'PLAY MORE': ['JOUEZ PLUS', 'العب أكثر'], 'BE YOU': ['SOYEZ VOUS-MÊME', 'كن نفسك'],
  'FIND YOUR ENERGY': ['TROUVEZ VOTRE ÉNERGIE', 'اكتشف طاقتك'], '01 / ACTIVITIES': ['01 / ACTIVITÉS', '01 / الأنشطة'], 'WHAT DO YOU WANT': ['QUE VOULEZ-VOUS', 'ماذا تريد'], 'TO DO': ['FAIRE', 'أن تفعل'], 'TODAY?': ["AUJOURD'HUI ?", 'اليوم؟'],
  'Six ways to move. One decision to make.': ['Six façons de bouger. Un choix à faire.', 'ست طرق للحركة. قرار واحد.'], "Pick your activity. Let's make it happen.": ["Choisissez votre activité. C'est parti.", 'اختر نشاطك. ولنبدأ معًا.'],
  'ALL LEVELS WELCOME': ['TOUS LES NIVEAUX SONT BIENVENUS', 'جميع المستويات مرحّب بها'], 'Real sessions. With a real coach. In real life.': ['De vraies séances. Avec un coach. En personne.', 'حصص حقيقية. مع مدرب حقيقي. على أرض الواقع.'],
  'RUN': ['COURSE', 'الجري'], 'CARDIO': ['CARDIO', 'الكارديو'], 'WORKOUT': ['MUSCULATION', 'تقوية العضلات'], 'COMBAT': ['COMBAT', 'القتال'], 'GAME': ['JEU', 'اللعب'],
  "Let's go for a run.": ['Allons courir ensemble.', 'لنذهب للجري معًا.'], "Let's improve your endurance.": ['Améliorons votre endurance.', 'لنحسّن قدرتك على التحمل.'], "Let's get stronger.": ['Devenons plus forts.', 'لنصبح أقوى.'], 'Speed, movement and challenge.': ['Vitesse, mouvement et défi.', 'سرعة وحركة وتحدٍّ.'], "Let's play together.": ['Jouons ensemble.', 'لنلعب معًا.'], 'Are you ready?': ['Prêt à vous dépasser ?', 'هل أنت مستعد؟'],
  'OUTDOORS / ENDURANCE': ['PLEIN AIR / ENDURANCE', 'في الهواء الطلق / التحمل'], 'ENERGY / ENDURANCE': ['ÉNERGIE / ENDURANCE', 'الطاقة / التحمل'], 'STRENGTH / CONDITIONING': ['FORCE / CONDITION PHYSIQUE', 'القوة / اللياقة'], 'AGILITY / FOCUS': ['AGILITÉ / CONCENTRATION', 'الرشاقة / التركيز'], 'PLAY / CONNECTION': ['JEU / PARTAGE', 'اللعب / التواصل'], 'MINDSET / PROGRESS': ['MENTAL / PROGRÈS', 'العزيمة / التقدم'],
  'SELECT': ['CHOISIR', 'اختر'], 'Select': ['Choisir', 'اختر'],
  'Ready to hit your stride?': ['Prêt à trouver votre rythme ?', 'مستعد للانطلاق؟'], 'Ready to get your heart moving?': ['Prêt à faire battre votre cœur ?', 'مستعد لتنشيط قلبك؟'], 'Ready to build your strength?': ['Prêt à gagner en force ?', 'مستعد لبناء قوتك؟'], 'Ready to step into your power?': ['Prêt à révéler votre puissance ?', 'مستعد لإظهار قوتك؟'], 'Ready to play?': ['Prêt à jouer ?', 'مستعد للعب؟'], 'Ready to take on the challenge?': ['Prêt à relever le défi ?', 'مستعد لخوض التحدي؟'],
  'SIMPLE BY DESIGN': ['LA SIMPLICITÉ AVANT TOUT', 'البساطة أولًا'], '02 / THE APPROACH': ["02 / L'APPROCHE", '02 / نهجنا'], 'REAL MOVEMENT.': ['DU MOUVEMENT.', 'حركة حقيقية.'], 'REAL': ['DU VRAI', 'تواصل'], 'CONNECTION.': ['PARTAGE.', 'حقيقي.'], 'No pressure to be perfect.': ["Pas besoin d'être parfait.", 'لا تحتاج إلى أن تكون مثاليًا.'], 'Just a reason to show up for yourself.': ['Juste une raison de prendre soin de vous.', 'فقط سبب لتهتم بنفسك.'],
  'YOU CHOOSE.': ['VOUS CHOISISSEZ.', 'أنت تختار.'], 'WE CONNECT.': ['ON ÉCHANGE.', 'نتواصل.'], 'WE MAKE MOVES.': ['ON PASSE À L’ACTION.', 'ننطلق معًا.'], 'Pick the activity that matches your mood and your goals.': ['Choisissez une activité adaptée à vos envies et vos objectifs.', 'اختر النشاط الذي يناسب مزاجك وأهدافك.'], 'Send your request. Your coach gets in touch to plan your session.': ['Envoyez votre demande. Votre coach vous contacte pour organiser la séance.', 'أرسل طلبك. سيتواصل معك مدربك لتنظيم حصتك.'], 'Meet in real life. Move, challenge yourself and enjoy the moment.': ['Retrouvez-vous en personne. Bougez, dépassez-vous et profitez du moment.', 'التقوا على أرض الواقع. تحرّك وتحدَّ نفسك واستمتع باللحظة.'],
  'IN YOUR CORNER.': ['À VOS CÔTÉS.', 'إلى جانبك.'], 'EVERY STEP OF THE WAY.': ['À CHAQUE ÉTAPE.', 'في كل خطوة.'], 'THE HUMAN BEHIND THE HUSTLE': ["L'HUMAIN AU CŒUR DE L'EFFORT", 'الإنسان وراء كل جهد'], 'YOUR GOALS.': ['VOS OBJECTIFS.', 'أهدافك.'], 'YOUR JOURNEY.': ['VOTRE PARCOURS.', 'رحلتك.'], 'Train with me, challenge yourself and have fun.': ['Entraînez-vous avec moi, dépassez-vous et amusez-vous.', 'تدرّب معي، وتحدَّ نفسك واستمتع.'],
  "Some days, you want to push your limits. Others, you just want to move and feel good. Wherever you're starting, we'll find what works for you. Together.": ["Certains jours, vous voulez vous dépasser. D'autres, simplement bouger et vous sentir bien. Quel que soit votre point de départ, trouvons ce qui vous convient. Ensemble.", 'في بعض الأيام تريد تجاوز حدودك، وفي أيام أخرى تريد فقط الحركة والشعور بالراحة. مهما كانت بدايتك، سنجد ما يناسبك. معًا.'],
  'Personal trainer helping a client during a strength session': ['Exercice de renforcement musculaire', 'تمرين لتقوية العضلات'],
  'Training': ['Entraînement', 'التدريب'], 'Cardio': ['Cardio', 'الكارديو'], 'Running': ['Course', 'الجري'], 'Combat': ['Combat', 'القتال'], 'Games': ['Jeux', 'الألعاب'], 'Challenges': ['Défis', 'التحديات'], 'CHOOSE YOUR ACTIVITY': ['CHOISIR MON ACTIVITÉ', 'اختر نشاطك'],
  'FIELD COACHING': ['TERRAIN DE SPORT', 'تدريب الميدان'], 'TACTICAL FOCUS': ['DISCIPLINE ET TACTIQUE', 'تركيز تكتيكي'], 'OUTDOOR MOTIVATION': ['MOTIVATION EN PLEIN AIR', 'تحفيز في الهواء الطلق'], 'PERSONAL GUIDANCE': ['ACCOMPAGNEMENT SUR MESURE', 'توجيه شخصي'], 'HIGH INTENSITY': ['HAUTE INTENSITÉ', 'شدة عالية'], 'PERFORMANCE & FOCUS': ['PERFORMANCE ET DISCIPLINE', 'أداء وتركيز'],
  'COACHING GALLERY': ['GALERIE DU COACH', 'معرض المدرب'], 'SEE COACH IN ACTION': ['LE COACH EN ACTION', 'المدرب أثناء العمل'],
  '5+ Years Experience': ['5+ Ans d\'expérience', '+5 سنوات من الخبرة'], '100+ Athletes Guided': ['100+ Sportifs accompagnés', '+100 رياضي تم توجيههم'], '100% Personal Dedication': ['100% Engagement personnel', '100% تفانٍ شخصي'],
  'CLICK TO SWITCH VIEW': ['CLIQUER POUR CHANGER', 'انقر لتغيير العرض'],
  "LET'S CONNECT": ['PARLONS-EN', 'لنتواصل'], 'LESS THINKING.': ['MOINS HÉSITER.', 'تفكير أقل.'], 'MORE MOVING.': ['PLUS BOUGER.', 'حركة أكثر.'], 'Your next session starts with a conversation.': ['Votre prochaine séance commence par un échange.', 'حصتك القادمة تبدأ بمحادثة.'], 'BOOK A SESSION': ['RÉSERVER UNE SÉANCE', 'احجز حصة'],
  'EMAIL': ['EMAIL', 'البريد الإلكتروني'], 'PHONE': ['TÉLÉPHONE', 'الهاتف'], 'LOCATION': ['LIEU', 'المكان'], 'SOCIAL': ['RÉSEAUX SOCIAUX', 'التواصل الاجتماعي'], 'Available soon': ['Bientôt disponible', 'متاح قريبًا'], 'Coming soon': ['À venir', 'قريبًا'], 'Location agreed with your coach': ['Lieu à convenir avec votre coach', 'المكان بالاتفاق مع مدربك'], 'Instagram': ['Instagram', 'إنستغرام'],
  'MOVE WITH PURPOSE. ENJOY THE PROCESS.': ['BOUGEZ AVEC ENVIE. PROFITEZ DU PARCOURS.', 'تحرّك بهدف. واستمتع بالرحلة.'], 'PULSE. All rights reserved.': ['PULSE. Tous droits réservés.', 'PULSE. جميع الحقوق محفوظة.'],
  'Your coach on the sports field': ['Votre coach sur le terrain de sport', 'مدربك في الملعب الرياضي'],
  'A shared moment at the sports club': ['Un moment partagé au club de sport', 'لحظة مشتركة في النادي الرياضي'],
  'YOUR NEXT MOVE': ['VOTRE PROCHAIN PAS', 'خطوتك القادمة'], 'YOU CHOSE': ['VOUS AVEZ CHOISI', 'لقد اخترت'], 'CONFIRM': ['CONFIRMER', 'تأكيد'], 'BACK': ['RETOUR', 'رجوع'], "LET'S MAKE IT HAPPEN": ["C'EST PARTI", 'لنبدأ معًا'], 'YOUR NEXT': ['VOTRE PROCHAINE', 'حصتك'], 'SESSION.': ['SÉANCE.', 'القادمة.'], 'A few details. Then we\'ll take it from here.': ['Quelques détails, puis on organise la suite.', 'بعض التفاصيل، ثم نتولى الباقي.'],
  'Name': ['Nom', 'الاسم'], 'Your name': ['Votre nom', 'اسمك'], 'Email': ['Email', 'البريد الإلكتروني'], 'Phone': ['Téléphone', 'الهاتف'], '(optional)': ['(facultatif)', '(اختياري)'], 'Your phone number': ['Votre numéro de téléphone', 'رقم هاتفك'], 'Selected activity': ['Activité choisie', 'النشاط المختار'], 'Message': ['Message', 'الرسالة'], "Anything you'd like your coach to know?": ['Une information à transmettre à votre coach ?', 'هل تريد إخبار مدربك بشيء؟'], 'SENDING...': ['ENVOI EN COURS...', 'جارٍ الإرسال...'], 'Your details are only used to arrange your session.': ['Vos coordonnées servent uniquement à organiser votre séance.', 'تُستخدم معلوماتك فقط لتنظيم حصتك.'],
  'REQUEST SENT': ['DEMANDE ENVOYÉE', 'تم إرسال الطلب'], 'Your coach has received your choice.': ['Votre coach a bien reçu votre choix.', 'تلقى مدربك اختيارك.'], 'sessionFollowUp': ['Votre coach vous contactera pour organiser votre séance : {activity}.', 'سيتواصل معك مدربك لتنظيم حصتك: {activity}.'], 'BACK TO HOME': ["RETOUR À L'ACCUEIL", 'العودة للرئيسية'],
  'Please enter your name.': ['Veuillez saisir votre nom.', 'يرجى إدخال اسمك.'], 'Online requests are not available yet. Please contact your coach directly.': ['Les demandes en ligne ne sont pas encore disponibles. Contactez directement votre coach.', 'الطلبات عبر الإنترنت غير متاحة حاليًا. يرجى التواصل مع مدربك مباشرة.'], 'Your request could not be sent. Please try again.': ["Votre demande n'a pas pu être envoyée. Veuillez réessayer.", 'تعذر إرسال طلبك. يرجى المحاولة مجددًا.'],
};

type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void; t: (key: string) => string };
const LanguageContext = createContext<LanguageContextValue | null>(null);
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    try { const saved = localStorage.getItem('pulse-language'); if (saved === 'fr' || saved === 'ar' || saved === 'en') return saved; } catch { /* Storage can be unavailable in private browsing. */ }
    return 'en';
  });
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.title = language === 'fr' ? 'PULSE | Coaching personnel' : language === 'ar' ? 'PULSE | تدريب شخصي' : 'PULSE | Personal Coaching';
    try { localStorage.setItem('pulse-language', language); } catch { /* Language still works without storage. */ }
  }, [language]);
  const t = (key: string) => {
    if (language === 'en') return key === 'heroChallenge' ? 'CHALLENGE' : key === 'sessionFollowUp' ? "They'll get in touch to plan your {activity} session." : key;
    return translations[key]?.[language === 'fr' ? 0 : 1] ?? key;
  };
  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}
export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('useLanguage requires LanguageProvider');
  return value;
}
