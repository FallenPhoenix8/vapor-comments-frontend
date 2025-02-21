<template>
  <header
    class="hero pt-10 flex lg:justify-between items-center xl:flex-row flex-col-reverse h-screen md:px-10 px-3 justify-center bg-contain bg-top bg-no-repeat bg-bg-color"
  >
    <div
      class="content bg-bg-color/50 backdrop-blur-xs rounded-lg text-center lg:text-left"
    >
      <h1 class="text-transparent gradient primary bg-clip-text">
        Discuss interesting topics
      </h1>
      <p class="animate-slide-from-bottom">
        Home for various interesting discussions.
      </p>
    </div>

    <NuxtImg
      src="/img/hero.png"
      alt="Hero image"
      class="hidden lg:block h-1/2 aspect-auto"
    />
  </header>
</template>
<style scoped>
@media (max-width: 64rem) {
  .hero {
    background-image: url("/img/hero.png");
  }
}

h1 {
  animation: appear 0.8s ease-in;
}

@keyframes appear {
  0% {
    opacity: 0;
    transform: perspective(800px) rotateY(25deg) scale(0.9) rotateX(10deg);
    filter: blur(2px);
  }
  100% {
    opacity: 1;
    transform: perspective(800px) rotateY(0) translateY(0px) rotateX(0) scale(1);
  }
}
</style>
