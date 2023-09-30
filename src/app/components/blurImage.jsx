"use client";

import React, { useState, useEffect } from "react";
import { Blurhash } from "react-blurhash";
import { Box } from "@chakra-ui/react";
import Image from "next/image";

export default BlurImage = ({ imageUrl, blurhash }) => {
  const [showBlur, setShowBlur] = useState(false);

  useEffect(() => {
    setShowBlur(!!blurhash);

    return () => {
      setShowBlur(false);
    };
  }, [blurhash]);

  return (
    <>
      {!showBlur && blurhash ? (
        <Box position={"relative"} w={"full"} h={"48"} background={"#e2e8f0"}>
          <Blurhash hash={blurhash} width="100%" height="100%" />
        </Box>
      ) : (
        <Image loading="lazy" src={imageUrl} alt={`Picture of ${imageUrl}`} layout="responsive" width={300} height={192} style={{ objectFit: "cover", maxHeight: "192px", maxWidth: "300px" }} />
      )}
    </>
  );
};
