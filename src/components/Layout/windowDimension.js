import {useState, useEffect } from "react"
// import elementResizeDetectorMaker from "element-resize-detector"

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  //const headerHeight = document.getElementById('header').clientHeight
  
  
  //var detector = elementResizeDetectorMaker({
  //  debug: true,
  //  strategy: "scroll"
  //});
  
  //var headerElement = document.getElementById('header');
  //detector.listenTo(headerElement, function(element) {
  //  var width = element.offsetWidth;
  //  var height = element.offsetHeight;
  //  console.log("Size: " + width + "x" + height);
  //});
  
  //console.log(width)
  //console.log(height)
  //console.log(headerHeight)
  
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  console.log("windows changed", windowDimensions)
  return windowDimensions;
}