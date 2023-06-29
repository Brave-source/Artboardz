import React from 'react'
import { GoogleMap, useJsApiLoader,Marker, InfoBox} from '@react-google-maps/api';

const containerStyle = {
  width: '85vw',
  height: '400px'
};

const center = {
  lat: 9.083333,
  lng: 7.536111
};
const position = {
  lat: -3.744,
  lng: -38.522
};
const options = { closeBoxURL: '', enableEventPropagation: true };

const onLoad = infoBox => {
  console.log('infoBox: ', infoBox)
};


function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCMQynRL57gTKZB6dbZAyp1fyR7QdT1pNE"
  })



  
  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
    
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
        {/* <InfoBox
      onLoad={onLoad}
      options={options}
      position={center}
    >
      <div style={{ backgroundColor: 'yellow', opacity: 0.75, padding: 12 }}>
        <div style={{ fontSize: 16, fontColor: `#08233B` }}>
          Hello, World!
        </div>
      </div>
    </InfoBox>
    <Marker
     onLoad={onLoad}
     position={center}/> */}
     <InfoBox
      options={options}
      position={center}
     >
      Hello world
     </InfoBox>
     <Marker
      position={center}
     >

     </Marker>
      </GoogleMap>
  ) : <></>
}

export default React.memo(Map)