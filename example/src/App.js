import React from 'react'

import { CircularDeterminateProgress } from 'circular-determinate-progress'
import 'circular-determinate-progress/dist/index.css'

const App = () => {
  return <CircularDeterminateProgress percentage={0.9} strokeSize={10} rotating={true} />
}

export default App
