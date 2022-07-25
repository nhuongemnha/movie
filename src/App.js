import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Contact from "./views/Contact";
import News from "./views/News";
import Login from "./views/Login";
import Register from "./views/Register";
import Detail from "./views/Detail/Detail";
import Checkout from "./views/Checkout";
import Loading from "./components/Loading";
import Profile from "./views/profile";
import Dashboard from "./views/Admin/Dashboard";
import Showtime from "./views/Admin/Showtime";
// import { lazy, Suspense } from "react";
import Films from "./views/Admin/Films";
import AddNew from "./views/Admin/Films/AddNew";
import Edit from "./views/Admin/Films/Edit";
import AddUser from "./views/Admin/Dashboard/AddUser";
import EditUser from "./views/Admin/Dashboard/EditUser";

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
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile" element={<Profile />} />

        <Route exact path="/admin" element={<Dashboard />} />
        <Route exact path="/admin/adduser" element={<AddUser />} />
        <Route exact path="/admin/edituser/:taiKhoan" element={<EditUser />} />

        <Route exact path="/admin/films" element={<Films />} />
        <Route exact path="/admin/films/addnew" element={<AddNew />} />
        <Route exact path="/admin/films/edit/:id" element={<Edit />} />
        <Route
          exact
          path="/admin/films/showtime/:id/:tenPhim"
          element={<Showtime />}
        />

        <Route exact path="/admin/users" element={<Dashboard />} />

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
