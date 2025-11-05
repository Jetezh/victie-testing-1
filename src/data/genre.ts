import { 
    FaRegHeart,
    FaRedhat
   } from "react-icons/fa";
import {
    RiGeminiLine,
    RiFlashlightLine,
    RiGlobeLine
} from "react-icons/ri";
import {
    LuSword,
    LuGhost,
    LuLaugh
} from "react-icons/lu";
import {
    HiOutlineBriefcase
} from "react-icons/hi";

interface Genre {
    id: string;
    icon: React.ComponentType<{ className?: string }>;
    genre: string;
    color: string
}

export const genreData: Genre[] = [
    { id:"Romance", icon: FaRegHeart, genre: "Romance", color: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300"},
    { id: "Fantasi", icon: RiGeminiLine, genre: "Fantasi", color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" },
    { id: "Action", icon: LuSword, genre: "Action", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"},
    { id: "Horror", icon: LuGhost, genre: "Horror", color: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300"},
    { id: "komedi", icon: LuLaugh, genre: "komedi", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"},
    { id: "CEO", icon: HiOutlineBriefcase, genre: "CEO", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"},
    { id: "Mafia", icon: FaRedhat, genre: "Mafia", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"},
    { id: "Sci-Fi", icon: RiFlashlightLine, genre: "Sci-Fi", color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"},
    { id: "Petualangan", icon: RiGlobeLine, genre: "Petualangan", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" },
]