import { Navbar } from "../admin-panel/navbar";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div className="h-full flex flex-col">
      <Navbar title={title} />
      <div className="flex-1 container pt-8 pb-8 px-10 sm:px-8 overflow-y-auto">{children}</div>
    </div>
  );
}
