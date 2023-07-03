
import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import image from '../../assets/images/hero0Image.png';
import Image from 'next/image';

const containerStyle = {
  width: '85vw',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const markers = [
  {
    position: { lat: -3.794, lng: -38.112 },
    title: 'Marker 1',
    description: 'Marker 1 description',
    link: 'Link',
    image: image
  },
  {
    position: { lat: -3.749, lng: -38.514 },
    title: 'Marker 2',
    description: 'Marker 2 description',
    link: 'Link',
    image: image
  }
];

const options = {
  closeBoxURL: '',
  enableEventPropagation: true,
  pixelOffset: { width: 0, height: 0 }, // Adjust the pixel offset as needed
  disableAutoPan: true,
  pane: 'overlayLayer',
  boxClass: 'custom-infowindow',
};

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCMQynRL57gTKZB6dbZAyp1fyR7QdT1pNE"
  });

  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleMarkerCloseClick = () => {
    setSelectedMarker(null);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          onClick={() => handleMarkerClick(marker)}
        />
      ))}

{selectedMarker && (
        <InfoWindow
          position={selectedMarker.position}
          onCloseClick={handleMarkerCloseClick}
          options={options}
        >
          <div className='custom-popup h-[200px] w-[200px]' style={{ backgroundColor: 'black', color: 'white', padding: '10px' }}>
            <Image src={selectedMarker.image} alt="Marker Image" className='h-[120px] w-[190px] relative right-[10px]' />
            <h2 className=' relative right-[10px] mb-2'>{selectedMarker.title}</h2>
            <p className=' relative right-[10px] mb-2'>{selectedMarker.description}</p>
            <a className=' relative right-[10px]'>{selectedMarker.link}</a>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : null;
}

export default React.memo(Map);


