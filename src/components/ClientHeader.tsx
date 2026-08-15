"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from '@/components/ThemeProvider';

export const ClientHeader = () => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex justify-center items-center fixed top-3 w-full z-10">
        {/*Navigation area*/}
        <nav className="flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur">
          <Link href="/" className={`nav-item ${pathname === '/' ? 'bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900' : ''}`}>
              Home
          </Link>
          <Link href="/projects" className={`nav-item ${pathname === '/projects' ? 'bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900' : ''}`}>
              Projects
          </Link>
          <Link href="/about" className={`nav-item ${pathname === '/about' ? 'bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900' : ''}`}>
              About
          </Link>
          <Link href="/services" className={`nav-item ${pathname === '/services' ? 'bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900' : ''}`}>
              Services
          </Link>
          <Link href="/contact" className={`nav-item ${pathname === '/contact' ? 'bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900' : 'bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900'}`}>
              Contact
          </Link>
          <button 
            onClick={toggleTheme}
            className="nav-item"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </nav>
    </div>
  );
};