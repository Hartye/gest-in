// Components
import { useState } from 'react'
import { Canvas } from './components/Canvas'
import { SideControllers } from './components/SideControllers'

// Styles
import './styles/App.css'

const App = () => {
  const [info, setInfo] = useState(Array<infoType>);

  const changeInfo = (data: Array<infoType>): void => {
    setInfo(data);
  }

  return (
    <main>
      <aside>
        <SideControllers changeInfo={changeInfo} />
      </aside>
      <section>
        <Canvas info={info} />
      </section>
    </main>
  )
}

type infoType = {
  type: string;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  weekDay: number;
}

export default App
