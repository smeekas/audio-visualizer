import React from 'react'
import classes from './visualizer.module.css'
type visualizerPropType = {
  audioData: number[]
}
function Visualizer({ audioData }: visualizerPropType) {
  // console.log(audioData)
  return (
    <div className={classes.visualizer}>
      <div className={classes.visualBox}>
        {audioData.map((item, index) => {
          const NewValue = (((item - 0) * 100) / 250) + 0
          return <div key={index} style={{ height: `${item}%` }} className={classes.bar}>
          </div>
        })}
      </div>

    </div>
  )
}

export default Visualizer;