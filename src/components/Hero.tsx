import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#2A0A10]/70 via-[#2A0A10]/60 to-[#2A0A10]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-10 text-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-[#D4AF37] mb-4 tracking-wide">
            ANATOLIAN GATE
          </h1>
          <div className="w-32 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
          <p className="text-2xl md:text-3xl text-[#D4AF37] font-serif tracking-widest">
            FINE TURKISH CUISINE
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-[#F5F5DC] text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Osmanlı saraylarının asil tatlarını modern dokunuşlarla buluşturan,
          benzersiz bir gastronomi deneyimi
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          href="#reservation"
          className="inline-block px-10 py-4 border-2 border-[#D4AF37] text-[#D4AF37]
                   hover:bg-[#D4AF37] hover:text-[#2A0A10] transition-all duration-300
                   font-semibold tracking-wider text-lg"
        >
          REZERVASYON YAP
        </motion.a>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#D4AF37] rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-[#D4AF37] rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
