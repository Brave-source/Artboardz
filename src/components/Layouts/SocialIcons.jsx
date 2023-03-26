import React from "react";
import TwitterIcon from "@/assets/icons/TwitterIcon";
import DiscordIcon from "@/assets/icons/DiscordIcon";
import WebIcon from "@/assets/icons/WebIcon";
//Probably we will have to change <a> for NextLink
export const SocialIcons = (props) => {
  return (
    <div className="flex gap-2">
      <a href={props.twitter} target="_blank" rel="noreferrer">
        <TwitterIcon />
      </a>
      <a href={props.discord} target="_blank" rel="noreferrer">
        <DiscordIcon />
      </a>
    </div>
  );
};
