import "./App.css";
import About from "./components/About/About";
import Amenities from "./components/Amenities/Amenities";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Nav from "./components/Nav";
import Rooms from "./components/Rooms/Rooms";
import Services from "./components/Services/Services";
import Testimonial from "./components/Testimonials/Testimonial";

function App() {
  return (
    <div>
      <Nav />
      <Header />
      <About />
      <Services />
      <Rooms />
      <Amenities />
      <Testimonial />
      <Footer />
    </div>
  );
}

export default App;
