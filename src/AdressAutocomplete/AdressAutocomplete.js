import React, { Component, PropTypes } from 'react'
import { TextField } from 'material-ui'

export default class AddressAutocomplete extends Component {
  static propTypes = {
    value: PropTypes.string,
    floatingLabelText: PropTypes.string,
    hintText: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string
  }

  componentWillMount () {
    this.setState({value: this.props.value || '' })
  }

  componentDidMount () {
    const input = document.getElementById('addressAutocompleteField')
    /*here we pass options to the API
    https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform?hl=fr */
    const options = {
      componentRestrictions: {country: 'fr'},
      types: ['address']
    }
    const geoAutocomplete = new window.google.maps.places.Autocomplete((input), options)
    geoAutocomplete.addListener('place_changed', () => {
      const selectedPlace = geoAutocomplete.getPlace()
      /*
        We chose to use formated_adress to save in the state, but the geoAutocomplete.getPlace()
        returned object contains many other usefull data.
       */
      const formatted_address = selectedPlace.formatted_address; 
      input.value = formatted_address;
      /*we call directly onChange, without a real event, so we pass null as event param.
        (see the NewDeviceForm.js handleInput function)*/
      this.props.onChange(null,formatted_address);
    })
  }

  render () {
    return (
      <TextField
        name={this.props.name}
        id='addressAutocompleteField'
        floatingLabelFixed={this.props.floatingLabelFixed}
        floatingLabelText={this.props.floatingLabelText}
        hintText={this.props.hintText}
        value={this.props.value}
        onChange={this.props.onChange}
        fullWidth={this.props.fullWidth}
        placeholder=''
      />
    )
  }
}