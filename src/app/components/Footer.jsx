import React from 'react';
import { FaFacebookSquare, FaTwitterSquare, FaLinkedin, FaYoutubeSquare } from 'react-icons/fa';

const Footer = () => {
  // Get the current year
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-transparent py-6 text-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex justify-center space-x-6">
          <div className=" hover:text-blue-700 text-2xl cursor-pointer transition duration-300">
            <FaFacebookSquare />
          </div>
          <div className=" hover:text-blue-700 text-2xl cursor-pointer transition duration-300">
            <FaTwitterSquare />
          </div>
          <div className=" hover:text-blue-700 text-2xl cursor-pointer transition duration-300">
            <FaLinkedin />
          </div>
          <div className=" hover:text-blue-700 text-2xl cursor-pointer transition duration-300">
            <FaYoutubeSquare />
          </div>
        </div>
        <div className="flex space-x-4 text-gray-500">
        <div className="flex space-x-4 text-gray-500">
          Conditions of Use
        </div>
        <div className="flex space-x-4 text-gray-500">
          Privacy Policy
        </div>
        <div className="flex space-x-4 text-gray-500">
          Press Room
        </div>
        </div>
        <div className="text-gray-500">
          <span>&copy; {currentYear} MovieHub by Chidinma Nwaneti</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
