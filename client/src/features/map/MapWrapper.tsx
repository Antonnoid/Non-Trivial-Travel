import React from 'react';

const MapWrapper = React.memo(
  () => (
      <div id="map-container" style={{width: '500px', height: '500px'}} />
    ),
  () => false
);

export default MapWrapper;
