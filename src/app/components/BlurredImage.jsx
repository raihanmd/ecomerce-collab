"use client";

import React from "react";
import { Blurhash } from "react-blurhash";
import { LazyLoadImage } from "react-lazy-load-image-component";

const BlurredImage = ({ imageUrl, blurhash }) => {
  return (
    <>
      <LazyLoadImage width={300} height={192} src={imageUrl} alt="Gambar" effect="blur" placeholder={<Blurhash hash={blurhash} width={300} height={192} />} />
    </>
  );
};

export default BlurredImage;
