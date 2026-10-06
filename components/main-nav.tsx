"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import {
  School,
  GraduationCap,
  Users,
  Target,
  Calendar,
  BookOpen,
  Image as ImageIcon,
  Newspaper,
  BriefcaseBusiness,
  PhoneCall,
  Menu,
  X,
  VideoIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const aboutItems = [
  {
    title: "Principal's Message",
    href: "/about/principal-message",
    description: "Welcome message from our school principal",
    icon: <Users className="h-5 w-5 text-[#D41D33]" />
  },
  {
    title: "Our Team",
    href: "/about/our-team",
    description: "Meet our dedicated faculty and staff",
    icon: <Users className="h-5 w-5 text-[#D41D33]" />
  },
  {
    title: "Why Vedanga",
    href: "/about/why-us",
    description: "Features that makes Vedanga standout",
    icon: <Users className="h-5 w-5 text-[#D41D33]" />
  },
  {
    title: "Vision & Mission",
    href: "/about/vision-mission",
    description: "Our goals and educational philosophy",
    icon: <Target className="h-5 w-5 text-[#D41D33]" />
  },
];

const academicsItems = [
  {
    title: "Curriculum",
    href: "/academics/curriculum",
    description: "Our comprehensive educational programs",
    icon: <BookOpen className="h-5 w-5 text-[#D41D33]" />
  },
  {
    title: "Programs",
    href: "/academics/programs",
    description: "Specialized academic offerings",
    icon: <GraduationCap className="h-5 w-5 text-[#D41D33]" />
  },
];

const schoolLifeItems = [
  {
    title: "Events",
    href: "/school-life/events",
    description: "School events and activities",
    icon: <Calendar className="h-5 w-5 text-[#D41D33]" />
  },
  {
    title: "Clubs",
    href: "/school-life/clubs",
    description: "Student clubs and organizations",
    icon: <Users className="h-5 w-5 text-[#D41D33]" />
  },
  {
    title: "Gallery",
    href: "/school-life/gallery",
    description: "Photos of school life and events",
    icon: <ImageIcon className="h-5 w-5 text-[#D41D33]" />
  },
  {
    title: "Videos",
    href: "/school-life/videos",
    description: "Videos of school life and events",
    icon: <VideoIcon className="h-5 w-5 text-[#D41D33]" />
  },
];

export function MainNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex items-center justify-between w-full p-4">
      <Link href="/" className="flex items-center space-x-2">
        <div className="flex flex-col items-center">
          <Image
            priority
            src="/images/logo.png"
            alt="Vedanga Logo"
            width={40}
            height={40}
            className="h-12 w-fit lg:h-16 lg:w-fit object-cover"
          />
          {/* <span className="hidden text-[10px] font-bold text-[#D41D33] xl:inline lg:ml-2">
            Vedanga International School
          </span> */}
        </div>
      </Link>

      {/* Desktop Navigation */}
      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList className="space-x-2">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent hover:bg-gray-50">About</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[420px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                {aboutItems.map((item) => (
                  <ListItem
                    key={item.href}
                    title={item.title}
                    href={item.href}
                    icon={item.icon}
                  >
                    {item.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent hover:bg-gray-50">Academics</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                {academicsItems.map((item) => (
                  <ListItem
                    key={item.href}
                    title={item.title}
                    href={item.href}
                    icon={item.icon}
                  >
                    {item.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent hover:bg-gray-50">School Life</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                {schoolLifeItems.map((item) => (
                  <ListItem
                    key={item.href}
                    title={item.title}
                    href={item.href}
                    icon={item.icon}
                  >
                    {item.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/updates" legacyBehavior passHref>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-gray-50")}>
                <div className="flex items-center space-x-2">
                  <Newspaper className="h-5 w-5" />
                  <span>Updates</span>
                </div>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/careers" legacyBehavior passHref>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-gray-50")}>
                <div className="flex items-center space-x-2">
                  <BriefcaseBusiness className="h-5 w-5" />
                  <span>Careers</span>
                </div>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/contact" legacyBehavior passHref>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-gray-50")}>
                <div className="flex items-center space-x-2">
                  <PhoneCall className="h-5 w-5" />
                  <span>Contact</span>
                </div>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col h-full">
              <div className="mt-4 space-y-1">
                <MobileNavItem
                  title="About"
                  items={aboutItems}
                  onClose={() => setOpen(false)}
                />
                <MobileNavItem
                  title="Academics"
                  items={academicsItems}
                  onClose={() => setOpen(false)}
                />
                <MobileNavItem
                  title="School Life"
                  items={schoolLifeItems}
                  onClose={() => setOpen(false)}
                />
                <Link href="/updates" className="flex items-center px-4 py-3 text-sm font-medium rounded-md hover:bg-gray-100" onClick={() => setOpen(false)}>
                  <Newspaper className="h-5 w-5 mr-3 text-[#D41D33]" />
                  Updates
                </Link>
                <Link
                  href="/careers"
                  className="flex items-center px-4 py-3 text-sm font-medium rounded-md hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  <BriefcaseBusiness className="h-5 w-5 mr-3 text-[#D41D33]" />
                  Careers
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center px-4 py-3 text-sm font-medium rounded-md hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  <PhoneCall className="h-5 w-5 mr-3 text-[#D41D33]" />
                  Contact
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center space-x-2">
            {icon}
            <span className="text-sm font-medium leading-none">{title}</span>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

interface MobileNavItemProps {
  title: string;
  items: {
    title: string;
    href: string;
    description: string;
    icon: React.ReactNode;
  }[];
  onClose: () => void;
}

const MobileNavItem = ({ title, items, onClose }: MobileNavItemProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-md hover:bg-gray-100"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center">
          <span>{title}</span>
        </div>
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="pl-4 py-2 space-y-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-gray-100"
              onClick={() => {
                onClose();
                setOpen(false);
              }}
            >
              {item.icon}
              <span className="ml-3">{item.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
