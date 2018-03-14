import {mount} from 'enzyme'
import React from 'react'

import Picker from '..'


test('empty, no props', () => {
  const wrapper = mount(<Picker/>)

  expect(wrapper).toMatchSnapshot()
})
