/* globals google */
(function () {
  'use strict'

  const MapsApp = function () {
    if (MapsApp.instance) {
      return MapsApp.instance
    }
    MapsApp.instance = this

    this.container = null
    this.map = null

    this.init()
  }

  window.MapsApp = MapsApp

  MapsApp.prototype = {
    init: function () {
      console.log('MapsApp started')

      this.container = document.querySelector('#map-container')

      const options = {
        center: {
          lat: 59.439252,
          lng: 24.7721997
        },
        zoom: 6,
        styles: [
          {
            'elementType': 'labels',
            'stylers': [ { 'visibility': 'off' } ]
          },
          {
            'featureType': 'water',
            'stylers': [ { 'color': '#8080ed' } ]
          },
          {
            'featureType': 'road.highway',
            'stylers': [ { 'hue': '#ff0022' } ]
          }
        ],
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false

      }

      this.map = new google.maps.Map(this.container, options)

      this.map.addListener('click', function (e) {
        console.log(e.latLng.lat())
        MapsApp.instance.createMarker(e.latLng.lat(), e.latLng.lng())
      })
    },

    createMarker: function (newLat, newLng) {
      const markerOptions = {
        map: this.map,
        position: { lat: newLat, lng: newLng },
        animation: google.maps.Animation.BOUNCE
      }

      const newMarker = new google.maps.Marker(markerOptions)
      const infoOptions = { content: '<strong>Tere</strong>' }
      const infoWindow = new google.maps.InfoWindow(infoOptions)

      // connect with marker
      infoWindow.open(this.map, newMarker)
    }
  }

  window.onload = function () {
    const app = new MapsApp()
    window.app = app
  }
})()
