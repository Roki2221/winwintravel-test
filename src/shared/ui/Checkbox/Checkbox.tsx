export const Checkbox = ({
	label,
	checked,
	className,
	onChange
}: {
	label: string
	checked: boolean
	className?: string
	onChange: (checked: boolean) => void
}) => {
	return (
		<label className="flex items-center gap-2 cursor-pointer text-[16px] font-normal">
			<input
				type="checkbox"
				className={'peer hidden ' + className}
				checked={checked}
				onChange={e => onChange(e.target.checked)}
			/>

			<div
				className="
    w-5 h-5 border border-gray-400 rounded
    flex items-center justify-center
    peer-checked:bg-[#FF5F00]
    peer-checked:border-[#FF5F00]
  "
			>
				<svg
					className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 1 1 1.4-1.4l2.3 2.3 6.3-6.3a1 1 0 0 1 1.4 0z" />
				</svg>
			</div>

			<span>{label}</span>
		</label>
	)
}
