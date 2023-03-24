import Link from "next/link";
import React from "react";

// fontawesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FaFacebookF, FaCircle, FaGithub, FaTwitter } from "react-icons/fa";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-gray-400 py-12">
      <div className="container !px-6 lg:!px-12">
        <div className="row justify-center [--bs-gutter-x:1.5rem] lg:[--bs-gutter-x:3rem]">
          <div className="flex-[0_0_auto] md:w-[83.33333333%] lg:w-[66.66666667%] xl:w-[58.33333333%]">
            <ul className="list-none pl-0 !text-center">
              {[
                [faFacebookF, "https://github.com", "facebook"],
                [faTwitter, "https://github.com", "twitter"],
                [faGithub, "https://github.com", "github"],
              ].map(([icon, link, key]) => (
                <li key={key} className="list-inline-item h-[40px] w-[50px]">
                  <Link
                    href={link}
                    className="h-auto w-auto text-neutral-900 hover:text-blue-600"
                  >
                    <span className="fa-stack fa-lg">
                      <FontAwesomeIcon icon={faCircle} className="fa-stack-2x" />
                      <FontAwesomeIcon icon={icon} className="fa-stack-1x" inverse />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            {/* Needs to be edited later */}
            <div className="text-center text-[.875em] italic text-gray-400">
              Copyright My Website
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
