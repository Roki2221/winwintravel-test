import { FilterType } from '@/shared/api/types/Filter'
import type { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'

export type SelectionMap = Record<string, string[]>

export const searchRequestToSelectionMap = (
	saved: SearchRequestFilter
): SelectionMap => {
	return Object.fromEntries(saved.map(item => [item.id, item.optionsIds]))
}

export const selectionMapToSearchRequest = (
	map: SelectionMap
): SearchRequestFilter => {
	return Object.entries(map)
		.filter(([, optionIds]) => optionIds.length > 0)
		.map(([id, optionsIds]) => ({
			id,
			type: FilterType.OPTION,
			optionsIds
		}))
}
