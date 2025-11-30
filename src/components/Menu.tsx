import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
}

interface MenuCategory {
  title: string;
  items: MenuItem[];
}

const menuData: MenuCategory[] = [
  {
    title: 'Saray Başlangıçları',
    items: [
      {
        name: 'Sultan Meze Tabağı',
        description: 'Seçkin mezelerimizin muhteşem birleşimi',
        price: '₺285',
        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        name: 'Közlenmiş Patlıcan Beğendi',
        description: 'Kaşar peyniri ve ceviz ile',
        price: '₺165',
        image: 'https://images.pexels.com/photos/2116094/pexels-photo-2116094.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        name: 'Çerkez Tavuğu',
        description: 'Ceviz sosuyla geleneksel tarif',
        price: '₺195',
        image: 'https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=600'
      }
    ]
  },
  {
    title: 'Taş Fırın',
    items: [
      {
        name: 'Lahmacun Özel',
        description: 'Dana kıyma ve özel baharatlarla',
        price: '₺145',
        image: 'https://images.pexels.com/photos/4676401/pexels-photo-4676401.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        name: 'Pide Çeşitleri',
        description: 'Kaşarlı, kıymalı veya karışık',
        price: '₺165',
        image: 'https://images.pexels.com/photos/7394254/pexels-photo-7394254.jpeg?auto=compress&cs=tinysrgb&w=600'
      }
    ]
  },
  {
    title: 'Ana Yemekler',
    items: [
      {
        name: 'Kuzu Kafes',
        description: 'Fırında yavaş pişmiş kuzu kaburga',
        price: '₺485',
        image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        name: 'Hünkar Beğendi',
        description: 'Patlıcan beğendi üzerinde kuzu güveç',
        price: '₺425',
        image: 'https://images.pexels.com/photos/6210959/pexels-photo-6210959.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        name: 'Levrek Buğulama',
        description: 'Taze sebzeler ve zeytinyağı ile',
        price: '₺395',
        image: 'https://images.pexels.com/photos/1516415/pexels-photo-1516415.jpeg?auto=compress&cs=tinysrgb&w=600'
      }
    ]
  },
  {
    title: 'Tatlılar',
    items: [
      {
        name: 'Saray Baklavası',
        description: 'Antep fıstığı ve tereyağı ile',
        price: '₺195',
        image: 'https://images.pexels.com/photos/3590389/pexels-photo-3590389.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        name: 'Fıstıklı Künefe',
        description: 'Taze ve sıcak servis',
        price: '₺165',
        image: 'https://images.pexels.com/photos/5638527/pexels-photo-5638527.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        name: 'Sütlaç',
        description: 'Fırında karamelize edilmiş',
        price: '₺125',
        image: 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=600'
      }
    ]
  }
];

export default function Menu() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="menu" ref={ref} className="py-24 bg-gradient-to-b from-[#1a0508] to-[#2A0A10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#D4AF37] mb-4">
            Menümüz
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
          <p className="text-[#F5F5DC] text-lg max-w-2xl mx-auto">
            Osmanlı mutfağının zengin mirasından ilham alan seçkin yemeklerimiz
          </p>
        </motion.div>

        {menuData.map((category, categoryIndex) => (
          <div key={category.title} className="mb-16 last:mb-0">
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              className="font-serif text-3xl font-bold text-[#D4AF37] mb-8 text-center"
            >
              {category.title}
            </motion.h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.items.map((item, itemIndex) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: (categoryIndex * 0.2) + (itemIndex * 0.1) }}
                  className="bg-gradient-to-br from-[#3A1A20] to-[#2A0A10] rounded-lg overflow-hidden
                           border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300
                           shadow-lg hover:shadow-2xl hover:shadow-[#D4AF37]/10 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2A0A10] to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-serif text-xl font-bold text-[#D4AF37]">
                        {item.name}
                      </h4>
                      <span className="text-[#D4AF37] font-bold text-lg whitespace-nowrap ml-2">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-[#F5F5DC]/80 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
