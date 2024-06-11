<template>
  <li>
    <SvgIcon type="mdi" :path="mdiFolder" />
    <span @mouseover="isHover = true" @mouseleave="isHover = false">
      {{ folderData.value }}
      <span v-if="isHover">
        <SvgIcon type="mdi" :path="mdiPlusCircle" /><SvgIcon type="mdi" :path="mdiMinusCircle" />
      </span>
    </span>
    <ul v-if="folderData.childrens">
      <template v-for="child in folderData.childrens">
        <NestedChild :data="child" />
      </template>
    </ul>
  </li>
</template>
<script setup>
import { ref } from 'vue'
import NestedChild from '@/components/NestedChild.vue'
import { defineProps } from 'vue'
import { mdiFolder } from '@mdi/js'
import { mdiPlusCircle } from '@mdi/js'
import { mdiMinusCircle } from '@mdi/js'

const porps = defineProps(['folderData'])
const isHover = ref(false)
</script>
