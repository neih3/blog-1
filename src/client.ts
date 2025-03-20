import sanityClient from "@sanity/client";
const projectID = import.meta.env.VITE_API_PROJECT_ID_SANITY;
export default sanityClient({
  projectId: projectID,
  dataset: "production",
  useCdn: false,
  token:
    "skT3cyflmPT7ai1YD7g9QCKcyUX2CNytrfr4EEpH2ikN7gDKYknRPhj9frGUdCPHBSWeiyon8VbBO80GtSF7BsNP7KKebTdJxVV8mOeRYaqFrShulnctfCjUaW6ld191Omnn9mrd734aGLe6qkW9JpHq2ilJNOJynVYuEFC13qg7yxkb2Flv",
});
