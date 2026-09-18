import "./App.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

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

function setSEO(title, descriptionText, canonicalUrl) {
  document.title = title;

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute("content", descriptionText);
  }

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute("href", canonicalUrl);
  }
}

function WebsiteLayout({
  locationTitle = "Punawale & Pimpri-Chinchwad",
  locationDescription = "Punawale, Pimpri-Chinchwad, Pune and nearby areas",
}) {
  return (
    <>
      <Navbar />

      <main>
        <Hero
          locationTitle={locationTitle}
          locationDescription={locationDescription}
        />
        <About />
        <Services />
        <Booking />
        <Products />
        <Reviews />
        <OurServices />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

function HomePage() {
  useEffect(() => {
    setSEO(
      "Vaishnavi Enterprises | RO Water Purifier Sales & Service in Pune",
      "Vaishnavi Enterprises provides RO water purifier sales, installation, repair, filter replacement and maintenance services in Pune, Punawale and nearby areas.",
      "https://vaishanviaqua.tech/"
    );
  }, []);

  return <WebsiteLayout />;
}

function PunawalePage() {
  useEffect(() => {
    setSEO(
      "RO Water Purifier Service in Punawale, Pune | Vaishnavi Enterprises",
      "RO water purifier service in Punawale, Pune by Vaishnavi Enterprises. RO repair, installation, filter replacement and maintenance for domestic and commercial water purifiers.",
      "https://vaishanviaqua.tech/ro-service-punawale"
    );
  }, []);

  return (
  <WebsiteLayout
    locationTitle="Punawale, Pune"
    locationDescription="Punawale, Pimpri-Chinchwad, Pune and nearby areas"
  />
);
}
function HinjawadiPage() {
  useEffect(() => {
    setSEO(
      "RO Water Purifier Service in Hinjawadi, Pune | Vaishnavi Enterprises",
      "RO water purifier service in Hinjawadi, Pune by Vaishnavi Enterprises. RO repair, installation, filter replacement and maintenance for domestic and commercial water purifiers.",
      "https://vaishanviaqua.tech/ro-service-hinjawadi"
    );
  }, []);

  return (
  <WebsiteLayout
    locationTitle="Hinjawadi, Pune"
    locationDescription="Hinjawadi, Pune and nearby areas"
  />
);
}
function WakadPage() {
  useEffect(() => {
    setSEO(
      "RO Water Purifier Service in Wakad, Pune | Vaishnavi Enterprises",
      "RO water purifier service in Wakad, Pune by Vaishnavi Enterprises. RO repair, installation, filter replacement and maintenance for domestic and commercial water purifiers.",
      "https://vaishanviaqua.tech/ro-service-wakad"
      );
    },[]);
     return (
  <WebsiteLayout
    locationTitle="Wakad, Pune"
    locationDescription="Wakad, Pimpri-Chinchwad, Pune and nearby areas"
  />
);
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/ro-service-punawale" element={<PunawalePage />} />
      <Route path="/ro-service-wakad" element={<WakadPage />} />
      <Route path="/ro-service-hinjawadi" element={<HinjawadiPage />} />
    </Routes>
  );
}

export default App;
