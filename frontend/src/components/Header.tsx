import React, { CSSProperties } from "react";
import PropTypes from "prop-types";

import Ganesh from "../static/img/ganesh.jpg";
import Image, { StaticImageData } from "next/image";

function Header(props: {
  textStyle?: string;
  image?: string | any;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={`masthead mb-12 ${props.className}`}>
      {props.image && (
        <Image
          fill
          src={props.image}
          loading="lazy"
          alt=""
          quality={100}
          className="opacity-50"
        />
      )}
      <div className="container relative mx-auto !px-6 lg:!px-12">
        <div className="mx-[calc(-.5_*_1.5rem)] mt-0 flex flex-wrap justify-center lg:mx-[calc(-.5_*_3rem)]">
          <div className="mx-[calc(-.5_*_1.5rem)] mt-0 w-full max-w-full shrink-0 md:mx-[calc(-.5_*_3rem)] md:[flex:_0_0_auto] md:[width:83.33333333%] lg:w-[66.66666667%] lg:[flex:_0_0_auto] xl:w-[58.33333333%] xl:[flex:_0_0_auto]">
            <div className={`text-center text-white ${props.textStyle}`}>
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

Header.defaultProps = {
  title: "Art Blog",
};

export default Header;
