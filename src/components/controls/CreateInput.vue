<template>
  <div class="wrapper-control">
    <div class="input-control">
      <SvgIcon v-if="type === 'folder'" type="mdi" :path="mdiFolder" />
      <SvgIcon v-else type="mdi" :path="mdiFile" />
      <input v-model.trim="inputValue" />

      <button type="button" class="btn-icon" @click="addFolderOrFile">
        <SvgIcon type="mdi" :size="16" :path="mdiCheck" />
      </button>
      <button type="button" class="btn-icon" @click="$emit('close')">
        <SvgIcon type="mdi" :size="16" :path="mdiClose" />
      </button>
    </div>
    <div>
      <span v-if="error">
        {{ errorMessage }}
      </span>
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps } from 'vue'
import { mdiCheck, mdiClose, mdiFolder, mdiFile } from '@mdi/js'

const props = defineProps(['type'])
const emit = defineEmits(['add', 'close'])

const inputValue = ref('')
const errorMessage = ref('')
const error = ref(false)

const addFolderOrFile = () => {
  if (inputValue.value == '') {
    errorMessage.value = `${props.type} name is required`
    error.value = true
    return
  }
  emit('add', { value: inputValue.value, type: props.type })
  inputValue.value = ''
}
</script>
<style scoped>
.wrapper-control {
  max-width: 280px;
  display: flex;
  flex-direction: column;
  padding: 5px;
  border: 1px solid #000;
  border-radius: 4px;
}
.input-control {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
