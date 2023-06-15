"use client";

import React, { useState, useEffect } from "react";
import { Blurhash } from "react-blurhash";
import { Image } from "@chakra-ui/react";

const BlurredImage = ({ imageUrl, blurhash }) => {
  const [showBlur, setShowBlur] = useState(false);

  useEffect(() => {
    setShowBlur(!!blurhash);

    return () => {
      setShowBlur(false);
    };
  }, [blurhash]);

  return <>{!showBlur && blurhash ? <Blurhash hash={blurhash} width="100%" height="192px" /> : <Image loading="lazy" src={imageUrl} alt={`Picture of ${imageUrl}`} roundedTop="sm" w="full" h="48" objectFit="cover" />}</>;
};

export default BlurredImage;