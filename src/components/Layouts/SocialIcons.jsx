import React from "react";
import TwitterIcon from "@/assets/icons/TwitterIcon";
import DiscordIcon from "@/assets/icons/DiscordIcon";
import WebIcon from "@/assets/icons/WebIcon";
import InstagramIcon from "@/assets/icons/InstagramIcon";
import Link from "next/link";
//Probably we will have to change <a> for NextLink
export const SocialIcons = (props) => {
  return (
    <div className="flex gap-2">
      {props.twitter && (
        <a href={props.twitter} rel="noopener noreferrer" target="_blank">
          <TwitterIcon />
        </a>
      )}
      {props.discord && (
        <a href={props.discord} rel="noopener noreferrer" target="_blank">
        <DiscordIcon />
        </a>
      )}
      {props.web && (
        <a href={props.web} rel="noopener noreferrer" target="_blank">
        <WebIcon />
        </a>
      )}
      {props.instagram && (
        <a href={props.instagram} rel="noopener noreferrer" target="_blank">
        <InstagramIcon />
        </a>
      )}
    </div>
  );
};
