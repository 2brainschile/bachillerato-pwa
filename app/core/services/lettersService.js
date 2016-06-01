export default ["$rootScope", "$sce", "$interval",
	($rootScope, $sce, $interval) => {
		var allLetters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz";
		var letterInterval;

		const lettersService = {

			getRandomString: (stringLength, charSet) => {
				const characters = charSet || allLetters;
				const length = stringLength || 7000;
				let randomString = '';
				for (let i = 0; i < length; i++) {
					const randomPoz = Math.floor(Math.random() * characters.length);
					randomString += characters.substring(randomPoz, randomPoz + 1);
				}
				return randomString;
			},

			moveLetter: (string) => {
				const newLetter = lettersService.getRandomLetter();
				const cad = string.toString().slice(0, -1);
				const color = (cad.length * 4) / 360;
				const style = `color: hsla(${ parseInt(color) }, 100%, 50%, 1)`;
				return $sce.trustAsHtml(`<span style="${style}">${newLetter}</span>${cad}`);
			},

			getRandomLetter: () => {
				const letters = allLetters;
				const randomPoz = Math.floor(Math.random() * letters.length);
				return letters.substring(randomPoz, randomPoz + 1);
			},

			initLetterInterval: () => {
				$rootScope.binaryLetters = lettersService.getRandomString(5);
				let intervalCounter = 0;
				letterInterval = $interval(function() {
					_.times(10, function () {
						$rootScope.binaryLetters = lettersService.moveLetter($rootScope.binaryLetters);
					});
					intervalCounter++;
					if (intervalCounter === 240) {
						lettersService.stopLetterInterval();
					}
				}, 500);
			},

			stopLetterInterval: () =>{
				$interval.cancel(letterInterval);
			}

		};

		return lettersService;
	}
];
