import React from 'react';

const MapWrapper = React.memo(
  () => {
    return (
      <div id="map-container" style={{width: '500px', height: '500px'}}></div>
    );
  },
  () => false
);

export default MapWrapper;
