import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Crown, UtensilsCrossed, Sparkles } from 'lucide-react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-24 bg-gradient-to-b from-[#2A0A10] to-[#1a0508]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#D4AF37] mb-4">
            Hikayemiz
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Ottoman cuisine"
              className="rounded-lg shadow-2xl border-2 border-[#D4AF37]/30"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <p className="text-[#F5F5DC] text-lg leading-relaxed">
              Anatolian Gate, Osmanlı İmparatorluğu'nun görkemli mutfak geleneğini
              günümüze taşıyan, köklü bir gastronomi mirası sunmaktadır. Saray mutfağının
              asil tatlarını, Anadolu'nun zengin lezzet haritasıyla harmanlayarak benzersiz
              bir deneyim yaratıyoruz.
            </p>
            <p className="text-[#F5F5DC] text-lg leading-relaxed">
              Her yemeğimiz, yüzyıllar boyunca nesilden nesile aktarılan tariflerin modern
              yorumudur. Seçkin malzemeler, ustaca hazırlık ve özenli sunum ile her tabakta
              bir sanat eseri yaratıyoruz.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <Crown className="w-12 h-12 text-[#D4AF37] mx-auto mb-3" />
                <p className="text-[#F5F5DC] font-semibold">Saray Mutfağı</p>
              </div>
              <div className="text-center">
                <UtensilsCrossed className="w-12 h-12 text-[#D4AF37] mx-auto mb-3" />
                <p className="text-[#F5F5DC] font-semibold">Usta Eller</p>
              </div>
              <div className="text-center">
                <Sparkles className="w-12 h-12 text-[#D4AF37] mx-auto mb-3" />
                <p className="text-[#F5F5DC] font-semibold">Premium Kalite</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
