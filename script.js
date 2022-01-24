const url = 'https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=boolean'; //https://opentdb.com/api_config.php

const get = async (url) => {
  try {
    const response = await fetch(url);
    const jsonObject = await response.json();
    return jsonObject;
  }catch (error) { console.error('Error fetching data', error) }
};

const getQuestions = async () => {
  const jsonObject = await get(url);
  const questions = await jsonObject.results;
  return questions;
}

const showQuestions = (questions, qIndex) => {
  document.querySelector('main').innerHTML = `
    <div class="row m-5 bg-dark text-light">
      <div id="qIndex" class="col m-3">Q ${qIndex}/10</div>
    </div>
    <div class="row my-5 p-5 text-center bg-warning">
      <h3 id="question">${questions[qIndex-1].question}</h3>
    </div>
    <div class="row m-5 py-5 text-center justify-content-center">
      <button id="true" class="col-2 mx-4 p-2 btn btn-success">True</button>
      <button id="false" class="col-2 mx-4 p-2 btn btn-danger">False</button>
    </div>
  `;
  animationIn();
  createListener(questions, qIndex);
}

const createListener = (questions, qIndex) => {
  if (qIndex+1 > 10) {
    document.querySelectorAll('button').forEach(button => button.style.display = 'none');
    return;
  }
  document.querySelector('#true').addEventListener('click', () => {
    if (questions[qIndex].correct_answer === 'True') score += 1;
    console.log('SCORE: ' + score);
    showQuestions(questions, qIndex+1);
  });
  document.querySelector('#false').addEventListener('click', () => {
    if (questions[qIndex].correct_answer === 'False') score += 1;
    console.log('SCORE: ' + score);
    showQuestions(questions, qIndex+1);
  });
}

const game = async () => {
  const questions = await getQuestions();
  //console.log(questions);
  showQuestions(questions, 1);
}

let score = 0;
game();



const animationOut = () => {
  window.anime({
    targets: 'main',
    translateX: [0, -2000],
    duration: 4000,
    easing: 'easeOutElastic',
    elasticity: 100,
  });
}

const animationIn = () => {
  window.anime({
    targets: 'main',
    translateX: [1000, 0],
    duration: 3000,
    easing: 'easeOutElastic',
    elasticity: 50,
  });
}