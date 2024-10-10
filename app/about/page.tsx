"use client"; // Ensure this is a Client Component

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-t from-gray-900 to-gray-800 overflow-hidden flex items-center justify-center">
      {/* Animated Fire Flames */}
      <div className="absolute bottom-0 left-0 right-0 h-[45%] flames-animation opacity-75"></div>

      <div className="container mx-auto text-center py-10 relative z-10">
        <h1 className="text-5xl font-extrabold text-blue-600">About Our Multi-Asset DApp</h1>
        <p className="mt-5 text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
          Our DApp allows the transfer of multiple assets across chains using a
          smart contract that interacts with several bridges. With a focus on
          security and efficiency, we aim to provide a seamless user experience
          while navigating the complexities of blockchain technology.
        </p>
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
    </div>
  );
}
