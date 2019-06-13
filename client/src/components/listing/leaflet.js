import React from 'react'
import { Map, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'
import styled from 'styled-components'

const Leaf = styled(Map)`
  height: 300px;
  width: 350px;
`

const myIcon = L.icon({
  iconUrl: 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/256/Map-Marker-Ball-Right-Pink-icon.png',
  iconSize: [95, 95],
  iconAnchor: [22, 94]
})

const Leaflet = () => {
  const position = [37.7749, -122.4194];
  const zoom = 13;
  return (
    <Leaf center={position} zoom={zoom}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={myIcon} />
    </Leaf>
  )
}

export default Leaflet