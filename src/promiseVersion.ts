import axios from 'axios';

function getWeather() {
  return axios.get('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true');
}

function getNews() {
  return axios.get('https://dummyjson.com/posts');
}

getWeather()
  .then(weather => {
    console.log('Weather:', weather.data.current_weather);
    return getNews();
  })
  .then(news => {
    console.log('News:', news.data.posts.slice(0, 3));
  })
  .catch(err => console.error('Error:', err));

Promise.all([getWeather(), getNews()])
  .then(([weather, news]) => {
    console.log('Promise.all Weather:', weather.data.current_weather);
    console.log('Promise.all News:', news.data.posts.slice(0, 3));
  });

Promise.race([getWeather(), getNews()])
  .then(first => console.log('Promise.race Winner:', first.data))
  .catch(err => console.error(err));
