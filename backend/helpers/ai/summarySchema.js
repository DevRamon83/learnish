const summarySchema = (lang) => {
  return {
    type: "object",
    properties: {
      text: {
        type: "string",
        description:
          "Original text with errors must be wrapped in <del></del> tags (It is absolutely important that you do not skip this step). No nested or adjacent tags.",
      },
      mistakes: {
        type: "array",
        description:
          "A flat array of objects. Do NOT wrap individual objects in nested arrays.",
        items: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "The exact text inside the <del> tags",
            },
            correction: {
              type: "string",
              description: "The corrected version of the fragment",
            },
            explain: {
              type: "string",
              description: `Exhaustive pedagogical feedback in ${lang} (max 100 words)`,
            },
            errorCode: {
              type: "string",
              description:
                "Error codes representing the type of linguistic mistake, separated by '-': " +
                "spell (spelling/orthography), " +
                "tens (verb tense/aspect), " +
                "agree (subject-verb or gender-number agreement), " +
                "prep (preposition usage), " +
                "word (inappropriate lexical choice/vocabulary), " +
                "order (word order/syntax), " +
                "sing (singular/plural noun errors), " +
                "art (article usage), " +
                "pron (pronoun usage). " +
                "Use ONLY these codes; do not invent new ones.",
            },
          },
          required: ["error", "correction", "explain", "errorCode"],
        },
      },
      score: {
        type: "object",
        properties: {
          overall: {
            type: "number",
            description:
              "The average score from 1 to 9. Use one decimal place (e.g., 6.5).",
          },
          breakdown: {
            type: "object",
            properties: {
              cohesion: {
                type: "number",
                description:
                  "Score from 1 to 9, only integer. Evaluates the logical flow and use of transitions.",
              },
              vocabulary: {
                type: "number",
                description:
                  "Score from 1 to 9, only integer. Measures range and precision of lexical choices.",
              },
              grammar: {
                type: "number",
                description:
                  "Score from 1 to 9, only integer. Evaluates sentence structure and grammatical accuracy.",
              },
            },
            required: ["cohesion", "vocabulary", "grammar"],
          },
          feedback: {
            type: "string",
            description: `A personalized analysis of the user's text as a whole in ${lang} (max 50 words). Mention at least one specific strength or weakness found in the text. Avoid generic praise.`,
          },
        },
        required: ["overall", "breakdown", "feedback"],
      },
      missingCode: {
        type: "array",
        items: { type: "string" },
        description:
          "Brief explanations for errors that don't fit the standard codes. Null if empty.",
        nullable: true,
      },
    },
    required: ["text", "mistakes", "missingCode"],
  };
};

export default summarySchema;
