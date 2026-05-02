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
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import navLogo from "../../../assets/images/a.shrink-0.png"
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { FaIdCard } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { useUserStore } from "@/hooks/useUserStore"
import { useCartStore } from "@/hooks/useCartStore"
import { toast } from "sonner"

export default function Navbar() {
  const { token, logout } = useUserStore()
  const { numOfCartItems, fetchCart } = useCartStore()

  React.useEffect(() => {
    if (token) {
      fetchCart(token)
    }
  }, [token, fetchCart])

  return (
    // ✅ wrapper div handles full-width layout, position relative for dropdown
    <div className="relative w-full flex items-center justify-between p-4">

      {/* Logo */}
      <Link href="/">
        <img className="w-48 md:w-64" src={navLogo.src} alt="logo" />
      </Link>

      {/* Search Input */}
      <div className="hidden md:block w-1/3 lg:w-2/3 mx-5">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for products, brands and more..."
            className="w-full border border-gray-300 rounded-full px-5 py-2 pr-12 focus:outline-none"
          />
          <div className="absolute right-1 top-1/2 -translate-y-1/2 bg-green-600 p-2 rounded-full cursor-pointer">
            <FiSearch className="text-white text-lg" />
          </div>
        </div>
      </div>

      {/* ✅ NavigationMenu only wraps the nav links now */}
      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/" className="px-3 py-2 text-sm font-medium hover:text-green-600 transition">home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/shop" className="px-3 py-2 text-sm font-medium hover:text-green-600 transition">shop</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>categories</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-96 p-4">
                <ListItem href="/categories" title="All Categories">
                  Explore our wide range of product categories.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/brands" className="px-3 py-2 text-sm font-medium hover:text-green-600 transition">brands</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

        </NavigationMenuList>

        {/* ✅ Viewport anchored below the nav */}
        <div className="absolute top-full left-0 w-full flex justify-center">
          <NavigationMenuViewport />
        </div>
      </NavigationMenu>

      {/* Icons & Actions — outside NavigationMenu entirely */}
      <div className="flex items-center space-x-2 md:space-x-4">

        <div className="hidden sm:flex items-center space-x-3 pr-4 border-r border-gray-200">
          <div className="bg-[#cfefd9] p-2 md:p-3 rounded-full">
             <TfiHeadphoneAlt className="text-[#16A34A] text-lg md:text-xl" />
          </div>
          <span className="text-gray-400 text-xs md:text-sm leading-tight">
            Support <br />
            <span className="text-black font-semibold">24/7</span>
          </span>
        </div>

        <div className="pl-2">
          <Link className="font-bold text-gray-500 text-xl hover:text-green-600 transition" href="/wishlist"><FaHeart /></Link>
        </div>
        <div className="pl-2 relative">
          <Link className="font-bold text-gray-500 text-xl hover:text-green-600 transition" href="/cart">
            <FaShoppingCart />
            {numOfCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {numOfCartItems}
              </span>
            )}
          </Link>
        </div>
        
        {token ? (
          <div className="flex items-center space-x-4">
            <Link className="font-bold text-gray-500 text-xl hover:text-green-600 transition" href="/allorders"><FaIdCard /></Link>
            <button 
              onClick={() => {
                logout()
                toast.success("Logged out successfully")
              }}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold text-xs px-3 py-1.5 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Link href="/login" className="text-gray-600 font-semibold text-xs md:text-sm hover:text-green-600">Login</Link>
            <Link href="/register" className="bg-green-600 hover:bg-green-700 text-white font-semibold text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded-lg transition">Sign Up</Link>
          </div>
        )}

      </div>

    </div>
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