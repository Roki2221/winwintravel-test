import { create } from 'zustand'

import type { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'

interface FilterStore {
	savedFilter: SearchRequestFilter
	setSavedFilter: (filter: SearchRequestFilter) => void
	clearSavedFilter: () => void
}

export const useFilterStore = create<FilterStore>(set => ({
	savedFilter: [],
	setSavedFilter: filter => set({ savedFilter: filter }),
	clearSavedFilter: () => set({ savedFilter: [] })
}))
