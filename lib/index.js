/**
 * Based on code from
 * https://medium.com/@dabit3/creating-an-animated-picker-for-react-native-a0785ad5a39c
 */
import React, {Component} from 'react'
import {Picker, Platform} from 'react-native'

import PickerIOSDialog from './PickerIOSDialog'


function PickerDialog({data = [], mode = 'dialog', ...props})
{
  if(Platform.OS === 'ios' && mode === 'dialog')
    return <PickerIOSDialog {...props} data={data}/>

  return (
    <Picker {...props} mode={mode}>
      {data.map(props => <Picker.Item {...props}/>)}
    </Picker>
  )
}

PickerDialog.Item = Picker.Item
PickerDialog.propTypes = Picker.propTypes


module.exports = PickerDialog
