/**
 * Based on code from
 * https://medium.com/@dabit3/creating-an-animated-picker-for-react-native-a0785ad5a39c
 */
import React, {Component} from 'react'
import {Picker, Platform} from 'react-native'

import PickerIOSDialog from './PickerIOSDialog'


const isIOS = Platform.OS === 'ios'


function PickerDialog({mode = 'dialog', ...props})
{
  const Component = (isIOS && mode === 'dialog') ? PickerIOSDialog : Picker

  return (
    <Component {...props} mode={mode}>
      {children}
    </Component>
  )
}

PickerDialog.Item = Picker.Item
PickerDialog.propTypes = Picker.propTypes


module.exports = PickerDialog
