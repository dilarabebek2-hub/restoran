import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ChefHat } from 'lucide-react';

interface Chef {
  name: string;
  image: string;
  biography: string;
  signatureDish: string;
}

const chefs: Chef[] = [
  {
    name: 'Mehmet Şef',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=600',
    biography: 'Gaziantep\'ten gelen 20 yıllık tecrübesiyle Güneydoğu Anadolu mutfağının en seçkin tatlarını sofranıza taşıyor. Baharatların ustalıkla kullanımı ve geleneksel pişirme tekniklerindeki mükemmeliyeti ile tanınır.',
    signatureDish: 'Kuzu Kafes'
  },
  {
    name: 'Ayşe Hanım',
    image: 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=600',
    biography: 'İstanbul saray mutfağında yetişen, 15 yılını tatlı sanatına adamış usta bir sanatkâr. Osmanlı tatlılarının inceliklerini modern tekniklerle harmanlayarak eşsiz lezzetler yaratır.',
    signatureDish: 'Saray Baklavası'
  },
  {
    name: 'Kemal Usta',
    image: 'https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg?auto=compress&cs=tinysrgb&w=600',
    biography: 'Bursa\'nın İskender kebabı geleneğinden gelen, 25 yıllık deneyimiyle et yemeklerinin tartışmasız ustası. Her bir tabaği, yüzyıllık ustalık geleneğinin modern yorumu olarak sunar.',
    signatureDish: 'Hünkar Beğendi'
  },
  {
    name: 'Zeynep Şef',
    image: 'https://images.pexels.com/photos/3783385/pexels-photo-3783385.jpeg?auto=compress&cs=tinysrgb&w=600',
    biography: 'Ege\'nin taze deniz ürünleri ve zeytinyağlı yemeklerinde uzmanlaşmış, Paris\'te aldığı eğitimle Akdeniz mutfağını saray sofralarıyla buluşturan yenilikçi bir şef.',
    signatureDish: 'Levrek Buğulama'
  }
];

export default function Chefs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="chefs" ref={ref} className="py-24 bg-[#2A0A10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#D4AF37] mb-4">
            Aşçılarımız
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
          <p className="text-[#F5F5DC] text-lg max-w-2xl mx-auto">
            Mutfağımızın kalbi, tutkuyla çalışan ve her tabağa sanat eserini andıran
            bir özen katan usta şeflerimizdir
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {chefs.map((chef, index) => (
            <motion.div
              key={chef.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gradient-to-br from-[#3A1A20] to-[#2A0A10] rounded-lg overflow-hidden
                       border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300
                       shadow-lg hover:shadow-2xl hover:shadow-[#D4AF37]/10"
            >
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={chef.image}
                    alt={chef.name}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <h3 className="font-serif text-2xl font-bold text-[#D4AF37] mb-3">
                    {chef.name}
                  </h3>
                  <p className="text-[#F5F5DC] leading-relaxed mb-4">
                    {chef.biography}
                  </p>
                  <div className="flex items-center gap-2 pt-4 border-t border-[#D4AF37]/20">
                    <ChefHat className="w-5 h-5 text-[#D4AF37]" />
                    <span className="text-[#F5F5DC] font-semibold">İmza Yemeği:</span>
                    <span className="text-[#D4AF37] font-bold">{chef.signatureDish}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
