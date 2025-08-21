import assets from "@/assets/assets";
import { StaticImageData } from "next/image";

export type Book = {
	id: number;
	img: string | StaticImageData;
	title: string;
	author: string;
	novelStatus: string;
	date: string;
	genre: string;
	description: string;
	favoriteCount: number;
	viewCount: number;
};

export const books: Book[] = [
	{
		id: 1,
		img: assets.gambar1,
		title: "Book Title",
		author: "Author",
		novelStatus: "Novel Status",
		date: "Rabu, 20 Agustus 2025",
		genre: "Fiction",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
		favoriteCount: 10,
		viewCount: 100,
	},
	{
		id: 2,
		img: assets.gambar2,
		title: "Book Title 2",
		author: "Author",
		novelStatus: "Novel Status",
		date: "Rabu, 20 Agustus 2025",
		genre: "Non-Fiction",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
		favoriteCount: 5,
		viewCount: 50,
	},
	{
		id: 3,
		img: assets.gambar3,
		title: "Book Title 3",
		author: "Author",
		novelStatus: "Novel Status",
		date: "Rabu, 20 Agustus 2025",
		genre: "Fiction",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
		favoriteCount: 8,
		viewCount: 80,
	},
];
