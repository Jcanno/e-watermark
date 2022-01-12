import { WatermarkProps } from './Watermark'

export function observerDom(watermarkNode: HTMLElement, cb: (node: HTMLElement) => void) {
  if (!watermarkNode) {
    return
  }
  const config = { attributes: true, childList: true, subtree: true }
  const targetNode = watermarkNode.parentNode || document.body

  const observer = new MutationObserver((mutationsList) => {
    if (typeof cb === 'function') {
      cb(watermarkNode)
    }

    for (const mutation of mutationsList) {
      mutation.removedNodes.forEach((item) => {
        if (item === watermarkNode) {
          targetNode.appendChild(watermarkNode)
        }
      })
    }
  })
  observer.observe(targetNode, config)
}

export function createWaterMark(watermarkOption: WatermarkProps) {
  const {
    width = 120,
    height = 80,
    fontSize = 10,
    fillStyle = 'rgba(184, 184, 184, 0.1)',
    content = 'WATERMARK',
    rotate = -20,
  } = watermarkOption
  const dpr = window.devicePixelRatio || 1
  const canvas = document.createElement('canvas')
  canvas.width = Math.floor(width * dpr)
  canvas.height = Math.floor(height * dpr)
  const x = width / 2
  const y = height / 2
  canvas.style.width = width + 'px'
  canvas.style.height = height + 'px'
  const ctx = canvas.getContext('2d')
  ctx.scale(dpr, dpr)
  ctx.translate(x, y)
  ctx.fillStyle = fillStyle
  ctx.rotate((Math.PI / 180) * rotate)
  ctx.font = `${fontSize}px Arial`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.translate(-x, -y)
  ctx.fillText(content, x, y)

  return canvas.toDataURL()
}
