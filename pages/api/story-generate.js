import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function generateStory(params) {
  // Extract the required parameters from the params object
  const {
    time,
    age,
    gender,
    capitalizedName,
    storyStyle,
    storyTopic,
    secondaryHeroName,
    language,
  } = params;

  // Construct the story generation prompt
  const prompt = `Generate a ${time}-minute read Kids story suitable for the ${age}-year old ${gender} kid named ${capitalizedName}. The story should take place in a ${storyStyle} style, centered around ${storyTopic}. The main character, ${capitalizedName}, along with ${secondaryHeroName}, should embark on an exciting journey. The narrative should be full of vivid descriptions and kid-friendly language, written in ${language}.\n\nTitle the story with a period at the end.`;

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 1200,
      n: 1,
      stop: null,
      temperature: 0.8,
    });

    const generatedStory = completion.data.choices[0].text;
    return generatedStory;
  } catch (error) {
    throw error;
  }
}
