import { useTranslation } from 'react-i18next'

import Button from '@/shared/ui/Button/Button'

export const App = () => {
	const { t } = useTranslation('filter')

	return (
		<section className="w-full h-dvh flex flex-col items-center justify-center">
			<h1 className="text-3xl font-bold text-center">{t('title')}</h1>
			<Button
				className="bg-[#FF5F00] text-white w-46"
				onClick={() => {}}
			>
				{t('apply')}
			</Button>
		</section>
	)
}
