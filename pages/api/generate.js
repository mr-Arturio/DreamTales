import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function generateStory(inputs) {
  if (!configuration.apiKey) {
    throw new Error("OpenAI API key not configured");
  }


   try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(inputs),
      temperature: 0.9,
    });
    return completion.data.choices[0].text;
  } catch (error) {
   
    if (error.response) {
      console.error(error.response.status, error.response.data);
      throw new Error(error.response.data.error.message);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      throw new Error("An error occurred during your request.");
    }
  }
}

function generatePrompt({ inputs }) {
  const {
    childName,
    age,
    gender,
    parent1Name,
    parent2Name,
    friendName,
    favoriteToy,
    location,
  } = inputs;
// The template for the story
const template = `
Once upon a time, in the enchanting land of ${location}, there lived a bright and cheerful ${gender} named ${childName}. At ${age} years old, ${childName} was known for ${childName.toLowerCase()}'s boundless curiosity and kindness, which touched the hearts of everyone in the kingdom.

${childName} had two loving parents, ${parent1Name} and ${parent2Name}, who were always amazed by ${childName.toLowerCase()}'s imaginative spirit. They encouraged ${childName.toLowerCase()} to explore and make friends.

${childName} had a very special friend named ${friendName}. They were inseparable, just like two peas in a pod. Their days were filled with laughter, adventures, and exciting discoveries.

One sunny day, ${childName.toLowerCase()} and ${friendName.toLowerCase()} decided to embark on a thrilling quest to find the magical ${favoriteToy}. Legend had it that this extraordinary toy possessed the power to grant wishes, but only to those who truly understood the value of friendship.

As they journeyed through the whimsical forests and crossed bubbling streams, they encountered various challenges that required teamwork and compassion. ${childName} and ${friendName} faced each obstacle with courage, and their friendship grew even stronger.

After a series of exciting escapades, they finally reached the hidden cave where the magical ${favoriteToy} was said to reside. But instead of finding the toy right away, they discovered a wise old owl named Ollie.

Ollie recognized the genuine friendship between ${childName} and ${friendName} and knew they were worthy of the ${favoriteToy}. The wise owl explained that the true magic of the ${favoriteToy} lies in the joy of sharing and making others happy.

Filled with gratitude and understanding, ${childName} and ${friendName} decided to use the power of the ${favoriteToy} to spread happiness and kindness throughout the kingdom. They organized games, shared treats, and helped those in need.

From that day on, the kingdom of ${location} became an even brighter and happier place, all thanks to the wonderful friendship of ${childName} and ${friendName}. And so, they lived happily ever after, proving that true friendship is the most magical treasure of all.

The End.
`;

return template;
}

  