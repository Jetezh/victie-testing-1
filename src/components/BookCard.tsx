import React from 'react'
import Image from 'next/image'
import { FaHeart } from "react-icons/fa";
import { BsBarChartFill } from "react-icons/bs";
import { StaticImageData } from 'next/image'

type dataProps = {
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
}

function BookCard({data} : { data: dataProps }) {
  return (
    <div 
    className='bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105'
    style={{viewTransitionName: `bookcard-bg-${data.id}`}}
    >
        <div className='flex flex-row'>
            <Image
              id="cover-image" 
              src={data.img} 
              alt={data.title} 
              className='w-32 h-48 object-cover mr-4 rounded-lg'
              // style={{ viewTransitionName: `book-image-${data.id}` }} 
              />
            <div className='flex flex-col justify-between'>
              <div>
                <h1 className='font-semibold text-lg text-gray-800 hover:text-indigo-600 transition-colors'>{data.title}</h1>
                <h2 className='text-gray-500 text-sm font-medium'>{data.genre}</h2>
                <p className='text-gray-600 text-sm line-clamp-3 mt-2'>{data.description}</p>
              </div>
              <div className='flex flex-row gap-4 mt-3'>
                <span className='flex flex-row items-center gap-1 text-sm text-gray-600'>
                  <FaHeart className='text-red-400' />
                  {data.favoriteCount}
                </span>
                <span className='flex flex-row items-center gap-1 text-sm text-gray-600'>
                  <BsBarChartFill className='text-blue-400'/>
                  {data.viewCount}
                </span>
              </div>
            </div>
        </div>
    </div>
  )
}

export default BookCard;