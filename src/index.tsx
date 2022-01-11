import { Watermark as WatermarkCom } from './Watermark'
import { render } from 'use-jsx'

export function Watermark(props) {
  render(<WatermarkCom {...props} />, document.body)
}
