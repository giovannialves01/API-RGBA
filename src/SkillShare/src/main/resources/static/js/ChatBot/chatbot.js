(function() {
	window.onload = function() {
		new BlipChat()
			.withAppKey('c2tpbGxzaGFyZTpNZkxaTTg5ZjBIMDZRemZLc1FmTA==')
			.withButton({ "color": "#2CC3D5", "icon": "" })
			.withCustomCommonUrl('https://chat.blip.ai/?appKey=c2tpbGxzaGFyZTowMzA3ZTIzNy1mZTY1LTQ5YWYtYTkyOC01MTAzMDEyNmFhYTM=')
			.build();
	}
})();