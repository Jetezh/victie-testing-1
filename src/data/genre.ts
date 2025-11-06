import { FaRegHeart, FaRedhat, FaCity, FaMagnifyingGlass } from "react-icons/fa6";
import { RiGeminiLine, RiFlashlightLine, RiGlobeLine } from "react-icons/ri";
import { LuSword, LuGhost, LuLaugh, LuUniversity } from "react-icons/lu";
import { HiOutlineBriefcase } from "react-icons/hi2";
import { TbRating18Plus } from "react-icons/tb";
import { GiThroneKing, GiTimeTrap, GiWerewolf } from "react-icons/gi";
import { GrSystem } from "react-icons/gr";

interface Genre {
    id: string;
    icon: React.ComponentType<{ className?: string }>;
    genre: string;
    color: string
}

export const genreData: Genre[] = [
    { id: "Romance", icon: FaRegHeart, genre: "Romance", color: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300"},
    { id: "Fantasi", icon: RiGeminiLine, genre: "Fantasi", color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" },
    { id: "Action", icon: LuSword, genre: "Action", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"},
    { id: "Horror", icon: LuGhost, genre: "Horror", color: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300"},
    { id: "komedi", icon: LuLaugh, genre: "komedi", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"},
    { id: "CEO", icon: HiOutlineBriefcase, genre: "CEO", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"},
    { id: "Mafia", icon: FaRedhat, genre: "Mafia", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"},
    { id: "Sci-Fi", icon: RiFlashlightLine, genre: "Sci-Fi", color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"},
    { id: "Petualangan", icon: RiGlobeLine, genre: "Petualangan", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" },
    { id: "Erotika", icon: TbRating18Plus, genre: "Erotika", color: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300" },
  { id: "Fiksi Urban", icon: FaCity, genre: "Fiksi Urban", color: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300" },
  { id: "Harem", icon: TbRating18Plus, genre: "Harem", color: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-300" },
  { id: "Kampus", icon: LuUniversity, genre: "Kampus", color: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300" },
  { id: "Kawin Kontrak", icon: TbRating18Plus, genre: "Kawin Kontrak", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300" },
  { id: "Kerajaan", icon: GiThroneKing, genre: "Kerajaan", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300" },
  { id: "Misteri", icon: FaMagnifyingGlass, genre: "Misteri", color: "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300" },
  { id: "New Adult", icon: TbRating18Plus, genre: "New Adult", color: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300" },
  { id: "Rumah Tangga", icon: TbRating18Plus, genre: "Rumah Tangga", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" },
  { id: "Selingkuh", icon: TbRating18Plus, genre: "Selingkuh", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" },
  { id: "Sistem", icon: GrSystem, genre: "Sistem", color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300" },
  { id: "Time Travel", icon: GiTimeTrap, genre: "Time Travel", color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300" },
  { id: "Werewolf", icon: GiWerewolf, genre: "Werewolf", color: "bg-gray-200 text-gray-700 dark:bg-gray-800/40 dark:text-gray-300" },
]