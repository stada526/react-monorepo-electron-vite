// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { Products } from '@react-monorepo/products'

export function App() {
  return (
    <div>
      <Products />
      <input type="file" onChange={(e) => {
        if (!e.target.files) {
          return
        }
        const file = e.target.files[0]
        console.log(file)
      }} />
    </div>
  );
}

export default App;
