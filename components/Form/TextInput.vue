<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string
    icon: string
    type?: string
    isRegister?: boolean
    checker: (string) => boolean | null
  }>(),
  {
    type: "text",
    isRegister: false,
  }
)

const isValid = ref(null)

const emit = defineEmits(["update:modelValue"])
const value = ref(null)

watch(value, () => {
  isValid.value = props.checker(value.value)
})
</script>
<template>
  <div>
    <label :for="name" class="capitalize">{{ name }}</label>
    <div class="flex gap-1">
      <div
        class="text-input flex"
        :class="{
          valid: isRegister && isValid === true,
          invalid: isRegister && isValid === false,
        }"
      >
        <input
          :type="type"
          :name="name"
          :id="name"
          :placeholder="`Enter your ${name}...`"
          @input="emit('update:modelValue', $event.target.value)"
          v-model="value"
        />
        <div class="icon">
          <Icon :name="icon" mode="svg" class="inline" />
        </div>
      </div>
      <div class="status">
        <Icon
          v-if="isRegister && isValid === true"
          name="material-symbols:check"
          class="inline text-success status"
          mode="svg"
        />
        <Icon
          v-if="isRegister && isValid === false"
          name="material-symbols:close"
          class="inline text-error status"
          mode="svg"
        />
      </div>
    </div>
  </div>
</template>
