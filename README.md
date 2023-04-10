# Alison Intelligence AI

A Protoyped Demo -> AI-powered search and chat for Alison.com trained on 500 blog articles

![image](https://user-images.githubusercontent.com/48835836/230993185-5f54615d-be67-4b41-9144-f7ec5364ff29.png)



**How to set up pipeline:**

I have some custom commands set up for different stages of the process.

**Command 1: Scraping**

NPM SCRAPE -> This will run scripts/scraper.ts, it's currently set to scrape all the grab of Alison Blog, scrape the content and chunk it. 
** This will create a json file in scripts folder called, pg.json. You can theoretically skip this step by replacing pg.json with your own data file. If you can keep the same schema as the json file the following steps will be super easy**


**-- Go to Supabase, spin up a new db. Run the first two commands outlined in the schema.txt**

**--  RUN 1st**

create extension vector;

**-- RUN 2nd**

create table pg (
  id bigserial primary key,
  essay_title text,
  essay_url text,
  essay_date text,
  essay_thanks text,
  content text,
  content_length bigint,
  content_tokens bigint,
  embedding vector (1536)
);

**Command 2: Embedding**

NPM EMBED -> After creating pg.json, run the chunks through the embeddings API to create an initial dataset upon which our chatbot can form answers. Running this command will run the embeddings.


**--Supabase -- Now run the 3rd and 4th scripts in Schema.txt file to create your Cosine Similarity search function and an Index to make it run fast.**

**-- RUN 3rd after running the scrape/embed scripts**

create or replace function pg_search (
  query_embedding vector(1536),
  similarity_threshold float,
  match_count int
)
returns table (
  id bigint,
  essay_title text,
  essay_url text,
  essay_date text,
  essay_thanks text,
  content text,
  content_length bigint,
  content_tokens bigint,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    pg.id,
    pg.essay_title,
    pg.essay_url,
    pg.essay_date,
    pg.essay_thanks,
    pg.content,
    pg.content_length,
    pg.content_tokens,
    1 - (pg.embedding <=> query_embedding) as similarity
  from pg
  where 1 - (pg.embedding <=> query_embedding) > similarity_threshold
  order by pg.embedding <=> query_embedding
  limit match_count;
end;
$$;

**-- RUN 4th**
create index on pg 
using ivfflat (embedding vector_cosine_ops)
with (lists = 100);



**Command 3: Run the Chatbot**

NPM RUN DEV 

-- Hopefully I haven't missed anything and it should work at this point.


