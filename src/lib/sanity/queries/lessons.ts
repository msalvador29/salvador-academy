import { sanityFetch } from "../live";
import { defineQuery } from "groq";

export async function getLessonBySlug(slug: string) {
  const lowerCaseSlug = slug.toLowerCase();

  const getLessonBySlugQuery =
    defineQuery(`*[_type == "lesson" && slug.current == $slug][0]{
    _id,
    title,
    fullCode,
    code,
    description,

    // Unit and its strand & subject
    "unit": unit->{
      _id,
      title,
      fullCode,
      "slug": slug.current,
      "strand": strand->{
        _id,
        title,
        code,
        "slug": slug.current,
        "subject": subject->{
          _id,
          title,
          code,
          "slug": slug.current
        }
      }
    },

    // Success criteria for this lesson
    "successCriteria": *[
      _type == "successCriteria" &&
      lesson._ref == ^._id
    ] | order(code asc){
      _id,
      code,
      description
    },

    // Optional: prerequisites, if you keep that field
    "prerequisites": prerequisites[]->{
      _id,
      title,
      fullCode,
      "slug": slug.current
    }
  }`);

  const lesson = await sanityFetch({
    query: getLessonBySlugQuery,
    params: { slug: lowerCaseSlug },
  });

  return lesson.data;
}