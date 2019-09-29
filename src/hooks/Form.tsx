import * as React from 'react'
import { string } from 'prop-types'
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


export function useCpf(initialValue: string) {
	const [value, setValue] = useState(initialValue)
	const [error, setError] = useState('')
	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		if(e.target.value.length < 15) {
			setError('')
			setValue(formataCPF(e.target.value))
		}
	}
	return {
		value,
		onChange: handleChange,
		error,
		setError
	} 
}

function formataCPF(cpf: string) {
	//retira os caracteres indesejados...
	cpf = cpf.replace(/[^\d]/g, "");
  
	//realizar a formatação...
	  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

