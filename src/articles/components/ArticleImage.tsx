import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MotionComponentProps } from "~/utils/types";

export default function ArticleImage({
  src,
  className = "",
  ...props
}: MotionComponentProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  /**
   * Image loading effect.
   * Intersection based image loading.
   */
  useEffect(() => {
    const { current: imgEl } = imgRef;

    if (!imgEl) return;

    const src = imgEl.dataset.src;

    if (!src) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          /**
           * A loader image that loads the actual image.
           */
          const loader = new Image();

          // This initiates the loading process.
          loader.src = src;

          loader.onload = () => {
            imgEl.src = src;
            imgEl.dataset.src = "";
            imgEl.classList.remove("loading");
            observer.unobserve(imgEl);
          };

          loader.onerror = () => {
            imgEl.src = "https://picsum.photos/seed/johncena/1000";
            imgEl.dataset.src = "";
            imgEl.classList.remove("loading");
            observer.unobserve(imgEl);
          };
        }
      });
    });

    observer.observe(imgEl);

    return () => {
      observer.unobserve(imgRef.current!);
    };
  }, []);

  return (
    <motion.img
      {...props}
      ref={imgRef}
      loading="lazy"
      data-src={src}
      className={`loading ${className}`}
    />
  );
}