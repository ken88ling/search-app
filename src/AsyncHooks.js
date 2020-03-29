import React, { useState, useEffect } from 'react';

export default function AsyncHooks() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const apiKey = 'abc';

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}=${query}&limit=5&offset=0&rating=G&lang=en`
        );
        const json = await response.json();
        console.log({ json });
        setResults(
          json.data.map(item => {
            return item.images.preview.mp4;
          })
        );
      } catch (e) {
        console.log('err', e);
      }
      console.log({ query });
    }
    // return () => {
    //   console.log('clean');
    // };

    if (query !== '') {
      fetchData();
    }
  }, [query]);

  return (
    <div>
      <h1>Async React Hook</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          setQuery(search);
        }}
      >
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder='Search for Gifs...'
        />
        <button type='submit'>Search</button>
      </form>
      <br />
      {results.map(item => (
        <video autoPlay loop key={item} src={item} />
      ))}
    </div>
  );
}
