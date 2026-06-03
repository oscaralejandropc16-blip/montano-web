import { getSettings } from "@/lib/actions";
import HomeClient from "./HomeClient";

export const revalidate = 0;

export default async function Home() {
  const settings = await getSettings();
  
  return (
    <HomeClient settings={settings} />
  );
}
