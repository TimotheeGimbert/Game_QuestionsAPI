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
  document.querySelector('#qIndex').innerHTML = `Q ${qIndex}/10`;
  document.querySelector('#question').innerHTML = questionsList[qIndex-1].question;
}

getQuestions();

