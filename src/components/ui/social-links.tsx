import { ACM_INFO } from "@/constants/messages";
import React from "react";
import Image from "next/image";

const SocialLinks = () => {
  const imgSize = "36px";
  const imgSizeRes = 36;
  return (
    <div className="flex space-x-6">
      <a
        href={ACM_INFO.ACM_INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700"
      >
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/2048px-Instagram_logo_2022.svg.png"
          width={imgSizeRes}
          height={imgSizeRes}
          className={`w-[${imgSize}]`}
          alt={"Instagram"}
        />
      </a>

      <a
        href={`${ACM_INFO.ACM_LINKEDIN_URL}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700"
      >
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/2048px-LinkedIn_icon.svg.png"
          width={imgSizeRes}
          height={imgSizeRes}
          className={`w-[${imgSize}]`}
          alt="LinkedIn"
        />
      </a>
      {/* Discord Link */}
      <a
        href={ACM_INFO.GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700"
      >
        <Image
          src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/71-github-512.png"
          width={imgSizeRes}
          height={imgSizeRes}
          className={`w-[${imgSize}]`}
          alt="GitHub"
        />
      </a>
      <a
        href={ACM_INFO.ACM_BENTO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700"
      >
        <Image
          src="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63e501246a370e0d4462f2ed_herologo.png"
          width={imgSizeRes}
          height={imgSizeRes}
          className={`w-[${imgSize}]`}
          alt="Bento"
        />
      </a>
    </div>
  );
};

export default SocialLinks;
