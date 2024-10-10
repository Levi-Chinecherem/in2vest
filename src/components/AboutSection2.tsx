"use client"; // This directive makes the component a Client Component

import { useEffect, useState } from 'react';
import { FaRocket, FaUsers } from 'react-icons/fa'; // Importing icons for visual appeal

const AboutSection: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Simulate the animation trigger on component mount
    setTimeout(() => {
      setVisible(true);
    }, 100);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-800 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-extrabold mb-6 drop-shadow-lg">About In2vest</h2>
        <p
          className={`text-lg md:text-xl mb-8 px-4 transform transition-all duration-500 $ {
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          In2Vest is the leading platform that combines the power of memes with blockchain technology.
          Join us to invest in the future of fun and financial freedom!
        </p>
        <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-16">
          <div className="flex flex-col items-center">
            <FaRocket className="text-6xl mb-2 animate-bounce" />
            <h3 className="text-2xl font-semibold">Innovative Solutions</h3>
            <p className="text-gray-300 text-center">
              We leverage cutting-edge technology to bring you unique investment opportunities.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <FaUsers className="text-6xl mb-2 animate-bounce" />
            <h3 className="text-2xl font-semibold">Community Driven</h3>
            <p className="text-gray-300 text-center">
              Our platform thrives on community input and collaborative growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
