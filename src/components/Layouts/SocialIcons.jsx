import React from "react";
import TwitterIcon from "@/assets/icons/TwitterIcon";
import DiscordIcon from "@/assets/icons/DiscordIcon";
import WebIcon from "@/assets/icons/WebIcon";
//Probably we will have to change <a> for NextLink
export const SocialIcons = (props) => {
  return (
    <div className="flex gap-2">
      <a to={props.twitter}>
        <TwitterIcon />
      </a>
      <a to={props.discord}>
        <DiscordIcon />
      </a>
    </div>
  );
};
