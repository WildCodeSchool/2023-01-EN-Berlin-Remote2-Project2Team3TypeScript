const getData = async () => {
  const response = await fetch("https://thronesapi.com/api/v2/Characters", {
    method: "GET",
  });
  const arr = await response.json();

  return arr;
};

export default getData;

/* API DESCRIPTION

CharacterModel{
  
    id	integer($int32)
    A unique number that identifies this character.
    
    firstName	string
    nullable: true
    The character's first name.
    
    lastName	string
    nullable: true
    The character's last name.

    fullName	string
    nullable: true
    The First + Last name of the character.
    
    title	string
    nullable: true
    The character's formal title.
    
    family	string
    nullable: true
    The character's family name.
    
    image	string
    nullable: true
    The character's picture filename
    
    imageUrl	string
    nullable: true
    The character's picture url
    }

*/

//Fisher-Yates shuffle
const shuffle = (array) => {
  let curId = array.length;
  while (0 !== curId) {
    // update curId and randId
    let randId = Math.floor(Math.random() * curId);
    curId--;

    // swap array[curId] and array[randId]
    let tmp = array[curId];
    array[curId] = array[randId];
    array[randId] = tmp;
  }
  return array;
};

export const digestTheData = (data) => {
  const typoFixes = [
    ["Jamie", "Jaime"],
    ["Cateyln", "Catelyn"],
    ["Ramsey", "Ramsay"],
    ["Rob ", "Robb "],
  ]; //array of arrays of strings

  const fixData = (apiObject) => {
    apiObject.isCorrect = false;
    typoFixes.forEach((pair) => {
      if (apiObject.fullName.includes(pair[0]))
      apiObject.fullName = apiObject.fullName.replace(pair[0], pair[1]);
    });

    return apiObject;
  };

  //Fix typos, remove duplicate
  const fixedData = data.map(fixData).filter((object) => object.id !== 34);

  const shuffledData = shuffle(fixedData);

  const maxAnswers = Math.floor(shuffledData.length / 10); //number (integer)
  // 10 is the number of questions per game

  const portraitData = [];
  while (shuffledData.length >= maxAnswers) {
    portraitData.push(shuffledData.splice(0, maxAnswers));
  }

  const getRandomNumber = (under) => Math.floor(Math.random() * under);
  portraitData.forEach((question) => {
    question[getRandomNumber(question.length)].isCorrect = true;
  });

  return portraitData;
};
