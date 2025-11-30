import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Ana Sayfa', href: '#home' },
    { name: 'Menü', href: '#menu' },
    { name: 'Hikayemiz', href: '#about' },
    { name: 'Aşçılarımız', href: '#chefs' },
    { name: 'Rezervasyon', href: '#reservation' },
    { name: 'İletişim', href: '#contact' },
  ];

  return (
    <nav className="fixed w-full bg-[#2A0A10]/95 backdrop-blur-sm z-50 border-b border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#D4AF37] tracking-wider">
              ANATOLIAN GATE
            </h1>
          </div>

          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[#F5F5DC] hover:text-[#D4AF37] transition-colors duration-300 font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#D4AF37] hover:text-[#F5F5DC] transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#2A0A10] border-t border-[#D4AF37]/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-[#F5F5DC] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
