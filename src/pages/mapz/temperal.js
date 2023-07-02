import * as React from 'react';
import {useState, useMemo} from 'react';
import {render} from 'react-dom';
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';

// import ControlPanel from './control-panel';
import Pin from './pin';

import CITIES from './cities.json';

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN// Set your mapbox token here

export default function temperalMap() {
  const [popupInfo, setPopupInfo] = useState(null);
  const [viewState, setViewState] = React.useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.5
  });

  const pins = useMemo(
    () =>
      CITIES.map((city, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude}
          anchor="top"
          onClick={e => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(city);
            setViewState({...viewState, latitude: city.latitude, longitude: city.longitude})
          }}
        >
          <Pin />
        </Marker>
      )),
    []
  );

  return (
    <div style={{width: "80vw", height: "100vh", display: "flex", alignItems: "center"}}>
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        // style={{width: 600, height: 400, borderRadius: 50}}
        mapStyle="mapbox://styles/emmyzee45/cljev6apc005t01pig6nu3cju"
        mapboxAccessToken={TOKEN}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

        {pins}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              {popupInfo.city}, {popupInfo.state} |{' '}
              <a
                target="_new"
                href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
              >
                Wikipedia
              </a>
            </div>
            <img width="100%" src={popupInfo.image} />
          </Popup>
        )}
      </Map>
      {/* <ControlPanel /> */}
    </div>
  );
}

// export function renderToDom(container) {
//   render(<App />, container);
// }