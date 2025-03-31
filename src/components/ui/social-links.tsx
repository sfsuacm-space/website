import { ACM_INFO } from "@/constants/messages";
import React from "react";

const SocialLinks = () => {
  return (
    <div className="flex space-x-6">
      <a
        href={ACM_INFO.ACM_INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/2048px-Instagram_logo_2022.svg.png"
          className="w-[24]"
        ></img>
      </a>

      <a
        href={`${ACM_INFO.ACM_LINKEDIN_URL}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/2048px-LinkedIn_icon.svg.png"
          className="w-[24]"
        ></img>
      </a>
      {/* Discord Link */}
      <a
        href={ACM_INFO.GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700"
      >
        <img
          src=" https://images.seeklogo.com/logo-png/50/2/github-icon-logo-png_seeklogo-503247.png"
          className="w-[24]"
        ></img>
      </a>
      <a
        href={ACM_INFO.ACM_BENTO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700"
      >
        <img
          src="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63e501246a370e0d4462f2ed_herologo.png"
          className="w-[24]"
        ></img>
      </a>
    </div>
  );
};

export default SocialLinks;
