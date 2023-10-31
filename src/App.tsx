import "./App.css";
import { Suspense, lazy } from "react";
import React from "react";
import ScrollToTop from "./components/utils/Helpers/ScrollToTop";
import { Home } from "./components/pages/Home";
// import { Shop } from "./components/pages/Shop";
import { Account } from "./components/pages/Account";
import { Profile } from "./components/pages/Profile";
import { Cart } from "./components/pages/Cart";
import { EmailVerification } from "./components/utils/Helpers/EmailVerification";
import { ForgotPasswordVerification } from "./components/utils/Helpers/ForgotPasswordVerification";
import { Navbar } from "./components/utils/Navbar/Navbar";
import { Footer } from "./components/utils/Footer/Footer";
import { Loading } from "./components/utils/Helpers/Loading";
import Fade from "./components/utils/Helpers/Fade";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { Routes, Route, useLocation } from "react-router-dom";
import { TransitionGroup } from "react-transition-group";

import axios from "axios";

// const Shop = lazy(() => import("./components/pages/Shop"));

const Shop = React.lazy(() =>
  import("./components/pages/Shop").then(({ Shop }) => ({
    default: Shop,
  }))
);

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
            {/* <Route path="/shop" element={<Shop />} /> */}
            <Route
              path="/shop"
              element={
                <Suspense fallback={<Loading />}>
                  <Shop />
                </Suspense>
              }
            />
            <Route path="/account/:category" element={<Account />} />
            <Route path="/profile/:category" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/verify-email/:token"
              element={<EmailVerification />}
            />
            <Route
              path="/reset-password/:token"
              element={<ForgotPasswordVerification />}
            />
          </Routes>
        </Fade>
      </TransitionGroup>
      <Footer />
    </>
  );
}

export default App;
library.add(fab, fas, far);
