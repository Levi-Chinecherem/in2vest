"use client"; // Marking this component as a Client Component

import { useEffect, useState } from 'react';
import Link from 'next/link'; // Import Link for better navigation

const CallToActionSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in effect after component mounts
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Delay to create a smoother appearance

    // Cleanup function to clear the timeout
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="py-10 bg-blue-600 text-white text-center">
      <h2
        className={`text-3xl md:text-4xl font-bold mb-4 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        Join the MemeVest Revolution!
      </h2>
      <p
        className={`text-lg md:text-xl mb-6 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        Don’t miss your chance to be part of the MemeVest movement. Purchase your MVST tokens today and unlock In2vest exclusive benefits!
      </p>
      <Link href="/purchase" className={`inline-block bg-yellow-400 text-blue-600 font-semibold py-2 px-4 rounded hover:bg-yellow-300 transition duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        Buy MVST Tokens
      </Link>
    </section>
  );
};

export default CallToActionSection;
