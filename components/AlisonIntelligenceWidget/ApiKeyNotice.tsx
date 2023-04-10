export default function ApiKeyNotice() {
  return (
    <div className="text-center font-bold text-3xl mt-7">
      Please enter your
      <a className="mx-2 underline hover:opacity-50" href="https://platform.openai.com/account/api-keys">
        OpenAI API key
      </a>
      in settings.
    </div>
  )
}