'use client';
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";


function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    return (
    <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
      
      <Menu setActive={setActive}>
        <Link href={"/"}>

          <MenuItem setActive={setActive} active={active} item="Home">

          </MenuItem>
        </Link>
         
        <Link href="/matches"> 
        <MenuItem setActive={setActive} active={active} item="Matches" >

        </MenuItem>
        </Link>
        
        <Link href="/builderxi">
        <MenuItem setActive={setActive} active={active} item="Builder XI ">

        </MenuItem>
        </Link>
         
        <MenuItem setActive={setActive} active={active} item="Tournaments">

          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/tournaments">UCL</HoveredLink>
            <HoveredLink href="/tournaments">EPL</HoveredLink>
            <HoveredLink href="/tournaments">La liga</HoveredLink>
            <HoveredLink href="/tournaments">Other</HoveredLink>
          </div>
                 
        </MenuItem>
      </Menu>


    </div>
  )
}

export default Navbar
