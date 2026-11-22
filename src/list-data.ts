import type { ListItem } from '@/components/list'

function createItems(listId: string, titles: string[]): ListItem[] {
  return titles.map((title, index) => ({
    id: `${listId}-${index + 1}`,
    title,
    frequency: 'monthly',
  }))
}

export const listOneItems = createItems('one', [
  'content list one',
  'content list  two',
  'content list three',
  'content list four',
])

export const listTwoItems = createItems('two', Array<string>(4).fill('content list one'))
