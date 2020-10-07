mapboxgl.accessToken = 'pk.eyJ1IjoibWFsaWNlbGViaSIsImEiOiJja2E1NWpnMXowMmhpM2ZxdGZ1eG1oejJ1In0.ycttd6WN0G--jIdWTZJI8w';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v9',
  center: post.coordinates,
  zoom: 5
});
// add markers to map
// create a HTML element for our post location/marker
var el = document.createElement('div');
el.className = 'marker';
// make a marker for our location and add to the map
new mapboxgl.Marker(el)
  .setLngLat(post.coordinates)
  .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    .setHTML('<h3>' + post.title + '</h3><p>' + post.location + '</p>'))
  .addTo(map);

//toggle edit review form
$('.toggle-edit-form').on('click', function () {
  $(this).text() === 'Edit' ? $(this).text('Cancel') : $(this).text('Edit')
  $(this).siblings('.edit-review-form').toggle();

})

//add click listener clear rating  from edit/new form
$('.clear-rating').click(function () {
  $(this).siblings('.input-no-rate').click()
})


