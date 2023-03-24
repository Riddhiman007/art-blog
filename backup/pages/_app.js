import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "../styles/globals.css";
import Sidebar from "../components/Sidebar";
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="lg:!ml-60">
        <Component { ...pageProps } />
        <Footer />
      </div>
    </>
  );
}
