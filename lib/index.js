/**
 * Based on code from
 * https://medium.com/@dabit3/creating-an-animated-picker-for-react-native-a0785ad5a39c
 */
import React, {Component} from 'react'
import {
  Animated,
  Picker,
  PickerIOS,
  Platform,
  Text,
  TouchableHighlight,
  StyleSheet,
  View
} from 'react-native'

import PanelModal from './PanelModal'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60
  },
  button: {
    marginTop:25,
    marginBottom:25
  },
  buttonText: {
    textAlign: 'center'
  },
})


function createItem(props)
{
  return <PickerIOS.Item {...props}/>
}


class PickerIOSDialog extends Component
{
  _onClose: cancelled =>
  {
    if(cancelled) return

    this.props.onValueChange(this.state.value)
  }

  _onPress: () =>
  {
    const {instance} = PanelModal
    if(!instance) throw new Error('PanelModal instance not mounted in app')

    this.setState({value: undefined})

    const {data, itemStyle, prompt, selectedValue} = this.props

    const body =
    (
      <PickerIOS
        itemStyle={itemStyle}
        onValueChange={this._onValueChange}
        selectedValue={selectedValue}>
        {data.map(createItem)}
      </PickerIOS>
    )

    instance.show(prompt, body, 'Choose', this._onClose)
  }

  _onValueChange: value => this.setState({value})

  render()
  {
    const {data, enabled, selectedValue, style, testID} = this.props

    const {label = ''} = data.find(({key}) => key === selectedValue)

    return (
      <View
        style={[styles.container, style]}
        testID={testID}
        >
        <TouchableHighlight
          style={styles.button}
          underlayColor="transparent"
          onPress={this._onPress}
        >
          <Text style={styles.buttonText}>{label}</Text>
        </TouchableHighlight>
      </View>
    )
  }
}


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