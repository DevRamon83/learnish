const summarySchema = (lang) => {
  return {
    type: "object",
    properties: {
      text: {
        type: "string",
        description:
          "Original text with errors wrapped in <del></del> tags. No nested or adjacent tags.",
      },
      mistakes: {
        type: "array",
        description:
          "A flat list of grammatical and lexical mistakes found in the text.",
        items: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description:
                "The exact substring inside the <del> tags from the text field.",
            },
            correction: {
              type: "string",
              description: "The corrected version of the error fragment.",
            },
            explain: {
              type: "string",
              description: `Exhaustive pedagogical feedback written in ${lang} (max 100 words).`,
            },
            errorCodes: {
              type: "array",
              description:
                "List of linguistic mistake categories that apply to this error. " +
                "spell: spelling/orthography, tens: verb tense/aspect, agree: subject-verb or gender-number agreement, " +
                "prep: preposition usage, word: inappropriate lexical choice, order: word order/syntax, " +
                "sing: singular/plural noun errors, art: article usage, pron: pronoun usage.",
              items: {
                type: "string",
                enum: [
                  "spell",
                  "tens",
                  "agree",
                  "prep",
                  "word",
                  "order",
                  "sing",
                  "art",
                  "pron",
                ],
              },
            },
          },
          required: ["error", "correction", "explain", "errorCodes"],
        },
      },
      score: {
        type: "object",
        properties: {
          overall: {
            type: "number",
            description:
              "The average score from 1.0 to 9.0. Use exactly one decimal place.",
          },
          breakdown: {
            type: "object",
            properties: {
              cohesion: {
                type: "number",
                description:
                  "Score from 1.0 to 9.0. Evaluates logical flow and transitions.",
              },
              vocabulary: {
                type: "number",
                description:
                  "Score from 1.0 to 9.0. Measures range and precision of vocabulary.",
              },
              grammar: {
                type: "number",
                description:
                  "Score from 1.0 to 9.0. Evaluates sentence structure and accuracy.",
              },
            },
            required: ["cohesion", "vocabulary", "grammar"],
          },
          feedback: {
            type: "string",
            description: `Personalized analysis of the user's text as a whole in ${lang} (max 50 words). Must mention one specific strength or weakness.`,
          },
        },
        required: ["overall", "breakdown", "feedback"],
      },
    },
    required: ["text", "mistakes", "score"],
  };
};

export default summarySchema;
