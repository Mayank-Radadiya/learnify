"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Course } from "@prisma/client";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import CreateButton from "@/components/global/CreateButton";
import { PenBoxIcon } from "lucide-react";

type CourseWithPurchaseCount = Course & {
  _count: { purchases: number };
};
const Page = () => {
  const [data, setData] = useState<CourseWithPurchaseCount[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/teacher/course");
        setData(response.data); // ✅ Ensure we're setting `data`, not `response`
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchData();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Courses</h1>
        <Link href="/teacher/create">
          <CreateButton />
        </Link>
      </div>

      <Table className="border mt-5 text-center">
        <TableCaption>A list of your course.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Title</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">isPublished</TableHead>
            <TableHead className="text-center">Total Purchases</TableHead>
            <TableHead>Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.length > 0 ? (
            currentData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  {item.price ? <>${item.price} </> : <>-</>}
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "bg-yellow-200 text-slate-800 cursor-pointer hover:bg-yellow-300",
                      item.isPublished && "bg-emerald-300  hover:bg-emerald-400"
                    )}
                  >
                    {item.isPublished ? "Published" : "Not Published"}{" "}
                  </Badge>
                </TableCell>
                <TableCell>{item._count.purchases || 0}</TableCell>
                <TableCell>
                  <Link href={`/teacher/course/${item.id}`}>
                    <PenBoxIcon className="h-5 w-5 text-slate-400" />
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No courses found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center mt-4 space-x-2">
          <Button
            variant="ghost"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </Button>
          <span className="px-3">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="ghost"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default Page;
