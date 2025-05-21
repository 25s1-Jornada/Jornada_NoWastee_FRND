'use client'

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { useState } from "react";
import ModelVisualizer from "@/app/components/model-visualizer";

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
  });

  return (
    <>
      <div ref={ref} className="keen-slider aspect-[3/4] rounded overflow-hidden mb-4">
        {images.map((img, i) => (
          <div className="keen-slider__slide" key={i}>
            <Image
              src={img}
              alt={`Product ${i}`}
              width={200}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="keen-slider__slide" key={images.length}>
          <ModelVisualizer />
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mb-6">
        {[...images, "model"].map((_, i) => (
          <button
            key={i}
            onClick={() => slider.current?.moveToIdx(i)}
            className={`h-2 w-2 rounded-full ${
              i === currentSlide ? "bg-black" : "bg-neutral-400"
            }`}
          />
        ))}
      </div>
    </>
  );
}