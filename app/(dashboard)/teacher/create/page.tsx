import CreateForm from "@/components/Form/CreateForm";
import { NextPage } from "next";

interface PageProps {}

const Page: NextPage<PageProps> = ({}) => {
  return (
    <>
      <CreateForm />
    </>
  );
};

export default Page;
