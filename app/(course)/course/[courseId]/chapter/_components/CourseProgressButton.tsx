"use client";

import { Button } from "@/components/ui/button";
import { useConfetti } from "@/hooks/use-confetti";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseProgressButtonProps {
  courseId: string;
  chapterId: string;
  isCompleted?: boolean;
  nextChapterId?: string;
}

const CourseProgressButton = ({
  chapterId,
  courseId,
  isCompleted,
  nextChapterId,
}: CourseProgressButtonProps) => {
  const router = useRouter();
  const confetti = useConfetti();
  const [loading, setLoading] = useState(false);
  const Icon = isCompleted ? XCircle : CheckCircle;

  const onClick = async () => {

    setLoading(true);
    try {
      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        {
          isCompleted: !isCompleted,
        }
      );

      if (!isCompleted && !nextChapterId) {
        toast.success("Congratulations! You have completed the course 🎉🎉🎉");
        confetti.OnOpen();
      }

      if (!isCompleted && nextChapterId) {
        toast.success("Congratulations! You have completed the chapter 😇");
        router.push(`/course/${courseId}/chapter/${nextChapterId}`);
      }
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={onClick}
        type="button"
        disabled={loading}
        variant={isCompleted ? "outline" : "success"}
      >
        {isCompleted ? "Not Completed" : "Mark as Complete"}
        <Icon size={24} />
      </Button>
    </>
  );
};

export default CourseProgressButton;
