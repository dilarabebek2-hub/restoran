import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Calendar, Clock, Users, Phone, Mail, User } from 'lucide-react';

export default function Reservation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Rezervasyonunuz alındı! En kısa sürede size dönüş yapılacaktır.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="reservation" ref={ref} className="py-24 bg-gradient-to-b from-[#2A0A10] to-[#1a0508] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #D4AF37 0, #D4AF37 1px, transparent 1px, transparent 20px)'
        }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#D4AF37] mb-4">
            Rezervasyon
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
          <p className="text-[#F5F5DC] text-lg">
            Unutulmaz bir akşam yemeği deneyimi için yerinizi ayırtın
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-br from-[#3A1A20] to-[#2A0A10] rounded-lg p-8 md:p-12
                   border-2 border-[#D4AF37]/30 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-[#F5F5DC] mb-2 font-semibold">
                  <User className="w-5 h-5 text-[#D4AF37]" />
                  Adınız Soyadınız
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#2A0A10] border border-[#D4AF37]/30 rounded
                           text-[#F5F5DC] focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="Ad Soyad"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-[#F5F5DC] mb-2 font-semibold">
                  <Mail className="w-5 h-5 text-[#D4AF37]" />
                  E-posta
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#2A0A10] border border-[#D4AF37]/30 rounded
                           text-[#F5F5DC] focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="ornek@email.com"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-[#F5F5DC] mb-2 font-semibold">
                <Phone className="w-5 h-5 text-[#D4AF37]" />
                Telefon
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#2A0A10] border border-[#D4AF37]/30 rounded
                         text-[#F5F5DC] focus:outline-none focus:border-[#D4AF37] transition-colors"
                placeholder="0555 123 45 67"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="flex items-center gap-2 text-[#F5F5DC] mb-2 font-semibold">
                  <Calendar className="w-5 h-5 text-[#D4AF37]" />
                  Tarih
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#2A0A10] border border-[#D4AF37]/30 rounded
                           text-[#F5F5DC] focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-[#F5F5DC] mb-2 font-semibold">
                  <Clock className="w-5 h-5 text-[#D4AF37]" />
                  Saat
                </label>
                <select
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#2A0A10] border border-[#D4AF37]/30 rounded
                           text-[#F5F5DC] focus:outline-none focus:border-[#D4AF37] transition-colors"
                >
                  <option value="">Seçiniz</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="19:00">19:00</option>
                  <option value="20:00">20:00</option>
                  <option value="21:00">21:00</option>
                  <option value="22:00">22:00</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-[#F5F5DC] mb-2 font-semibold">
                  <Users className="w-5 h-5 text-[#D4AF37]" />
                  Kişi Sayısı
                </label>
                <select
                  name="guests"
                  required
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#2A0A10] border border-[#D4AF37]/30 rounded
                           text-[#F5F5DC] focus:outline-none focus:border-[#D4AF37] transition-colors"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num} Kişi</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#D4AF37] text-[#2A0A10] font-bold text-lg rounded
                       hover:bg-[#F5F5DC] transition-colors duration-300 shadow-lg
                       hover:shadow-[#D4AF37]/50"
            >
              REZERVASYON TAMAMLA
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
