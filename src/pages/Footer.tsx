import { useState } from 'react';
import emailjs from 'emailjs-com';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [replyTo, setReplyTo] = useState('');

  const handleSubscribe = (event:any) => {
    event.preventDefault(); 

    const formData = {
      from_name: ' Customer', 
      from_email: email,
      message: message,
      reply_to: replyTo
    };

    emailjs.send('service_97h2idt', 'template_shzhi5p', formData, 'XRyAqU5vNHh9WXaqb')
    .then((response) => {
      console.log('Email sent:', response);
    })
    .catch((error) => {
      console.error('Email error:', error);
    });

    setEmail('');
    setMessage('');
    setReplyTo('');
  };

  const handleEmailChange = (event:any) => {
    setEmail(event.target.value);
  };

  const handleMessageChange = (event:any) => {
    setMessage(event.target.value);
  };

  const handleReplyToChange = (event:any) => {
    setReplyTo(event.target.value);
  };

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex flex-wrap justify-center items-center">
        <div className="w-full md:w-1/3 px-4 mb-4 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p className="text-sm">1234 Street Name, City Name, Country</p>
          <p className="text-sm">Phone: +123 456 7890</p>
          <p className="text-sm">Email: example@example.com</p>
        </div>
        <div className="w-full md:w-1/3 px-4 mb-4 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-2">
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">Instagram</a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">Facebook</a>
          </div>
        </div>
        <div className="w-full md:w-1/3 px-4">
          <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
          <form className="flex flex-col " onSubmit={handleSubscribe}>
            <input type="email" placeholder="Your email" className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none mb-2 md:mb-0 md:mr-2" value={email} onChange={handleEmailChange} />
            <textarea placeholder="Your message" className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none mb-2 md:mb-0 md:mr-2 resize-none" style={{ display: 'inline-block' }} value={message} onChange={handleMessageChange}></textarea>
            {/* <input type="text" placeholder="Reply-To (optional)" className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none mb-2 md:mb-0 md:mr-2" value={replyTo} onChange={handleReplyToChange} /> */}
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md transition duration-300">Subscribe</button>
          </form>
        </div>
      </div>
      <hr className="border-t border-gray-800 mt-8" />
      <p className="text-center text-lg mt-4">&copy;  {new Date().getFullYear()} Agrizone.  All rights reserved.</p>
    </footer>
  );
};

export default Footer;
