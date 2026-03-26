"use client"

import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import navLogo from "../../../assets/images/a.shrink-0.png"
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { FaIdCard } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
const components: { title: string; href: string; description: string }[] = [

  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export default function NavigationMenuDemo() {
  return (
    <NavigationMenu className=" max-w-none p-4 flex items-center justify-between  ">





            {/* Logo */}
        <div>
            <img className=" w-64" src={navLogo.src} alt="logo" />
        </div>


                    {/* Search Input */}
<div className="w-2/3 mx-5">
  <div className="relative">
    
    <input
      type="text"
      placeholder="Search for products, brands and more..."
      className="w-full border border-gray-300 rounded-full px-5 py-2 pr-12 focus:outline-none"
    />

    {/* Search Icon */}
    <div className="absolute right-1 top-1/2 -translate-y-1/2 bg-green-600 p-2 rounded-full cursor-pointer">
      <FiSearch className="text-white text-lg" />
    </div>

  </div>
</div>



      <NavigationMenuList>


        <NavigationMenuItem>
          <NavigationMenuLink>
            <Link href="/">home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>



        <NavigationMenuItem>
          <NavigationMenuLink>
            <Link href="/shop">shop</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>


        <NavigationMenuItem>
          <NavigationMenuTrigger>categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-96">
              <ListItem href="/docs" title="Introduction">
                Re-usable components built with Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>


        <NavigationMenuItem>
          <NavigationMenuLink>
            <Link href="/brands">brands</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>




<div className="flex items-center space-x-4">
  
  {/* Left section */}
  <div className="flex items-center space-x-3 pr-4 border-r border-black">
    <div className="bg-[#cfefd9] p-3 rounded-full">
      <Link className="text-[#16A34A] text-xl" href="/login">
        <TfiHeadphoneAlt />
      </Link>
    </div>

    <span className="text-gray-400 leading-tight">
      Support <br />
      <span className="text-black font-semibold">24/7</span>
    </span>
  </div>

  {/* Right section */}
  <div className="pl-4">
    <Link className="font-bold text-gray-500 text-xl" href="/register"><FaHeart /></Link>
  </div>
  <div className="pl-4">
    <Link className="font-bold text-gray-500 text-xl" href="/register"><FaShoppingCart /></Link>
  </div>
  <div className="pl-4">
    <Link className="font-bold text-gray-500 text-xl" href="/register"><FaIdCard /></Link>
  </div>
  <div className=" bg-green-600 flex items-center justify-center rounded-2xl w-18 h-8">
    <Link href="/register" className= "text-white font-semibold text-sm text-center">Sign Up</Link>
  </div>

</div>

      </NavigationMenuList>


    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>
            <div className="line-clamp-2 text-muted-foreground">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
