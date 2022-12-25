import React, { useEffect, useState, useRef } from "react"
import scrollama from "scrollama"
import mapboxgl from "!mapbox-gl" // eslint-disable-line
import "./mapbox-gl.css"
import "./mapstory.css"

function Mapstory({ stuff }) {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY || "pk.eyJ1Ijoiam9uY29kZWQiLCJhIjoiY2tlN3g0eHRhMXJnbTJ2cDg1dnFmdGtlciJ9.LmG4I8KmIzqedp-5SYR3wQ"

  const mapContainer = useRef(null)
  const map = useRef(null)
  
  const data = stuff
  const { metadata } = data
  const chapters = metadata.data
  

  const config = {
    style: "mapbox://styles/mapbox/streets-v11",
    markerColor: "#DC1E35",
    theme: "dark",
    showMarkers: true,
    use3dTerrain: false
  }

  const [lng] = useState(chapters[0].longitude)
  const [lat] = useState(chapters[0].latitude)
  const [zoom] = useState(chapters[0].zoom)

  useEffect(() => {
    let marker
    const scroller = scrollama()
    const transformRequest = url => {
      const hasQuery = url.indexOf("?") !== -1
      const suffix = hasQuery ? "&pluginName=scrollytellingV2" : "?pluginName=scrollytellingV2"
      return {
        url: url + suffix
      }
    }

    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
      bearing: chapters[0].bearing,
      pitch: chapters[0].pitch,
      interactive: true,
      transformRequest: transformRequest
    })

    const layerTypes = {
      fill: ["fill-opacity"],
      line: ["line-opacity"],
      circle: ["circle-opacity", "circle-stroke-opacity"],
      symbol: ["icon-opacity", "text-opacity"],
      raster: ["raster-opacity"],
      "fill-extrusion": ["fill-extrusion-opacity"],
      heatmap: ["heatmap-opacity"]
    }

    function setLayerOpacity(layer) {
      const paintProps = getLayerPaintType(layer.layer)
      paintProps.forEach(function (prop) {
        let options = {}
        if (layer.duration) {
          const transitionProp = prop + "-transition"
          options = { duration: layer.duration }
          map.current.setPaintProperty(layer.layer, transitionProp, options)
        }
        map.current.setPaintProperty(layer.layer, prop, layer.opacity, options)
      })
    }

    function getLayerPaintType(layer) {
      const layerType = map.current.getLayer(layer).type
      return layerTypes[layerType]
    }

    if (config.showMarkers) {
      marker = new mapboxgl.Marker({ color: config.markerColor })
      marker.setLngLat([chapters[0].longitude, chapters[0].latitude]).addTo(map.current)
    }

    if (config.use3dTerrain) {
      map.current.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 17
      })
      // add the DEM source as a terrain layer with exaggerated height
      map.current.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 })

      // add a sky layer that will show when the map is highly pitched
      map.current.addLayer({
        id: "sky",
        type: "sky",
        paint: {
          "sky-type": "atmosphere",
          "sky-atmosphere-sun": [0.0, 2.0],
          "sky-atmosphere-sun-intensity": 5
        }
      })
    }

    // setup the instance, pass callback functions
    scroller
      .setup({
        step: ".step",
        offset: 0.5,
        progress: true
      })
      .onStepEnter(response => {
        const chapter = chapters.find(chap => chap.id === response.element.id)
        const location = { center: [chapter.longitude, chapter.latitude], zoom: chapter.zoom, pitch: chapter.pitch, bearing: chapter.bearing }        
        response.element.classList.add("active")
        map.current["flyTo"](location)
        if (config.showMarkers) {

          marker.setLngLat(location.center)
        }
      })
      .onStepExit(response => {
        const chapter = chapters.find(chap => chap.id === response.element.id)
        response.element.classList.remove("active")
        if (chapter.onChapterExit) {
          chapter.onChapterExit.forEach(setLayerOpacity)
        }
      })

    /* resize event */
    window.addEventListener("resize", scroller.resize)
  })

  return (
        
    <div className="mapstory" >      
      
      <div ref={mapContainer} className="map-container"></div>
      <div id="story" >          
        <div id="map-title" className="w-screen-lg w-full fixed bg-white dark:bg-gray-800 px-8 py-3 shadow-lg" style={{"zIndex":"200"}}>
          <h2 className="max-w-screen-lg mx-auto pl-2">
            {stuff.title}
            {stuff.metadata.summary && (
              <small className="text-xs ml-2 mb-0">{stuff.metadata.summary}</small>
            )}
          </h2>
        </div>
        <div id="features">        
          {chapters &&
            chapters.map((record, id) => {
              console.log(record)
              const active = id === 0 ? "active" : ""
              const hidden = record.hidden ? "hidden" : ""
              const luminosity = config.theme ? "dark" : "light"              
              const { alignment, latitude, longitude } = record
              return (
                <div key={record.id} id={record.id} className={`step ${hidden} ${active} ${alignment.value}`}>
                  <div className={luminosity}>
                    {record.title && <h2>{record.title}</h2>}
                    {record.date && <p>{record.date}</p>}
                    {record.locale && (
                      <p>
                        <span role="img" aria-label="location: ">
                          📍
                        </span>{" "}
                        {record.locale} ({latitude}, {longitude})
                      </p>
                    )}
                    {record.image && <img src={record.image.url} alt="" />}
                    {record.youtube && <iframe width="100%" height="200" src={`https://www.youtube.com/embed/${record.youtube}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>}
                    {record.description && <p>{record.description}</p>}
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>      
  
  )
}

export default Mapstory
