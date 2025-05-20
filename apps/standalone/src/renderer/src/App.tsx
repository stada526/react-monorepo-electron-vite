import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'
import { Products } from '@react-monorepo/products'
import { useState } from 'react'

function App(): React.JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const [filePath, setFilePath] = useState<string | null>(null)
  const [content, setContent] = useState('')

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
        &nbsp;and <span className="ts">TypeScript</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
            Send IPC
          </a>
        </div>
      </div>
      <Versions></Versions>
      <Products />
      <input type="file" onChange={(e) => {
        if (!e.target.files) {
          return
        }
        const file = e.target.files[0]
        setFilePath(file.path)
      }} />
      {filePath && <div>{filePath}</div>}
      <button onClick={async () => {
        const { data } = await window.electron.ipcRenderer.invoke("open-file", filePath)
        console.log(data)
        setContent(data)
      }}>Load file</button>
      {content && <div>{content}</div>}
    </>
  )
}

export default App
