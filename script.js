// API - https://voicerss.org/sdk/javascript.aspx
const audioElement = document.getElementById("audio");
const tellJokeBtn = document.getElementById("button");
var VoiceRSS = getVoiceRSS(audioElement);

async function test() {
  const joke = await getJokes();
  VoiceRSS.speech({
    key: "11e390f05d5f44eca49c22a3f98e6671",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });

  audioElement.play();
}

async function getJokes() {
  try {
    const res = await fetch(
      "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit"
    );
    const jsonRes = await res.json();
    if (!jsonRes.jokes) {
      return `${jsonRes.setup} ${jsonRes.delivery}`;
    }
    return jsonRes.jokes;
  } catch (err) {
    console.log(err);
  }
}

tellJokeBtn.addEventListener("click", test);
