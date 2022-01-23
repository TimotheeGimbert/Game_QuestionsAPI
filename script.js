const url = 'https://opentdb.com/api.php?amount=10&category=17&difficulty=medium&type=boolean'; //https://opentdb.com/api_config.php
const questionsList = [];

const get = async (url) => {
  try {
    const response = await fetch(url);
    const jsonObject = await response.json();
    return jsonObject;
  }catch (error) { console.error('Error fetching data', error) }
};

const showQuestions = async () => {
  const jsonObject = await get(url);
  const questions = await jsonObject.results;
  questions.forEach(e => {
    const qAndA = { question: null, answer: null };
    qAndA.question = e.question;
    qAndA.answer = e.correct_answer;
    console.log(qAndA);
    questionsList.push(qAndA);
  });
}

showQuestions();
console.log(questionsList);