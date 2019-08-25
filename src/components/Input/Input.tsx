import * as React from 'react'
import classnames from 'classnames'
import * as shortid from 'shortid'

export default (props: Props) => {
	const inputClass = classnames(
		// 'validate',
		{ invalid: props.error },
		{ valid: props.success }
	)
	const labelClasses = classnames({ active: props.value })
	const inputField = classnames(
		'col',
		{
			[`s${props.s}`]: props.s
		},
		{
			[`m${props.m}`]: props.m
		},
		{
			[`l${props.l}`]: props.l
		},
		{
			[`xl${props.xl}`]: props.xl
		}
	)
	const hasCol =
		Boolean(props.s) ||
		Boolean(props.m) ||
		Boolean(props.l) ||
		Boolean(props.xl)
	const id = shortid.generate() || props.id 
	return (
		<div className={`input-field ${hasCol && inputField}`}>
			{props.iconName && (
				<i className='material-icons prefix'>{props.iconName}</i>
			)}

			<input
				type={props.type || 'text'}
				className={inputClass}
				autoComplete={props.autoComplete || 'off'}
				required={props.required}
				onChange={props.onChange}
				data-lpignore={props.inputIgnore}
				placeholder={props.placeholder}
				id={id}
				value={props.value}
				onFocus={props.onInputFocus}
				maxLength={props.maxLength}
				name={props.name}
				onBlur={props.onBlur}
				onClick={props.onClick}
				onKeyUp={props.onKeyUp}
				ref={props.inputRef}
				readOnly={props.readOnly}
			/>
			<label htmlFor={id} className={labelClasses}>
				{props.label}
			</label>
			<span
				className='helper-text'
				data-error={props.error}
				data-success={props.success}
			/>
		</div>
	)
}

interface Props {
	error?: string
	value: string
	type?:
		| 'email'
		| 'number'
		| 'password'
		| 'radio'
		| 'range'
		| 'search'
		| 'tel'
		| 'text'
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	required?: boolean
	autoComplete?: 'on' | 'off' | 'new-password' | 'current-password'
	placeholder?: string
	inputRef?: any
	iconName?: string
	tip?: string
	label?: string
	onInputFocus?: (...args: any) => void
	obfuscatedLabel?: string
	id?: string
	loading?: boolean
	inputIgnore?: boolean
	rightAlignObfuscate?: boolean
	onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void
	maxLength?: number
	name?: string
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
	onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void
	readOnly?: boolean
	success?: string
	s?: colNumbers
	m?: colNumbers
	l?: colNumbers
	xl?: colNumbers
}

type colNumbers =
	| '1'
	| '2'
	| '3'
	| '4'
	| '5'
	| '6'
	| '7'
	| '8'
	| '9'
	| '10'
	| '11'
	| '12'
