import { 
  FileText, 
  CheckSquare, 
  Folder, 
  Bookmark, 
  Users, 
  HelpCircle, 
  Settings 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface IconSidebarProps {
  currentPath: string;
}

export function IconSidebar({ currentPath }: IconSidebarProps) {
  const topMenuItems = [
    { icon: FileText, label: 'Notes', path: '/notes' },
    { icon: CheckSquare, label: 'Todos', path: '/todos' },
    { icon: Folder, label: 'Folders', path: '/folders' },
    { icon: Bookmark, label: 'Saved', path: '/saved' },
    { icon: Users, label: 'Friends', path: '/friends' },
  ];

  const bottomMenuItems = [
    { icon: HelpCircle, label: 'Help', path: '/help' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="fixed left-0 top-0 z-30 h-screen w-[70px] border-r bg-background flex flex-col items-center py-4">
      {/* Logo */}
      <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
        <span className="text-lg font-bold text-primary-foreground">L</span>
      </div>

      {/* Top Menu Items */}
      <nav className="flex flex-1 flex-col items-center gap-2">
        {topMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath.startsWith(item.path);
          
          return (
            <TooltipProvider key={item.path}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    variant={isActive ? 'secondary' : 'ghost'}
                    size="icon"
                    className={cn(
                      'h-10 w-10',
                      isActive && 'bg-secondary'
                    )}
                    asChild
                  >
                    <a href={item.path}>
                      <Icon className="h-5 w-5" />
                      <span className="sr-only">{item.label}</span>
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </nav>

      {/* Bottom Menu Items */}
      <div className="flex flex-col items-center gap-2">
        {bottomMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          
          return (
            <TooltipProvider key={item.path}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    variant={isActive ? 'secondary' : 'ghost'}
                    size="icon"
                    className="h-10 w-10"
                    asChild
                  >
                    <a href={item.path}>
                      <Icon className="h-5 w-5" />
                      <span className="sr-only">{item.label}</span>
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </aside>
  );
}
