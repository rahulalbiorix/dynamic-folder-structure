<template>
  <div class="tree-view">
    <button class="root-btn" @click="showInput = true">Add folder to root</button>
    <Folder :folder="rootFolders" @delete="deleteFileOrFolder" @add="addFileOrFolder" />
    <CreateInput v-if="showInput" type="folder" @add="addRootFolder" @close="showInput = false" />
  </div>
</template>
<script setup>
import { defineProps, computed, ref } from 'vue'
import Folder from '@/components/Folder.vue'
import { useFilesStore } from '@/stores/files'
import CreateInput from '@/components/controls/CreateInput.vue'

const filesStore = useFilesStore()

const rootFolders = computed(() => filesStore.getRootFolders)
const showInput = ref(false)
const addRootFolder = (item) => {
  let newFolder = {
    ...item,
    id: Math.floor(Math.random() * 100),

    childrens: []
  }
  filesStore.addRootFolder(newFolder)
  showInput.value = false
}
const deleteFileOrFolder = (item) => {
  filesStore.deleteFileOrFolder(rootFolders.value, item.id)
}
const addFileOrFolder = (item) => {
  filesStore.addfileOrFolder(rootFolders.value, item)
}
</script>
<style scoped>
.tree-view {
  padding: 20px;
}
.root-btn {
  height: 30px;
  cursor: pointer;
}
</style>
