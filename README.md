# transit
live feed of CTfastrak bus locations from CTtransit, via City of Hartford GIS open data server

##Demo
http://jackdougherty.github.io/transit

##How it works
1) CTtransit publishes real-time open data feed for CTfastrak buses (with similar data for more transit buses in future)
http://www.cttransit.com/about/developers/realtimedata/

2) City of Hartford transformed this real-time data into easier-to-use formats on their [Open Data GIS server](http://gisdata.hartford.gov/datasets/453fb4c1dff74efdbdb46fadfd257e28_0)

-for the REST endpoint, see [Source](http://gis1.hartford.gov/arcgis/rest/services/CTTransitBusses/MapServer/0)

-or use Download Dataset > API

3) Display point locations by inserting the REST endpoint in map code, easily done with open-source libraries such as [Leaflet](http://leafletjs.com) and [Esri Leaflet](http://esri.github.io/esri-leaflet/)

See also:

- http://esri.github.io/esri-leaflet/examples/feature-layer-popups.html

##To do:

- pop-up currently shows source "label" (similar to vehicle ID), but source does not appear to display route number

- http://esri.github.io/esri-leaflet/examples/styling-feature-layer-points.html

- http://esri.github.io/esri-leaflet/api-reference/layers/feature-layer.html

Feedback welcome by email (jack.dougherty@trincoll.edu) or GitHub pull requests

