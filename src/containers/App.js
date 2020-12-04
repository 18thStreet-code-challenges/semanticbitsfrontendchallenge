import React, { useState, useEffect } from 'react'
import './App.css'

function App () {
  const [data, setData] = useState(null)

  useEffect(() => {
    console.log('page load useEffect')
    fetch('/heroes')
      .then(data => data.json())
      .then(json => setData(json))
  }, [])
  if (data) {
    return data.heroes.map((hero, i) => {
      return <div key={`hero${i}`}>
        {JSON.stringify(hero)}
      </div>
    })
  } else {
    return <div>...loading</div>
  }
}

export default App
