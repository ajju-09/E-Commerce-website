import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  import { APP_NAME } from "@/lib/constants";
  const categories = ['men', 'women', 'kids', 'accessories', 'shoes', 'electronics', 'jewelry'];


export default async function Search() {
    return(
        <form action='/search' method="GET" className="flex items-stretch h-10">
            <Select name='category'>
                <SelectTrigger className='w-auto h-full dark:border-gray-200 bg-gray-100 text-black border-r  hover:cursor-pointer rounded-r-none rounded-l-md rtl:rounded-r-md rtl:rounded-l-none  '>
                <SelectValue placeholder="All" />
                </SelectTrigger>

                <SelectContent position="popper">
                    <SelectItem value="all">All</SelectItem>
                    {categories.map( (category) => (
                        <SelectItem key={category} value={category}>
                            {category}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Input className='flex-1 rounded-none dark:border-gray-200 bg-gray-100 text-black text-base '
            placeholder={`Search site ${APP_NAME}`}
            name='q'
            type="search"
            />

            <button type="submit" className="bg-primary text-black hover:text-primary-foreground hover:cursor-pointer rounded-s-none rounded-e-md px-3 mb-1">
                <SearchIcon className="w-6 h-6" />
            </button>

        </form>
    );
}