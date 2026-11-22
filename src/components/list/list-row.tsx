import { useId } from 'react'
import deleteOne from '@/assets/lists/delete-one.svg'
import deleteTwo from '@/assets/lists/delete-two.svg'
import more from '@/assets/lists/more.svg'
import moreActive from '@/assets/lists/more-active.svg'
import radioUnchecked from '@/assets/lists/radio-unchecked.svg'
import radioChecked from '@/assets/lists/radio-checked.svg'
import radioUncheckedTwo from '@/assets/lists/radio-unchecked-two.svg'
import radioCheckedTwo from '@/assets/lists/radio-checked-two.svg'
import { Dropdown } from '@/components/dropdown'
import type { ListItem } from '.'

const frequencies = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
] as const

type ListRowProps = {
  item: ListItem
  disabled: boolean
  onFrequencyChange: (frequency: ListItem['frequency']) => void
  onDelete: () => void
  onShare?: () => void
}

export function ListRow({ item, disabled, onFrequencyChange, onDelete, onShare }: ListRowProps) {
  const titleId = useId()
  const uncheckedIcon = onShare ? radioUncheckedTwo : radioUnchecked
  const checkedIcon = onShare ? radioCheckedTwo : radioChecked

  return (
    <li className="list-row">
      <span className="list-row-title" id={titleId} title={item.title}>{item.title}</span>
      <div className="list-row-controls">
        <div className="list-frequency" role="group" aria-labelledby={titleId}>
          {frequencies.map(({ value, label }) => {
            const selected = item.frequency === value

            return (
              <label key={value}>
                <input
                  className="visually-hidden"
                  type="radio"
                  name={`${titleId}-frequency`}
                  checked={selected}
                  disabled={disabled}
                  onChange={() => onFrequencyChange(value)}
                />
                <img src={selected ? checkedIcon : uncheckedIcon} width="16" height="16" alt="" />
                {label}
              </label>
            )
          })}
        </div>

        {onShare && (
          <Dropdown
            label={`More actions for ${item.title}`}
            className="list-menu"
            disabled={disabled}
            renderIcon={(open) => <img src={open ? moreActive : more} width="16" height="16" alt="" />}
          >
            <button type="button" onClick={onShare}>Share</button>
            <button type="button" disabled>Edit</button>
          </Dropdown>
        )}

        <button
          className="list-delete"
          type="button"
          aria-label={`Delete ${item.title}`}
          disabled={disabled}
          onClick={onDelete}
        >
          <img src={onShare ? deleteTwo : deleteOne} width="16" height="16" alt="" />
        </button>
      </div>
    </li>
  )
}
