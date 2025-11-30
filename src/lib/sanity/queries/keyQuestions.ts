import { sanityFetch } from "../live";
import { defineQuery } from "groq";

export async function getKeyQuestionById(keyQuestionId: string) {
    const getKeyQuestionByIdQuery = defineQuery(`*[
        _type == "keyQuestion" &&
        _id == $keyQuestionId
    ][0]{
        _id,
        question,
        "slug": slug.current,
        content,
        lesson->{
            _id,
            title,
            fullCode
        }
    }`);

    const keyQuestion = await sanityFetch({
        query: getKeyQuestionByIdQuery,
        params: { keyQuestionId },
    });

    return keyQuestion.data;
}

export async function getKeyQuestionBySlug(questionSlug: string) {
    const getKeyQuestionBySlugQuery = defineQuery(`*[
        _type == "keyQuestion" &&
        slug.current == $questionSlug
    ][0]{
        _id,
        question,
        "slug": slug.current,
        content,
        lesson->{
            _id,
            title,
            fullCode
        }
    }`);

    const keyQuestion = await sanityFetch({
        query: getKeyQuestionBySlugQuery,
        params: { questionSlug },
    });

    return keyQuestion.data;
}