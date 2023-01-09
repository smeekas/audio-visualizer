import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Visualizer from './components/visualizer/Visualizer'

function App() {
  const [count, setCount] = useState(0)
  const [audio, setAudio] = useState<number[]>([])
  useEffect(() => {
    async function getMicrophone() {
      const micro = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      const context = new AudioContext();
      const analyzer = context.createAnalyser()
      analyzer.fftSize = 256;
      // const array = new Uint8Array(analyzer.frequencyBinCount)
      const source = context.createMediaStreamSource(micro)
      source.connect(analyzer)
      context.createBufferSource();


      analyzer.connect(context.destination)
      setInterval(() => {
        var array = new Uint8Array(analyzer.frequencyBinCount);
        let count = 0;
        analyzer.getByteFrequencyData(array);
      
        for (let i = 0; i < array.length; i++) {
          count += array[i];

        }
        // console.log(array)
        // setAudio(intArr)
        // console.log(count);
        setAudio(prev => {
          // if (prev.length > 100) {
          //   prev.shift()
          // }
          const newArr = [...prev]
          if (newArr.length > +(window.innerWidth / 10).toFixed(0)) {
            newArr.shift()
          }
          newArr.push(+((count / array.length).toFixed()))
          return newArr
        })
        // console.log();
        // console.log(+((count / array.length).toFixed()))
        // console.log(array);
      }, 32)
      // console.log(source)
    }
    getMicrophone()
  }, [])
  // console.log(audio);
  return (
    <div className="App">
      <Visualizer audioData={audio} />
    </div>
  )
}

export default App
