import sanityClient from "@sanity/client";
const projectID = import.meta.env.VITE_API_PROJECT_ID_SANITY;
export default sanityClient({
  projectId: projectID,
  dataset: "production",
  useCdn: true,
});
