import React, {useState, useEffect} from 'react'

import { CircularDeterminateProgress } from 'circular-determinate-progress'
import 'circular-determinate-progress/dist/index.css'

const App = () => {
  const [ p, setP ] = useState({value: 0.0});
  useEffect(() => {
    let value = 0;
    let inc = 0.01;
    function update() {
      if (value <= 0) {
        inc = 0.01;
      } else if (value >= 1) {
        inc = -0.01;
      }
      value += inc;
      setP({value});
      setTimeout(update, 100)
    }
    update();
  }, []);
  return <CircularDeterminateProgress percentage={p.value} strokeSize={10} rotating={true} />
}

export default App
