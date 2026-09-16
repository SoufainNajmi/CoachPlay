# 🏋️ PULSE — Personal Coaching

> Modern personal coaching website built with React, TypeScript, Vite, Tailwind CSS, Framer Motion and React Three Fiber.

PULSE is a **modern showcase website for a personal coach**, designed to present coaching activities, introduce the coach and allow potential clients to send a request through a contact form.

The project is **frontend-only**: no backend, authentication system, database or payment system is required.

---

## 📸 Demo

![PULSE Personal Coaching Demo](./dist/assets/img/Screenshot%20from%202026-09-16%2000-14-56.png)
---

## ✨ Features

* 🏋️ Personal coaching presentation
* 🎯 Coaching activities and services
* 📱 Responsive design
* 🎨 Modern UI with Tailwind CSS
* ✨ Smooth animations with Framer Motion
* 🌐 3D elements with React Three Fiber
* 📩 Contact form powered by EmailJS
* 📧 Email notifications for new requests
* 📸 Activity images
* 📱 Instagram/social media integration
* ⚡ Fast development with Vite
* 🔒 No private API keys exposed in the frontend

---

## 🛠️ Tech Stack

| Technology            | Usage                    |
| --------------------- | ------------------------ |
| **React**             | Frontend framework       |
| **TypeScript**        | Type-safe development    |
| **Vite**              | Development & build tool |
| **Tailwind CSS**      | UI styling               |
| **Framer Motion**     | Animations               |
| **React Three Fiber** | 3D elements              |
| **EmailJS**           | Contact form emails      |
| **Vitest / Testing**  | Automated tests          |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/SoufainNajmi/CoachPlay.git
cd CoachPlay
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The application will be available through the local Vite development server.

---

## 📦 Production Build

To create the production version:

```bash
npm run build
```

This command:

* checks TypeScript
* builds the application
* generates the `dist/` directory

The `dist/` directory can then be deployed to a static hosting service.

---

## 📧 EmailJS Configuration

PULSE uses **EmailJS** to send contact form submissions without requiring a backend.

### 1. Create the environment file

Create `.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

Then configure the EmailJS variables:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Restart Vite after modifying the environment variables.

### 2. Configure the EmailJS template

Configure the email service and create a template with the coach's fixed recipient.

Use:

```text
Client Name: {{client_name}}

Client Email: {{client_email}}

Phone: {{phone}}

Selected Activity: {{selected_activity}}

Message: {{message}}
```

For the reply address, use:

```text
Reply-To: {{reply_to}}
```

### 🔐 Security

EmailJS frontend identifiers are public by design.

**Never expose private or secret keys in the frontend.**

It is also recommended to restrict the authorized domains in EmailJS:

* Production domain
* `localhost` for development/testing

Official documentation:

https://www.emailjs.com/docs/sdk/send/

---

## 📝 Contact Form Behavior

The contact form only displays a success message after receiving a positive response from EmailJS.

If EmailJS is not configured or the request fails:

* ❌ An error message is displayed
* 📝 User information is preserved
* 🚫 No request is stored locally

---

## 🎨 Customization

### Coach information

Coach contact information and Instagram link can be configured using:

```env
VITE_COACH_*
```

inside `.env.local`.

### Activities

Activities and their images are managed in:

```text
src/data/activities.ts
```

### Coach presentation

The coach presentation section is located at:

```text
src/components/CoachSection.tsx
```

### Project name

`PULSE` is currently a working project name and can be replaced before production.

### Images

The current Unsplash images are illustrative.

Replace them with the coach's own professional images before publishing the website.

### Fonts & external images

Google Fonts and Unsplash images require an internet connection.

Fallback fonts are already configured for offline/basic rendering.

---

## 🧪 Testing

Run the test suite with:

```bash
npm test
```

The tests use Google Chrome installed on the machine and simulate EmailJS requests to verify:

* ✅ Successful form submission
* ❌ Failed form submission
* 📩 EmailJS behavior without sending real emails

A real delivery test using the production EmailJS account is still recommended before publishing.

---

## 📁 Project Structure

```text
CoachPlay/
├── public/
│   └── demo.png
│
├── src/
│   ├── components/
│   │   └── CoachSection.tsx
│   │
│   ├── data/
│   │   └── activities.ts
│   │
│   └── ...
│
├── .env.example
├── .env.local
├── package.json
├── vite.config.ts
└── README.md
```

---

## 🌐 Deployment

After building the project:

```bash
npm run build
```

Deploy the generated:

```text
dist/
```

directory to a static hosting provider.

---

## 👨‍💻 Author

**Soufain Najmi**

Full-Stack Developer • React • Laravel • AI Automation

GitHub:
https://github.com/SoufainNajmi

---

## 📄 License

This project is intended for demonstration and portfolio purposes.
