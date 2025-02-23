"use client";
import { Category } from "@prisma/client";
import axios from "axios";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import Categories from "./_components/Categories";

interface PageProps {}

const Page: NextPage<PageProps> = ({}) => {
  const [data, setData] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/categories");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="p-6">
      <Categories item={data} />
    </div>
  );
};

export default Page;
