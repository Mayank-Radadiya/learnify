import { Button } from "@/components/ui/button";
import { NextPage } from "next";
import Link from "next/link";

interface PageProps {}

const Page: NextPage<PageProps> = ({}) => {
  return (
    <div>
      <h1>Title: new Page</h1>
      <Link href="/teacher/create">
        <Button>Create </Button>
      </Link>
    </div>
  );
};

export default Page;