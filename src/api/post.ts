import sanityClient from "../client";

export const fetchPosts = async () => {
  const data = await sanityClient.fetch(
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

export const fetchPost = async (slug) => {
  const data = await sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
        title,
        _id,
        slug,
        "comments": comments[]->{
            _id,
            likes,
            publishedAt,
            title, 
            user-> {
              name,
          "image": mainImage.asset->url
            }
        },
        publishedAt,
        mainImage {
          asset->{
            _id,
            url
          }
        },
        body,
        user->{
          _id,
          name,
          email,
          "image": mainImage.asset->url
        }
      }`,
    { slug }
  );

  return data;
};

export const fetchSearchPost = async (query: string) => {
  const data = await sanityClient.fetch(
    `*[_type == "post" && title match $query] {
        title,
        _id,
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
export const fetchPostsInCategory = async (categoryId: string) => {
  const data = await sanityClient.fetch(
    `*[_type == "post" && references($categoryId)] | order(publishedAt desc) {
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
    }`,
    { categoryId } // ✅ Lọc bài viết theo categoryId
  );

  return data; // ✅ Trả về danh sách bài viết liên quan đến category
};
