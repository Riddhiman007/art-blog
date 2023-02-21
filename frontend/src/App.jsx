import React from "react";
import { Route, Routes } from "react-router-dom";

import Footer from "./components/default/FooterComponent";
import Header from "./components/default/HeaderComponent";
import Root from "./components/default/MainComponent";
import Navbar from "./components/default/NavbarComponent";
import CreatePost from "./components/post/CreatePostComponent";
import ViewPost from "./components/post/ViewPost";
import Login from "./components/user/LoginComponent";
import Register from "./components/user/RegisterComponent";

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
