import { useState } from 'react';
import ChipList from '../widgets/chip-list';
import { fakeChips } from '../shared/api/getChipsFake';
import './styles/App.css';

function App() {
  const [activeId, setActiveId] = useState<string | number>(fakeChips[0].id);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <ChipList 
        items={fakeChips} 
        activeId={activeId}
        onSelect={(chip) => setActiveId(chip.id)}
        width="70vw"
      />
    </div>
  );
}

export default App;
