import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto">
        <div className="text-center">
          <p className="text-sm">Contact Us: 1234 Street Name, City Name, Country | Phone: +123 456 7890 | Email: example@example.com</p>
          <p className="text-sm mt-2">Follow Us: <a href="#" className="text-gray-400 hover:text-white transition duration-300">Instagram</a> | <a href="#" className="text-gray-400 hover:text-white transition duration-300">Twitter</a> | <a href="#" className="text-gray-400 hover:text-white transition duration-300">Facebook</a></p>
        </div>
      </div>
      <hr className="border-t border-gray-800 mt-4" />
      <p className="text-center text-sm mt-4">&copy; {new Date().getFullYear()} Agrizone. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
