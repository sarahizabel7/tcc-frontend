export function removeSimbols(str: string) {
	str.replace('.', '')
	str.replace('-', '')
	return str
}