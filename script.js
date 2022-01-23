const url = 'https://opentdb.com/api.php?amount=10&category=17&difficulty=medium&type=boolean';

const get = async (url) => {
  try {
    const response = await fetch(url);
    const jsonObject = await response.json();
    return jsonObject;
  }catch (error) { console.error('Error fetching data', error) }
};

