import { history } from './../main/history'

export function toPathOnClick(location: string) {
	return (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		e.preventDefault()
		const actualLocation = window.location.hash.replace('#', '')
		if (actualLocation !== location) {
			history.push(location)
		}
	}
}
