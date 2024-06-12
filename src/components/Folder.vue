<template>
  <ul>
    <template v-for="item in folderItems" :key="item.id">
      <div v-if="!item.type">
        <div v-if="!creationType">
          <button @click="creationType = 'file'">File</button>
          <button @click="creationType = 'folder'">Folder</button>
        </div>
        <CreateInput
          v-if="creationType"
          :parent="folder"
          :type="creationType"
          @add="addFileOrFolder($event, item)"
          @close="showInput = false"
        />
      </div>
      <li v-else>
        <div>
          <SvgIcon v-if="item.type === 'folder'" type="mdi" :path="mdiFolder" />
          <SvgIcon v-if="item.type === 'file'" type="mdi" :path="mdiFile" />
          <div @mouseover="hoverItem = item.id" @mouseleave="hoverItem = null">
            {{ item.value
            }}<span v-if="hoverItem === item.id">
              <SvgIcon
                class="btn-icon"
                v-if="item.type === 'folder'"
                type="mdi"
                :path="mdiPlusCircle"
                @click="handleAdd(item)"
              /><SvgIcon
                @click="deleteFileOrFolder(item)"
                class="btn-icon"
                type="mdi"
                :path="mdiMinusCircle"
              />
            </span>
          </div>
        </div>
        <Folder
          v-if="item.type === 'folder' && item.childrens.length"
          :folder="item.childrens"
          @delete="deleteFileOrFolder"
          @add="addEmit"
        />
      </li>
    </template>
  </ul>
</template>
<script setup>
import { defineProps, ref } from 'vue'
import { mdiFolder } from '@mdi/js'
import { mdiPlusCircle } from '@mdi/js'
import { mdiMinusCircle } from '@mdi/js'
import { mdiFile } from '@mdi/js'
import CreateInput from '@/components/controls/CreateInput.vue'

const props = defineProps(['folder'])
const folderItems = ref(props.folder)
const emit = defineEmits(['delete', 'add'])
const isHover = ref(false)
const hoverItem = ref(null)
const showInput = ref(false)
const creationType = ref('')

const addFileOrFolder = ($event, item) => {
  let newItem = { ...$event, ...item }
  if (newItem.type === 'folder') newItem.childrens = []
  addEmit(newItem)
}
const addEmit = (item) => {
  emit('add', item)
}
const deleteFileOrFolder = (item) => {
  emit('delete', item)
}
const handleAdd = (item) => {
  let index = folderItems.value.findIndex((el) => el.id === item.id)
  folderItems.value[index].childrens.push({ id: Math.floor(Math.random() * 100) })

  showInput.value = true
}
</script>
<style>
ul {
  margin: 0;
  /* padding: 0;     */
  padding-left: 25px;
}
li {
  list-style: none;
  position: relative;
}
li::before {
  content: '';
  position: absolute;
  left: -16px;
  top: -24px;
  width: 2px;
  height: 100%;
  background-color: black;
  z-index: -1;
}
li::after {
  content: '';
  position: absolute;
  left: -16px;
  top: 16px;
  width: 20px;
  height: 1px;
  background-color: black;
}
li div {
  display: flex;
  height: 40px;
}
</style>
