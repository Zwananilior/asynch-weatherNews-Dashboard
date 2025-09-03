import https from 'https';

function fetchData(url: string, callback: (err: any, data?: any) => void) {
  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => callback(null, JSON.parse(data)));
  }).on('error', (err) => callback(err));
}
 
// Callback hell example
fetchData('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true', (err, weather) => {
  if (err) return console.error('Weather Error:', err);
  console.log('Weather:', weather.current_weather);

  fetchData('https://dummyjson.com/posts', (err, news) => {
    if (err) return console.error('News Error:', err);
    console.log('News:', news.posts.slice(0, 3));
  });
});
