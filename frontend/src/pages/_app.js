/* eslint-disable no-unused-vars */
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
// import "@ckeditor/ckeditor5-editor-classic/theme/classiceditor.css"
import Sidebar from "../components/Sidebar";
import { SessionProvider, useSession, signIn } from "next-auth/react";
import roboto300 from "@fontsource/roboto/300.css";
import roboto400 from "@fontsource/roboto/400.css";
import roboto500 from "@fontsource/roboto/500.css";
import { useEffect } from "react";
import { StyledEngineProvider } from '@mui/material/styles';
import "../styles/globals.css";
// import dynamic from "next/dynamic";
import Theme from "../components/MuiTheme"
// const Theme = dynamic(() => import("../components/MuiTheme"), { ssr: false })
config.autoAddCss = false;

export default function App({ Component, pageProps }) {

  return (
    <StyledEngineProvider injectFirst>
      <Theme>
        <SessionProvider>
          {/* <Sidebar /> */ }
          <Navbar />
          <div className="bg-slate-100 lg:mt-[83px] lg:!ml-72 xxl:!ml-[20rem]">
            <Component { ...pageProps } />
            <Footer />
          </div>
        </SessionProvider></Theme>
    </StyledEngineProvider>
  );
}
