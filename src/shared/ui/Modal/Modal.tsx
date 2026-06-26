import { type ReactNode, useEffect } from 'react'

import CloseIcon from '@/shared/assets/icons/close.svg'

type ModalProps = {
	isOpen: boolean
	onClose: () => void
	children: ReactNode
	panelClassName?: string
	zIndexClassName?: string
	closeButtonClassName?: string
	showCloseButton?: boolean
	closeOnEscape?: boolean
}

export const Modal = ({
	isOpen,
	onClose,
	children,
	panelClassName = '',
	zIndexClassName = 'z-40',
	closeButtonClassName = 'absolute right-4 top-4',
	showCloseButton = true,
	closeOnEscape = true
}: ModalProps) => {
	useEffect(() => {
		if (!isOpen || !closeOnEscape) {
			return
		}

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose()
			}
		}

		window.addEventListener('keydown', onKeyDown)

		return () => {
			window.removeEventListener('keydown', onKeyDown)
		}
	}, [closeOnEscape, isOpen, onClose])

	if (!isOpen) {
		return null
	}

	return (
		<div
			className={`fixed inset-0 ${zIndexClassName} flex items-center justify-center`}
		>
			<button
				type="button"
				aria-label="Close"
				className="absolute inset-0 bg-black/40"
				onClick={onClose}
			/>

			<div
				role="dialog"
				aria-modal="true"
				className={`relative rounded-2xl bg-white ${panelClassName}`}
			>
				{showCloseButton ? (
					<button
						type="button"
						aria-label="Close"
						className={`cursor-pointer ${closeButtonClassName}`}
						onClick={onClose}
					>
						<CloseIcon
							className="size-6"
							aria-hidden="true"
						/>
					</button>
				) : null}
				{children}
			</div>
		</div>
	)
}
