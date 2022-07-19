import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Contact from "./views/Contact";
import News from "./views/News";
import Login from "./views/Login";
import Register from "./views/Register";
import Detail from "./views/Detail/Detail";
import Checkout from "./views/Checkout";
import { lazy, Suspense } from "react";
import Loading from "./components/Loading";

// const CheckoutLazy = lazy(() => import("./views/Checkout"));

function App() {
  return (
    <BrowserRouter>
      <Loading />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/detail/:id" element={<Detail />} />
        <Route exact path="/news" element={<News />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/checkout/:id" element={<Checkout />} />

        {/* <Route
          exact
          path="/checkout/:id"
          element={
            <Suspense
              fallback={<h1 className="text-2xl text-cyan-700">Loading...</h1>}
            >
              <CheckoutLazy />
            </Suspense>
          }
        /> */}
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
