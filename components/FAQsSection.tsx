"use client"; // This directive makes the component a Client Component

import { useEffect, useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa'; // Importing an icon for visual appeal

const faqs = [
  { question: 'What is MemeVest?', answer: 'MemeVest is the native token for In2Vest, a platform for meme-based investments.' },
  { question: 'How can I purchase tokens?', answer: 'You can purchase MVST tokens through our website for early investors.' },
  { question: 'Is there a mobile app?', answer: 'Currently, we are focusing on our web platform, but a mobile app is in the works.' },
];

const FAQsSection: React.FC = () => {
  const [visibleFAQs, setVisibleFAQs] = useState<number[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // Track which FAQ is hovered

  useEffect(() => {
    // Simulate delayed animation by showing each FAQ after a delay
    faqs.forEach((_, index) => {
      setTimeout(() => {
        setVisibleFAQs((prev) => [...prev, index]);
      }, index * 200); // 200ms delay for each FAQ
    });
  }, []);

  return (
    <section className="relative py-16 bg-gray-900 text-white overflow-hidden">
      {/* Animated Fire Flames */}
      <div className="absolute bottom-0 left-0 right-0 h-[45%] flames-animation opacity-75"></div>

      <div className="container mx-auto text-center relative z-10">
        <h2 className="text-4xl font-bold mb-8">FAQs</h2>
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border-b border-gray-600 pb-4 mb-4 transform transition-all duration-500 ease-in-out ${
                visibleFAQs.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h3 className="font-semibold text-lg flex items-center justify-center">
                <FaQuestionCircle className="mr-2 text-yellow-500" /> {/* Icon for the question */}
                {faq.question}
              </h3>
              <p 
                className={`text-gray-400 text-base transition-transform duration-300 ${hoveredIndex === index ? '' : 'transform scale-x-[-1]'}`}
                onMouseEnter={() => setHoveredIndex(index)} // Set the hovered index on mouse enter
                onMouseLeave={() => setHoveredIndex(null)} // Reset on mouse leave
                onTouchStart={() => setHoveredIndex(index)} // Set for long press (touch devices)
                onTouchEnd={() => setHoveredIndex(null)} // Reset on touch end
              >
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

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

export default FAQsSection;
