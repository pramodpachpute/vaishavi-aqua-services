import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Booking from "./components/Booking";
import Products from "./components/Products";
import Reviews from "./components/Reviews";
import OurServices from "./components/OurServices";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />

      <Hero />

      <About />

      <Services />

      <Booking />

      <Products />

      <Reviews />

      {/* Completed work photos */}
      <OurServices />

      <Contact />

      <Footer />
    </>
  );
}

export default App;