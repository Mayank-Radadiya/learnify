import { NextPage } from "next";

interface PageProps {
  params: {
    chapterId: string;
    courseId: string;
  };
}

const Page: NextPage<PageProps> = ({ params }) => {
  return (
    <div>
      <h1> Page.... </h1>
    </div>
  );
};

export default Page;
