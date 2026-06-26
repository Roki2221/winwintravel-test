import { useTranslation } from 'react-i18next'

import Button from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'

type ConfirmApplyDialogProps = {
	onClose: () => void
	onUseOld: () => void
	onApplyNew: () => void
}

export const ConfirmApplyDialog = ({
	onClose,
	onUseOld,
	onApplyNew
}: ConfirmApplyDialogProps) => {
	const { t } = useTranslation('filter')

	return (
		<Modal
			isOpen
			onClose={onClose}
			zIndexClassName="z-50"
			closeButtonClassName="absolute right-8 top-11"
			panelClassName="w-[min(920px,calc(100vw-32px))] shadow-xl px-8 py-8"
		>
			<div className="flex items-center justify-center gap-4">
				<h3 className="font-medium text-[40px] leading-12 text-center text-gray-800">
					{t('confirmTitle')}
				</h3>
			</div>
			<div className="mt-30 flex items-center justify-center gap-8">
				<Button
					className="w-70 bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 px-6 py-3"
					onClick={onUseOld}
				>
					{t('useOldFilter')}
				</Button>
				<Button
					className="w-70 bg-[#FF5F00] text-white hover:bg-[#e55600] px-6 py-3"
					onClick={onApplyNew}
				>
					{t('applyNewFilter')}
				</Button>
			</div>
		</Modal>
	)
}
