"use client";

import React from "react";
import HeroScrollVideo from "./HeroScrollVideo";

const XardentVideo: React.FC = () => {
  return (
    <HeroScrollVideo
      title={null}
      subtitle={null}
      meta={null}
      credits={null}
      overlay={{ caption: null, heading: null, paragraphs: [], extra: null }}
      topLabel={
        <div className="hsv-top-heading">
          <div className="hsv-top-eyebrow">Crafting Experiences Through</div>
          <div className="hsv-top-main">Smart Software</div>
        </div>
      }
      bottomLabel={<div className="hsv-bottom-label">Visionary Brands</div>}
      initialBoxSize={140}
      targetSize="fullscreen"
      scrollHeightVh={260}
      showHeroExitAnimation={false}
      sticky={true}
      overlayBlur={16}
      overlayRevealDelay={0.4}
      eases={{ container: "expo.out", overlay: "expo.out", text: "power3.inOut" }}
      smoothScroll={false}
      mediaType="image"
      media={undefined}
      className="xardent-scroll-video"
      style={{ background: "transparent", color: "inherit" }}
    />
  );
};

export default XardentVideo;
