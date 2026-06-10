import { getContactMessages } from "@/lib/actions";
import MensajesClient from "./MensajesClient";

export const dynamic = 'force-dynamic';

export default async function MensajesPage() {
  const mensajes = await getContactMessages();
  return <MensajesClient initialMensajes={mensajes} />;
}
