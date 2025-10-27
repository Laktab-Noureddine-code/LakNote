import { cn } from "../../@/lib/utils";
import { useStore } from "../../hooks/use-store";
import { Sidebar } from "./sidebar";
import { useSidebarToggle } from "../../hooks/use-sidebar-toggle";

export default function AdminPanelLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <main
        className={cn(
          "flex-1 bg-zinc-50 dark:bg-zinc-900 overflow-y-auto overflow-x-hidden transition-all ease-in-out duration-300",
          sidebar.isOpen === false ? "lg:ml-[70px]" : "lg:ml-72"
        )}
      >
        {children}
      </main>
    </div>
  );
}
