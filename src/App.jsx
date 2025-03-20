import Header from "./components/ui/Header";
import useRouterElement from "./hooks/useRouterElement";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import sanityClient from "../src/client";

const uploadImageToSanity = async (imageUrl) => {
  try {
    // Tải ảnh về dưới dạng Blob
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    // Kiểm tra xem Blob có hợp lệ không
    if (!blob.type.startsWith("image/")) {
      throw new Error("Invalid image format");
    }

    // Upload Blob lên Sanity
    const imageAsset = await sanityClient.assets.upload("image", blob, {
      contentType: blob.type,
      filename: `user-image-${Date.now()}.jpg`,
    });

    return imageAsset._id; // Trả về ID của ảnh đã upload
  } catch (error) {
    console.error("Error uploading image to Sanity:", error);
    return null; // Nếu lỗi, trả về null
  }
};

export const createUser = async (user) => {
  try {
    let imageId = null;

    if (user.imageUrl) {
      imageId = await uploadImageToSanity(user.imageUrl);
    }

    const data = await sanityClient.createIfNotExists({
      _type: "user",
      _id: user.id,
      name: user.fullName,
      email: user.primaryEmailAddress?.emailAddress,
      mainImage: imageId
        ? { _type: "image", asset: { _type: "reference", _ref: imageId } }
        : null,
    });
  } catch (error) {
    console.error("Error saving user to Sanity:", error);
  }
};
export default function App() {
  const routeElement = useRouterElement();
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    const saveUser = async () => {
      try {
        await createUser(user);
      } catch (error) {
        console.log(error);
      }
    };

    saveUser();
  }, [user]); // Chỉ chạy khi user thay đổi
  return (
    <div className="h-screen">
      <Header />
      {routeElement}
    </div>
  );
}
