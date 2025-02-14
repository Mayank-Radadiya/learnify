import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-5xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10 pb-3">
        Sign Up
      </span>
      <SignUp />
    </>
  );
}
