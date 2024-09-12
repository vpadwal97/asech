// ImageZoomWrapper.js
import React from "react";
import noIMGpng from "../../assets/noIMGSq.png";
import InnerImageZoom from "react-inner-image-zoom";

const ImageZoomWrapper = ({ src, alt, className, zoom, onError }) => {
  return (
    <>
      <InnerImageZoom
        src={src}
        className={className}
        zoomScale={zoom}
        zoomType='hover'
        width={500}
        height={500}
        hideHint
        imgAttributes={{
          className: className,
          alt: alt,
          onError: (e) => {
            e.target.src = noIMGpng;
            e.target.className = className + ' errorImg';
          },
        }}
      />
    </>
  );
};

export default ImageZoomWrapper;
