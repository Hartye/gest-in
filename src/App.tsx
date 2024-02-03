// Components
import { Canvas } from './components/Canvas'
import { SideControllers } from './components/SideControllers'

// Styles
import './styles/App.css'

function App() {
  return (
    <main>
      <aside>
        <SideControllers />
      </aside>
      <section>
        <Canvas />
      </section>
    </main>
  )
}

export default App
