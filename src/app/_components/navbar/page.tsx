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
    <div className="relative w-full flex items-center justify-between p-4 border-b">

      {/* Logo */}
      <div>
        <Link href="/">
          <img className="w-64" src={navLogo.src} alt="logo" />
        </Link>
      </div>

      {/* Search Input */}
      <div className="w-2/3 mx-5">
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
      <NavigationMenu>
        <NavigationMenuList>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/" className="px-2 font-medium">home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/shop" className="px-2 font-medium">shop</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="font-medium">categories</NavigationMenuTrigger>
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
              <Link href="/brands" className="px-2 font-medium">brands</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

        </NavigationMenuList>

        {/* ✅ Viewport anchored below the nav */}
        <div className="absolute top-full left-0 w-full flex justify-center">
          <NavigationMenuViewport />
        </div>
      </NavigationMenu>

      {/* Icons & Actions — outside NavigationMenu entirely */}
      <div className="flex items-center space-x-4">

        <div className="flex items-center space-x-3 pr-4 border-r border-black">
          <div className="bg-[#cfefd9] p-3 rounded-full">
            <TfiHeadphoneAlt className="text-[#16A34A] text-xl" />
          </div>
          <span className="text-gray-400 leading-tight">
            Support <br />
            <span className="text-black font-semibold">24/7</span>
          </span>
        </div>

        <div className="pl-4">
          <Link className="font-bold text-gray-500 text-xl" href="/wishlist"><FaHeart /></Link>
        </div>
        <div className="pl-4 relative">
          <Link className="font-bold text-gray-500 text-xl" href="/cart">
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
            <Link className="font-bold text-gray-500 text-xl" href="/allorders"><FaIdCard /></Link>
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
            <Link href="/login" className="text-gray-600 font-semibold text-sm">Login</Link>
            <div className="bg-green-600 flex items-center justify-center rounded-2xl w-24 h-8">
              <Link href="/register" className="text-white font-semibold text-sm text-center">Sign Up</Link>
            </div>
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