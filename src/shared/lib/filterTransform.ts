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

const normalizeSelectionMap = (map: SelectionMap): SelectionMap => {
	return Object.fromEntries(
		Object.entries(map)
			.map(([id, optionIds]) => [id, [...optionIds].sort()])
			.filter(([, optionIds]) => optionIds.length > 0)
	)
}

export const areSelectionsEqual = (
	left: SelectionMap,
	right: SelectionMap
): boolean => {
	const normalizedLeft = normalizeSelectionMap(left)
	const normalizedRight = normalizeSelectionMap(right)
	const leftKeys = Object.keys(normalizedLeft).sort()
	const rightKeys = Object.keys(normalizedRight).sort()

	if (leftKeys.length !== rightKeys.length) {
		return false
	}

	return leftKeys.every((key, index) => {
		if (key !== rightKeys[index]) {
			return false
		}

		const leftOptionIds = normalizedLeft[key]
		const rightOptionIds = normalizedRight[key]

		return (
			leftOptionIds.length === rightOptionIds.length &&
			leftOptionIds.every(
				(optionId, optionIndex) => optionId === rightOptionIds[optionIndex]
			)
		)
	})
}
