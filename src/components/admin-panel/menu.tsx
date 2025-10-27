import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../@/lib/utils';
import { getMenuList } from '../../@/lib/menu-list';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from '@/components/ui/tooltip';

interface MenuProps {
  isOpen: boolean | undefined;
}

function Menu({ isOpen }: MenuProps) {
  const location = useLocation();
  const menuList = getMenuList(location.pathname);

  return (
    <ScrollArea className="[&>div>div[style]]:!block h-full">
      <nav className="h-full flex flex-col py-4">
        <ul className={cn(
          'flex flex-col flex-1 justify-between',
          isOpen === false ? 'items-center px-0' : 'items-start px-2'
        )}>
          {/* Top menu items (first group) */}
          <div className={cn('w-full space-y-1', isOpen === false ? 'flex flex-col items-center' : '')}>
            {menuList[0]?.menus.map(({ href, label, icon: Icon, active }, index) => (
              <div className={cn(isOpen === false ? '' : 'w-full')} key={index}>
                <TooltipProvider disableHoverableContent>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <Button
                        variant={active ? 'secondary' : 'ghost'}
                        className={cn(
                          'h-10 mb-1',
                          isOpen === false ? 'w-10 justify-center p-0' : 'w-full justify-start'
                        )}
                        asChild
                      >
                        <Link to={href} className="flex items-center">
                          <span className={cn(isOpen === false ? '' : 'mr-4')}>
                            <Icon size={18} />
                          </span>
                          <p
                            className={cn(
                              'max-w-[200px] truncate',
                              isOpen === false ? 'hidden' : 'block'
                            )}
                          >
                            {label}
                          </p>
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    {isOpen === false && (
                      <TooltipContent side="right">{label}</TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </div>
            ))}
          </div>

          {/* Bottom menu items (second group) */}
          <div className={cn('w-full space-y-1', isOpen === false ? 'flex flex-col items-center' : '')}>
            {menuList[1]?.menus.map(({ href, label, icon: Icon, active }, index) => (
              <div className={cn(isOpen === false ? '' : 'w-full')} key={index}>
                <TooltipProvider disableHoverableContent>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <Button
                        variant={active ? 'secondary' : 'ghost'}
                        className={cn(
                          'h-10 mb-1',
                          isOpen === false ? 'w-10 justify-center p-0' : 'w-full justify-start'
                        )}
                        asChild
                      >
                        <Link to={href} className="flex items-center">
                          <span className={cn(isOpen === false ? '' : 'mr-4')}>
                            <Icon size={18} />
                          </span>
                          <p
                            className={cn(
                              'max-w-[200px] truncate',
                              isOpen === false ? 'hidden' : 'block'
                            )}
                          >
                            {label}
                          </p>
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    {isOpen === false && (
                      <TooltipContent side="right">{label}</TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </div>
            ))}
          </div>
        </ul>
      </nav>
    </ScrollArea>
  );
}

export default Menu;
