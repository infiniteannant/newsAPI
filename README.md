# newsAPI

This project contains the RESTAPIs in NodeJS that will fetch data from gnews APIs.


## Features

- Fetching N news articles. 
- Finding a news article with a specific title. 
- Searching the news by a keyword.

## Requirements
- Node v16+
- An API key that can be get by signing on [GNews](https://gnews.io/)

## Installation

Clone the project and install dependencies using
```sh
npm install
```

Paste your API key in the app.js.
```sh
API_KEY = "<PasteYourApiKey>"
```

Run the project
```sh
node app.js
```

This will start the server at http://localhost:8080

## API Test
##### -Fetching n news articles
GET Endpoint-> "/fetch-n-trending-news" and n="5"
[http://localhost:8080/fetch-n-trending-news](http://localhost:8080/fetch-n-trending-news?n=5) 


##### -Finding a news article with a specific title. 
GET Endpoint-> "/find-article-by-title" and title = "AI in Programming is to Collaborate, Not Eliminate"
[http://localhost:8080/find-article-by-title](http://localhost:8080/find-article-by-title?title=AI%20in%20Programming%20is%20to%20Collaborate,%20Not%20Eliminate)


##### -Searching the news by a keyword.
GET Endpoint-> "/search-by-keyword" and keyword(q) = "programming"
[http://localhost:8080/search-by-keyword](http://localhost:8080/search-by-keyword?q=programming)
