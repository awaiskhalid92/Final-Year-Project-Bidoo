import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";

import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import RegisterComplete from "./pages/auth/RegisterComplete";
import Header from "./components/nav/Header";
import ForgetPassword from "./pages/auth/ForgetPassword";
import History from "./pages/user/History";
import UserPrivateRoute from "./components/privateRoutes/UserPrivateRoute";
import Password from "./pages/user/Password";
import { currentUser } from "./functions/auth.functions";
import WishList from "./pages/user/Wishlist";
import { SellerDashboard } from "./pages/seller/SellerDashboard";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import AdminPrivateRoute from "./components/privateRoutes/AdminPrivateRoute";

const App = () => {
  const dispatch = useDispatch();

  //To check firbase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log("user dispatched", user);

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }
    });
    //cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Router>
        <Header title="Bidoo" />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/Login" element={<Login />} exact />
          <Route path="/Register" element={<Register />} exact />
          <Route
            path="/Register/complete-register"
            element={<RegisterComplete />}
          />
          <Route element={<UserPrivateRoute />}>
            <Route path="/user/history" element={<History />} exact />
            <Route path="/user/password" element={<Password />} exact />
            <Route path="/user/wishlist" element={<WishList />} exact />
            <Route
              path="/seller/dashboard"
              element={<SellerDashboard />}
              exact
            />
          </Route>

          <Route path="/forget/password" element={<ForgetPassword />} />

          <Route element={<AdminPrivateRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
