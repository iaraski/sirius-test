import { fakeChips } from '../../../shared/api/getChipsFake';
import Chips from '../../../shared/ui/Chips';
export default function ChipList() {
  return (
    <div className='chip-list'>
      {fakeChips.map((chip) => (
        <Chips key={chip.id}>{chip.label}</Chips>
      ))}
    </div>
  );
}
