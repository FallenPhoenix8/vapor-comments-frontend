<template>
  <section id="features" class="min-h-screen bg-secondary">
    <FeaturesWave />
    <h2 class="text-center">Why us?</h2>
    <div
      class="features-wrapper flex flex-wrap justify-center gap-5 md:gap-10 mt-5"
    >
      <FeaturesCard>
        <template #icon>
          <Icon name="fluent:chat-24-regular" class="h-16 w-16" mode="svg" />
        </template>
        <template #title> Discuss interesting topics </template>
        <template #description>
          Home for various interesting discussions. Engage in meaningful
          conversations and explore diverse topics. Connect with others who
          share your interests.
        </template>
      </FeaturesCard>
      <FeaturesCard>
        <template #icon>
          <Icon
            name="fluent:people-team-24-regular"
            class="h-16 w-16"
            mode="svg"
          />
        </template>
        <template #title> Meet new people </template>
        <template #description>
          Meet new people and make new friends. Expand your network and build
          lasting relationships.
        </template>
      </FeaturesCard>
      <FeaturesCard>
        <template #icon>
          <Icon name="fluent:emoji-24-regular" class="h-16 w-16" mode="svg" />
        </template>
        <template #title> Express yourself </template>
        <template #description>
          Share your thoughts and express yourself freely. Whether it's through
          writing, art, or any other form of expression, find your voice and let
          it be heard.
        </template>
      </FeaturesCard>
    </div>
  </section>
</template>
