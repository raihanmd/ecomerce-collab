"use client";

import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Blurhash } from "react-blurhash";

const BlurredImage = ({ imageUrl, blurhash }) => {
  return <LazyLoadImage src={imageUrl} alt="Gambar" effect="blur" placeholder={<Blurhash hash={blurhash} width={100} height={100} />} />;
};

export default BlurredImage;
