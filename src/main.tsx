import React from 'react';
import ReactDOM from 'react-dom/client';
import { MotionConfig } from 'framer-motion';
import Home from './pages/Home';
import './styles.css';
import { LanguageProvider } from './lib/language';
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><LanguageProvider><MotionConfig reducedMotion="user"><Home /></MotionConfig></LanguageProvider></React.StrictMode>);
