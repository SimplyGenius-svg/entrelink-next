"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Building2, SearchIcon, Tags } from 'lucide-react'

export function Search() {
  const [open, setOpen] = useState(false)

  return (
    <div className="mx-auto flex max-w-2xl gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[200px] justify-start shadow-sm hover:bg-muted">
            <Tags className="mr-2 h-4 w-4" />
            All Categories
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 shadow-md" align="start">
          <Command>
            <CommandInput placeholder="Search categories..." />
            <CommandList>
              <CommandEmpty>No categories found.</CommandEmpty>
              <CommandGroup>
                <CommandItem>
                  <Building2 className="mr-2 h-4 w-4" />
                  Venture Capital
                </CommandItem>
                <CommandItem>
                  <Building2 className="mr-2 h-4 w-4" />
                  Angel Investors
                </CommandItem>
                <CommandItem>
                  <Building2 className="mr-2 h-4 w-4" />
                  Investment Firms
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="flex flex-1 items-center gap-2 rounded-lg border bg-background px-3 shadow-sm focus-within:ring-2 focus-within:ring-primary">
        <SearchIcon className="h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by industry, location, or investment size..."
          className="border-0 focus-visible:ring-0"
        />
      </div>
      <Button className="shadow-sm">Search</Button>
    </div>
  )
}

