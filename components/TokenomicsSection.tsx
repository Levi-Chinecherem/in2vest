"use client"; // This directive makes the component a Client Component

import { useEffect, useState } from 'react';
import ChartComponent from './ChartComponent'; // Adjust the path as necessary
import { FaCoins, FaUsers, FaCogs, FaBullhorn } from 'react-icons/fa'; // Importing icons

const TokenomicsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200); // Delay before showing the elements

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        {/* Chart Container */}
        <div className="w-full md:w-1/2 p-4 order-2 md:order-1">
          <ChartComponent />
        </div>

        {/* Text Container */}
        <div className="w-full md:w-1/2 p-4 order-1 md:order-2">
          <h2 className="text-4xl font-bold mb-8">Tokenomics</h2>
          <p
            className={`text-lg mb-4 transform transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            } font-rugged`}
          >
            Total Supply: 1,000,000,000 MVST
          </p>
          <div className="text-lg font-rugged mb-4 space-y-2">
            <div className="flex items-center">
              <FaCoins className="text-yellow-500 mr-2" /> 50% Community Rewards: For engagement and participation.
            </div>
            <div className="flex items-center">
              <FaUsers className="text-blue-500 mr-2" /> 20% Team: Rewarding our core team’s commitment.
            </div>
            <div className="flex items-center">
              <FaCogs className="text-green-500 mr-2" /> 15% Development: For platform improvements.
            </div>
            <div className="flex items-center">
              <FaBullhorn className="text-red-500 mr-2" /> 15% Marketing: To enhance brand visibility.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenomicsSection;
