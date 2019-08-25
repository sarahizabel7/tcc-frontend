import * as React from 'react'
import { Modal } from 'react-materialize'

export default (props: OwnProps) => {
	return (
		<Modal
			open={props.open}
			actions={<div />}
			className={'login-modal mini no-footer'}
			header={'Login'}
			options={{
				onCloseEnd: props.modalClose
			}}
		/>
	)
}

interface OwnProps {
	open: Boolean
	modalClose: () => void
}
