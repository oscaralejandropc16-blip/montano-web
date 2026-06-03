import { getSettings } from "@/lib/actions";
import AboutClient from "./AboutClient";

export const revalidate = 0;

export default async function About() {
  const settings = await getSettings();
  
  return (
    <AboutClient settings={settings} />
  );
}
