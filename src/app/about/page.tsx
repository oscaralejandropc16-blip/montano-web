import { getSettings } from "@/lib/actions";
import AboutClient from "./AboutClient";

export const revalidate = 3600;

export default async function About() {
  const settings = await getSettings();
  
  return (
    <AboutClient settings={settings} />
  );
}
