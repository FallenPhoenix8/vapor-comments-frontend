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
          Home for various interesting discussions.
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
          Meet new people and make new friends.
        </template>
      </FeaturesCard>
      <FeaturesCard>
        <template #icon>
          <Icon name="fluent:emoji-24-regular" class="h-16 w-16" mode="svg" />
        </template>
        <template #title> Express yourself </template>
        <template #description>
          Express yourself and share your thoughts.
        </template>
      </FeaturesCard>
    </div>
  </section>
</template>
