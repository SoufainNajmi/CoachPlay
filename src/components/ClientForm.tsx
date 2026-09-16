import { useLanguage } from '../lib/language';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowUpRight, Check, LoaderCircle, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { activities, type Activity } from '../data/activities';
import { sendRequest } from '../lib/emailjs';
export default function ClientForm({initialActivity, onClose}: {initialActivity: Activity | null; onClose: () => void}) {
  const { t } = useLanguage();
  const [activity,setActivity] = useState<Activity>(initialActivity ?? activities[0]);
  const [step,setStep] = useState<'choice'|'form'|'success'>(initialActivity ? 'choice' : 'form');
  const [pending,setPending] = useState(false);
  const [error,setError] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { const previous = document.activeElement as HTMLElement; dialog.current?.showModal(); const overflow = document.body.style.overflow; document.body.style.overflow='hidden'; return () => {document.body.style.overflow=overflow; previous?.focus();}; }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if(pending) return;
    const data = new FormData(event.currentTarget);
    const name=String(data.get('name') ?? '').trim();
    if(!name) {setError(t("Please enter your name."));return;}
    setPending(true);setError('');
    try { await sendRequest({ name, email:String(data.get('email')).trim(), phone:String(data.get('phone')).trim(), activity:activity.title, message:String(data.get('message')).trim() });setStep('success'); }
    catch(err) {setError(t(err instanceof Error && err.message === 'Online requests are not available yet. Please contact your coach directly.' ? err.message : 'Your request could not be sent. Please try again.'));}
    finally {setPending(false);}
  }
  const Icon=activity.icon;
  return <dialog ref={dialog} className="booking-dialog" aria-labelledby="dialog-title" onCancel={e => {e.preventDefault();if(!pending)onClose();}} onClick={e => {if(e.target===e.currentTarget&&!pending)onClose();}}><div className="dialog-inner"><button className="icon-button dialog-close" aria-label={t("Close")} disabled={pending} onClick={onClose}><X/></button>{step==='choice' ? <div className="choice-step"><span className="eyebrow red-text">{t("YOUR NEXT MOVE")}</span><motion.div className={`choice-icon chosen-${activity.id}`} initial={{rotateY:-90,scale:.7}} animate={{rotateY:0,scale:1}} transition={{type:'spring', stiffness:160}}><Icon size={52}/></motion.div><p className="eyebrow">{t("YOU CHOSE")}</p><h2 id="dialog-title">{t(activity.title)}</h2><p>{t(activity.prompt)}</p><button className="button full-width" onClick={() => setStep('form')}>{t("CONFIRM")} <ArrowUpRight size={18}/></button><button className="back-button" onClick={onClose}><ArrowLeft size={16}/> {t("BACK")}</button></div> : step==='form' ? <><span className="eyebrow red-text">{t("LET'S MAKE IT HAPPEN")}</span><h2 id="dialog-title">{t("YOUR NEXT")}<br/>{t("SESSION.")}</h2><p className="form-subtitle">{t("A few details. Then we'll take it from here.")}</p><form onSubmit={submit}><fieldset disabled={pending}><label>{t("Name")} <span>*</span><input name="name" autoComplete="name" required maxLength={100} placeholder={t("Your name")}/></label><label>{t("Email")} <span>*</span><input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com"/></label><label>{t("Phone")} <small>{t("(optional)")}</small><input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder={t("Your phone number")}/></label><label>{t("Selected activity")}<select value={activity.id} onChange={e => setActivity(activities.find(a => a.id===e.target.value)!)}>{activities.map(a => <option key={a.id} value={a.id}>{t(a.title)}</option>)}</select></label><label>{t("Message")} <small>{t("(optional)")}</small><textarea name="message" rows={3} maxLength={2000} placeholder={t("Anything you'd like your coach to know?")}/></label></fieldset>{error&&<p className="form-error" role="alert">{error}</p>}<button className="button full-width" disabled={pending} type="submit">{pending ? <><LoaderCircle className="spin" size={18}/> {t("SENDING...")}</> : <>{t("CONFIRM")} <ArrowUpRight size={18}/></>}</button><p className="privacy-note">{t("Your details are only used to arrange your session.")}</p><button className="back-button" disabled={pending} type="button" onClick={() => {setError('');setStep('choice');}}><ArrowLeft size={16}/> {t("BACK")}</button></form></> : <div className="success-step"><div className="success-icon"><Check size={42}/></div><h2 id="dialog-title">{t("REQUEST SENT")}</h2><p>{t("Your coach has received your choice.")}</p><p className="form-subtitle">{t("sessionFollowUp").replace("{activity}", t(activity.title).toLowerCase())}</p><button className="button full-width" onClick={() => {onClose();window.location.hash='home';}}>{t("BACK TO HOME")} <ArrowUpRight size={18}/></button></div>}</div></dialog>;
}
