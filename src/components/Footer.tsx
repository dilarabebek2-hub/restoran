import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#1a0508] border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#D4AF37] mb-4">
              ANATOLIAN GATE
            </h3>
            <p className="text-[#F5F5DC]/80 leading-relaxed">
              Osmanlı saraylarının asil tatlarını modern dokunuşlarla buluşturan
              benzersiz bir gastronomi deneyimi.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-xl font-bold text-[#D4AF37] mb-4">İletişim</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D4AF37] mt-1 flex-shrink-0" />
                <p className="text-[#F5F5DC]/80">
                  Nişantaşı Mahallesi, Vali Konağı Caddesi No: 42<br />
                  Şişli, İstanbul
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#D4AF37]" />
                <a href="tel:+902121234567" className="text-[#F5F5DC]/80 hover:text-[#D4AF37] transition-colors">
                  +90 (212) 123 45 67
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#D4AF37]" />
                <a href="mailto:info@anatoliangate.com" className="text-[#F5F5DC]/80 hover:text-[#D4AF37] transition-colors">
                  info@anatoliangate.com
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-xl font-bold text-[#D4AF37] mb-4">Çalışma Saatleri</h4>
            <div className="space-y-2 text-[#F5F5DC]/80">
              <p><span className="font-semibold text-[#D4AF37]">Pazartesi - Cuma:</span> 12:00 - 23:00</p>
              <p><span className="font-semibold text-[#D4AF37]">Cumartesi - Pazar:</span> 11:00 - 00:00</p>
            </div>

            <div className="flex gap-4 mt-6">
              <a href="#" className="text-[#D4AF37] hover:text-[#F5F5DC] transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-[#D4AF37] hover:text-[#F5F5DC] transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-[#D4AF37] hover:text-[#F5F5DC] transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#D4AF37]/20 pt-8 text-center">
          <p className="text-[#F5F5DC]/60">
            &copy; 2025 Anatolian Gate. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
