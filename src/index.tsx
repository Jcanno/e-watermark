import { Watermark, WatermarkProps } from './Watermark'
import { render } from 'use-jsx'

export function watermark(props: WatermarkProps) {
  render(<Watermark {...props} />, document.body)
}
