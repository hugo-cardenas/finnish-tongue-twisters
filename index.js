var phrases = [
  {
    finnish: 'Appilan pappilan apupapin papupata pankolla kiehuu ja kuohuu',
    emoji: '⛪',
    english: 'Bean casserole of the deacon of the rectory of Appila boils and bubbles on the oven'
  },
  {
    finnish: 'Kokoo kokoon koko kokko! Koko kokkoko? Koko kokko',
    emoji: '🔥',
    english: 'Gather up a full bonfire! A full bonfire? A full bonfire'
  },
  {
    finnish: 'Vesihiisi sihisi hississä',
    emoji: '👹',
    english: 'A water troll was hissing in the elevator'
  },
  {
    finnish: 'Epäjärjestelmällistyttämättömyydelläänsäkäänköhan',
    emoji: '🤷',
    english: 'With one\'s unorganised ways'
  },
  {
    finnish: 'Lentokonesuihkuturbiinimoottoriapumekaanikkoaliupseerioppilas',
    emoji: '✈️',
    english: 'Airplane jet turbine engine auxiliary mechanic non-commissioned officer student'
  },
  {
    finnish: 'Hurskastelevaisehkollaismaisellisuuksissaankohankin hän toimi?',
    emoji: '🤔',
    english: 'I wonder if he did so partly just to show sort of a slightly hypocratic kind of basic attitude?'
  },
  {
    finnish: 'Kärpänen sanoi kärpäselle: tuu kattoon kattoon ku kaveri tapettiin tapettiin',
    emoji: '🐝',
    english: 'A fly said to another fly: come to the ceiling to see as our friend was killed on the wallpaper'
  },
  {
    finnish: 'Keksijä Keksi keksittiin keksimään keksi. Keksijä Keksi keksi keksin. Keksittyään keksin, keksijä Keksi keksi keksin keksityksi',
    emoji: '🍪',
    english: 'Inventor Cookie was invented to invent a cookie. Inventor Cookie invented a cookie. After inventing the cookie, inventor Cookie invented that a cookie was invented'
  },
  {
    finnish: 'Onkiva rovasti, joka on kiva rovasti, onki varovasti',
    emoji: '🎣',
    english: 'The angling dean, who is a nice dean, was angling carefully'
  },
  {
    finnish: 'Hiljaa Hilja sanoi Hiljalle hiljaa niin hiljaa ettei Hilja kuullut miten hiljaa Hilja sanoi Hiljalle hiljaa',
    emoji: '🤫',
    english: 'Quiet Hilja said to Hilja to be quiet, so quietly that Hilja couldn\'t hear how Quiet Hiljaa said to Hilja to be quiet'
  },
  // {
  //   finnish: '',
  //   emoji: '',
  //   english: ''
  // },
];

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function createPhraseIndexList() {
  return [...Array(phrases.length).keys()];
};

var phraseIndexes = [];

function loadNewPhrase() {
  if (phraseIndexes.length === 0) {
    phraseIndexes = createPhraseIndexList();
  }

  var i = getRandom(0, phraseIndexes.length);
  var phrase = phrases[phraseIndexes[i]];
  phraseIndexes.splice(i, 1);

  document.getElementById('finnish').innerHTML = phrase.finnish;
  document.getElementById('emoji').innerHTML = phrase.emoji;
  document.getElementById('english').innerHTML = phrase.english;
}

var speechSynthesis = window.speechSynthesis;

window.onload = function () {
  document.getElementById('sound').onclick = function () {
    var phrase = document.getElementById('finnish').innerHTML;
    utterance = new SpeechSynthesisUtterance(phrase);
    utterance.lang = 'fi-FI';
    window.speechSynthesis.speak(utterance);
  };
  document.getElementById('reload').onclick = function(){
    speechSynthesis.cancel();
    loadNewPhrase();
  };
  loadNewPhrase();
};
