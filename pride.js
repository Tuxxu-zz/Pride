const pridePixelsArray = []
let prideWidth = 40
let prideHeight = 40
let debug = false
const prideColorsPalette = [
{"r":255,"g":255,"b":255},
{"r":254,"g":198,"b":198},
{"r":254,"g":163,"b":163},
{"r":254,"g":112,"b":112},
{"r":254,"g":57,"b":57},
{"r":254,"g":24,"b":24},
{"r":254,"g":16,"b":0},
{"r":254,"g":39,"b":0},
{"r":254,"g":65,"b":0},
{"r":254,"g":91,"b":0},
{"r":255,"g":122,"b":0},
{"r":255,"g":144,"b":0},
{"r":255,"g":169,"b":0},
{"r":255,"g":188,"b":0},
{"r":255,"g":206,"b":0},
{"r":255,"g":223,"b":0},
{"r":255,"g":243,"b":0},
{"r":239,"g":249,"b":0},
{"r":185,"g":226,"b":0},
{"r":143,"g":210,"b":1},
{"r":94,"g":190,"b":1},
{"r":47,"g":171,"b":1},
{"r":1,"g":152,"b":2},
{"r":0,"g":130,"b":39},
{"r":0,"g":105,"b":80},
{"r":0,"g":81,"b":120},
{"r":0,"g":50,"b":711},
{"r":0,"g":24,"b":214},
{"r":0,"g":0,"b":253},
{"r":28,"g":0,"b":235},
{"r":50,"g":0,"b":220},
{"r":73,"g":0,"b":205},
{"r":97,"g":0,"b":189},
{"r":119,"g":0,"b":175},
{"r":152,"g":0,"b":153},
{"r":151,"g":0,"b":153},
{"r":150,"g":0,"b":153}]


function start() {
  createprideDataStructure()
  createprideSource()
  setInterval(calculatepridePropagation, 60)
}

function createprideDataStructure() {
  const numberOfPixels = prideWidth * prideHeight
  for (let i = 0; i < numberOfPixels; i++) {
    pridePixelsArray[i] = 0
  }
}

function calculatepridePropagation() {
  for (let column = 0; column < prideWidth; column++) {
    for (let row = 0; row < prideHeight; row++) {
      const pixelIndex = column + ( prideWidth * row )

      updateprideIntensityPerPixel(pixelIndex)
    }
  }

  renderpride()
}

function updateprideIntensityPerPixel(currentPixelIndex) {
  const belowPixelIndex = currentPixelIndex + prideWidth
  if (belowPixelIndex >= prideWidth * prideHeight) {
    return
  }

  const decay = Math.floor(Math.random() * 3)
  const belowPixelprideIntensity = pridePixelsArray[belowPixelIndex]
  const newprideIntensity =
    belowPixelprideIntensity - decay >= 0 ? belowPixelprideIntensity - decay : 0
    pridePixelsArray[currentPixelIndex - decay] = newprideIntensity
}

function renderpride() {
  let html = '<table cellpadding=0 cellspacing=0>'
  for (let row = 0; row < prideHeight; row++) {
    html += '<tr>'
    for (let column = 0; column < prideWidth; column++) {
      const pixelIndex = column + ( prideWidth * row )
      const prideIntensity = pridePixelsArray[pixelIndex]
      const color = prideColorsPalette[prideIntensity]
      const colorString = `${color.r},${color.g},${color.b}`
      if (debug === true) {
        html += '<td>'
        html += `<div class="pixel-index">${pixelIndex}</div>`
        html += `<div style="color: rgb(${colorString})">${prideIntensity}</div>`
        html += '</td>'
      } else {
        html += `<td class="pixel" style="background-color: rgb(${colorString})">`
        html += '</td>'
      }
    }
    html += '</tr>'
  }
  html += '</table class="prideTable">'
  document.querySelector('#prideCanvas').innerHTML = html
}
function createprideSource() {
  for (let column = 0; column <= prideWidth; column++) {
    const overflowPixelIndex = prideWidth * prideHeight
    const pixelIndex = (overflowPixelIndex - prideWidth) + column
    pridePixelsArray[pixelIndex] = 35
  }
}
function toggleDebugMode() {
  if (debug === false) {
    debug = true
  } else {
    debug = false
  }
  createprideDataStructure()
  createprideSource()
}
start()
