"use client";

import { FormatPrice } from "@/lib/FormatPrice";

interface CourseEnrollButtonProps {
  courseId: string;
  price: number;
}

const CourseEnrollButton = ({ courseId, price }: CourseEnrollButtonProps) => {
  return (
    <>
      <button className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-blue-500/90 backdrop-blur-lg px-4 py-1.5 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-blue-600/50 border border-white/20">
        <span className="text-lg">Enroll for {FormatPrice(price)}</span>
        <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
          <div className="relative h-full w-10 bg-white/30"></div>
        </div>
      </button>
    </>
  );
};

export default CourseEnrollButton;
