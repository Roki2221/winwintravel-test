import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useFilterStore } from '@/entities/filter/model/filterStore'
import { FilterModal } from '@/features/filter-modal/ui/FilterModal'
import Button from '@/shared/ui/Button/Button'

export const App = () => {
	const { t } = useTranslation('filter')
	const [isOpen, setIsOpen] = useState(false)
	const savedFilter = useFilterStore(state => state.savedFilter)

	return (
		<section className="w-full h-dvh flex flex-col items-center justify-center">
			<h1 className="text-3xl font-bold text-center">{t('title')}</h1>
			<Button
				className="bg-[#FF5F00] text-white w-46"
				onClick={() => setIsOpen(true)}
			>
				{t('openFilter')}
			</Button>

			<pre className="mt-6 w-[min(900px,calc(100vw-32px))] max-h-[40dvh] overflow-auto rounded-lg bg-gray-50 p-4 text-xs">
				{JSON.stringify(savedFilter, null, 2)}
			</pre>

			<FilterModal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
			/>
		</section>
	)
}
