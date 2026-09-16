import emailjs from '@emailjs/browser';
export type ClientRequest = { name: string; email: string; phone: string; activity: string; message: string };
export async function sendRequest(data: ClientRequest) {
  const service = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const template = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  if (!service || !template || !publicKey) throw new Error('Online requests are not available yet. Please contact your coach directly.');
  await emailjs.send(service, template, { client_name: data.name, client_email: data.email, reply_to: data.email, phone: data.phone || 'Not provided', selected_activity: data.activity, message: data.message || 'No message' }, { publicKey, limitRate: { throttle: 10000 } });
}
