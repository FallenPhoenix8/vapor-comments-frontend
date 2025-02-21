<template>
  <div
    class="feature-card bg-bg-color/50 rounded-base p-5 max-w-lg flex gap-2 shadow-base hover:shadow-2xl hover:-translate-1 transition-all duration-200 group flex-col md:flex-row"
  >
    <div
      class="feature-card__icon flex flex-col justify-center items-center flex-1"
    >
      <slot name="icon"></slot>
    </div>
    <div class="feature-card__content">
      <h3>
        <slot name="title" />
      </h3>
      <p>
        <slot name="description" />
      </p>
    </div>
  </div>
</template>
