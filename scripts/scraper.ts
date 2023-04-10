import { PGChunk, PGEssay, PGJSON } from "@/types";
import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";
import { encode } from "gpt-3-encoder";

const BASE_URL = "http://www.alison.com/";
const CHUNK_SIZE = 200;
const linksArr: { url: string; title: string }[] = [];
const numberOfBlogPages = 53;

const getLinks = async () => {
  var BLOG_URL: string | number = `${BASE_URL}/blog`;

  for(let page = 1; page < numberOfBlogPages; page++) {
    if (page < 2){
      BLOG_URL = `${BASE_URL}/blog`
    } else  {
      BLOG_URL = `${BASE_URL}/blog/page/${page}`;
    }

    const html = await axios.get(BLOG_URL);  // GET HTML CONTENT
    const $ = cheerio.load(html.data);
    const articles = $("#content-area");  // GET ARTICLE CONTENT

    articles.each((i, article) => {  // ITERATE THROUGH ALL ARTICLES
      const links = $(article).find("article");  // GET ARTICLE DOM ELEMENT

      links.each((i, link) => {
        const readBtn = $(link).find('.btn-ghost');
        const titleBox = $(link).find('.entry-title');
        const url = $(readBtn).attr("href");
        const title = $(titleBox).text();

        if (url) linksArr.push({ url, title });  // COLLECT LINKS
      });
    });
  }

  return linksArr;
};


const getEssay = async (linkObj: { url: string; title: string }) => {
    const { title, url } = linkObj;
  
    let essay: PGEssay = {
      title: "",
      url: "",
      date: "",
      thanks: "",
      content: "",
      length: 0,
      tokens: 0,
      chunks: []
    };
  
    const fullLink = url;
    const html = await axios.get(fullLink);
    const $ = cheerio.load(html.data);
    const tables = $(".entry-content");
    
    const text = $(tables).text();

    const published = $(".published").first();
    const dateStr = $(published).text();

    let cleanedText = text.replace(/\s+/g, " ");
    cleanedText = cleanedText.replace(/\.([a-zA-Z])/g, ". $1");


    let essayText = cleanedText;
    let thanksTo = "";

    const trimmedContent = essayText.trim();

    essay = {
      title,
      url: fullLink,
      date: dateStr,
      thanks: thanksTo.trim(),
      content: trimmedContent,
      length: trimmedContent.length,
      tokens: encode(trimmedContent).length,
      chunks: []
    };
  
    return essay;
  };


  const chunkEssay = async (essay: PGEssay) => {
    const { title, url, date, thanks, content, ...chunklessSection } = essay;
  
    let essayTextChunks = [];
  
    if (encode(content).length > CHUNK_SIZE) {
      const split = content.split(". ");
      let chunkText = "";
  
      for (let i = 0; i < split.length; i++) {
        const sentence = split[i];
        const sentenceTokenLength = encode(sentence);
        const chunkTextTokenLength = encode(chunkText).length;
  
        if (chunkTextTokenLength + sentenceTokenLength.length > CHUNK_SIZE) {
          essayTextChunks.push(chunkText);
          chunkText = "";
        }
  
        if (sentence[sentence.length - 1].match(/[a-z0-9]/i)) {
          chunkText += sentence + ". ";
        } else {
          chunkText += sentence + " ";
        }
      }
  
      essayTextChunks.push(chunkText.trim());
    } else {
      essayTextChunks.push(content.trim());
    }
  
    const essayChunks = essayTextChunks.map((text) => {
      const trimmedText = text.trim();
  
      const chunk: PGChunk = {
        essay_title: title,
        essay_url: url,
        essay_date: date,
        essay_thanks: thanks,
        content: trimmedText,
        content_length: trimmedText.length,
        content_tokens: encode(trimmedText).length,
        embedding: []
      };
  
      return chunk;
    });
  
    if (essayChunks.length > 1) {
      for (let i = 0; i < essayChunks.length; i++) {
        const chunk = essayChunks[i];
        const prevChunk = essayChunks[i - 1];
  
        if (chunk.content_tokens < 100 && prevChunk) {
          prevChunk.content += " " + chunk.content;
          prevChunk.content_length += chunk.content_length;
          prevChunk.content_tokens += chunk.content_tokens;
          essayChunks.splice(i, 1);
          i--;
        }
      }
    }
  
    const chunkedSection: PGEssay = {
      ...essay,
      chunks: essayChunks
    };
  
    return chunkedSection;
  };


  (async () => {
    const links = await getLinks();
    console.log("got links");
    let essays = [];
  
    for (let i = 0; i < links.length; i++) {
      const essay = await getEssay(links[i]);
      const chunkedEssay = await chunkEssay(essay);
      essays.push(chunkedEssay);
    }
  
    const json: PGJSON = {
      current_date: "2023-03-23",
      author: "Alison",
      url: `${BASE_URL}/blog`,
      length: essays.reduce((acc, essay) => acc + essay.length, 0),
      tokens: essays.reduce((acc, essay) => acc + essay.tokens, 0),
      essays
    };
  
    fs.writeFileSync("scripts/pg.json", JSON.stringify(json));
  })();