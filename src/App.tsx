import "./App.css";
import React, { Suspense } from "react";
import ScrollToTop from "./components/utils/Helpers/ScrollToTop";

import { Home } from "./components/pages/Home";
import { Navbar } from "./components/utils/Navbar/Navbar";
import { Footer } from "./components/utils/Footer/Footer";
import Empty from "./components/utils/Helpers/Empty";
import { LoadingHeight100 } from "./components/utils/Helpers/LoadingHeight100";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

const Shop = React.lazy(() =>
  import("./components/pages/Shop").then(({ Shop }) => ({
    default: Shop,
  }))
);
const Account = React.lazy(() =>
  import("./components/pages/Account").then(({ Account }) => ({
    default: Account,
  }))
);
const Profile = React.lazy(() =>
  import("./components/pages/Profile").then(({ Profile }) => ({
    default: Profile,
  }))
);
const Cart = React.lazy(() =>
  import("./components/pages/Cart").then(({ Cart }) => ({
    default: Cart,
  }))
);
const EmailVerification = React.lazy(() =>
  import("./components/utils/Helpers/EmailVerification").then(
    ({ EmailVerification }) => ({
      default: EmailVerification,
    })
  )
);
const ForgotPasswordVerification = React.lazy(() =>
  import("./components/utils/Helpers/ForgotPasswordVerification").then(
    ({ ForgotPasswordVerification }) => ({
      default: ForgotPasswordVerification,
    })
  )
);

function App() {
  // TODO: error
  axios.defaults.baseURL =
    "https://port-0-node-express-jvpb2mloesnlp2.sel5.cloudtype.app";
  // axios.defaults.baseURL = "http://localhost:3001";
  axios.defaults.withCredentials = true;

  return (
    <>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="refresh" element={<Empty />} />

        <Route
          path="/shop"
          element={
            <Suspense fallback={<LoadingHeight100 />}>
              <Shop />
            </Suspense>
          }
        />
        <Route
          path="/account/:category"
          element={
            <Suspense fallback={<LoadingHeight100 />}>
              <Account />
            </Suspense>
          }
        />
        <Route
          path="/profile/:category"
          element={
            <Suspense fallback={<LoadingHeight100 />}>
              <Profile />
            </Suspense>
          }
        />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<LoadingHeight100 />}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="/verify-email/:token"
          element={
            <Suspense fallback={<LoadingHeight100 />}>
              <EmailVerification />
            </Suspense>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <Suspense fallback={<LoadingHeight100 />}>
              <ForgotPasswordVerification />
            </Suspense>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
library.add(fab, fas, far);
