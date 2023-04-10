export default function WidgetToggleButton({ showAlison, setShowAlison } : { showAlison:boolean, setShowAlison:(value: boolean | ((prevVar: boolean) => boolean)) => void }) {
  return (
    <button onClick={() => setShowAlison(prevState => !prevState)}
      className="fixed z-40 right-5 bottom-5 shadow-lg flex justify-center items-center w-14 h-14 bg-green-500 rounded-full focus:outline-none hover:bg-green-600 focus:bg-green-600 transition duration-300 ease"
    >
      <svg
        className="w-6 h-6 text-white absolute"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={showAlison ? 'none' : '#ffffff'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {showAlison ?
          <>
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </>
          :
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        }
      </svg>
    </button>
  )
}