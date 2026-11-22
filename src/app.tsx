import { Header } from '@/components/header'
import { List } from '@/components/list'
import { listOneItems, listTwoItems } from '@/list-data'

function App() {
  return (
    <>
      <Header />
      <main className="main-content">
        <h1 className="visually-hidden">List settings</h1>
        <List title="List one" initialItems={listOneItems} />
        <List title="List two" initialItems={listTwoItems} showMoreActions />
      </main>
    </>
  )
}

export default App
