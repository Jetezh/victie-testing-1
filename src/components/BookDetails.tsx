import React from 'react'
import Image from 'next/image'
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

function BookDetails({ data } : { data: dataProps }) {
  return (
    <div className="w-3/4 mx-auto">
      <div 
      className="bg-white shadow-lg rounded-lg overflow-hidden"
      // style={{viewTransitionName: `bookcard-bg-${data.id}`}}
      >
        <div className="md:flex">
          <div className="md:flex-shrink-0 p-6">
              <Image
                id="cover-image"
                src={data.img} 
                alt={data.title} 
                width={300}
                height={500}
                className=" object-cover rounded-lg shadow-md"
                style={{ viewTransitionName: `book-image-${data.id}` }}
              />
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {data.title}
            </h1>
            <a className='text-gray-500 text-sm font-medium'>{data.author}</a>
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-2">
              {data.genre}
            </div>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {data.description}
            </p>
            <div className="w-full border-1 border-gray-200"></div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 font-medium">{data.favoriteCount} favorites</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 font-medium">{data.viewCount} views</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetails