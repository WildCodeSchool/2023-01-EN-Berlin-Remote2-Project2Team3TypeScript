interface ApiCharType {
  id: number;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  title?: string;
  family?: string;
  image?: string;
  imageUrl?: string;
}

export type Question = QuestionOption[];

export class ApiChar implements ApiCharType {
  id: number;
  fullName: string;
  imageUrl: string;
  constructor(id: number, fullName: string, imageUrl: string) {
    this.id = id;
    this.fullName = fullName;
    this.imageUrl = imageUrl;
  }
}

export class QuestionOption extends ApiChar {
  isCorrect: boolean;
  constructor(id: number, fullName: string, imageUrl: string) {
    super(id, fullName, imageUrl);
    this.isCorrect = false;
  }
}

const getData = async () => {
  const response = await fetch("https://thronesapi.com/api/v2/Characters");

  const arr = await response.json();

  if (!Array.isArray(arr)) {
    throw Error("API returns no array");
  } else {
    const validatedArr = arr
      .filter(
        (obj) =>
          typeof obj.id === "number" &&
          isFinite(obj.id) &&
          typeof obj.fullName === "string" &&
          typeof obj.imageUrl === "string"
      )
      .map((obj) => {
        return new ApiChar(obj.id, obj.fullName, obj.imageUrl);
      });
    return validatedArr;
  }
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
const shuffle = (array : QuestionOption[]) => {
  let curId = array.length;
  while (0 !== curId) {
    // update curId and randId
    const randId = Math.floor(Math.random() * curId);
    curId--;

    // swap array[curId] and array[randId]
    const tmp = array[curId];
    array[curId] = array[randId];
    array[randId] = tmp;
  }
  return array;
};

export const digestTheData = (data : ApiChar[]) => {

  const fixData = (apiObject : ApiChar) => {
    const typoFixes = [
      ["Jamie", "Jaime"],
      ["Cateyln", "Catelyn"],
      ["Ramsey", "Ramsay"],
      ["Rob ", "Robb "],
    ]; //array of arrays of strings
    typoFixes.forEach((pair) => {
      if (apiObject.fullName.includes(pair[0]))
        apiObject.fullName = apiObject.fullName.replace(pair[0], pair[1]);
    });

    return apiObject;
  };

  //Fix typos, remove duplicate
  const fixedData = data.map(fixData).filter((object) => object.id !== 34);

  const questionOptions = fixedData.map((character) => {
    return new QuestionOption(character.id, character.fullName, character.imageUrl)
  })

  const shuffledData = shuffle(questionOptions);

  const maxAnswers = Math.floor(shuffledData.length / 10); //number (integer)
  // 10 is the number of questions per game

  const portraitData : Question[] = [];
  while (shuffledData.length >= maxAnswers) {
    portraitData.push(shuffledData.splice(0, maxAnswers));
  }

  const getRandomNumber = (under : number) => Math.floor(Math.random() * under);
  portraitData.forEach((question) => {
    question[getRandomNumber(question.length)].isCorrect = true;
  });

  return portraitData;
};
