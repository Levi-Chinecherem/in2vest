import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          In2Vest
        </Link>
        <div>
          <Link href="/" className="text-white mr-4">Home</Link>
          <Link href="/about" className="text-white mr-4">About</Link>
          <Link href="/exe" className="text-white">Execute</Link>
        </div>
      </div>
    </nav>
  );
}
