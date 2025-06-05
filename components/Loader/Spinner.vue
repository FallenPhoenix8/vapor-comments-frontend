<template>
  <!-- From Uiverse.io by mobinkakei -->
  <div class="spinner" :class="$attrs.class">
    <div class="square"></div>
    <div class="square"></div>
    <div class="square"></div>
    <div class="square"></div>
  </div>
</template>
<style scoped>
/* From Uiverse.io by AbanoubMagdy1 */
.spinner {
  --dim: 1.3rem;
  width: var(--dim);
  height: var(--dim);
  position: relative;
  animation: spin988 2s linear infinite;
}

.spinner .square {
  /* --color: var(--color-complementary); */
  --dim: 0.6rem;
  width: var(--dim);
  height: var(--dim);
  /* background-color: var(--color); */
  border-radius: var(--radius-sm);
  position: absolute;
}

.spinner .square:nth-child(1) {
  top: 0;
  left: 0;
  background-color: var(--color-complementary-lighter);
}

.spinner .square:nth-child(2) {
  top: 0;
  right: 0;
  background-color: var(--color-complementary-darker);
}

.spinner .square:nth-child(3) {
  bottom: 0;
  left: 0;
  background-color: var(--color-complementary-darker);
}

.spinner .square:nth-child(4) {
  bottom: 0;
  right: 0;
  background-color: var(--color-complementary-lighter);
}

@keyframes spin988 {
  0% {
    transform: scale(0.8) rotate(0);
  }

  25% {
    transform: scale(1.3) rotate(90deg);
  }

  50% {
    transform: scale(1) rotate(180deg);
  }

  75% {
    transform: scale(1.3) rotate(270deg);
  }

  100% {
    transform: scale(0.8) rotate(360deg);
  }
}
</style>
