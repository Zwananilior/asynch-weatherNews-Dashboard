import axios from 'axios';

 async function getWeather() {
  return axios.get('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true');
}

async function getNews() {
  return axios.get('https://dummyjson.com/posts');
}

async function main() {
  try {
    const weather = await getWeather();
    console.log('Weather:', weather.data.current_weather);

    const news =  await getNews();
    console.log('News:', news.data.posts.slice(0, 3));

    const [weatherAll, newsAll] = await Promise.all([getWeather(), getNews()]);
    console.log('Promise.all Weather:', weatherAll.data.current_weather);
    console.log('Promise.all News:', newsAll.data.posts.slice(0, 3));

    const race = await Promise.race([getWeather(), getNews()]);
    console.log('Promise.race Winner:', race.data);
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
