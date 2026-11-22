import { useId, useRef, useState } from 'react'
import switchOn from '@/assets/lists/switch-on.svg'
import { ListRow } from './list-row'
import './styles.css'

export type ListItem = {
  id: string
  title: string
  frequency: 'weekly' | 'monthly'
}

type ListProps = {
  title: string
  initialItems: readonly ListItem[]
  showMoreActions?: boolean
}

export function List({ title, initialItems, showMoreActions = false }: ListProps) {
  const [items, setItems] = useState(initialItems)
  const [enabled, setEnabled] = useState(true)
  const [message, setMessage] = useState('')
  const switchRef = useRef<HTMLButtonElement>(null)
  const headingId = useId()

  function updateFrequency(id: string, frequency: ListItem['frequency']) {
    setItems((current) => current.map((item) => item.id === id ? { ...item, frequency } : item))
  }

  function removeItem(id: string) {
    setItems((current) => current.filter((item) => item.id !== id))
    switchRef.current?.focus()
  }

  async function shareItem(item: ListItem) {
    const frequency = item.frequency === 'weekly' ? 'Weekly' : 'Monthly'

    try {
      await navigator.clipboard.writeText(`${item.title} (${frequency})`)
      setMessage('Item details copied.')
    } catch {
      setMessage('Could not copy item details.')
    }
  }

  return (
    <section className="list" aria-labelledby={headingId}>
      <header className="list-header">
        <h2 id={headingId}>{title}</h2>
        <button
          className="list-switch"
          type="button"
          role="switch"
          aria-checked={enabled}
          aria-labelledby={headingId}
          ref={switchRef}
          onClick={() => setEnabled((current) => !current)}
        >
          {enabled ? <img src={switchOn} width="40" height="20" alt="" /> : <span aria-hidden="true" />}
        </button>
      </header>

      {items.length > 0 ? (
        <ul className="list-rows" aria-labelledby={headingId}>
          {items.map((item) => (
            <ListRow
              key={item.id}
              item={item}
              disabled={!enabled}
              onFrequencyChange={(frequency) => updateFrequency(item.id, frequency)}
              onDelete={() => removeItem(item.id)}
              onShare={showMoreActions ? () => shareItem(item) : undefined}
            />
          ))}
        </ul>
      ) : <p className="list-empty">No items.</p>}

      <p className="list-feedback" role="status">{message}</p>
    </section>
  )
}
