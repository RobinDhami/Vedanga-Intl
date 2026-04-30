import { Camera, Code, Mic, Music, Palette } from "lucide-react";

import { legacyClubs } from "@/data/cms-legacy";

const iconMap = {
  code: <Code className="h-6 w-6" />,
  camera: <Camera className="h-6 w-6" />,
  mic: <Mic className="h-6 w-6" />,
  palette: <Palette className="h-6 w-6" />,
  music: <Music className="h-6 w-6" />,
} as const;

export const clubs = legacyClubs.map((club) => ({
  ...club,
  icon: iconMap[club.icon_name],
  color: "bg-[#D41D33]/10 text-[#D41D33]",
  meetingDay: club.meeting_day,
  image: club.image_url,
}));
