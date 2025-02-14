import { Meteors } from "@/components/magicui/meteors";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const layoutAuth = ({ children }: AuthLayoutProps) => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border">
      <Meteors number={30} />
    
      {children}
    </div>
  );
};

export default layoutAuth;
