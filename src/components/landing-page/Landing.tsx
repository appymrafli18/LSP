import Footer from "./Footer";
import MainContent from "./MainContent";
import NavbarLandingPage from "./NavbarList/NavbarLandingPage";
import ContactUs from "./ContactUs";
import AboutUs from "./AboutUs";
import ServicesUs from "./ServicesUs";

const Landing = () => {

  return (
    <div>
      <NavbarLandingPage />
      <main className="min-h-screen" id="#">
        <MainContent />
        <AboutUs />
        <ServicesUs />
        <ContactUs />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
