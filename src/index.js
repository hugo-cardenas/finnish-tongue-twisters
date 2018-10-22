const getRandom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const createPhraseIndexList = () => {
  return [...Array(phrases.length).keys()];
};

var phraseIndexes = [];

const loadNewPhrase = (id = null) => {
  // Either first phrase or we have already shown all the phrases
  if (phraseIndexes.length === 0) {
    phraseIndexes = createPhraseIndexList();
  }

  let phrase;
  let index;
  // If id is specified
  if (id) {
    index = phrases.findIndex(phrase => phrase.id === id);
    phrase = phrases[index];
  }

  // If no id specified or no phrase found with the id specified, pick a random one
  if (!phrase) {
    index = phraseIndexes[getRandom(0, phraseIndexes.length)];
    phrase = phrases[index];
  }

  if (!phrase) {
    return;
  }

  // Remove it from the list of indexes so we don't repeat until all are shown
  const indexIndex = phraseIndexes.indexOf(index);
  if (indexIndex > -1) {
    phraseIndexes.splice(indexIndex, 1);
  }

  // Update url hash with the new phrase id
  const url = window.location.href;
  const urlPart = url.split('#')[0];
  window.location.assign(`${urlPart}#${phrase.id}`);

  // Update page content
  document.getElementById('finnish').innerHTML = phrase.finnish;
  document.getElementById('emoji').innerHTML = phrase.emoji;
  document.getElementById('english').innerHTML = phrase.english;
}

window.onload = () => {
  if (SpeechSynthesisUtterance) {
    const soundButton = document.getElementById('sound');
    soundButton.classList.remove('disabled');
    const speechSynthesis = window.speechSynthesis;
    soundButton.onclick = () => {
      speechSynthesis.cancel();
      var phrase = document.getElementById('finnish').innerHTML;
      utterance = new SpeechSynthesisUtterance(phrase);
      utterance.lang = 'fi-FI';
      speechSynthesis.speak(utterance);
    };
  }

  document.getElementById('reload').onclick = () => {
    speechSynthesis.cancel();
    loadNewPhrase();
  };
  window.onhashchange = () => {
    const id = window.location.hash ? window.location.hash.substr(1) : null;
    loadNewPhrase(id);
  }
  window.onhashchange();
};
