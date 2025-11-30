import { sanityFetch } from "../live";
import { defineQuery } from "groq";

export async function getQuestionsByQuestionBankId(questionBankId: string) {
  const getQuestionsByQuestionBankIdQuery = defineQuery(`*[
    _type in ["multipleChoiceQuestion", "numericalAnswerQuestion", "multiPartQuestion"] &&
    questionBank._ref == $questionBankId
  ] | order(_createdAt asc) {
    _id,
    _type,
    questionBank,
    content,
    instructions,

    // For multipleChoiceQuestion
    options[]{
      _key,
      isCorrect,
      label,
      content,
      text
    },
    isRandomised,

    // For numericalAnswerQuestion
    answerPrefix,
    unitsOptions[]{
      _key,
      content,
      isCorrect
    },

    // For multiPartQuestion
    parts[]->{
      _id,
      _type,
      content,
      instructions,

      // MC part fields
      options[]{
        _key,
        isCorrect,
        label,
        content,
        text
      },
      isRandomised,

      // Numerical part fields
      answerPrefix,
      unitsOptions[]{
        _key,
        content,
        isCorrect
      }
    }
  }`);

  const result = await sanityFetch({
    query: getQuestionsByQuestionBankIdQuery,
    params: { questionBankId },
  });

  return result.data;
}

export async function getQuestionById(questionId: string) {
    const getQuestionByIdQuery = defineQuery(`*[
      _id == $questionId &&
      _type in ["multipleChoiceQuestion", "numericalAnswerQuestion", "multiPartQuestion"]
    ][0]{
      _id,
      _type,
      questionBank,
      content,
      instructions,
  
      // Multiple choice fields
      options[]{
        _key,
        isCorrect,
        label,
        content,
        text
      },
      isRandomised,
  
      // Numerical fields
      answerPrefix,
      unitsOptions[]{
        _key,
        content,
        isCorrect
      },
  
      // Multi-part fields
      parts[]->{
        _id,
        _type,
        content,
        instructions,
  
        // MC part fields
        options[]{
          _key,
          isCorrect,
          label,
          content,
          text
        },
        isRandomised,
  
        // Numerical part fields
        answerPrefix,
        unitsOptions[]{
          _key,
          content,
          isCorrect
        }
      }
    }`);
  
    const result = await sanityFetch({
      query: getQuestionByIdQuery,
      params: { questionId },
    });
  
    return result.data;
  }