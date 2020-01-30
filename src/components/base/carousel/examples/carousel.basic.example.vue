<template>
  <gl-carousel
    :interval="4000"
    controls
    indicators
    background="#ababab"
    img-width="1024"
    img-height="480"
    style="text-shadow: 1px 1px 2px #333;"
  >
    <!-- Text slides with image -->
    <gl-carousel-slide
      caption="First slide"
      text="Nulla vitae elit libero, a pharetra augue mollis interdum."
      img-src="https://picsum.photos/1024/480/?image=52"
    />

    <!-- Slides with custom text -->
    <gl-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
      <h1>Hello world!</h1>
    </gl-carousel-slide>

    <!-- Slides with image only -->
    <gl-carousel-slide img-src="https://picsum.photos/1024/480/?image=58" />
  </gl-carousel>
</template>
