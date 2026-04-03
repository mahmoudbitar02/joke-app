export async function getJoke() {
  const joke = await fetch("https://witzapi.de/api/joke/");
  const jokeData = await joke.json();

  return jokeData;
}
