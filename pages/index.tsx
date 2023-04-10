import AlisonLogo from '@/components/AlisonIntelligenceWidget/AlisonLogo'
import ApiKeyNotice from '@/components/AlisonIntelligenceWidget/ApiKeyNotice'
import LoadingSkeletons from '@/components/AlisonIntelligenceWidget/LoadingSkeletons'
import Passages from '@/components/AlisonIntelligenceWidget/Passages'
import SearchBox from '@/components/AlisonIntelligenceWidget/SearchBox'
import Settings from '@/components/AlisonIntelligenceWidget/Settings'
import WidgetToggleButton from '@/components/AlisonIntelligenceWidget/WidgetToggleButton'
import { Answer } from '@/components/Answer/Answer'
import Main from '@/components/Main'
import { PGChunk } from '@/types'
import endent from 'endent'
import React, { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { TypeAnimation } from 'react-type-animation'

export default function Blog() {

    const inputRef = useRef<HTMLInputElement>(null);

    const [query, setQuery] = useState<string>("");
    const [chunks, setChunks] = useState<PGChunk[]>([]);
    const [answer, setAnswer] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
  
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const [mode, setMode] = useState<"search" | "chat">("chat");
    const [matchCount, setMatchCount] = useState<number>(5);
<<<<<<< HEAD:pages/index.tsx
    const [apiKey, setApiKey] = useState<string>(process.env.OPENAI_API_KEY);
=======
    const [apiKey, setApiKey] = useState<string>(process.env.OPENAI_API_KEY)
>>>>>>> 5bdbad9e4e07bdccbd581be66ef5431d1e448893:alison-intelligence-main/pages/index.tsx

    const [showAlison, setShowAlison] = useState<boolean>(false);
    const [iframeSource, setIframeSource] = useState<string>("https://alison-headless-blog.vercel.app");

    const handlePassageClick = (param: string) => setIframeSource(param);

    const handleSubmit = async () => {
      // CHECK API KEY
      if (!apiKey) {
        alert("Please enter an API key.");
        return;
      }

      // CHECK QUERY
      if (!query) {
        alert("Please enter a query.");
        return;
      }

      // RESET RESULTS STATES
      setAnswer("");
      setChunks([]);
      setLoading(true);

      // API CALL
      const searchResponse = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query,
          apiKey,
          matches: matchCount
        })
      });

      // CHECK ERROR
      if (!searchResponse.ok) {
        setLoading(false);
        throw new Error(searchResponse.statusText);
      }

      // EXTRACT JSON RESULTS
      const results: PGChunk[] = await searchResponse.json();

      // SET RESULTS STATES
      setChunks(results);

      if(mode === 'chat') {
        await processAnswer(query, results);
      }
  
      setLoading(false);
      inputRef.current?.focus();
  
      return results;
    }
  
    const processAnswer = (query: string, results: any[]) => {
      return new Promise(async resolve => {
        // CONSTRUCT THE AI PROMPT
        const prompt = endent`
          Use the following passages to provide an answer to the query: "${query}"
      
          ${results?.map((d: any) => d.content).join("\n\n")}
        `;
    
        // API CALL
        const answerResponse = await fetch("/api/answer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ prompt, apiKey })
        });
    
        // CHECK ERROR
        if (!answerResponse.ok) {
          setLoading(false);
          throw new Error(answerResponse.statusText);
        }
    
        // EXIT IF NO RESPONSE BODY
        if (!answerResponse.body) return;
    
        setLoading(false);
    
        const reader = answerResponse.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
    
        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunkValue = decoder.decode(value);
          setAnswer((prev) => prev + chunkValue);
        }

        resolve(true);
      })
    }
  
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== "Enter") return;
      handleSubmit()
    };
  
    const handleSave = () => {
      if (apiKey.length !== 51) {
        alert("Please enter a valid API key.");
        return;
      }
  
      localStorage.setItem("PG_KEY", apiKey);
      localStorage.setItem("PG_MATCH_COUNT", matchCount.toString());
      localStorage.setItem("PG_MODE", mode);
  
      setShowSettings(false);
      inputRef.current?.focus();
    };
  
    const handleClear = () => {
      localStorage.removeItem("PG_KEY");
      localStorage.removeItem("PG_MATCH_COUNT");
      localStorage.removeItem("PG_MODE");
  
      setApiKey("");
      setMatchCount(5);
      setMode("search");
    };
  
    useEffect(() => {
      if (matchCount > 10) {
        setMatchCount(10);
      } else if (matchCount < 1) {
        setMatchCount(1);
      }
    }, [matchCount]);
  
    useEffect(() => {
      const PG_KEY = localStorage.getItem("PG_KEY");
      const PG_MATCH_COUNT = localStorage.getItem("PG_MATCH_COUNT");
      const PG_MODE = localStorage.getItem("PG_MODE");
  
      if (PG_KEY) {
        setApiKey(PG_KEY);
      }
  
      if (PG_MATCH_COUNT) {
        setMatchCount(parseInt(PG_MATCH_COUNT));
      }
  
      if (PG_MODE) {
        setMode(PG_MODE as "search" | "chat");
      }
  
      inputRef.current?.focus();
    }, []);

    // https://i.ibb.co/pxCCqN0/ailogo-removebg-preview.png
    // http://alison-headless-blog.vercel.app
  return (
    <>
      <Main iframeSource={iframeSource} />

      {showAlison &&  
        <div className="fixed flex flex-col z-50 bottom-[100px] transition ease-in-out duration-300 top-0 right-0 h-auto left-0 sm:top-auto sm:right-5 sm:left-auto h-100% w-full sm:w-[400px] min-h-[250px] sm:h-[600px] border border-gray-300 bg-white overflow-auto shadow-xl rounded-2xl scrollbar-hide hover:shadow-2xl">
          <div className="flex p-5 flex-col justify-center items-center h-32 bg-green-500">
            <div className="grid grid-cols-5 place-content-start">
              <div className="grid grid-rows-2 col-span-3 place-content-start pt-6">
                <div className="pt-16">
                  <TypeAnimation
                    sequence={[
                      "Hi, I'm Alison, ask me about anything.", // Types 'hi'
                      1000, // Waits 1s
                      () => {
                        console.log('Sequence completed');
                      },
                    ]}
                    wrapper="span"
                    cursor={true}
                    repeat={0}
                    style={{ fontSize: '1.3em', display: 'inline-block', color: '#ffffff', marginTop: '1.2em'}}
                  />
                </div>
              </div>
            </div>
            <img className="h-60 pt-14 right-14 absolute" src="https://i.ibb.co/BTg2QbP/ai2-removebg-preview.png" alt="alison" />
          </div>
        
          <div className="z-1000 bg-gray-50 flex-grow"> 
            <div className="flex flex-col">
              <div className="flex-grow overflow-auto">
                <div className="mx-auto flex h-full w-full max-w-[750px] flex-col items-center px-3 sm:pt-8">

                  {/* SETTINGS */}
                  {showSettings && (
                    <Settings 
                      mode={mode} 
                      setMode={setMode} 
                      matchCount={matchCount} 
                      setMatchCount={setMatchCount} 
                      apiKey={apiKey} 
                      setApiKey={setApiKey} 
                      setShowSettings={setShowSettings} 
                      handleSave={handleSave} 
                      handleClear={handleClear}
                    />
                  )}

                  {/* SEARCH BOX & API CHECK */}
                  {apiKey.length === 51 ? (
                    <SearchBox 
                      inputRef={inputRef}
                      query={query}
                      setQuery={setQuery}
                      handleKeyDown={handleKeyDown}
                      handleSubmit={handleSubmit}
                    />
                  ) : (
                    <ApiKeyNotice />
                  )}

                  {/* LOADING / WAITING FOR BUFFER */}
                  {loading ? 
                    <LoadingSkeletons mode={mode} />
                    : 
                    answer ? 
                      (
                        <div className="mt-6">
                          <div className="font-bold text-2xl mb-2">Alison:</div>
                          <Answer text={answer} />

                          <div className="mt-6 mb-16">
                            <div className="font-bold text-2xl">Passages</div>
                            <Passages chunks={chunks} handlePassageClick={handlePassageClick} />
                          </div>
                        </div>
                      ) 
                      : 
                      chunks.length > 0 ? 
                        (
                          <div className="mt-6 pb-16">
                            <div className="font-bold text-2xl">Passages</div>
                            <Passages chunks={chunks} handlePassageClick={handlePassageClick} />
                          </div>
                        ) 
                        : 
                        <AlisonLogo />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {/* WIDGET TOGGLE BUTTON */}
      <WidgetToggleButton showAlison={showAlison} setShowAlison={setShowAlison} />
    </>

)
}
