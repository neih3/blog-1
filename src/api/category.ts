import sanityClient from "../client";

export const fetchCategories = async () => {
  const data = await sanityClient.fetch(
    `*[_type == "category"] {
      title,
      _id,
      isNew,
      slug
    }`
  );
  return data;
};
