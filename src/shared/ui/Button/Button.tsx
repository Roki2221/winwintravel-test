const Button = ({
	children,
	onClick,
	className
}: {
	children: React.ReactNode
	onClick: () => void
	className?: string
}) => {
	return (
		<button
			onClick={onClick}
			className={
				'py-6.5 rounded-2xl text-base hover:bg-[#868483] leading-3 cursor-pointer ' +
				className
			}
		>
			{children}
		</button>
	)
}

export default Button
