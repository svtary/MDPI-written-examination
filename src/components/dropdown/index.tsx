import { useEffect, useId, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import './styles.css'

type DropdownProps = {
  label: string
  className: string
  disabled?: boolean
  renderIcon: (open: boolean) => ReactNode
  children: ReactNode
}

export function Dropdown({ label, className, disabled, renderIcon, children }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()
  const expanded = open && !disabled

  useEffect(() => {
    if (!expanded) return

    function dismissOutside(event: PointerEvent) {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('pointerdown', dismissOutside)
    return () => document.removeEventListener('pointerdown', dismissOutside)
  }, [expanded])

  function closeAndFocusTrigger() {
    setOpen(false)
    triggerRef.current?.focus()
  }

  return (
    <div
      className={`dropdown ${className}`}
      ref={rootRef}
      onBlur={(event) => {
        if (expanded && !event.currentTarget.contains(event.relatedTarget)) setOpen(false)
      }}
      onKeyDown={(event) => {
        if (expanded && event.key === 'Escape') {
          event.stopPropagation()
          closeAndFocusTrigger()
        }
      }}
    >
      <button
        className="dropdown-trigger"
        ref={triggerRef}
        type="button"
        aria-label={label}
        aria-expanded={expanded}
        aria-controls={panelId}
        disabled={disabled}
        onClick={() => setOpen(!expanded)}
      >
        {renderIcon(expanded)}
      </button>
      <div
        className="dropdown-panel"
        id={panelId}
        hidden={!expanded}
        onClick={(event) => {
          if (event.target instanceof Element && event.target.closest('button, a')) {
            closeAndFocusTrigger()
          }
        }}
      >
        {expanded && children}
      </div>
    </div>
  )
}
