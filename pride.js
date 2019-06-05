const pridePixelArray = []
const prideWidth = 10
const prideHeight = 10
const prideColorPalete = []

function start() {
  createPrideDataStructure()
  createPrideSource()
  renderPride()

  setInterval(calculatePridePropagation, 1000)
}
function createPrideDataStructure() {
  const numberOfPixel = prideWidth * prideHeight
  for (let i = 0; i < numberOfPixel; i++) {
    pridePixelArray[i] = 0
  }
}
function calculatePridePropagation(){
  for (let column = 0; column < prideWidth; column++){
    for (let row = 0; row < prideHeight; row++) {
      const pixelIndex = column + (prideWidth * row)

      updatePrideIntesityPerPixel(pixelIndex)
    }
  }

  renderPride()
}
function updatePrideIntesityPerPixel(currentPixelIndex){
  const belowPixelIndex = currentPixelIndex + prideWidth

  if (belowPixelIndex >= prideWidth * prideHeight) {
    return
  }

  const decay = 1
  const belowPixelPrideIntensity = pridePixelArray [belowPixelIndex]
  const newPrideIntensity = belowPixelPrideIntensity - decay >= 0 ? belowPixelPrideIntensity - decay : 0

  pridePixelArray[currentPixelIndex] = newPrideIntensity
}
function renderPride(){
  let html = '<table cellpadding=0 cellspace=0'

  for (let row = 0; row < prideHeight; row++) {
    html += '<tr>'

    for (let column = 0; column < prideWidth; column++) {
      const pixelIndex = column + (prideWidth * row)
      const prideIntensity = pridePixelArray[pixelIndex]
      html += '<td>'
      html += '<div class="pixel-index">'+ pixelIndex +'</div>'
      html += prideIntensity
      html += '</td>'
    }
    html += '</tr>'
  }
    html += '</table>'

    document.querySelector('#prideCanvas').innerHTML = html
}
function createPrideSource(){
  for (let column = 0; column <= prideWidth; column++){
    const overflowPixellIndex = prideWidth * prideHeight
    const pixelIndex = (overflowPixellIndex - prideWidth) + column

    pridePixelArray[pixelIndex] = 36
  }
}
start()
