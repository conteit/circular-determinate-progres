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
        inc = 0.001;
      } else if (value >= 1) {
        inc = -0.001;
      }
      value += inc;
      setP({value});
      setTimeout(update, 50)
    }
    update();
  }, []);
  return <CircularDeterminateProgress percentage={p.value} strokeSize={10} 
      renderText={ p => 
        <span className="spinner__label">{ (p * 100).toFixed(0) }<span>%</span></span>
      } />
}

export default App
