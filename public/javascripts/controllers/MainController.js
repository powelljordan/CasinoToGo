
myApp.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'https://www.youtube.com/**'
  ]);
});


myApp.controller('MainController', ['$scope',
	function($scope, $sce){
		var ref = new Firebase('https://resplendent-inferno-2685.firebaseio.com/');
		$("#submit").click(function(){
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

			ref.push({title: titleValue, startsWithValue: startsWithValue, level: levelValue, rueda:ruedaValue, url:urlValue})
			console.log("pushed!");

		});

		previouslySelected = null;
		$scope.moves = movesDB;
		$scope.toggle = function(index){
			if(previouslySelected != null){
				$scope.moves[previouslySelected].sel = false;
			}
			previouslySelected = index;
		}
		$scope.link = "https://www.youtube.com/embed/Hu_mtYueXys";
		$scope.updateVideoLink = function(index){
			$("#videoFrame").attr('src', $scope.moves[index].url);
		}


		ref.on('child_added', function(snapshot){
			var move = snapshot.val();
			$scope.moves = $scope.moves.concat([move]);
			$scope.$apply();
			console.log($scope.moves);
		})

		ref.on('child_removed', function(snapshot){
			$scope.moves.pop();
			$scope.$apply();
			console.log($scope.moves);
		})


	}]);