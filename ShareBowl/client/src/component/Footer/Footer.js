import React from 'react'

const Footer = () => {
  return (
    <footer className="relative left-0 bottom-0 p-4 mt-10 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="/" className="hover:underline">ShareBowl</a>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 list-none">
            <li>
                <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
            </li>

            <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
            </li>

            <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">Licensing</a>
            </li>
            
            <li>
                <a href="#" className="hover:underline">Contact</a>
            </li>
        </ul>
    </footer>


  )
}

export default Footer