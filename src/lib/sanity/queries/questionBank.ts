import { sanityFetch } from "../live";
import { defineQuery } from "groq";

export async function getQuestionBankById(questionBankId: string) {
  const getQuestionBankByIdQuery = defineQuery(`*[
    _type == "questionBank" &&
    _id == $questionBankId
  ][0]{
    _id,
    description,
    code,
    successCriteria->{
      code,
      lesson->{
        _id,
        fullCode,
        title,
        "slug": slug.current
      },
      description
    }
  }`);

  const result = await sanityFetch({
    query: getQuestionBankByIdQuery,
    params: { questionBankId },
  });

  return result.data;
}

export async function getAllQuestionBanks() {
  const query = defineQuery(`*[_type == "questionBank"]
    | order(
        successCriteria->lesson->fullCode asc,
        successCriteria->code asc,
        code asc
      ) {
      _id,
      description,
      code,
      successCriteria->{
        _id,
        code,
        description,
        lesson->{
          _id,
          fullCode,
          title,
          "slug": slug.current
        }
      }
    }
  `);

  const result = await sanityFetch({ query });

  return result.data;
}