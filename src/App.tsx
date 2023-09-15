import "./App.css";
import ScrollToTop from "./components/utils/Helpers/ScrollToTop";
import { Home } from "./components/pages/Home";
import { Shop } from "./components/pages/Shop";
import { Account } from "./components/pages/Account";
import { Cart } from "./components/pages/Cart";
import { Navbar } from "./components/utils/Navbar/Navbar";
import { Footer } from "./components/utils/Footer/Footer";
import axios from "axios";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { Routes, Route, useLocation } from "react-router-dom";
import { TransitionGroup } from "react-transition-group";
import Fade from "./components/utils/Helpers/Fade";

function App() {
  axios.defaults.baseURL = "http://localhost:4001";
  axios.defaults.withCredentials = true;
  const location = useLocation() as any;

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <TransitionGroup>
        <Fade key={location.key}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/account/:category" element={<Account />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Fade>
      </TransitionGroup>
      <Footer />
    </>
  );
}

export default App;
library.add(fab, fas, far);
