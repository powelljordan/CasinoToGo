
myApp.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'https://www.youtube.com/**'
  ]);
});


myApp.controller('MainController', ['$scope',


	function($scope, $sce){
		//Connect to the different parts of the database
		$scope.newOptions = false;
		$scope.movesTitle = "Moves";

		var ref = new Firebase('https://resplendent-inferno-2685.firebaseio.com/');
		var allDataDB = new Firebase('http://resplendent-inferno-2685.firebaseio.com/allData');
		var startsWithDB = new Firebase('http://resplendent-inferno-2685.firebaseio.com/startsWith/');
		var levelDB = new Firebase('http://resplendent-inferno-2685.firebaseio.com/level/');
		var ruedaDB = new Firebase('http://resplendent-inferno-2685.firebaseio.com/rueda/');

		//When you input new move information this function pushes the information to the appropriate parts of the
		//database based on the fields of the move
		$scope.pushDB = function(){
			//get the text from the text input boxes
			var titleValue = $("#titleInput").val();
			$("#titleInput").val('');

			var startsWithValue = $("#startsWithInput").val();
			$("#startsWithInput").val('');

			var levelValue = $("#levelInput").val();
			$("#levelInput").val('');

			var ruedaValue = $("#rueda").val();
			$("#rueda").val('');

			var urlValue = $("#url").val();
			var url = $("#url").val('');

			var ref = new Firebase('https://resplendent-inferno-2685.firebaseio.com/');
			var allDataDB = new Firebase('http://resplendent-inferno-2685.firebaseio.com/allData');
			var startsWithDB = new Firebase('http://resplendent-inferno-2685.firebaseio.com/startsWith/' + startsWithValue.toString());
			var levelDB = new Firebase('http://resplendent-inferno-2685.firebaseio.com/level/' + levelValue.toString());
			var ruedaDB = new Firebase('http://resplendent-inferno-2685.firebaseio.com/rueda/' + ruedaValue.toString());

			allDataDB.push({title: titleValue, startsWithValue: startsWithValue, level: levelValue, rueda:ruedaValue, url:urlValue, sel: false});
			startsWithDB.push({title: titleValue, url: urlValue, sel: false});
			levelDB.push({title: titleValue, url: urlValue, sel: false});
			ruedaDB.push({title: titleValue, url: urlValue, sel: false});
			console.log("pushed!");



		};
		//To ensure that only one item can be selected at a time we keep track of the last selected item so we can unselect it when
		//we select a new one
		previouslySelected = null;
		var keys = testKeys;
		$scope.moves = movesDB;
		$scope.keys = testKeys;
		$scope.allDataMoves = []
		$scope.startsWithMoves = [];
		$scope.levelMoves = [];
		$scope.ruedaMoves = []
		$scope.queriedMoves = qMoves;

		//Changes the content in the moves array which basically changes what's shown in the list-view
		$scope.updateMoves = function(newMoves){
			$scope.queriedMoves.push.apply($scope.queriedMoves, newMoves);
			console.log($scope.queriedMoves)
			$scope.moves.length = 0;
			$scope.moves.push.apply($scope.moves, newMoves);
		}

		//Same move method just doesn't update the queried moves. This is just to get it to work and should be remdied later
		$scope.updateMovesWithoutSaving = function(newMoves){
			$scope.moves.length = 0;
			$scope.moves.push.apply($scope.moves, newMoves);
		}

		$scope.getKeys = function(){
			$scope.keys.length = 0;
			for (var k in $scope.moves["0"]){
				if (k != "$$hashKey" && k.toLowerCase() != "none"){
					$scope.keys.push.apply($scope.keys, [k]);
				}
			}
		}

		$scope.updateMovesWithCategoryChange = function(key){
			a = [];
			for (k in $scope.moves['0'][key]){
				a.push($scope.moves['0'][key][k])
			}
			$scope.moves.length = 0;
			$scope.moves.push.apply($scope.moves, a);
		}


		//Logic that handles making sure that only one item is selected by looking at the previously selected item
		$scope.toggle = function(index){
			if(previouslySelected != null && $scope.moves[index].title != $scope.moves[previouslySelected].title){
				$scope.moves[previouslySelected].sel = false;
			}

			previouslySelected = index;
		}
		//Default video. I should connect this to the DB. It will eventually show a performance video (probably our latest)
		$scope.link = "https://www.youtube.com/embed/sWYZkyvxheo";
		$scope.updateVideoLink = function(index){
			alert("oh yeah I'm running");
			$("#videoFrame").attr('src', $scope.moves[index].url);

			
		}

		$scope.updateVideoLinkFromSearch = function(link) {
			$("#videoFrame").attr('src', link);
		}

		//Adds new moves to the allDataMoves array
		allDataDB.on('child_added', function(snapshot){
			var move = snapshot.val();
			$scope.allDataMoves.push(move);
			$scope.updateMovesWithoutSaving($scope.allDataMoves);
		})

		//Adds new moves to the startsWithMoves array
		startsWithDB.on('value', function(snapshot){
			var move = snapshot.val();
			if (move != null){
				$scope.startsWithMoves.push(move);
			}
			// $scope.updateMovesWithoutSaving($scope.startsWithMoves);
		})

		//Adds new moves to the levelMoves array
		levelDB.on('value', function(snapshot){
			var move = snapshot.val();
			if (move != null){
				$scope.levelMoves.push(move);
			}
			// $scope.updateMovesWithoutSaving($scope.levelMoves);
		})


		//Adds new moves to the ruedaMoves array
		ruedaDB.on('value', function(snapshot){
			var move = snapshot.val();
			if (move != null){
				$scope.ruedaMoves.push(move);
			}
			// $scope.updateMovesWithoutSaving($scope.ruedaMoves);
		})

		//Removes the last item added to the moves array, this is not a good delete method and needs to be fixed
		ref.on('child_removed', function(snapshot){
			$scope.moves.pop();
			$scope.$apply();
		})


		$scope.searchForMove = function(){
			console.clear();
			var searchedMove = $("#searchBox").val();
			if(searchedMove === "mitrueda"){
				$("#moveInput").show();
			}
			else if(searchedMove === "hidemitrueda"){
				$("#moveInput").hide();
			}
			else{
				$scope.hideMoves();
				for(i in $scope.allDataMoves){
					var move = $scope.allDataMoves[i];
					if (move.title.toLowerCase() === searchedMove.toLowerCase()){
						$scope.updateMovesWithoutSaving($scope.allDataMoves);
						$scope.showMoves();
						$scope.updateVideoLinkFromSearch(move.url);
					}
				}
			}
		}

		$scope.hideMoves = function(){
			$("#moves").hide();
		}

		$scope.showMoves = function(){
			$("#moves").show();
		}

	}]);