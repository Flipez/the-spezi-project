import Link from 'next/link';
import classNames from 'classnames';
import { useState } from 'react';
import { useRouter } from 'next/router';

const links = [
  { href: '/', label: 'Home' },
  { href: '/map', label: 'Map' },
  { href: '/insights', label: 'Insights' },
  { href: '/changelog', label: 'Changelog' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useRouter();

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          {/* gradient-filled title */}
          <Link
            href="/"
            className="text-lg font-bold tracking-tight bg-linear-to-b from-spezi-start to-spezi-end bg-clip-text text-transparent"
          >
            The&nbsp;Spezi&nbsp;Project
          </Link>

          {/* hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 -mr-2"
            aria-label="Toggle menu"
          >
            <span className="block w-6 h-0.5 bg-gray-800 mb-1" />
            <span className="block w-6 h-0.5 bg-gray-800" />
          </button>

          {/* desktop nav */}
          <nav className="hidden md:flex gap-6 text-sm">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={classNames(
                  'hover:text-spezi-600',
                  pathname === href ? 'font-semibold text-spezi-700' : 'opacity-90'
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* mobile drawer */}
        {open && (
          <nav className="md:hidden bg-white text-gray-800 border-t">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block px-4 py-3 border-b"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* main */}
      <main className="flex-1">{children}</main>

      <footer className="text-center text-xs text-gray-500 py-4">
        © {new Date().getFullYear()} – handcrafted fizz data
      </footer>
    </div>
  );
}
