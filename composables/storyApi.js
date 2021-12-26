export const useStoryApi = async (slug) => {
  const { storyblokToken, storyblokVersion } = useRuntimeConfig();

  const { data } = await useFetch(
    "https://api.storyblok.com/v2/cdn/stories" + slug,
    {
      params: {
        version: storyblokVersion,
        token: storyblokToken,
      },
    }
  );

  return {
    data,
  };
};
