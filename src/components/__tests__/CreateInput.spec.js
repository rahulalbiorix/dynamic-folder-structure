import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CreateInput from '@/components/controls/CreateInput.vue'

describe('CreateInput', () => {
  const wrapper = mount(CreateInput, { props: { type: 'folder' } })
  it('renders properly', () => {
    expect(wrapper.html()).matchSnapshot()
  })

  it('should add file or folder properly', async () => {
    await wrapper.find('button').trigger('click')
    // expect(wrapper.html()).
  })
})
