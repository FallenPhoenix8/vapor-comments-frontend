<script setup lang="ts">
import type { RegisterFieldCorrectStatus } from "~/types/RegisterFieldCorrectStatus"

const props = withDefaults(
  defineProps<{
    name: string
    icon?: string
    type?: string
    isRegister?: boolean
    noLabel?: boolean
    checker: (string) => RegisterFieldCorrectStatus | null
  }>(),
  {
    type: "text",
    isRegister: false,
    noLabel: false,
  }
)

const fieldCorrectStatus = ref<RegisterFieldCorrectStatus | null>(null)

const emit = defineEmits(["update:modelValue"])
const value = ref(null)

watch(value, () => {
  fieldCorrectStatus.value = props.checker(value.value)
})

const isVisiblePassword = ref<boolean>(false)

const computedType = computed(() => {
  if (props.type === "password") {
    return isVisiblePassword.value ? "text" : "password"
  }
  return props.type
})
</script>
<template>
  <div>
    <label :for="name" class="capitalize" v-if="!noLabel">{{ name }}</label>
    <div class="flex gap-1">
      <div
        class="text-input flex"
        :class="{
          valid: isRegister && fieldCorrectStatus?.isCorrect === true,
          invalid: isRegister && fieldCorrectStatus?.isCorrect === false,
        }"
      >
        <input
          :type="computedType"
          :name="name"
          :id="name"
          :placeholder="$attrs.placeholder || `Enter your ${name}...`"
          @input="emit('update:modelValue', $event.target.value)"
          v-model="value"
        />
        <div class="icon">
          <button v-if="type === 'password'" tabindex="-1">
            <Icon
              :name="
                isVisiblePassword
                  ? 'material-symbols:visibility'
                  : 'material-symbols:visibility-off'
              "
              class="inline"
              mode="svg"
              @click.prevent="
                () => {
                  isVisiblePassword = !isVisiblePassword
                }
              "
            />
          </button>
          <Icon :name="icon" mode="svg" class="inline" v-if="icon" />
        </div>
      </div>
      <div class="status">
        <Icon
          v-if="isRegister && fieldCorrectStatus?.isCorrect === true"
          name="material-symbols:check"
          class="inline text-success status"
          mode="svg"
        />
        <Icon
          v-if="isRegister && fieldCorrectStatus?.isCorrect === false"
          name="material-symbols:close"
          class="inline text-error status"
          mode="svg"
        />
      </div>
    </div>
    <ul v-if="isRegister && fieldCorrectStatus?.isCorrect === false">
      <li
        v-for="reason in fieldCorrectStatus?.reasons"
        :key="reason"
        class="text-error text-sm"
      >
        * {{ reason }}
      </li>
    </ul>
  </div>
</template>
