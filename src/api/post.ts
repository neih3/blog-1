import sanityCliemt from "../client";

export const fetchPosts = async () => {
  const data = await sanityCliemt.fetch(
    `*[_type == "post"] {
        title,
        slug,
        "authorName": author->name,
        "authorImage": author->image.asset->url, 
        body,
        publishedAt,
        mainImage {
          asset -> {
            _id,
            url
          },
          alt
        }
      } | order(publishedAt desc)`
  );
  return data;
};

// Hàm fetch dữ liệu từ Sanity
export const fetchPost = async (slug) => {
  const data = await sanityCliemt.fetch(
    `*[slug.current == $slug]{
        title,
        slug,
        publishedAt,
        mainImage{
          asset->{
            _id,
            url
          }
        },
        body,
        "name": author->name,
        "authorImage": author->image.asset->url
      }`,
    { slug }
  );
  return data[0]; // Chỉ lấy bài viết đầu tiên
};

export const fetchSearchPost = async (query: string) => {
  const data = await sanityCliemt.fetch(
    `*[_type == "post" && title match $query] {
        title,
        slug,
        "authorName": author->name,
        "authorImage": author->image.asset->url, 
        body,
        publishedAt,
        mainImage {
          asset -> {
            _id,
            url
          },
          alt
        }
      } | order(publishedAt desc)`,
    { query } // Tìm kiếm theo từ khóa
  );

  return data; // Trả về danh sách bài viết tìm được
};
