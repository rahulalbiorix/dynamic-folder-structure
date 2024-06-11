<script setup>
import { computed } from 'vue'
import Header from '@/components/Header.vue'
import CreateInput from '@/components/controls/CreateInput.vue'
import TreeView from '@/components/TreeView.vue'
import { useFilesStore } from '@/stores/files'

const filesStore = useFilesStore()

const rootFolders = computed(() => filesStore.getRootFolders)
</script>

<template>
  <main>
    <Header />
    <TreeView />
  </main>
</template>

<style scoped></style>
