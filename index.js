const axios = require("axios");

const docLink = "http://norvig.com/big.txt";
const apiKey =
  "dict.1.1.20210216T114936Z.e4989dccd61b9626.373cddfbfb8a3b2ff30a03392b4e0b076f14cff9";
let dictLink =
  "https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=" +
  apiKey +
  "&lang=en-ru&text=";
const size = process.argv[2];
(async function () {
  let results = [];
  let docContent = await getDocument();

  if (docContent && docContent.data) {
    let lines = docContent.data.split("\n");
    let map = new Map();
    for (let line of lines) {
      let words = line.split(" ");
      for (let word of words) {
        let lowerCaseWord = word.toLowerCase();
        let count = 1;
        if (map.has(lowerCaseWord)) {
          count = map.get(lowerCaseWord);
          count++;
          map.set(lowerCaseWord, count);
        } else {
          if (isAlphabet(lowerCaseWord)) map.set(lowerCaseWord, count);
        }
      }
    }
    const sortedMap = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
    const topWords = [...sortedMap].slice(0, size);
    for (let topWord of topWords) {
      let posList = [];
      let synonyms = [];

      let definations = await getDefinations(topWord[0]);
      for (let def of definations) {
        posList.push(def.pos);
        if (def.tr && def.tr.length) {
          for (let synm of def.tr) {
            if (synm.mean && synm.mean.length) {
              for (let mean of synm.mean) {
                synonyms.push(mean.text);
              }
            }
          }
        }
      }

      let res = {
        Word: topWord[0],
        Output: {
          Count: topWord[1],
          Synonyms: synonyms.toString(),
          pos: posList.toString(),
        },
      };
      results.push(res);
    }
    console.log(results);
  }
})();

function isAlphabet(str) {
  if (/^[a-zA-Z]+$/.test(str)) {
    return true;
  }
  return false;
}

async function getDefinations(topWord) {
  let definations = [];
  let link = dictLink + topWord;
  await axios
    .get(link)
    .then((res) => res)
    .then((data) => {
      definations = data.data.def;
    })
    .catch((err) =>
      console.log(
        `Something went wrong while accessing the link: ${link}.\nError: ${err}`
      )
    );
  return definations;
}

async function getDocument() {
  let doc = "";
  await axios
    .get(docLink)
    .then((res) => res)
    .then((data) => (doc = data))
    .catch((err) =>
      console.log(
        `Something went wrong while accessing the link: ${docLink}.\nError: ${err}`
      )
    );
  return doc;
}
