
import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import image from '../../assets/images/hero0Image.png';
import { Room } from '@mui/icons-material';
import Image from 'next/image';

const containerStyle = {
  width: '85vw',
  height: '400px'
};


// const markers = [
//   {
//     position: { lat: -3.794, lng: -38.112 },
//     title: 'Marker 1',
//     description: 'Marker 1 description',
//     link: 'Link',
//     image: image
//   },
//   {
//     position: { lat: 9.9327629, lng: -11.3580296 },
//     title: 'Marker 1',
//     description: 'Marker 1 description',
//     link: 'Link',
//     image: image
//   },
//   {
//     position: { lat: 6.45, lng: 3.4 },
//     title: 'Marker 3',
//     description: 'Marker 1 description',
//     link: 'Link',
//     image: image
//   },
//   {
//     position: { lat: -3.749, lng: -38.514 },
//     title: 'Marker 2',
//     description: 'Marker 2 description',
//     link: 'Link',
//     image: image
//   }
// ];

const options = {
  closeBoxURL: '',
  enableEventPropagation: true,
  pixelOffset: { width: 0, height: 0 }, // Adjust the pixel offset as needed
  disableAutoPan: true,
  pane: 'overlayLayer',
  boxClass: 'custom-infowindow',
};

function Map({markers}) {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
  });

  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  }
  const center = {
    lat: 9.9327629,
    lng: -11.3580296
  };
  console.log(markers)

  const handleMarkerCloseClick = () => {
    setSelectedMarker(null);
  };

  return isLoaded ? ( 
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={2}
    >
      {markers?.map((marker, index) => (
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
            <Image src={selectedMarker.img} alt="Marker Image" className='h-[120px] w-[190px] relative right-[10px]' width={100} height={100} />
            <h2 className=' relative right-[10px] mb-2'>{selectedMarker.title}</h2>
            <p className=' relative right-[10px] mb-2'>{selectedMarker.desc}</p>
            {/* <a className=' relative right-[10px]'>{selectedMarker.link}</a> */}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : null;
}

export default React.memo(Map);


// import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
// import { useMemo } from "react";
// import "./App.css";

// const App = () => {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
//   });
//   const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

//   return (
//     <div className="App">
//       {!isLoaded ? (
//         <h1>Loading...</h1>
//       ) : (
//         <GoogleMap
//           mapContainerClassName="map-container"
//           center={center}
//           zoom={10}
//         >
//           <Marker position={{ lat: 18.52043, lng: 73.856743 }} />
//         </GoogleMap>
//       )}
//     </div>
//   );
// };

// export default App;