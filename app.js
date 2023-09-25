const axios = require('axios');
const express = require('express');
const NodeCache = require('node-cache');
const keyword_extractor = require("keyword-extractor");

const app = express();
const port = process.env.PORT || 8080;
const cache = new NodeCache({ stdTTL: 600 }); // Cache articles for 10 minutes

// Middleware to parse JSON request bodies
app.use(express.json());

const API_KEY = "<PasteYourApiKey>";

// Define API routes
//This API will fetch N trending news in English

app.get('/fetch-n-trending-news', async (req, res) => {
  const { n = 10 } = req.query;  //default value of n is 10
  const cacheKey = `fetch-news-${n}`;

  // Checking if data is in cache
  if (cache.has(cacheKey)) {
    console.log("Found data from cache");
    return res.json(cache.get(cacheKey));
  }

  try {
    const response = await axios.get(`https://gnews.io/api/v4/top-headlines?category=general&lang=en&apikey=${API_KEY}`);
    const articles = response.data.articles.slice(0, n);
    cache.set(cacheKey, articles);
    res.json(articles);
  } catch (error) {
    console.error('Error while fetching news:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//API to find the news article by Title
app.get('/find-article-by-title', async (req, res) => {
  const { title = 'Latest news on Russia and the war in Ukraine this'} = req.query;
  const cacheKey = `find-article-${title}`;

  // Checking if data is in cache
  if (cache.has(cacheKey)) {
    return res.json(cache.get(cacheKey));
  }

let q = keyword_extractor.extract(title,{language:"english",
                                            remove_digits: true,
                                            return_changed_case:true,
                                            remove_duplicates: true
                                             });
//No APIs from gNews to get news by title so this logic can be use to filter the news with keywords in the title.                                          
let keys = ""
for(let i = 0; i < q.length; i++){
     keys = keys +" " + q[i];
}
keys = keys.trim()
  try {
    const response = await axios.get(`https://gnews.io/api/v4/search?q=${keys}&max=10&lang=en&apikey=${API_KEY}`);
    const articles = response.data.articles.filter(
        (article) => (article.title.includes(title))
      );
    cache.set(cacheKey, articles);
    res.json(articles);
  } catch (error) {
    console.error('Error while fetching news:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//API to search the news with any keyword
app.get('/search-by-keyword', async (req, res) => {
  const { q = '' } = req.query;
  const cacheKey = `search-${q}`;

  // Checking if data is in cache
  if (cache.has(cacheKey)) {
    return res.json(cache.get(cacheKey));
  }

  try {
    const response = await axios.get(`https://gnews.io/api/v4/search?q=${q}&apikey=${API_KEY}`);
    const articles = response.data.articles;
    cache.set(cacheKey, articles);
    res.json(articles);
  } catch (error) {
    console.error('Error while fetching news:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
