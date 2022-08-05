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
import MovieList from "./views/MovieList";

// const CheckoutLazy = lazy(() => import("./views/Checkout"));

function App() {
  return (
    <BrowserRouter>
      <Loading />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/news" element={<News />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movie" element={<MovieList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/adduser" element={<AddUser />} />
        <Route path="/admin/edituser/:taiKhoan" element={<EditUser />} />

        <Route path="/admin/films" element={<Films />} />
        <Route path="/admin/films/addnew" element={<AddNew />} />
        <Route path="/admin/films/edit/:id" element={<Edit />} />
        <Route
          path="/admin/films/showtime/:id/:tenPhim"
          element={<Showtime />}
        />

        <Route path="/admin/users" element={<Dashboard />} />

        <Route path="/checkout/:id" element={<Checkout />} />

        {/* <Route
          
          path="/checkout/:id"
          element={
            <Suspense
              fallback={<h1 className="text-2xl text-cyan-700">Loading...</h1>}
            >
              <CheckoutLazy />
            </Suspense>
          }
        /> */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
