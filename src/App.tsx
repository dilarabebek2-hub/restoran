import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Chefs from './components/Chefs';
import Menu from './components/Menu';
import Reservation from './components/Reservation';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-[#2A0A10]">
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <Chefs />
      <Reservation />
      <Footer />
    </div>
  );
}

export default App;
