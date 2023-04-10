import { PGChunk } from "@/types";
import { IconExternalLink } from "@tabler/icons-react";

export default function Passages({ chunks, handlePassageClick } : { chunks:PGChunk[], handlePassageClick:Function }) {
  return (
    <>
      {chunks.map((chunk, index) => (
        <div key={index}>
          <div className="mt-4 border border-zinc-600 rounded-lg p-4">
            <div className="flex justify-between">
              <div>
                <div className="font-bold text-lg">{chunk.essay_title}</div>
                <div className="mt-1 font-bold text-sm">{chunk.essay_date}</div>
              </div>

              <button
                onClick={() => handlePassageClick(chunk.essay_url)}
                className="hover:opacity-50 ml-2">
                <IconExternalLink />
              </button>
            </div>
            <div className="mt-2 line-clamp-2">{chunk.content}</div>
          </div>
        </div>
      ))}
    </>
  )
}