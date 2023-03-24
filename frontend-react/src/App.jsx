import React from "react";
import { Route, Routes } from "react-router-dom";

import Footer from "./components/FooterComponent";
import Header from "./components/HeaderComponent";
import Root from "./components/MainComponent";
import Navbar from "./components/NavbarComponent";
import SideBar from "./components/SideBar";
import CreatePost from "./pages/post/CreatePost";
import ViewPost from "./pages/post/ViewPost";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";

function App() {

  return (<>
    {/* <link rel="stylesheet" href="./bootstrap/css/bootstrap.min.css" /> */ }
    <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossOrigin="anonymous"></script>
    {/* <!-- Google fonts--> */ }
    <link href="https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic" rel="stylesheet"
      type="text/css" />
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800"
      rel="stylesheet" type="text/css" />
    {/* <Header />
    <Root /> */}

    <Navbar />
    <SideBar />
    <Routes>
      <Route path="/" element={ <><Header /><Root /> </> } />
      <Route index element={ <><Header /><Root /> </> } />
      <Route path="/user" >
        <Route path="login" element={ <Login /> } />
        <Route path="register" element={ <><Header /> <Register /></> } />
      </Route>
      <Route path="/post">
        <Route path="create" element={ <><Header /><CreatePost /></> } />
        <Route path="viewpost" element={ <ViewPost /> } />

      </Route>
    </Routes>
    <Footer />
    {/* <script src="./bootstrap/js/bootstrap.bundle.min.js"></script> */ }
  </>
  );
}

export default App;
