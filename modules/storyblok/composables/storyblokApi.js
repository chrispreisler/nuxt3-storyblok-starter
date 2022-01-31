export const useStoryblokApi = async (slug) => {
  const { storyblok } = useRuntimeConfig();
  const { version, token } = storyblok;

  const { data } = await useFetch(
    "https://api.storyblok.com/v2/cdn/stories" + slug,
    {
      params: {
        version,
        token,
      },
    }
  );

  return {
    data,
  };
};
