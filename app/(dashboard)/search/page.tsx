"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { Category, Course } from "@prisma/client";
import Categories from "./_components/Categories";
import SearchInput from "@/components/global/SearchInput";
import { getCourses } from "@/action/get-courses";
import CourseList from "@/components/global/CourseList";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  progress: number | null;
  chapters: { id: string }[];
};

const Page = ({}) => {
  const { userId } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const title = searchParams.get("title") || "";
  const categoryId = searchParams.get("categoryId") || "";

  const [data, setData] = useState<Category[] | null>(null);

  const [courses, setCourses] = useState<CourseWithProgressWithCategory[]>([]);

  useEffect(() => {
    if (!userId) {
      router.push("/");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get("/api/categories");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchCourses = async () => {
      try {
        const result = await getCourses({ userId, title, categoryId });
        setCourses(result);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();
    fetchCourses();
  }, [userId, title, categoryId, router]);

  if (!userId) return null;

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6">
        <Categories item={data || []} />
      </div>

      <CourseList items={courses} />
    </>
  );
};

export default Page;
