//Marker styles - - - - - -

export const icons = {
  existingXFits: L.icon({
    iconUrl: 'images/ProposedXFitsFullOpacity-04.png',
    // shadowUrl: 'Images/BellIconShadow-02.png',
    iconSize:     [30, 30], // size of the icon
    shadowSize:   [50, 50], // size of the shadow
    iconAnchor:   [15, 30], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  }),
  basicMarker: {
      radius: 8,
      fillColor: "#5CA2D1",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
  },
  submissions: {
      radius: 8,
      fillColor: "#FF6AA0",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
  }
}
