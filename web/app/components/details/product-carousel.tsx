// components/details/ProductCarousel.tsx
"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import ModelVisualizer from "../model-visualizer";
import { CubeIcon } from "@radix-ui/react-icons";

interface Props {
  images: string[];
}

export default function ProductCarousel({ images }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [ref, slider] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    drag: currentSlide !== images.length, // ← Dynamic drag config
  });
  
  
  useEffect(() => {
    if (slider.current) {
      slider.current.update({
        drag: currentSlide !== images.length,
      });
    }
  }, [currentSlide, images.length]);

  const goToSlide = (index: number) => {
    slider.current?.moveToIdx(index);
  };

  return (
    <div className="w-full">
      {/* Main carousel */}
      <div
        ref={ref}
        className="keen-slider aspect-[3/4] h-96 rounded overflow-hidden w-full"
      >
        {images.map((img, i) => (
          <div
            className="keen-slider__slide flex items-start justify-start !min-h-96 !max-h-96 !h-96 !w-full !max-w-full"
            key={i}
          >
            <Image
              src={img}
              alt={`Product ${i}`}
              fill
              priority={i === 0}
              sizes="600px, 400px"
              className="object-contain"
            />
          </div>
        ))}

        <div
          className="keen-slider__slide flex items-start justify-start !min-h-96 !max-h-96 !h-96 !w-full !max-w-full"
          key={images.length}
        >
          <ModelVisualizer />
        </div>
      </div>

      {/* Thumbnail navigation */}
      <div className="flex justify-center gap-3 mt-6 max-w-full overflow-x-auto">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-32 h-32 !p-0 border-2 ${
              i === currentSlide ? "border-black" : "border-neutral-300"
            } rounded overflow-hidden`}
          >
            <Image
              src={img}
              alt={`Thumb ${i}`}
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </button>
        ))}

        <button
          onClick={() => goToSlide(images.length)}
          className={`w-32 h-32 flex items-center justify-center border-2 ${
            currentSlide === images.length ? "border-black" : "border-neutral-300"
          } rounded`}
        >
          <CubeIcon></CubeIcon>
        </button>
      </div>
    </div>
  );
}
