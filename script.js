const url = 'https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=boolean'; //https://opentdb.com/api_config.php

const get = async (url) => {
  try {
    const response = await fetch(url);
    const jsonObject = await response.json();
    return jsonObject;
  }catch (error) { console.error('Error fetching data', error) }
};

const getQuestions = async () => {
  const questionsList = [];
  const jsonObject = await get(url);
  const questions = await jsonObject.results;
  questions.forEach(e => {
    const qAndA = { question: null, answer: null };
    qAndA.question = e.question;
    qAndA.answer = e.correct_answer;
    questionsList.push(qAndA);
  });
  showQuestion(questionsList, 1);
}

const showQuestion = (questionsList, qIndex) => {
  document.querySelector('main').innerHTML = `
    <div class="row m-5 bg-dark text-light">
      <div id="qIndex" class="col m-3">Q ${qIndex}/10</div>
    </div>
    <div class="row my-5 p-5 text-center bg-warning">
      <h3 id="question">${questionsList[qIndex-1].question}</h3>
    </div>
    <div class="row m-5 py-5 text-center justify-content-center">
      <button id="true" class="col-2 mx-4 p-2 btn btn-success">True</button>
      <button id="false" class="col-2 mx-4 p-2 btn btn-danger">False</button>
    </div>
  `;
  createListener(questionsList, qIndex);
}

const createListener = (questionsList, qindex) => {
  document.querySelector('#true').addEventListener('click', () => {
    console.log('click');
    showQuestion(questionsList, qindex+1)
  });
}

getQuestions();

