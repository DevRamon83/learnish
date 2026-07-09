const exerciseSchema = () => {
  return {
    type: "json_schema",
    json_schema: {
      name: "english_exercise_schema",
      strict: true,
      schema: {
        type: "object",
        properties: {
          exercise: {
            type: "object",
            properties: {
              instructions: {
                type: "string",
                description:
                  "The general instructions for the exercise. MUST be written in English.", // <--- Forzatura lingua
              },
              questions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    question: {
                      type: "string",
                      description:
                        "The sentence or question to complete. MUST be written in English.", // <--- Forzatura lingua
                    },
                    options: {
                      type: "array",
                      items: { type: "string" },
                      description:
                        "An array of 4 or 5 answer choices. ALL choices must be written in English.", // <--- Forzatura lingua
                    },
                    correct_answer: {
                      type: "string",
                      description:
                        "The correct answer string. MUST be written in English and match one of the options.", // <--- Forzatura lingua
                    },
                  },
                  required: ["question", "options", "correct_answer"],
                  additionalProperties: false,
                },
              },
            },
            required: ["instructions", "questions"],
            additionalProperties: false,
          },
        },
        required: ["exercise"],
        additionalProperties: false,
      },
    },
  };
};

export default exerciseSchema;
