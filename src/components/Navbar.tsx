import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <nav className='shadow-md py-2 px-7 mb-10'>
        <div className='flex flex-row justify-center gap-2 items-center'>
            <Link href="/" className='px-3 py-2 hover:bg-gray-200 duration-300 rounded-md'>Home</Link>
            <Link href="/user/page2" className='px-3 py-2 hover:bg-gray-200 duration-300 rounded-md'>Page 2</Link>
            <Link href="/user/page3" className='px-3 py-2 hover:bg-gray-200 duration-300 rounded-md'>Page 3</Link>
        </div>
    </nav>
  )
}

export default Navbar