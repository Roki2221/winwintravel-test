import type { FilterItem } from '@/shared/api/types/Filter'

export const getFilters = async (): Promise<FilterItem[]> => {
	const { default: data } = await import('@/shared/temp/filterData.json')

	return data.filterItems as FilterItem[]
}
