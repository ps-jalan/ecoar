<template>
  <q-btn
    :label="label"
    :icon="icon"
    :type="type"
    :to="to"
    :loading="loading"
    :disable="disable"
    :flat="flat"
    :outline="outline"
    :color="color"
    :text-color="textColor"
    :class="btnClass"
    :no-caps="true"
    :dense="dense"
    @click="$emit('click')"
    v-bind="$attrs"
  >
    <slot />
  </q-btn>
</template>

<script setup>
defineProps({
  label: String,
  icon: String,
  type: {
    type: String,
    default: 'button',
  },
  to: String,
  loading: Boolean,
  disable: Boolean,
  flat: Boolean,
  outline: Boolean,
  dense: Boolean,
  color: {
    type: String,
    default: 'primary',
  },
  textColor: {
    type: String,
    default: 'black',
  },
  btnClass: {
    type: String,
    default: 'btn-primary',
  },
})
defineEmits(['click'])
</script>
