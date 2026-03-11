import { useLayoutEffect, useRef, useState, useCallback } from 'react';
import Chips from '../../../shared/ui/Chips';
import styles from './chip-list.module.css';

export interface ChipItem {
  id: string | number;
  label: string;
}

interface ChipListProps {
  items: ChipItem[];
  activeId?: string | number;
  onSelect?: (item: ChipItem) => void;
  width?: string;
  className?: string;
}

export default function ChipList({
  items,
  activeId,
  onSelect,
  width = '100%',
  className = '',
}: ChipListProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureMoreRef = useRef<HTMLButtonElement | null>(null);
  const measureRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [visibleChips, setVisibleChips] = useState(items.length);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const updateVisible = useCallback(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const moreWidth = measureMoreRef.current?.offsetWidth ?? 0;
    const GAP = 8;

    let used = 0;
    let count = 0;

    for (let i = 0; i < items.length; i++) {
      const chip = measureRefs.current[i];
      if (!chip) continue;

      const remainingChips = items.length - i - 1;
      const extraWidth = remainingChips > 0 ? (count > 0 ? GAP : 0) + moreWidth : 0;
      const gapBefore = count > 0 ? GAP : 0;

      if (used + gapBefore + chip.offsetWidth + extraWidth > containerWidth) break;

      used += gapBefore + chip.offsetWidth;
      count++;
    }

    setVisibleChips(Math.max(count, 1));
  }, [items.length]);

  useLayoutEffect(() => {
    const raf = requestAnimationFrame(updateVisible);
    const observer = new ResizeObserver(updateVisible);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [updateVisible]);

  const visibleList = items.slice(0, visibleChips);
  const overflowList = items.slice(visibleChips);

  const handleSelect = (item: ChipItem) => {
    onSelect?.(item);
    setDropdownOpen(false);
  };

  return (
    <>
      <div ref={containerRef} className={`${styles.container} ${className}`} style={{ width }}>
        {visibleList.map((chip) => (
          <Chips key={chip.id} active={chip.id === activeId} onClick={() => handleSelect(chip)}>
            {chip.label}
          </Chips>
        ))}

        {overflowList.length > 0 && (
          <div className={styles.moreWrapper}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className='chips'
              aria-expanded={dropdownOpen}
              aria-haspopup='true'
            >
              ...
            </button>
            {dropdownOpen && (
              <div className={styles.dropdown} role='menu'>
                {overflowList.map((chip) => (
                  <Chips
                    key={chip.id}
                    active={chip.id === activeId}
                    onClick={() => handleSelect(chip)}
                  >
                    {chip.label}
                  </Chips>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className={styles.measureContainer} aria-hidden='true'>
        <div className={styles.measureInner}>
          {items.map((chip, i) => (
            <Chips
              key={`measure-${chip.id}`}
              ref={(el) => {
                measureRefs.current[i] = el;
              }}
            >
              {chip.label}
            </Chips>
          ))}
          <button ref={measureMoreRef} className='chips'>
            ...
          </button>
        </div>
      </div>
    </>
  );
}
