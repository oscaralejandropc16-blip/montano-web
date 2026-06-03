import { getSettings } from "@/lib/actions";
import HomeClient from "./HomeClient";

export const revalidate = 0;

export default async function HomePage() {
  const rows = await getSettings();
  const heroVideoUrl = rows.hero_video_url || "/hero-video.mp4";

  return <HomeClient heroVideoUrl={heroVideoUrl} />;
}
