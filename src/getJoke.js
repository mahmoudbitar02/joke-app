export async function getJoke(category = "") {
  const url = category ? `https://witzapi.de/api/joke/?category=${category}` : "https://witzapi.de/api/joke/";
  const joke = await fetch(url);
  const jokeData = await joke.json();

  return jokeData;
}
