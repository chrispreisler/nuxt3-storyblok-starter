<template>
  <img
    ref="image"
    src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
    :width="imageWidth"
    :height="imageHeight"
    :style="'aspect-ratio: ' + imageWidth / imageHeight"
    :alt="blok.alt"
    class="transition-opacity duration-300"
    :class="[
      { 'object-cover w-full h-full': isCover && !blok.focus },
      { 'w-full': blok.focus },
    ]"
  />
</template>

<script setup>
const props = defineProps({
  blok: {
    type: Object,
    default: () => {},
    required: true,
  },
  isCover: {
    type: Boolean,
    default: false,
  },
  isPriority: {
    type: Boolean,
    default: false,
  },
});

const image = ref();
const imageWidth = ref(props.blok.filename.split("/")[5].split("x")[0]);
const imageHeight = ref(props.blok.filename.split("/")[5].split("x")[1]);
const isSvg = props.blok.filename.slice(-3) === "svg";
const sizes = [640, 768, 1024, 1280, 1536, 1920];
const imageSrcset = computed(() =>
  isSvg ? props.blok.filename : generateImageSrcset(props.blok.filename)
);
const isLoaded = ref(false);
watch(imageSrcset, () => loadImage());
/* if (props.isPriority) {
  useMeta({
    link: [
      {
        rel: "preload",
        as: "image",
        href: generateImageUrl(props.blok.filename, "640x0"),
        imagesrcset: imageSrcset.value,
        imagesizes: "100vw",
      },
    ],
  });
} */
const { stop: stopIntersectionObserver } = useIntersectionObserver(
  image,
  ([{ isIntersecting }], observerElement) => {
    if (isIntersecting) {
      if (props.blok.focus && props.isCover) {
        const { x, y } = getTransformationPoints();
        image.value.style.transform = "translate(" + x + "px, " + y + "px)";
      }
      loadImage();
    }
  },
  { threshold: 0 }
);
onMounted(() => {
  image.value.classList.add("opacity-0");
  if (props.blok.focus) {
    useResizeObserver(image.value.parentElement, (entries) => {
      if (isLoaded.value) {
        const { x, y } = getTransformationPoints();
        image.value.style.transform = "translate(" + x + "px, " + y + "px)";
      }
    });
  }
});
function getTransformationPoints() {
  const focalX = props.blok.focus.split(":").pop().split("x")[0];
  const focalY = props.blok.focus.split("x").pop().split(":")[0];
  const wrapperWidth = image.value.parentElement.clientWidth;
  const wrapperHeight = image.value.parentElement.clientHeight;
  const newImageHeight = (wrapperWidth / imageWidth.value) * imageHeight.value;
  const newImageWidth = (wrapperHeight / imageHeight.value) * imageWidth.value;
  const newFocalX = (newImageWidth / imageWidth.value) * focalX;
  const newFocalY = (newImageHeight / imageHeight.value) * focalY;
  let transformX = 0;
  let transformY = 0;
  if (wrapperWidth < wrapperHeight || newImageHeight < wrapperHeight) {
    image.value.classList.add("portrait");
    transformX = -newFocalX + wrapperWidth / 2;
    if (transformX > 0) {
      transformX = 0;
    }
    if (newImageWidth + transformX < wrapperWidth) {
      transformX = wrapperWidth - newImageWidth;
    }
  } else {
    image.value.classList.remove("portrait");
    transformY = -newFocalY + wrapperHeight / 2;
    if (transformY > 0) {
      transformY = 0;
    }
    if (newImageHeight + transformY < wrapperHeight) {
      transformY = wrapperHeight - newImageHeight;
    }
  }
  return {
    x: transformX,
    y: transformY,
  };
}
function generateImageSrcset(imageUrl) {
  return sizes
    .map((width, index) => {
      const height = 0;
      const format = "webp";
      const options = `${width}x${height}`;
      const url = imageUrl + "/m/" + options;
      return `${url} ${width}w`;
    })
    .join(", ");
}
function loadImage() {
  image.value.addEventListener("load", () => {
    image.value.classList.remove("opacity-0");
    stopIntersectionObserver();
    isLoaded.value = true;
  });
  image.value.srcset = imageSrcset.value;
}
</script>

<style scoped>
.portrait {
  @apply max-h-full w-auto max-w-none;
  height: inherit;
}
</style>
