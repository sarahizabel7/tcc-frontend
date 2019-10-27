import { history } from './../main/history';

export function toPathOnClick(location: string) {
	return (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		e.preventDefault()
		const actualLocation = window.location.hash.replace('#', '')
		if (actualLocation !== location) {
			history.push(location)
		}
	}
}

export const toBase64 = (file: any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
