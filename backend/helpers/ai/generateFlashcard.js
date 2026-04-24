import fs from "node:fs/promises";
import path from "node:path";
import wordsList from "../../wordsList.json" with { type: "json" };
import vocabularyModel from "../../models/vocabulary.js";
import isUnique from "../isUnique.js";
import logWriter from "../../services/logWriter.js";

const generateFlashcard = async () => {
  const randomIndex = Math.floor(Math.random() * wordsList.length);

  const wordFinder = () => {
    return wordsList[randomIndex];
  };

  const wordObj = wordFinder();
  const myWord = wordObj.word;
  const index = wordObj.id;

  const data = {
    word: myWord,
    index,
    type: wordObj.type,
    level: wordObj.level,
    phonetics: wordObj.phonetics,
    examples: wordObj.examples,
  };

  const wordExist = await vocabularyModel.findOne({ word: myWord });

  if (wordExist) {
    return;
  }

  const newWorld = await vocabularyModel.create(data);

  const prompt = encodeURIComponent(
    `A cinematic still from a Studio Ghibli animation. The scene features ${myWord} as the main visual element. Hand-painted background, lush details, bright natural lighting. The image is a pure illustration with no typography.`,
  );

  const url = `https://gen.pollinations.ai/image/${prompt}?model=flux&width=300&height=250`;
  const apiKey = process.env.POLLINATIONS_API_KEY;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    console.log("word ", myWord);
    console.log("index ", randomIndex);

    if (!response.ok) {
      console.log("res ", response);
      logWriter({
        username: "ai-img",
        method: "get",
        ip: "void",
        url: myWord,
        errorType: response.status,
        userAgent: "void",
      });
    }

    const targetDir = path.resolve("../frontend/public/flashcards");

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileName = `word${index}.jpeg`;
    const filePath = path.join(targetDir, fileName);
    await fs.writeFile(filePath, buffer);

    newWorld.img = fileName;
    await newWorld.save();

    return true;
  } catch (error) {
    console.error("Errore fetch:", error.message);
  }
};

export default generateFlashcard;
