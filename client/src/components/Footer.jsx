import React from 'react'
import { Link } from 'react-router-dom'
import { FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#0B0F1A] text-gray-300 pt-14 pb-10 mt-24 border-t border-gray-800">

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-3xl font-bold text-white tracking-wide">CarRental</h2>
          <p className="mt-4 text-gray-400 text-sm leading-relaxed">
            Premium car rental service offering comfort, safety and reliability. 
            Drive your dream car today.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/cars" className="hover:text-white transition">Available Cars</Link></li>
            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Customer Support</h3>
          <ul className="space-y-2">
            <li><Link className="hover:text-white transition">FAQs</Link></li>
            <li><Link className="hover:text-white transition">Help Center</Link></li>
            <li><Link className="hover:text-white transition">Insurance & Safety</Link></li>
            <li><Link className="hover:text-white transition">Terms & Conditions</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <p className="text-gray-400 text-sm">📍 Mumbai, India</p>
          <p className="text-gray-400 text-sm mt-1">📞 +91 98765 43210</p>
          <p className="text-gray-400 text-sm mt-1">✉ support@carrental.com</p>

          <div className="flex space-x-4 mt-4">
            <FaInstagram size={24} className="cursor-pointer hover:text-white"/>
            <FaFacebook size={24} className="cursor-pointer hover:text-white"/>
            <FaXTwitter size={24} className="cursor-pointer hover:text-white"/>
          </div>

        </div>
      </div>

      <div className="border-t border-gray-800 mt-12 pt-5 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} CarRental. All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer
