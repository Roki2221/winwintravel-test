import type { FilterItem } from '@/shared/api/types/Filter'
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'

type FilterSectionProps = {
	filterItem: FilterItem
	selectedOptionIds: string[]
	onToggleOption: (optionId: string, checked: boolean) => void
}
export const FilterSection = ({
	filterItem,
	selectedOptionIds,
	onToggleOption
}: FilterSectionProps) => {
	return (
		<section className="py-6 border-b border-gray-200">
			<h2 className="text-sm font-semibold text-gray-800 mb-3">
				{filterItem.name}
			</h2>
			{filterItem.description ? (
				<p className="text-xs text-gray-500 mb-4">{filterItem.description}</p>
			) : null}

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
				{filterItem.options.map(option => (
					<Checkbox
						key={option.id}
						label={option.name}
						checked={selectedOptionIds.includes(option.id)}
						onChange={checked => onToggleOption(option.id, checked)}
					/>
				))}
			</div>
		</section>
	)
}
