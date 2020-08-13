import {Component} from "react";
import React from "react";

const GRAPH_HEIGHT = 29
const GRAPH_WIDTH = 70
class FPSStats extends Component {
  static propTypes = {
    top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    left: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }

  static defaultProps = {
    top: 0,
    left: 0,
    bottom: 'auto',
    right: 'auto'
  }

  constructor (props) {
    super(props)
    const currentTime = +new Date()
    this.state = {
      frames: 0,
      startTime: currentTime,
      prevTime: currentTime,
      fps: []
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return this.state.fps !== nextState.fps || this.props !== nextProps
  }

  componentDidMount () {
    const onRequestAnimationFrame = () => {
      this.calcFPS()
      this.afRequest = window.requestAnimationFrame(onRequestAnimationFrame)
    }
    this.afRequest = window.requestAnimationFrame(onRequestAnimationFrame)
  }

  componentWillUnmount () {
    window.cancelAnimationFrame(this.afRequest)
  }

  calcFPS () {
    const currentTime = +new Date()
    this.setState(state => ({
      frames: state.frames + 1
    }))
    if (currentTime > this.state.prevTime + 1000) {
      let fps = Math.round(
        (this.state.frames * 1000) / (currentTime - this.state.prevTime)
      )
      fps = this.state.fps.concat(fps)
      let sliceStart = Math.min(fps.length - GRAPH_WIDTH, 0)
      fps = fps.slice(sliceStart, fps.length)
      this.setState({
        fps: fps,
        frames: 0,
        prevTime: currentTime
      })
    }
  }

  render () {
    const { top, right, bottom, left } = this.props
    const { fps } = this.state
    const wrapperStyle = {
      zIndex: 999999,
      position: 'fixed',
      height: '46px',
      width: GRAPH_WIDTH + 6 + 'px',
      padding: '3px',
      backgroundColor: '#000',
      color: '#00ffff',
      fontSize: '9px',
      lineHeight: '10px',
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontWeight: 'bold',
      MozBoxSizing: 'border-box',
      boxSizing: 'border-box',
      pointerEvents: 'none',
      top,
      right,
      bottom,
      left
    }
    const graphStyle = {
      position: 'absolute',
      left: '3px',
      right: '3px',
      bottom: '3px',
      height: GRAPH_HEIGHT + 'px',
      backgroundColor: '#282844',
      MozBoxSizing: 'border-box',
      boxSizing: 'border-box'
    }
    const barStyle = (height, i) => ({
      position: 'absolute',
      bottom: '0',
      right: fps.length - 1 - i + 'px',
      height: height + 'px',
      width: '1px',
      backgroundColor: '#00ffff',
      MozBoxSizing: 'border-box',
      boxSizing: 'border-box'
    })
    const maxFps = Math.max.apply(Math.max, fps)
    return (
      <div style={wrapperStyle}>
        <span>{fps[fps.length - 1]} FPS</span>
        <div style={graphStyle}>
          {fps.map((fps, i) => {
            const height = (GRAPH_HEIGHT * fps) / maxFps
            return <div key={`fps-${i}`} style={barStyle(height, i)} />
          })}
        </div>
      </div>
    )
  }
}
