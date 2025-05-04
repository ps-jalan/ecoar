<template>
  <q-input
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    filled
    dense
    :label="label"
    :type="type"
    :bg-color="bgColor"
    :color="color"
    :label-color="labelColor"
    class="input-dark"
    v-bind="$attrs"
  >
    <template v-if="$slots.append" #append>
      <slot name="append" />
    </template>
    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>
  </q-input>
</template>

<script setup>
defineProps({
  modelValue: [String, Number],
  label: String,
  type: {
    type: String,
    default: 'text',
  },
  color: {
    type: String,
    default: 'primary',
  },
  bgColor: {
    type: String,
    default: 'grey-10',
  },
  labelColor: {
    type: String,
    default: 'grey-5',
  },
})
defineEmits(['update:modelValue'])
</script>
