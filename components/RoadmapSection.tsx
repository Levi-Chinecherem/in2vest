"use client"; // This directive makes the component a Client Component

import { useEffect, useState } from 'react';
import { FaRocket, FaUsers, FaExchangeAlt, FaHandshake } from 'react-icons/fa'; // Importing icons

const RoadmapSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [rotatedIndex, setRotatedIndex] = useState<number | null>(null); // State for tracking which card is rotated back

  useEffect(() => {
    // Set the visibility after a slight delay to create an entrance effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200); // Delay before showing the elements

    return () => clearTimeout(timer);
  }, []);

  // Define roadmap milestones with descriptions and icons
  const roadmapItems = [
    {
      title: "Q1 2024: Token Launch",
      description: "Launch our native token, MVST, to the public, allowing early investors to participate in our ecosystem.",
      icon: <FaRocket className="text-yellow-500 w-8 h-8" />,
    },
    {
      title: "Q2 2024: Community Events",
      description: "Host community-driven events to engage our users and promote the MVST token, fostering a vibrant ecosystem.",
      icon: <FaUsers className="text-blue-500 w-8 h-8" />,
    },
    {
      title: "Q3 2024: Exchange Listings",
      description: "List MVST on major cryptocurrency exchanges, enhancing liquidity and making it accessible to a wider audience.",
      icon: <FaExchangeAlt className="text-green-500 w-8 h-8" />,
    },
    {
      title: "Q4 2024: Major Partnerships",
      description: "Forge strategic partnerships with key industry players to expand our reach and improve our offerings.",
      icon: <FaHandshake className="text-purple-500 w-8 h-8" />,
    },
  ];

  // Function to handle long press
  const handleLongPress = (index: number) => {
    setRotatedIndex(index); // Rotate the background card back to zero
  };

  // Function to handle mouse leave
  const handleMouseLeave = () => {
    setRotatedIndex(null); // Reset the rotation when mouse leaves
  };

  return (
    <section className="py-16 bg-gray-800 text-white min-h-screen flex items-center">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Roadmap</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {roadmapItems.map((item, index) => (
            <div
              key={index}
              className={`relative flex items-center justify-center h-48 md:h-64 w-full transition-transform duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
              onMouseEnter={() => handleLongPress(index)} // Trigger long press on hover
              onMouseLeave={handleMouseLeave} // Reset on mouse leave
              onTouchStart={() => handleLongPress(index)} // Trigger on touch start for mobile
              onTouchEnd={handleMouseLeave} // Reset on touch end
            >
              {/* Background card with reduced size */}
              <div
                className={`absolute bg-gray-700 rounded-lg transition-transform duration-500 transform ${
                  rotatedIndex === index ? 'rotate-0' : 'rotate-45'
                }`}
                style={{
                  width: '80%', // Reduce width
                  height: '80%', // Reduce height
                  top: '10%', // Center the background card
                  left: '10%',
                  transformOrigin: 'center', // Ensure smooth rotation
                }}
              ></div>
              <div className="relative z-10 p-4 bg-gray-800 rounded-lg shadow-lg flex flex-col items-center justify-center h-full transition-transform duration-300 transform hover:scale-110 hover:-translate-y-2">
                <div className="flex items-center space-x-4 mb-2">
                  {item.icon}
                  <h3 className="text-lg md:text-xl font-semibold">{item.title}</h3>
                </div>
                <p className="text-sm md:text-md max-w-md text-center">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
