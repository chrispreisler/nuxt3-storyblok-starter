<template>
  <div>
    <picture class="flex w-full h-screen picture">
      <source
        media="(max-aspect-ratio: 3/4)"
        sizes="100vw"
        :srcset="generateImageSrcset([640, 760, 830], 3 / 4)"
      />
      <source
        media="(max-aspect-ratio: 4/3)"
        sizes="100vw"
        :srcset="generateImageSrcset([770, 1440], 4 / 3)"
      />
      <source
        media="(max-aspect-ratio: 39/20)"
        sizes="100vw"
        :srcset="generateImageSrcset([1024, 1440, 2048, 2880], 39 / 20)"
      />
      <source
        sizes="100vw"
        :srcset="generateImageSrcset([1440, 1920, 2880], 16 / 9)"
      />
      <img
        :src="generateImageSrc(1920, 1080)"
        :alt="blok.alt"
        class="object-cover w-full h-full"
      />
    </picture>
  </div>
</template>

<script setup>
const props = defineProps({
  blok: {
    type: Object,
    default: () => {},
  },
});

const imageWidth = ref(props.blok.filename.split("/")[5].split("x")[0]);
const imageHeight = ref(props.blok.filename.split("/")[5].split("x")[1]);

const generateImageSrcset = (sizes, ratio) => {
  return sizes
    .map((width, index) => {
      const height = Math.round(width / ratio);
      const focus = props.blok.focus
        ? `/filters:focal(${props.blok.focus})`
        : "";
      const options = `${width}x${height}${focus}`;
      const url = props.blok.filename + "/m/" + options;
      return `${url} ${width}w`;
    })
    .join(", ");
};

const generateImageSrc = (width, height = 0) => {
  const options = `${width}x${height}`;
  const url = props.blok.filename + "/m/" + options;
  return url;
};
</script>

<!--<style socped>
picture {
  background: yellow;
}

@media (max-aspect-ratio: 39/20) {
  picture {
    background: blue;
  }
}

@media (max-aspect-ratio: 4/3) {
  picture {
    background: green;
  }
}

@media (max-aspect-ratio: 3/4) {
  picture {
    background: red;
  }
}
</style>-->
