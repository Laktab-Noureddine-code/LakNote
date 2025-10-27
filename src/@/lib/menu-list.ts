import {
  FileText,
  Folder,
  CheckSquare,
  Bookmark,
  Users,
  HelpCircle,
  Settings
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/notes",
          label: "Notes",
          active: pathname.includes("/notes"),
          icon: FileText,
          submenus: []
        },
        {
          href: "/todos",
          label: "Todos",
          active: pathname.includes("/todos"),
          icon: CheckSquare,
          submenus: []
        },
        {
          href: "/folders",
          label: "Folders",
          active: pathname.includes("/folders"),
          icon: Folder,
          submenus: []
        },
        {
          href: "/saved",
          label: "Saved",
          active: pathname.includes("/saved"),
          icon: Bookmark,
          submenus: []
        },
        {
          href: "/friends",
          label: "Friends",
          active: pathname.includes("/friends"),
          icon: Users,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/help",
          label: "Help",
          active: pathname.includes("/help"),
          icon: HelpCircle,
          submenus: []
        },
        {
          href: "/settings",
          label: "Settings",
          active: pathname.includes("/settings"),
          icon: Settings,
          submenus: []
        }
      ]
    }
  ];
}