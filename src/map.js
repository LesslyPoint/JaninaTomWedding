document.addEventListener("DOMContentLoaded", () => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibGVzc2x5LXBvaW50IiwiYSI6ImNtY2t1dnBjdzA0bTkyanM5dGR6dXNreWIifQ.I5B2ArmwFSL2sZL9LScB_g';

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/lessly-point/cmckve3t3000b01sh2fc5bf2j',
        center: [16.39876, 48.250417],
        zoom: 12
    });

  // Add a marker
    new mapboxgl.Marker()
        .setLngLat([16.39876, 48.250417])
        .setPopup(new mapboxgl.Popup().setText("Our Wedding Venue!"))
        .addTo(map);

    new mapboxgl.Marker({ color: 'red', draggable: false })
        .setLngLat([16.39876, 48.250417]) // [longitude, latitude]
        .addTo(map);
});
