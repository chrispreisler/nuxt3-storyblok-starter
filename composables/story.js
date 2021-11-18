export const useStory = async (slug) => {
  const { data } = await useFetch(
    "https://api.storyblok.com/v2/cdn/stories" + slug,
    {
      pick: ["story"],
      params: {
        token: "MXZNTlJYSnVfIwr28XMcxQtt",
      },
    }
  );

  /* const storyapi = useStoryApi();
  const { data } = await storyapi.get("cdn/stories" + slug, {
    version: "draft",
  }); */

  return {
    data: readonly(data),
  };
};
