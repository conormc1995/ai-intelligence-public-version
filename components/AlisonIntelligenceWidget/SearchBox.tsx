import { IconArrowRight } from "@tabler/icons-react";
import { RefObject } from "react";

export default function SearchBox(
  { inputRef, query, setQuery, handleKeyDown, handleSubmit }
  : { inputRef:unknown, query:string, setQuery:Function, handleKeyDown:Function, handleSubmit:Function }
) {
  return (
    <div className="relative w-full">
      <input
        ref={inputRef as RefObject<HTMLInputElement>}
        className="h-12 w-full rounded-full border border-zinc-600 focus:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-800 sm:h-16 sm:py-2 sm:pl-2 sm:text-md"
        type="text"
        placeholder="How do I start a startup?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />

      <button>
        <IconArrowRight
          onClick={() => handleSubmit()}
          className="absolute right-2 top-2.5 h-7 w-7 rounded-full bg-green-500 p-1 hover:cursor-pointer hover:bg-green-600 sm:right-3 sm:top-3 sm:h-10 sm:w-10 text-white"
        />
      </button>
    </div>
  )
}