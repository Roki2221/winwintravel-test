import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useFilterStore } from '@/entities/filter/model/filterStore'
import useFilterItems from '@/features/filter-modal/model/useFilterItems'
import { ConfirmApplyDialog } from '@/features/filter-modal/ui/ConfirmApplyDialog'
import { FilterSection } from '@/features/filter-modal/ui/FilterSection'
import {
	type SelectionMap,
	areSelectionsEqual,
	searchRequestToSelectionMap,
	selectionMapToSearchRequest
} from '@/shared/lib/filterTransform'
import Button from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'

type FilterModalProps = {
	isOpen: boolean
	onClose: () => void
}

export const FilterModal = ({ isOpen, onClose }: FilterModalProps) => {
	const { data: filterItems, isLoading, isError } = useFilterItems()
	const { t } = useTranslation('filter')

	const savedFilter = useFilterStore(saved => saved.savedFilter)
	const setSavedFilter = useFilterStore(saved => saved.setSavedFilter)

	const initialDraft = useMemo(() => {
		return searchRequestToSelectionMap(savedFilter)
	}, [savedFilter])

	const [draft, setDraft] = useState<SelectionMap>({})
	const [isConfirmOpen, setIsConfirmOpen] = useState(false)

	useEffect(() => {
		if (!isOpen) {
			return
		}
		setDraft(initialDraft)
	}, [initialDraft, isOpen])

	const onClearAll = () => setDraft({})

	const onToggle = (filterId: string, optionId: string, checked: boolean) => {
		setDraft(prev => {
			const current = prev[filterId] ?? []
			const next = checked
				? Array.from(new Set([...current, optionId]))
				: current.filter(id => id !== optionId)
			return { ...prev, [filterId]: next }
		})
	}

	const onApply = () => {
		if (areSelectionsEqual(draft, initialDraft)) {
			onClose()
			return
		}

		setIsConfirmOpen(true)
	}

	const onUseOld = () => {
		setIsConfirmOpen(false)
		onClose()
	}

	const onApplyNew = () => {
		setSavedFilter(selectionMapToSearchRequest(draft))
		setIsConfirmOpen(false)
		onClose()
	}

	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				closeOnEscape={!isConfirmOpen}
				zIndexClassName="z-40"
				closeButtonClassName="absolute right-1 top-3"
				panelClassName="w-[min(920px,calc(100vw-32px))] h-[min(90dvh,760px)] py-10 px-8 flex flex-col text-[#31393C]"
			>
				<header className="pb-6 shrink-0 border-b border-gray-200 flex items-center justify-center relative">
					<h2 className="font-medium text-[40px] leading-12">{t('title')}</h2>
				</header>

				<div className="flex-1 overflow-auto">
					{isLoading ? <div>{t('loading')}</div> : null}
					{isError ? <div>{t('loadError')}</div> : null}
					{filterItems?.map(filterItem => (
						<FilterSection
							key={filterItem.id}
							filterItem={filterItem}
							selectedOptionIds={draft[filterItem.id] ?? []}
							onToggleOption={(optionId, checked) =>
								onToggle(filterItem.id, optionId, checked)
							}
						/>
					))}
				</div>

				<footer className="shrink-0 pt-8">
					<div className="grid grid-cols-3 items-center">
						<Button
							className="w-46 justify-self-center col-start-2 bg-[#FF5F00] text-white hover:bg-[#e55600] px-10 py-3"
							onClick={onApply}
						>
							{t('apply')}
						</Button>
						<button
							type="button"
							className="justify-self-end col-start-3 text-xs text-[#078691] hover:text-[#034e55] underline cursor-pointer"
							onClick={onClearAll}
						>
							{t('clearAll')}
						</button>
					</div>
				</footer>
			</Modal>

			{isConfirmOpen ? (
				<ConfirmApplyDialog
					onClose={() => setIsConfirmOpen(false)}
					onUseOld={onUseOld}
					onApplyNew={onApplyNew}
				/>
			) : null}
		</>
	)
}
