import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useFilesStore = defineStore('files', () => {
  const rootFolders = ref([
    {
      id: Math.floor(Math.random() * 100),
      type: 'folder',
      value: 'Test',
      childrens: [
        {
          id: Math.floor(Math.random() * 100),
          type: 'folder',
          value: 'Inside Test',
          childrens: []
        }
      ]
    },
    {
      id: Math.floor(Math.random() * 100),
      type: 'folder',
      value: 'Test1',
      childrens: [
        {
          id: Math.floor(Math.random() * 100),
          type: 'folder',
          value: 'Inside Test1',
          childrens: [
            {
              id: Math.floor(Math.random() * 100),
              type: 'folder',
              value: 'Inside Test111',
              childrens: []
            }
          ]
        },
        {
          id: Math.floor(Math.random() * 100),
          type: 'folder',
          value: 'Inside Test112',
          childrens: []
        },
        {
          id: Math.floor(Math.random() * 100),
          type: 'file',
          value: 'file'
        }
      ]
    }
  ])
  const getRootFolders = computed(() => rootFolders.value)
  const addFilesAndFolder = (name, index) => {}
  const addRootFolder = (folder) => {
    rootFolders.value.push(folder)
  }
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  const deleteFileOrFolder = (data, idToDelete) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === idToDelete) {
        data.splice(i, 1)
        return true
      }
      if (data[i].childrens && data[i].childrens.length > 0) {
        if (deleteFileOrFolder(data[i].childrens, idToDelete)) {
          return true
        }
      }
    }
    return false
  }
  const addfileOrFolder = (data, item) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === item.id) {
        data[i] = item
        return true
      }
      if (data[i].childrens && data[i].childrens.length > 0) {
        if (addfileOrFolder(data[i].childrens, item)) {
          return true
        }
      }
    }
    return false
  }

  return {
    count,
    doubleCount,
    increment,
    getRootFolders,
    addRootFolder,
    deleteFileOrFolder,
    addfileOrFolder
  }
})
