const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const formatData = (fetchedData) => {
    const result = fetchedData.map((item) => {
      const questionData = {question: item.question, category: item.category}; 
      questionData.answers = shuffle([item.correct_answer, ...item.incorrect_answers]);
      questionData.correctIndex = questionData.answers.indexOf(item.correct_answer);
      return questionData;
    });
    return result;
  };

export default formatData;