import Head from "next/head";

export default function Main({ iframeSource } : { iframeSource:string }) {
  return (
    <>
      <Head>
        <title>Alison Intelligence</title>
        <meta
          name="description"
          content={`AI-powered search and chat trained on Alison's blog content.`}
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="https://image.winudf.com/v2/image1/Y29tLmFsaXNvbi5tb2JpbGUuZmx1dHRlcl9pY29uXzE2NDY5MDY1NThfMDU1/icon.png?w=140&fakeurl=1"
        />
      </Head>

      <div id="content" className="absolute top-0 left-0 bottom-0 right-0">
        <iframe width="100%" height="100%" src={iframeSource}></iframe>
      </div>
    </>
  )
}