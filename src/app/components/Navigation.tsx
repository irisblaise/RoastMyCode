import { type FC } from 'react';
import Link from 'next/link';

const Navigation: FC = () => {
  return (
    <nav className="bg-white/50 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/" 
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600"
          >
            RoastMyCode
          </Link>
          <div className="flex space-x-4">
            <Link 
              href="/tips"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Tips
            </Link>
            <Link 
              href="/archive"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Archive
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
