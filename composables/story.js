export const useStory = async (slug) => {
  const { storyblokToken } = useRuntimeConfig();
  const { data } = await useFetch(
    "https://api.storyblok.com/v2/cdn/stories" + slug,
    {
      params: {
        token: storyblokToken,
      },
    }
  );

  return {
    data: readonly(data),
  };
};
