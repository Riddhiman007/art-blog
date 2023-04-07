import React from "react";
import PropTypes from "prop-types";

import Ganesh from "../static/img/ganesh.jpg";
import Image from "next/image";
function Header(props) {
  return (
    <header className="masthead mb-12">
      <Image fill src={props.image} quality={100} className="opacity-50" />
      <div className="container relative mx-auto !px-6 lg:!px-12">
        <div className="mx-[calc(-.5_*_1.5rem)] mt-0 flex flex-wrap justify-center lg:mx-[calc(-.5_*_3rem)]">
          <div className="mx-[calc(-.5_*_1.5rem)] mt-0 w-full max-w-full flex-shrink-0 md:mx-[calc(-.5_*_3rem)] md:[flex:_0_0_auto] md:[width:83.33333333%] lg:w-[66.66666667%] lg:[flex:_0_0_auto] xl:w-[58.33333333%] xl:[flex:_0_0_auto]">
            <div className={`text-center text-white ${props.className}`}>
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
Header.propTypes = {
  className: PropTypes.string,
};

Header.defaultProps = {
  title: "Art Blog",
};

export default Header;
