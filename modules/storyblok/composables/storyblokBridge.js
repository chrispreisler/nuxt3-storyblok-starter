export const useStoryblokBridge = async (id, cb) => {
  const router = useRouter();
  if (typeof window === "undefined") {
    return;
  }

  if (window.location == window.parent.location) {
    return;
  }

  const createStoryBridge = () => {
    const sbBridge = new window.StoryblokBridge();

    sbBridge.on(["input", "published", "change"], (event) => {
      if (event.action == "input" && event.story.id === id) {
        cb(event.story);
      } else {
        router.go({ path: router.currentRoute, force: true });
      }
    });
  };

  if (document.getElementById("storyblok-javascript-bridge")) {
    createStoryBridge();
  }

  console.log("Window and Edit Mode");

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://app.storyblok.com/f/storyblok-v2-latest.js";
  script.id = "storyblok-javascript-bridge";

  script.onerror = function () {
    cb(new Error("Failed to load" + src));
  };

  script.onload = function () {
    createStoryBridge();
  };

  document.getElementsByTagName("head")[0].appendChild(script);
};
