export default class HomeCtrl {
	/* @ngInject */
	constructor($scope, $state, $interval, lettersService, wordsService) {

		$scope.actionText = "Jugar";
		$scope.playing = false;
		$scope.currentPuntos = 0;

		var allCategories = [
			{label: "Nombre o Apellido", value: null},
			{label: "Animal", value: null},
			{label: "País o Ciudad", value: null},
			{label: "Color o Cosa (Objeto)", value: null},
			{label: "Fruta o Verdura", value: null},
			{label: "Profesion u Oficio", value: null},
		];

		var startTime = new Date();
		var startTimer;
		var currentCategory = null;

		var initTimer = function () {
			startTimer = $interval(function () {
				$scope.currentSeconds = ((Date.now() - startTime) / 1000) | 0;
				if ($scope.currentSeconds === 120) {
					$interval.cancel(startTimer);
					$scope.gameEnded = true;
					$scope.gameLost = true;
					$scope.playing = false;
					lettersService.stopLetterInterval();
					$scope.currentPuntos = 0;
				}
			}, 1000);
		};

		var deleteDuplicates = function (categories) {
			var filteredCategories = [];
			angular.forEach(categories, function(category) {
				var categoryExists = _.isNull(currentCategory) ? false : _.contains(currentCategory[category.label], category.value);
				if (!categoryExists) {
					$scope.currentPuntos += 10;
					filteredCategories.push(category);
				} else {
					$scope.currentPuntos += 5;
				}
			});
			return filteredCategories;
		};

		$scope.send = function (form) {
			if (form.$invalid) return false;

			if ($scope.playing) {
				lettersService.initLetterInterval();
				$interval.cancel(startTimer);
				$scope.gameEnded = true;
				$scope.categories = deleteDuplicates($scope.categories);
				$scope.actionText = "Jugar de nuevo";
				$scope.playing = false;
				form.$setPristine();
				lettersService.stopLetterInterval();
				wordsService.saveWords($scope.currentLetter.toLowerCase(), $scope.categories);
				if ($scope.currentSeconds < 60) {
					$scope.currentPuntos += 30;
					if ($scope.currentSeconds < 50) {
						$scope.currentPuntos += 20;
					}
				} else {
					$scope.currentPuntos -= ($scope.currentSeconds - 60);
				}
			} else {
				initTimer();
				$scope.gameEnded = false;
				$scope.categories = angular.copy(allCategories);
				$scope.actionText = "Stop!";
				$scope.currentLetter = lettersService.getRandomLetter().toUpperCase();
				$scope.beginWith = new RegExp('^' + $scope.currentLetter + '[a-zA-Záéíóú]*', "i");
				startTime = new Date();
				$scope.playing = true;
				wordsService.getWordsByLetter($scope.currentLetter.toLowerCase()).then(function (response) {
					currentCategory = response;
				});
			}

		};

		$scope.setFocusTime = function (category) {
			if (!_.isNull(currentCategory)) {
				const currentData = currentCategory[category];
				console.info(_.values(currentData));
			}
		};

	}
}
