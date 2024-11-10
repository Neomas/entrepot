"use client";
import React from "react";
import styles from "./Video.module.scss";
import LightGallery from "@components/Atoms/LightGallery/LightGallery";

import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-video.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lightgallery.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgVideo from "lightgallery/plugins/video";
import StoryblokImage from "../Image/Image";

function youtubeParser(url) {
  //get the ID out of the youtube video (11 char string after youtube.com/watch?v= or after youtu.be/)
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);

  return match && match[7].length == 11 ? `http://img.youtube.com/vi/${match[7]}/sddefault.jpg` : false;
}

function IsURL(url) {
  var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return regexp.test(url);
}

function isValidVideo(string) {
  if (typeof string === "string" && youtubeParser(string) && IsURL(string)) {
    return true;
  }
  return false;
}

const Video = ({ videoLink, image }) => {
  const videoURL = isValidVideo(videoLink) ? videoLink : undefined;

  return (
    <LightGallery speed={500} plugins={[lgThumbnail, lgVideo]} zoomFromOrigin={false}>
      <a
        data-src={videoURL}
        data-lg-size="1280-720"
        data-poster={image?.filename ? image?.filename : youtubeParser(videoURL)}
        href={videoURL}
        className={styles.isVideo}
        aria-label="Open video">
        <StoryblokImage
          src={image?.filename ? image?.filename : youtubeParser(videoURL)}
          alt={image?.alt ? image?.alt : ""}
          crop={true}
          focus={image?.focus}
          sizes="(max-width: 768px) 100vw, 100vw"
          className={styles.image}
        />
      </a>
    </LightGallery>
  );
};

export default Video;
