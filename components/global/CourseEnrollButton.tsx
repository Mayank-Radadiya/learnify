"use client";

import { FormatPrice } from "@/lib/FormatPrice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseEnrollButtonProps {
  courseId: string;
  price: number;
}

const CourseEnrollButton = ({ courseId, price }: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`/api/courses/${courseId}/checkout`);
      window.location.assign(response.data.url);
    } catch (error) {
      console.error(error);
      toast.error("Failed to enroll in course. Try again later");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <button
        onClick={onClick}
        disabled={isLoading}
        className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-blue-500/90 backdrop-blur-lg px-4 py-1.5 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-blue-600/50 border border-white/20"
      >
        <span className="text-lg">
          {isLoading ? (
            <Loader2 className="animate-spin w-4 h-4" />
          ) : (
            `Enroll for ${FormatPrice(price)}`
          )}
        </span>
        <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
          <div className="relative h-full w-10 bg-white/30"></div>
        </div>
      </button>
    </>
  );
};

export default CourseEnrollButton;
