import { sanityFetch } from "../live";
import { defineQuery } from "groq";

export async function getUnitBySlug(slug: string) {
  const lowerCaseSlug = slug.toLowerCase();

  const getUnitBySlugQuery = 
  defineQuery(`*[_type == "unit" && slug.current == $slug][0]{
        _id,
        title,
        fullCode,
        code,
        order,
        description,

        // Strand + Subject context
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
        },

        // All lessons in this unit
        "lessons": *[
        _type == "lesson" &&
        unit._ref == ^._id
        ] | order(code asc){
        _id,
        title,
        code,
        fullCode,
        description,
        "slug": slug.current,
        // Optional: how many success criteria belong to this lesson
        "successCriteriaCount": count(*[
            _type == "successCriteria" &&
            lesson._ref == ^._id
        ])
        }
  }`);

  const unit = await sanityFetch({
    query: getUnitBySlugQuery,
    params: { slug: lowerCaseSlug },
  });

  return unit.data;
}
