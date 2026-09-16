# PULSE - Personal coaching

Site vitrine React / TypeScript / Vite, Tailwind CSS, Framer Motion et React Three Fiber. Aucun backend, compte ou paiement.

## Demarrer

```sh
npm install
npm run dev
```

`npm run build` verifie TypeScript et cree `dist/`. Heberger ce dossier sur un service statique.

## EmailJS

Creer `.env.local` a partir de `.env.example`, puis renseigner les trois variables `VITE_EMAILJS_*` et redemarrer Vite. Ces identifiants sont publics ; ne jamais ajouter de cle privee au frontend.

Dans EmailJS, connecter le service email, creer un template avec le destinataire fixe du coach et Reply-To `{{reply_to}}`. Utiliser ces variables dans le contenu :

```text
Client Name: {{client_name}}
Client Email: {{client_email}}
Phone: {{phone}}
Selected Activity: {{selected_activity}}
Message: {{message}}
```

Restreindre les domaines autorises dans EmailJS au domaine du site (et localhost pour les essais). Documentation : https://www.emailjs.com/docs/sdk/send/

Le succes n'est affiche qu'apres une reponse positive d'EmailJS. Sans configuration, le formulaire affiche une erreur et conserve les informations. Les demandes ne sont pas stockees localement.

## Personnaliser

- Coordonnees et lien Instagram : variables `VITE_COACH_*` dans `.env.local`.
- Activites et photos : `src/data/activities.ts`.
- Presentation du coach : `src/components/CoachSection.tsx`.
- PULSE est un nom de travail. Les photos Unsplash sont illustratives et doivent etre remplacees par celles du coach avant publication.
- Les polices Google Fonts et les images Unsplash necessitent une connexion ; des polices de repli sont definies.

## Verification

```sh
npm test
```

Les tests utilisent Google Chrome installe sur la machine et simulent EmailJS pour verifier succes et echec sans envoyer d'email. Une verification de livraison reelle avec votre compte reste necessaire avant publication.
