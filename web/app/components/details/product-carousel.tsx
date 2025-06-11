// components/details/ProductCarousel.tsx
"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CubeIcon } from "@radix-ui/react-icons";
import ShirtDesignerModal from "./designer/shirt-designer-modal";

interface Props {
  images: string[];
}

export default function ProductCarousel({ images }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [ref, slider] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    drag: currentSlide !== images.length,
  });

  useEffect(() => {
    if (slider.current) {
      slider.current.update({
        drag: currentSlide !== images.length,
      });
    }
  }, [currentSlide, images.length]);

  return (
    <div className="w-full">
      <div ref={ref} className="keen-slider aspect-[3/4] h-96 rounded overflow-hidden w-full">
        {images.map((img, i) => (
          <div className="keen-slider__slide flex justify-center items-center" key={i}>
            <Image src={img} alt={`Product ${i}`} fill className="object-contain" />
          </div>
        ))}
        <div
          className="keen-slider__slide flex justify-center items-center bg-neutral-100 cursor-pointer"
          key="model"
          onClick={() => setOpenModal(true)}
        >
          <CubeIcon className="w-10 h-10 text-black" />
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => slider.current?.moveToIdx(i)}
            className={`w-24 h-24 border-2 !p-0 ${
              currentSlide === i ? "border-black" : "border-neutral-300"
            }`}
          >
            <Image src={img} alt={`Thumb ${i}`} width={96} height={96} className="object-fill" />
          </button>
        ))}
        <button
          onClick={() => setOpenModal(true)}
          className={`w-24 h-24 flex justify-center items-center border-2 ${
            currentSlide === images.length ? "border-black" : "border-neutral-300"
          }`}
        >
          <CubeIcon />
        </button>
      </div>

      <ShirtDesignerModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
}