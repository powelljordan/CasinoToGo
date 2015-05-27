$(document).ready(function(){
	var active;
	$("#abanico").click(function(){
		if(active != null){
			active.removeClass("active");
		}
		active = $("#abanico");
		$("#abanico").addClass("active")
		$("#videoFrame").attr('src', 'https://www.youtube.com/embed/24hYl3f21Ss');
	});
	$("#balsero").click(function(){
		if(active != null){
			active.removeClass("active");
		}
		active = $("#balsero");
		$("#balsero").addClass("active")
		$("#videoFrame").attr('src', 'https://www.youtube.com/embed/OSA_k8AGJf8');
	});
	$("#croqueta").click(function(){
		if(active != null){
			active.removeClass("active");
		}
		active = $("#croqueta");
		$("#croqueta").addClass("active")
		$("#videoFrame").attr('src', 'https://www.youtube.com/embed/-ocL7i5erW8');
	});
	$("#dameDirecto").click(function(){
		if(active != null){
			active.removeClass("active");
		}
		active = $("#dameDirecto");
		$("#dameDirecto").addClass("active")
		$("#videoFrame").attr('src', 'https://www.youtube.com/embed/tk6Ey5HSmWw');
	});
	$("#evelyn").click(function(){
		if(active != null){
			active.removeClass("active");
		}
		active = $("#evelyn");
		$("#evelyn").addClass("active")
		$("#videoFrame").attr('src', 'https://www.youtube.com/embed/eqr0OwhDpxE');
	});
});
