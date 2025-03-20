import sanityClient from "../client";

export const createUser = async (user) => {
  const data = await sanityClient.create({
    _type: "user",
    _id: user.id,
    name: user.fullName,
    email: user.primaryEmailAddress?.emailAddress,
    image: user.imageUrl,
  });

  return data; // Trả về danh sách bài viết tìm được
};
