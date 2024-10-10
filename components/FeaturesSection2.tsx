"use client"; // This directive makes the component a Client Component

import { useEffect, useState } from 'react';
import { FaLock, FaUsers, FaChartBar } from 'react-icons/fa'; // Icons import

const features = [
  { title: 'Decentralized', description: 'Built on blockchain technology for transparency.', icon: <FaChartBar className="text-4xl mb-4 text-blue-500" /> },
  { title: 'Community Driven', description: 'Empowered by our vibrant community.', icon: <FaUsers className="text-4xl mb-4 text-green-500" /> },
  { title: 'Secure', description: 'Robust security measures to protect your investments.', icon: <FaLock className="text-4xl mb-4 text-red-500" /> },
];

const FeaturesSection: React.FC = () => {
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([]);

  useEffect(() => {
    features.forEach((_, index) => {
      setTimeout(() => {
        setVisibleFeatures((prev) => [...prev, index]);
      }, index * 200); // Delay for staggered animation
    });
  }, []);

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold mb-8 drop-shadow-lg">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-8 bg-gray-800 rounded-lg shadow-lg transform transition-all duration-500 ${
                visibleFeatures.includes(index) ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              } flex flex-col items-center`}
            >
              <div className="flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
