import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// home pages  & dashboard
//import Dashboard from "./pages/dashboard";
const Dashboard = lazy(() => import("./pages/dashboard"));
const Branch = lazy(() => import("./pages/branch/Branch"));
const Login = lazy(() => import("./pages/auth/login"));
const Profile = lazy(() => import("./pages/profile/profile"));
const ViewProfile = lazy(() => import("./pages/profile/viewProfile"));
const OtpVerify = lazy(() => import("./pages/auth/forgot-password"));
import ProtectedRoutes from "./routes/ProtectedRoutes";
import PublicRoutes from "./routes/PublicRoutes";


import Layout from "./layout/Layout";
import AuthLayout from "./layout/AuthLayout";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function App() {

  let isLoggedIn = false;

  const { user: currentUser, isAuth: auth } = useSelector((state) => state.auth);
  // const store = useSelector((state) => state.auth);


  console.log("1111", auth);
  console.log("2222", currentUser);

  if (currentUser && auth && (currentUser.roleId === 1 || currentUser.roleId === 2)) {
    isLoggedIn = true;
  }
  const dispatch = useDispatch();

  console.log("isLoggedIn", isLoggedIn);



  return (
    <main className="App  relative">
      <Routes>

        <Route path="/" element={<AuthLayout />}>



          <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}>
            <Route path="/" element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="branch" element={<Branch />} />
              <Route path="profile" element={<Profile />} />
              <Route path="viewProfile" element={<ViewProfile />} />
            </Route>
          </Route>

          <Route element={<PublicRoutes isLoggedIn={isLoggedIn} />}>
            <Route path="/signIn" element={<Login />} />
            <Route path="/otp/:email" element={<OtpVerify />} />
          </Route>


        </Route>




      </Routes>
    </main>
  );
}

export default App;
