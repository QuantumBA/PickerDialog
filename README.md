# PickerDialog

[![Greenkeeper badge](https://badges.greenkeeper.io/QuantumBA/PickerDialog.svg)](https://greenkeeper.io/)
React Native API compatible Picker with support for dialog mode on iOS

This module implements the API for React Native
[Picker](https://facebook.github.io/react-native/docs/picker.html) delegating
its functionality to the native components, and adds support for the `dialog`
mode on iOS to mimic how they behave in web (Safari).

## How it works

When running on `Platform.OS === 'iOS'` and `mode === 'dialog'`, it shows a
modal panel with the same UI that shown on Safari web browser for `select` HTML
elements, or like any other picker in iOS apps instead of the inline big scroll
`PickerIOS` that's shown by default. Otherwise, it just simply delegate to show
a regular React Native `Picker`.
