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
              description: `Brief explanation in ${lang} (max 30 words)`,
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
