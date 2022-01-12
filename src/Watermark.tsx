import { observerDom, createWaterMark } from './utils'

export type WatermarkProps = {
  width?: number
  height?: number
  fontSize?: number
  fillStyle?: string
  content?: string
  rotate?: number
}

export function Watermark(watermarkProps: WatermarkProps) {
  const backgroundImage = `url("${createWaterMark(watermarkProps)}")`
  const style = {
    position: 'fixed',
    top: '0px',
    bottom: '0px',
    left: '0px',
    right: '0px',
    'pointer-events': 'none',
    'background-repeat': 'repeat',
    'background-image': backgroundImage,
    'z-index': 99999,
  }

  const useContainerDom = (dom: HTMLElement) => {
    observerDom(dom, (watermarkNode) => {
      const effectStyleMap = {
        position: 'fixed',
        top: '0px',
        bottom: '0px',
        left: '0px',
        right: '0px',
        'background-repeat': 'repeat',
        'background-image': backgroundImage,
        display: 'block',
        visibility: 'visible',
        margin: '0px',
        opacity: '1',
        'z-index': '99999',
      }
      const watermarkNodeStyle = window.getComputedStyle(watermarkNode, null)

      Object.keys(effectStyleMap).forEach((k) => {
        const computedValue = watermarkNodeStyle.getPropertyValue(k)
        if (computedValue && computedValue !== effectStyleMap[k]) {
          watermarkNode.style.setProperty(k, effectStyleMap[k], 'important')
        }
      })
    })
  }

  return <div style={style} useDom={useContainerDom}></div>
}
