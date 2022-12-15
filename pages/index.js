import SlotMachine from './SlotMachine';
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>

    <div>
      <SlotMachine
        numSlots={3}
        slotValues={['🍒', '🍊', '🍋', '🍉', '🍇']}
        spinTime={1000}
      />
    </div>

    </div>
  )
}
