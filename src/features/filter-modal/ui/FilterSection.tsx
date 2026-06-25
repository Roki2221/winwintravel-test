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
		<section>
			<div>
				{filterItem.options.map(option => (
					<div key={option.id}>
						<h2>{option.name}</h2>
						<Checkbox
							label={option.name}
							checked={selectedOptionIds.includes(option.id)}
							onChange={checked => onToggleOption(option.id, checked)}
						/>
					</div>
				))}
			</div>
		</section>
	)
}
