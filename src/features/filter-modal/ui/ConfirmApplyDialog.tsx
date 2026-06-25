import { useTranslation } from 'react-i18next'

import CloseIcon from '@/shared/assets/icons/close.svg'
import Button from '@/shared/ui/Button/Button'

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
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<button
				type="button"
				aria-label="Close"
				className="absolute inset-0 bg-black/40"
				onClick={onClose}
			/>

			<div
				role="dialog"
				aria-modal="true"
				className="relative w-[min(640px,calc(100vw-32px))] rounded-2xl bg-white shadow-xl px-8 py-8"
			>
				<button
					type="button"
					aria-label="Close"
					className="absolute right-4 top-4"
					onClick={onClose}
				>
					<CloseIcon
						className="size-6"
						aria-hidden="true"
					/>
				</button>

				<h3 className="text-base font-semibold text-center text-gray-800">
					{t('confirmTitle')}
				</h3>

				<div className="mt-8 flex items-center justify-center gap-4">
					<Button
						className="bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 px-6 py-3"
						onClick={onUseOld}
					>
						{t('useOldFilter')}
					</Button>
					<Button
						className="bg-[#FF5F00] text-white hover:bg-[#e55600] px-6 py-3"
						onClick={onApplyNew}
					>
						{t('applyNewFilter')}
					</Button>
				</div>
			</div>
		</div>
	)
}
