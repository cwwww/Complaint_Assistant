(function() {
	var canvas, gl, glRenderer, models,
		devices = {
			"Apple A7 GPU": {
				1136: ["iPhone 5", "iPhone 5s"],
				2048: ["iPad Air", "iPad Mini2", "iPad Mini3"]
			},

			"Apple A8 GPU": {
				1136: ["iPod touch (6th generation)"],
				1334: ["iPhone 6"],
				2208: ["iPhone 6Plus"],
				2048: ["iPad Air2", "iPad Mini4"]
			},

			"Apple A9 GPU": {
				1136: ["iPhone SE"],
				1334: ["iPhone 6s"],
				2208: ["iPhone 6sPlus"],
				2224: ["iPad Pro(9.7-inch)"],
				2732: ["iPad Pro(12.9-inch)"]
			},

			"Apple A10 GPU": {
				1334: ["iPhone 7"],
				2208: ["iPhone 7Plus"]
			},
			"Apple A11 GPU": {
				1334: ["iPhone 8"],
				1792: ["iPhone Xr"],
				1920: ["iPhone 8Plus2"],
				2208: ["iPhone 8Plus"],
				2436: ["iPhone X"],
                2688: ["iPhone Xs Max"]
			},
            "Apple A12 GPU": {
				1792: ["iPhone Xr"],
                2436: ["iPhone Xs"],
                2688: ["iPhone Xs Max"]
            },
            "Apple GPU": {
                1792: ["iPhone Xr"],
				1920: ["iPhone 8Plus"],
                2436: ["iPhone Xs"],
                2688: ["iPhoneXsMax"]
            },
		};

	function getCanvas() {
		if(canvas == null) {
			canvas = document.createElement('canvas');
		}

		return canvas;
	}

	function getGl() {
		if(gl == null) {
			gl = getCanvas().getContext('experimental-webgl');
		}

		return gl;
	}

	function getScreenWidth() {
//		alert('screen.width'+screen.width);
//		alert('Math.max==='+Math.max(screen.width, screen.height) * (window.devicePixelRatio || 1))
		return Math.max(screen.width, screen.height) * (window.devicePixelRatio || 1);
	}

	function getGlRenderer() {
		if(glRenderer == null) {
			debugInfo = getGl().getExtension('WEBGL_debug_renderer_info');
			glRenderer = debugInfo == null ? 'unknown' : getGl().getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
		}
		return glRenderer;
	}

	function getModels() {
		if(models == null) {
			var device = devices[getGlRenderer()];
//alert('device===='+device);
			if(device == undefined) {
				models = ['unknown'];
			} else {
				models = device[getScreenWidth()];

				if(models == undefined) {
					models = ['unknown'];
				}
			}
		}

		return models;
	}

	if(window.MobileDevice == undefined) {
		window.MobileDevice = {};
	}

	window.MobileDevice.getGlRenderer = getGlRenderer;
	window.MobileDevice.getModels = getModels;
})();