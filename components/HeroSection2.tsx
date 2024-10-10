"use client"; // This directive makes the component a Client Component

import Link from 'next/link';
import { useEffect, useState } from 'react';

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set the visibility after a slight delay to create an entrance effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200); // Delay before showing the elements

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-t from-gray-900 to-gray-800 overflow-hidden flex flex-col items-center justify-center text-center text-white p-6">
      {/* Animated Fire Flames */}
      <div className="absolute bottom-0 left-0 right-0 h-[45%] flames-animation opacity-75"></div>

      <h1
        className={`text-5xl md:text-6xl font-extrabold text-blue-600 mb-4 transform transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'
        }`}
      >
        Welcome to In2Vest
      </h1>
      <p
        className={`text-lg md:text-xl lg:text-2xl mb-8 transform transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'
        }`}
      >
        Invest in the future of memes and community-driven projects!
      </p>
      <Link
        href="/exe"
        className="bg-yellow-500 hover:bg-yellow-400 text-blue-800 font-semibold py-3 px-6 rounded-lg transition duration-300"
      >
        Get Started
      </Link>

      {/* Styles for fire animation */}
      <style jsx>{`
        @keyframes flames {
          0% {
            transform: translateY(100%);
            opacity: 0.3;
          }
          50% {
            transform: translateY(0);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-30%);
            opacity: 0;
          }
        }

        .flames-animation {
          background: linear-gradient(to top, transparent, rgba(255, 165, 0, 0.6), rgba(255, 69, 0, 0.6));
          animation: flames 1s infinite;
          clip-path: polygon(0 100%, 50% 0%, 100% 100%); /* Creates a triangular effect */
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
