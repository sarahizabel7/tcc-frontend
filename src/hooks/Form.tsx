import * as React from 'react'
const useState = React.useState

export function useModal() {
	const [open, setOpen] = useState(false)
	function handleOpen() {
		setOpen(true)
	}
	function handleClose() {
		setOpen(false)
	}
	return {
		open,
		openModal: handleOpen,
		closeModal: handleClose
	}
}

export function useInput(initialValue: string) {
	const [value, setValue] = useState(initialValue)
	const [error, setError] = useState('')
	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setError('')
		setValue(e.target.value)
	}
	return {
		value,
		onChange: handleChange,
		error,
		setError
	}
}
