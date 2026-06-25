import { UseQueryResult, useQuery } from '@tanstack/react-query'

import { getFilters } from '@/shared/api/filterApi'
import type { FilterItem } from '@/shared/api/types/Filter'

const useFilterItems = (): UseQueryResult<FilterItem[]> => {
	return useQuery({
		queryKey: ['filters'],
		queryFn: getFilters
	})
}

export default useFilterItems
