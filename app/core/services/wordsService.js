export default ["$rootScope", "$q",
	($rootScope, $q) => {

		const wordsService = {
			getWordsByLetter: (letter) => {
				var deferred = $q.defer();
				var ref = firebase.database().ref(`words/${letter}`);
				ref.once("value").then(function(snapshot) {
					deferred.resolve(snapshot.val());
				});
				return deferred.promise;
			},
			saveWords: (letter, categories) => {
				var updates = {};
				angular.forEach(categories, function (category) {
					var newCategoryKey = firebase.database().ref(`words/${letter}`).child(`${category.label}`).push().key;
					updates[category.label + "/" + newCategoryKey] = category.value.toLowerCase();
				});
				return firebase.database().ref(`words/${letter}`).update(updates);
			}
		};

		return wordsService;
	}
];
