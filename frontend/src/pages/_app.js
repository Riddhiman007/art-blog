import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
// import "@ckeditor/ckeditor5-editor-classic/theme/classiceditor.css"
import "../styles/globals.css"
import Sidebar from "../components/Sidebar";
import { SessionProvider } from 'next-auth/react';

config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
      <Sidebar />
      <Navbar />
      <div className="xxl:!ml-[20rem] lg:mt-[83px] lg:!ml-72 bg-slate-100">
        <Component { ...pageProps } />
        <Footer />
      </div>
    </SessionProvider>
  );
}
