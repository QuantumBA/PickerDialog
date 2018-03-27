/**
 * Based on code from
 * https://medium.com/@dabit3/creating-an-animated-picker-for-react-native-a0785ad5a39c
 */
import React, {Component} from 'react'
import {
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
    marginTop: 10
  },
  button: {
    marginTop:25,
    marginBottom:25
  },
  buttonText: {
    textAlign: 'center'
  },
})


function createItem({props})
{
  return <PickerIOS.Item {...props}/>
}

function findSelectedValue({props: {value}})
{
  return value === this.valueOf()
}


class PickerIOSDialog extends Component
{

  componentWillUpdate(nextProps, nextState){
    const { instance } = PanelModal

    if((this.state && instance && nextState.value !== this.state.value) 
      || (nextState && !this.state && nextState.value)) {
      const {children, itemStyle, prompt, selectedValue} = nextProps
      const body =
      (
        <PickerIOS
          itemStyle={itemStyle}
          onValueChange={this._onValueChange}
          selectedValue={nextState.value}>
          {children.map(createItem)}
        </PickerIOS>
      )
      instance.show(prompt, body, 'Choose', this._onClose)
    }
  }

  _onClose = cancelled =>
  {
    if(cancelled) return

    this.props.onValueChange(this.state.value)
  }

  _onPress = () =>
  {
    const {instance} = PanelModal
    if(!instance) throw new Error('PanelModal instance not mounted in app')

    const {children, itemStyle, prompt, selectedValue} = this.props

    const body =
    (
      <PickerIOS
        itemStyle={itemStyle}
        onValueChange={this._onValueChange}
        selectedValue={selectedValue}>
        {children.map(createItem)}
      </PickerIOS>
    )

    instance.show(prompt, body, 'Choose', this._onClose)
  }

  _onValueChange = value => this.setState({value})

  render()
  {
    const {children, enabled, selectedValue, style, testID} = this.props

    const item = children.find(findSelectedValue, selectedValue)
    const label = item.props ? item.props.label : ''

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


module.exports = PickerIOSDialog
