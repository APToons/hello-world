import SlotMachine from './SlotMachine';

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
