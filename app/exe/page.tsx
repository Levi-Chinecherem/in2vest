"use client"; // Ensure this is a Client Component

import ConnectWallet from '@/components/ConnectWallet';

export default function ExecutionPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-t from-gray-900 to-gray-800 overflow-hidden flex items-center justify-center">
      {/* Animated Fire Flames */}
      <div className="absolute bottom-0 left-0 right-0 h-[45%] flames-animation opacity-75"></div>

      <div className="container mx-auto text-center py-10 relative z-10">
        <h1 className="text-5xl font-extrabold text-blue-600">Execute Transaction</h1>
        
        {/* Call to Action Text */}
        <p className="mt-5 text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
          Ready to make your move? Connect your wallet to execute your transaction seamlessly.
        </p>

        {/* Connect Wallet Component */}
        <div className="mt-8">
          <ConnectWallet />
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
    </div>
  );
}
