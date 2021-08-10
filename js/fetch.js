const requestURL =
  "https://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=en-US&page=1";

// fetch(requestURL, { mode: "cors" })
//   .then((data) => data.text())
//   .then((data) => {console.log(data)});

function sendRequest(url, body = null) {
  return fetch(url).then((response) => {
    return response.json();
  });
}

sendRequest(requestURL).then((data) => console.log(data.results));
