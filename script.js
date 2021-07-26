const input = document.getElementById('input');
const keys = document.getElementById('keys');
input.value = localStorage.getItem('text') || '';
const diacritics = [
	'\u0306',
	'\u0304',
	'\u0301',
	'\u0300',
	'\u0302',
	'\u0324'
];
for (const diacritic of diacritics) {
	const button = document.createElement('button');
	button.textContent = diacritic;
	button.addEventListener('mousedown', event => {
		//prevent unfocus of textarea
		event.preventDefault();
	});
	button.addEventListener('click', event => {
		input.setRangeText(diacritic, input.selectionStart, input.selectionEnd);
	});
	keys.appendChild(button);
}
input.addEventListener('input', event => {
	localStorage.setItem('text', input.value);
});
input.addEventListener('keydown', event => {
	const mappings = {
		0: '\u0324', //two dots under
		1: '\u0306',
		2: '\u0304',
		3: '\u0301',
		4: '\u0301',
		5: '\u0300',
		6: '\u0304', //same as 2
		7: '\u0302',
		8: '\u0306' //same diacritic as 1
	};
	if (event.altKey && mappings[event.key]) {
		console.log('add tone');
		event.preventDefault();
		input.setRangeText(mappings[event.key], input.selectionStart, input.selectionEnd);
		return false;
	}
});