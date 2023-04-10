export default function LoadingSkeletons({ mode } : { mode:"chat" | "search" }) {
  return (
    <div className="mt-6 w-full">
                    
      {/* CHAT MODE SKELETON */}
      {mode === "chat" &&
        <>
          <div className="font-bold text-2xl">Alison:</div>
          <div className="animate-pulse mt-2">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded mt-2"></div>
            <div className="h-4 bg-gray-300 rounded mt-2"></div>
            <div className="h-4 bg-gray-300 rounded mt-2"></div>
            <div className="h-4 bg-gray-300 rounded mt-2"></div>
          </div>
        </>
      }

      {/* PASSAGES SKELETON */}
      <div className="font-bold text-2xl mt-6">Passages</div>
      <div className="animate-pulse mt-2">
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded mt-2"></div>
        <div className="h-4 bg-gray-300 rounded mt-2"></div>
        <div className="h-4 bg-gray-300 rounded mt-2"></div>
        <div className="h-4 bg-gray-300 rounded mt-2"></div>
      </div>

    </div>
  )
}