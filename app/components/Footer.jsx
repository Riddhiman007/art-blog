"use client";
import Link from "next/link";
import React from "react";

// fontawesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FaFacebookF, FaCircle, FaGithub, FaTwitter } from "react-icons/fa";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";

import {
  Avatar,
  Box,
  Container,
  List,
  ListItemAvatar,
  ListItemButton,
  Typography,
} from ".";
export default function Footer() {
  return (
    <footer className="mt-8 border-t border-gray-400 py-12">
      <Container>
        <Box className="mx-auto">
          <List
            dense
            className="flex list-none flex-row justify-center gap-7 pl-0 text-center"
          >
            {[
              [faFacebookF, "https://github.com", "facebook"],
              [faTwitter, "https://github.com", "twitter"],
              [faGithub, "https://github.com", "github"],
            ].map(([icon, link, key]) => (
              <ListItemAvatar key={key}>
                <Link
                  href={link}
                  className="h-auto w-auto text-neutral-900 hover:text-blue-600"
                >
                  <Avatar
                    className="bg-stone-900 hover:bg-blue-700 dark:bg-slate-800"
                    variant="circular"
                  >
                    <FontAwesomeIcon
                      icon={icon}
                      className="text-lg dark:text-slate-100"
                    />
                  </Avatar>
                </Link>
              </ListItemAvatar>
            ))}
          </List>
          {/* Needs to be edited later */}
          <Typography
            variant="body2"
            className="text-center text-[.875em] italic text-gray-400"
          >
            Copyright My Website
          </Typography>
        </Box>
      </Container>
    </footer>
  );
}
