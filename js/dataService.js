var app = angular.module('andale')
.service('dataService', ['$http', function($http) {

	function isVerb(str) {
		return str.toLowerCase() === 'a' || 'e' || 'i' || 'o' || 'u';
	}

	function removeImgBlanks(arr) {
		if (arr) {
			for (var i = arr.length - 1; i >= 0; i--) {
				if (!arr[i]) arr.splice(i, 1);
			};
		};
	};

	function getArray(type, item) {
		var arr;
		if (type === 'brand') {
			arr = brands;
		} else { // type === 'product'
			var index = getIndex(item.brand, brands);
			if (!brands[index].products) {
				brands[index].products = [];
			}
			arr = brands[index].products;
		};
		return arr;
	}

	function getIndex(name, arr) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].name.toLowerCase() === name.toLowerCase()) {
				return i;
			};
		};
		return false;
	};

	function confirmOverwrite(label) {
		var article = isVerb(label.substr(0, 1)) ? 'An ' : 'A ';
		return confirm(article + label + ' with this name already exists. Do you want to overwrite it?');
	};

	this.create = function(type, item) {
		var arr = getArray(type, item);
		var dupIndex = getIndex(item.name, arr);
		if (dupIndex === false) {
			arr.push(item);
		} else if (confirmOverwrite(type)) {
			arr[dupIndex] = item;
		} else {
			return false;
		};
		return true;
	}

	this.update = function(type, newItem, oldItem) {
		var arr = getArray(type, oldItem);
		var dupIndex = getIndex(newItem.name, arr);
		function write() {
			var index = getIndex(oldItem.name, arr);
			arr[index] = newItem;
		};
		if (newItem.name === oldItem.name || dupIndex === false) {
			write();
		} else if (confirmOverwrite(type)) {
			write();
			arr.splice(dupIndex, 1);
		} else {
			return false;
		};
		return true;
	}

	this.remove = function(type, item) {
		var arr = getArray(type, item);
		var index = getIndex(item.name, arr);
		arr.splice(index, 1);
	};

	var brands = [{
		"logo": "http://acousticamplification.com/wp-content/uploads/2014/11/Acoustic-logo.jpg",
		"name": "Acoustic",
		"phone": "855-272-1090",
		"products": [{
			"brand": "acoustic",
			"images": ["http://acousticamplification.com/wp-content/uploads/2014/11/A1000-1-main.jpg", "http://acousticamplification.com/wp-content/uploads/2014/11/A1000-3-main.jpg", "http://acousticamplification.com/wp-content/uploads/2014/11/A1000-4-main.jpg", "http://acousticamplification.com/wp-content/uploads/2014/11/A1000-5-main.jpg", "http://acousticamplification.com/wp-content/uploads/2014/11/Acoustic_A1000-DSP-AND-BLUE.jpg", "http://acousticamplification.com/wp-content/uploads/2014/11/Acoustic_A1000_DIRECT-OUTPUT.jpg"],
			"manualUrl": "http://acousticamplification.com/wp-content/uploads/2014/11/usermanual/A1000-Manual.pdf",
			"name": "A1000",
			"specs": "• 100 (2 x 50) watts true stereo RMS output\n• Class D power amplifier\n• Two 8″ full-range neodymium co-axial speakers\n• Two separate channels\n• Dual inputs with combo XLR-1/4″ jacks on each channel\n• Two digital effects processors (separate for each channel)\n    • 20 Preset programs\n    • 20 User Programs\n    • Reverb, Chorus, Delay, Flanger\n• 3-band EQ with sweepable mid-range (each channel)\n    • Low +/-15dB @ 80Hz\n    • Mid +/-15dB, 500Hz to 1.2kHz (sweepable)\n    • High +/-15dB @ 10kHz\n• Automatic feedback elimination circuit (12 filter, DSP-based, each channel)\n• Auxiliary Bluetooth connectivity for instant backing tracks\n• XLR direct output with ground lift, pre-post EQ and level (each channel)\n• Effects loop\n• Dimensions: 21.7”L x 20.9”H x 16.1”D\n• Weight: 41.9 lbs",
			"subtitle": "100w Stereo Amp w/ DSP Effects & Bluetooth",
			"url": "http://acousticamplification.com/product/a1000/",
			"warranty": "3 years"
		}, {
			"brand": "acoustic",
			"images": ["http://acousticamplification.com/wp-content/uploads/2014/11/A20-Acoustic-Amplification-1.jpg", "http://acousticamplification.com/wp-content/uploads/2014/11/A20-Acoustic-Amplification-2.jpg", "http://acousticamplification.com/wp-content/uploads/2014/11/A20-Acoustic-Amplification-3.jpg", "http://acousticamplification.com/wp-content/uploads/2014/11/A20-Acoustic-Amplification-5.jpg", "http://acousticamplification.com/wp-content/uploads/2014/11/A20-Acoustic-Amplification-4.jpg"],
			"manualUrl": "http://acousticamplification.com/wp-content/uploads/2014/11/usermanual/A20-Manual.pdf",
			"name": "A20",
			"specs": "• 20 watts\n• 8″ full-range co-axial speaker\n• Dual inputs with combo XLR-1/4″ jacks\n• 3-band EQ\n• Ported cabinet design\n• Digital chorus with adjustable rate\n• Digital reverb with adjustable level\n• Vari-control feedback elimination\n• Full-feature direct output with ground lift, pre-post EQ and level\n• Effects loop\n• Dimensions: 14.4″H x 13.0″W x 15.8″D\n• Weight: 21.5 lbs.",
			"subtitle": "20w Acoustic Guitar Amplifier",
			"url": "http://acousticamplification.com/product/a20/",
			"warranty": "3 years"
		}, {
			"brand": "acoustic",
			"images": ["http://acousticamplification.com/wp-content/uploads/2014/11/A40-1-main.jpg", "http://acousticamplification.com/wp-content/uploads/2014/11/A40-2-main.jpg", "http://acousticamplification.com/wp-content/uploads/2014/11/A40-3-main.jpg", "http://acousticamplification.com/wp-content/uploads/2014/11/A40-4-main.jpg"],
			"manualUrl": "http://acousticamplification.com/wp-content/uploads/2014/11/usermanual/A40-Manual.pdf",
			"name": "A40",
			"specs": "• 40 watts\n• 8″ full-range co-axial speaker\n• Dual inputs with combo XLR-1/4″ jacks\n• Ported cabinet design\n• 3-band EQ with sweepable mid-range\n• Digital effects user editing\n• Auxiliary Bluetooth connectivity for instant backing tracks\n• Automatic feedback elimination circuit\n• Full-feature direct output with ground lift, pre-post EQ and level\n• Effects loops\n• Dimensions: 18.3″ H x 17.3″ W x 16.5″ D\n• Weight: 28.7 lbs.",
			"subtitle": "40w Amp w/ DSP Effects & Bluetooth",
			"url": "http://acousticamplification.com/product/a40/",
			"warranty": "3 years"
		}, {
			"brand": "acoustic",
			"images": ["http://acousticamplification.com/wp-content/uploads/2014/11/AB50-Acoustic-Amplification-1.jpg", "http://acousticamplification.com/wp-content/uploads/2014/11/AB50-Acoustic-Amplification-2.jpg", "http://acousticamplification.com/wp-content/uploads/2014/11/AB50-Acoustic-Amplification-6.jpg", "http://acousticamplification.com/wp-content/uploads/2014/11/AB50-Acoustic-Amplification-5.jpg", "http://acousticamplification.com/wp-content/uploads/2014/11/AB50-Acoustic-Amplification-4.jpg", "http://acousticamplification.com/wp-content/uploads/2014/11/AB50-Acoustic-Amplification-3.jpg"],
			"manualUrl": "http://acousticamplification.com/wp-content/uploads/2014/11/usermanual/AB50-Manual.pdf",
			"name": "AB50",
			"specs": "• Power: 50W / 8ohm\n• EQ Centers: 60 Hz, 800 Hz, 10kHz\n• Channels: 2\n• AC Power: 80W\n• Speaker: 10″ speaker & 2″ tweeter\n• Dimensions: 15.5″D x 15.5″W x 16″H\n• Weight: 33lbs.",
			"subtitle": "50w 1x10 Acoustic-Electric Bass Amp",
			"url": "http://acousticamplification.com/product/ab50/",
			"warranty": "3 years"
		}, {
			"brand": "acoustic",
			"images": ["http://acousticamplification.com/wp-content/uploads/2014/11/B15-Acoustic-Amplification-1.jpg", "http://acousticamplification.com/wp-content/uploads/2014/11/B15-Acoustic-Amplification-2.jpg", "http://acousticamplification.com/wp-content/uploads/2014/11/B15-Acoustic-Amplification-5.jpg", "http://acousticamplification.com/wp-content/uploads/2014/11/B15-Acoustic-Amplification-4.jpg", "http://acousticamplification.com/wp-content/uploads/2014/11/B15-Acoustic-Amplification-3.jpg"],
			"manualUrl": "http://acousticamplification.com/wp-content/uploads/2014/11/usermanual/B15-Manual.pdf",
			"name": "B15",
			"specs": "• Controls: Volume, Overdrive (switchable), Overdrive Level\n• EQ: 3 band w/shape control\n• Aux/MP3 In: 1/8″ stereo\n• Headphone Jack: 1/8″ stereo\n• Other: ″Acousti-Comp″ built-in compressor\n• Product Dimensions: 13.8″W x 10.4″D x 18.1″H\n• Product Weight: 23 lbs.\n• Shipping Dimensions: 16.8″W x 12.2″D x 20.5″H\n• Shipping Weight: 27.6 lbs.",
			"subtitle": "15w 1x10 Bass Combo Amp",
			"url": "http://acousticamplification.com/product/b15/",
			"warranty": "3 years"
		}],
		"showName": false,
		"url": "http://acousticamplification.com/"
	}, {
		"logo": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ44FdIT68XemUWWll6mpRZIesN_KvYw1XS6bRl05SW7xQZGTy8ew",
		"name": "Harbinger",
		"phone": "888-286-1809",
		"products": [{
			"brand": "harbinger",
			"images": ["http://harbingerproaudio.com/wp-content/uploads/2014/03/Harbinger-APS12-FT-zoom.png", "http://harbingerproaudio.com/wp-content/uploads/2014/03/Harbinger-APS12-RT-zoom.png", "http://harbingerproaudio.com/wp-content/uploads/2014/03/Harbinger-APS12-LT-zoom.png", "http://harbingerproaudio.com/wp-content/uploads/2014/03/Harbinger-APS12-BK-Panel.png", "http://harbingerproaudio.com/wp-content/uploads/2014/03/Harbinger-APS12-BK-Handle.png"],
			"manualUrl": "http://harbingerproaudio.com/wp-content/uploads/2014/03/Manuals/Harbinger_APS12_APS15_Manual.pdf",
			"name": "APS12",
			"specs": "SYSTEM\n• 3 Channel Mic/Line Mixer\n• Frequency Response (-3dB): 45Hz – 18kHz\n• Frequency Range (-6dB): 40Hz – 20kHz\n• Max SPL Long-term @1m: 97dB\n• Max SPL Peak @1m: 119dB\n• Crossover: passive, 18dB/oct @ 3.5kHz\nAUDIO\n• MIC input\n• Input type: 2 bal. XLR & 2 unbal. ¼”\n• Input Impedance: 3k ohms\n• Input sensitivity: –46dBu\n• Line Input\n• Input type: XLR bal. / RCA unbal.\n• Input impedance: 10k ohms\n• Input sensitivity: –26 dBu\nEQ\n• Type: 5-band graphic Equalizer\n• Frequency: 250Hz /500Hz/1kHz/4kHz/8kHz\n• Equalize range: –12dB/+12dB\n• Power Amplifier\n• Rated output power: 135W\n• Max output power: 150W\n• Power supply: 110V/60 Hz\n• Max Power consumption: 276VA\n• Rated THD: <0.5% (20Hz – 20kHz)\n• Frequency response: +1/-2dB (20Hz – 20kHz)\n• Cooling: Convection Extrusion\n• Design: Class A/B",
			"subtitle": "12\" Powered Speaker",
			"url": "http://harbingerproaudio.com/product/aps12/",
			"warranty": "2 years"
		}, {
			"brand": "harbinger",
			"images": ["http://harbingerproaudio.com/wp-content/uploads/2014/03/Harbinger-APS15-FT-zoom.png", "http://harbingerproaudio.com/wp-content/uploads/2014/03/Harbinger-APS15-RT-zoom.png", "http://harbingerproaudio.com/wp-content/uploads/2014/03/Harbinger-APS15-LT-zoom.png", "http://harbingerproaudio.com/wp-content/uploads/2014/03/Harbinger-APS15-BK-Panel.jpg", "http://harbingerproaudio.com/wp-content/uploads/2014/03/Harbinger-APS15-BK-Handle.jpg"],
			"manualUrl": "http://harbingerproaudio.com/wp-content/uploads/2014/03/Manuals/Harbinger_APS12_APS15_Manual.pdf",
			"name": "APS15",
			"specs": "SYSTEM\n• Frequency Response (-3dB): 45 Hz-18 kHz\n• Frequency Range (-6dB): 40 Hz-20 kHz\n• Max SPL Long-term @1m: 98 dB\n• Max SPL Peak @1m: 121 dB\n• Crossover: passive, 18 dB/oct @ 3.5 kHz\nAUDIO\n• MIC input\n• Input type: 2 bal. XLR & 2 unbal. 1/4″\n• Input Impedance: 3k ohms\n• Input sensitivity: -46 dBu\n• Line Input\n• Input type: XLR bal. / RCA unbal.\n• Input impedance: 10k ohms\n• Input sensitivity: -26 dBu\nEQ\n• Type: 5-band graphic Equalizer\n• Frequency: 250 Hz/500 Hz/1 kHz/4 kHz/8 kHz\n• Equalize range: -12dB/+12dB\n• Rated output power: 180W\n• Max output power: 216W\n• Power supply: 110V/60 Hz\n• Max Power consumption: 276VA\n• Rated THD: <0.5% (20 Hz – 20 kHz)\n• Frequency response:+1/-2dB (20 Hz – 20k Hz)\n• Cooling: Convection Extrusion\n• Design: Class A/B",
			"subtitle": "15\" Powered Speaker",
			"url": "http://harbingerproaudio.com/product/aps15/",
			"warranty": "2 years"
		}, {
			"brand": "harbinger",
			"images": ["http://harbingerproaudio.com/wp-content/uploads/2014/10/LvL_L1202_FT-600x600.jpg", "http://harbingerproaudio.com/wp-content/uploads/2014/10/LvL_L1202_RT.jpg", "http://harbingerproaudio.com/wp-content/uploads/2014/10/L1202-routing.jpg", "http://harbingerproaudio.com/wp-content/uploads/2014/10/L1202-effects-zoom-2.jpg"],
			"manualUrl": "http://harbingerproaudio.com/wp-content/uploads/2012/11/Lvl_L1202FX_Manual.pdf",
			"name": "L1202 FX",
			"specs": "• 12-channel mixer with a variety of routing options\n• 4 LvL Series ultra clean mic preamps with XLR and ¼” TRS balanced/unbalanced line input\n• 4 TRS ¼” balanced/unbalanced stereo inputs with +4/-10dB sensitivity selection\n• Built-in effects including tap tempo delay\n• Versatile 3-Band EQ\n• 75Hz high pass Filter on mic inputs\n• Aux Send\n• Full-size master fader\n• Control room output for studio monitors\n• 48V phantom power\n• Input gain on mic preamps\n• Input Signal/Peak indicator LED\n• Pan/Balance controller per channel\n• 5-Segment LED main mix meter\n• RCA input and output\n• Headphone outputs\n• Robust external AC power supply\n• Rugged metal chassis",
			"url": "http://harbingerproaudio.com/product/l1202fx/",
			"warranty": "2 years"
		}, {
			"brand": "harbinger",
			"images": ["http://harbingerproaudio.com/wp-content/uploads/2015/08/Harbinger_L2404FX_FT-600x600.jpg", "http://harbingerproaudio.com/wp-content/uploads/2015/08/Harbinger_L2404FX_LT-100x100.jpg", "http://harbingerproaudio.com/wp-content/uploads/2015/08/Harbinger_L2404FX_AD.jpg", "http://harbingerproaudio.com/wp-content/uploads/2015/08/Harbinger_L2404FX_BK-100x100.jpg", "http://harbingerproaudio.com/wp-content/uploads/2015/08/Harbinger_L2404FX_RailsCheeks-100x100.jpg", "http://harbingerproaudio.com/wp-content/uploads/2015/08/Harbinger_L2404FX_FTRails.jpg"],
			"manualUrl": "http://harbingerproaudio.com/wp-content/uploads/2015/10/Manuals/Harbinger-L2404FX-USB-Mixer-Manual.pdf",
			"name": "L2404FX-USB",
			"specs": "• 24-Channel mixer offers massive routing flexibility\n• 10 Professional mic preamps with 48V Phantom Power\n• Studio-grade 24-bit effect processor with Parameter Edit, Tap Tempo, and foot switch control\n• USB 2-track in/out for instant computer connectivity\n• 8 Single-knob compressors with LED indicator\n• 8 Inserts with 8 Direct Outputs\n• 3-Band EQ with sweepable mids\n• 10 High Pass Filters that mitigate low-end rumble\n• 3.5mm TRS inputs for MP3 players on stereo input channels\n• 4 Aux Sends (Pre/Post select on Aux 1-2) with Aux Send Masters\n• 4 Aux Returns\n• 4 Subgroups\n• Control Room and Headphone Output\n• Clip and Mute LEDs per channel\n• Faders on all channels\n• 15-Segment LED meter",
			"url": "http://harbingerproaudio.com/product/l2404fx-usb/",
			"warranty": "2 years"
		}, {
			"brand": "harbinger",
			"images": ["http://harbingerproaudio.com/wp-content/uploads/2014/10/LvL_L502_FT.jpg", "http://harbingerproaudio.com/wp-content/uploads/2014/10/LvL_L502_RT.jpg"],
			"manualUrl": "http://harbingerproaudio.com/wp-content/uploads/2014/12/Harbinger-Lvl-L502-802-Manual.pdf",
			"name": "L502",
			"specs": "• 5-channel mixer with a variety of routing options\n• 1 LvL Series ultra clean mic preamp with XLR and ¼” TRS balanced/unbalanced line input\n• 2 TRS ¼” balanced/unbalanced stereo inputs\n• Top quality 2-Band EQ\n• Phantom power\n• Input gain on mic preamps\n• Input Signal/Peak indicator LED\n• Pan/Balance controller per channel\n• 5-Segment LED main mix meter\n• RCA input and output\n• Headphone outputs\n• Robust external AC power supply\n• Rugged metal chassis",
			"subtitle": "5 Channel Powered Mixer",
			"url": "http://harbingerproaudio.com/product/l502/",
			"warranty": "2 years"
		}, {
			"brand": "harbinger",
			"images": ["http://harbingerproaudio.com/wp-content/uploads/2014/10/LvL_L802_FT.jpg", "http://harbingerproaudio.com/wp-content/uploads/2014/10/LvL_L802_RT.jpg"],
			"manualUrl": "http://harbingerproaudio.com/wp-content/uploads/2014/12/Harbinger-Lvl-L502-802-Manual.pdf",
			"name": "L802",
			"specs": "• 8-channel mixer with a variety of routing options\n• 2 LvL Series ultra clean mic preamps with XLR and ¼” TRS balanced/unbalanced line input\n• 2 TRS ¼” balanced/unbalanced stereo inputs\n• Versatile 3-Band EQ\n• Aux send and return\n• Control room output for studio monitors\n• 48V phantom power\n• Input gain on mic preamps\n• Input Signal/Peak indicator LED\n• Pan/Balance controller per channel\n• 5-Segment LED main mix meter\n• RCA input and output\n• Headphone outputs\n• Robust external AC power supply\n• Rugged metal chassis",
			"subtitle": "8 Channel Powered Mixer",
			"url": "http://harbingerproaudio.com/product/l802/",
			"warranty": "2 years"
		}, {
			"brand": "harbinger",
			"images": ["http://harbingerproaudio.com/wp-content/uploads/2015/01/Harbinger_LP9800_FT_2-100x100.jpg", "http://harbingerproaudio.com/wp-content/uploads/2015/01/Harbinger_LP9800_LT-100x100.jpg", "http://harbingerproaudio.com/wp-content/uploads/2015/01/Harbinger_LP9800_RT-100x100.jpg", "http://harbingerproaudio.com/wp-content/uploads/2015/01/Harbinger_LP9800_BK-100x100.jpg"],
			"manualUrl": "http://harbingerproaudio.com//wp-content/uploads/2015/03/Manuals/Harbinger-LP9800-Powered-Mixer-Manual.pdf",
			"name": "LP9800",
			"specs": "• 14-channel mixer versatile enough for rehearsals, gigs and jamming\n• 800-watt amplifier with Stereo, Main/Monitor, and Mono Bridge power modes\n• Studio-grade DSP effects with performance-ready presets\n• 9 XLR inputs with 48V phantom power\n• 6 XLR mic/line channels with -25 dB pad and clip indicator\n• 3 XLR mic/stereo line channels\n• -25dB pad and Rumble Filter on channels 1 through 6\n• Dual 9-band graphic EQ\n• 3-band EQ per input\n• FX Send and Aux send per input\n• 5-segment LED meters per power amp channel\n• Quick Parameter adjustment to dial in reverbs, delays, and chorus\n• RCA Aux-In and Aux Out\n• Line outputs connect powered speakers or monitors\n• Rugged construction with protective corners and covering",
			"url": "http://harbingerproaudio.com/product/lp9800/",
			"warranty": "2 years"
		}, {
			"brand": "harbinger",
			"images": ["http://harbingerproaudio.com/wp-content/uploads/2014/07/Harbinger_MuV_M120_wspeaker_ft-600x600.jpg", "http://harbingerproaudio.com/wp-content/uploads/2014/07/Harbinger_MuV_M120-Head-100x100.jpg", "http://harbingerproaudio.com/wp-content/uploads/2014/07/Harbinger_MuV_M120-FT-Mounted-short1-100x100.jpg"],
			"manualUrl": "http://harbingerproaudio.com/wp-content/uploads/2014/03/Manuals/Harbinger_MuV_Series_Manual.pdf",
			"name": "M120",
			"specs": "• 120 watts\n• 4 input channels with 2-band EQ and FX send\n• Clip LED\n• Built-in digital delay\n• 3-band Master EQ\n• Aux-in for MP3 players\n• Record Out\n• Two 12” two-way loudspeakers\n• 1–3/8” pole mounts\n• Two 20’ speaker cables\n• Speaker stands not included\nSPECIFICATIONS\nAMPLIFIER \n• Power Amp: Max Output Power 120 Watts (@ 4Ω)\n• Inputs: Balanced mono: 4 Mic/line channels 2 Aux Inputs\n• Line Output: Record Out: RCA Pair\n• Channel Strips (4): Volume Controls: Rotary\n• Master Section: Rotary Fader: Master\n• Built-in Digital Effect: Digital Delay: (2–150ms)\n• Noise: Master output (all faders down): –86dBu Power amp output (all faders down): –55dBu\n• THD: @120 watts: 4Ω <1%\n• Crosstalk (1KHz@ 0dBu): Channel fader down < –63dB\n• Frequency Response (Mic input to output): 20Hz to 20kHz line level output @+4dBu into 600Ω +1/–3dB\n• Sensitivity @ mixer output +4dBu: 1Mic/Line: –50dBu/–35dBu Tape in: –6dBu\n• Channel Equalization: 2 band +/–15dB Low EQ: 80Hz Shelving Hi EQ: 12kHz Shelving\n• Master Equalization: 3 band +/–15dB Low EQ: 80Hz Shelving Mid EQ: 1kHz Peak Hi EQ: 12kHz Shelving\n• Microphone Preamp E.I.N.: (150Ω terminated, max gain) –122dBm\n• Power Requirements: AC120V ~ 50–60Hz\n• Dimensions: H 8.85” x W 18.9” x D 5.9”\n• Weight: 19 lbs.\nSPEAKER \n• RMS power handling: 80W / 8Ω\n• Peak power handling: 110W / 8Ω\n• Impedance load: 8Ω\n• Horn construction: Compression Driver\n• Woofer construction: 12” cone diaphragm\n• Magnet weight: 30 oz\n• CROSSOVER: 3.8K / -12dB per octave\n• Frequency response: 40HZ–20kHz\n• Max SPL: 116dB\n• Dimensions of speaker box: H 23.2” x W 14.4” x D 12.8”\n• Net weight: 25.5 lbs. (per speaker box)\n\nNOTE: The max power (peak) of each speaker box is 80W in order to satisfy the powered mixer’s output (max in 80W/8Ω) and to avoid speaker burnout during peak output.",
			"url": "http://harbingerproaudio.com/?product=m120",
			"warranty": "2 years"
		}, {
			"brand": "harbinger",
			"images": ["http://harbingerproaudio.com/wp-content/uploads/2014/07/Harbinger_MuV_M60_wspeakers_FT-600x600.jpg", "http://harbingerproaudio.com/wp-content/uploads/2014/07/Harbinger_MuV_M60-wspeaker_Lt-100x100.jpg", "http://harbingerproaudio.com/wp-content/uploads/2014/07/Harbinger_MuV_M60_head-100x100.jpg", "http://harbingerproaudio.com/wp-content/uploads/2014/07/Harbinger_MuV_M60-FT-Mounted-short1-100x100.jpg"],
			"manualUrl": "http://harbingerproaudio.com/wp-content/uploads/2014/03/Manuals/Harbinger_MuV_Series_Manual.pdf",
			"name": "M60",
			"specs": "FEATURES\n• 60 watt\n• 4 input channels with 2-band EQ and FX send\n• Built-in digital delay\n• Aux-in for MP3 players\n• Record Out\n• Two 10” two-way loudspeakers\n• 1–3/8” pole mounts\n• Two 20’ speaker cables\n• Speaker stands not included\nAMPLIFIER \n• Power Amp: Max Output Power 60 Watts (@ 8Ω)\n• Inputs: Balanced mono: 4 Mic/line channels 2 Aux Inputs\n• Line Output: Record Out: RCA Pair\n• Channel Strips (4): Volume Controls: Rotary\n• Master Section: Rotary Fader: Master\n• Built-in Digital Effect: Digital Delay: (2–150ms)\n• Noise: Master output (all faders down): –86dBu Power amp output, all faders down: –55dBu\n• THD: @60 watts: 4Ω <1%\n• Crosstalk (1KHz@ 0dBu): Channel fader down < –63dB\n• Frequency Response (Mic input to output): 20Hz to 20kHz line level o/p @+4dBu into 600Ω +1/–3dB\n• Sensitivity @ mixer output +4dBu: Mic/Line: –50dBu Tape in: –6dBu\n• Channel Equalization: 2 band +/–15dB Low EQ: 80Hz Hi EQ: 12kHz\n• Master Equalization: NA\n• Microphone Preamp E.I.N.: (150Ω terminated, max gain) –122dBm\n• Power Requirements: AC120V ~ 50–60Hz.\n• Dimensions: 18.31”x 6.10”x 8.27”\n• Weight: 16.31 lbs.\nSPEAKER \n• RMS power handling: 50W / 8Ω\n• Peak power handling: 80W / 8Ω\n• Impedance load: 8Ω\n• Horn construction: Piezo\n• Woofer construction: 10” cone diaphragm\n• Magnet weight: 20 oz\n• CROSSOVER: N/A\n• Frequency response: 40HZ–20kHz\n• Max SPL: 14dB\n• Dimensions of speaker box: H18.7” x W 12.7”/9” x D 11.2”\n• Net weight: 16.6 lbs (per speaker box.\n\nNOTE: The max power (peak) of each speaker box is 80W in order to satisfy the powered mixer’s output (max in 80W/8Ω) and to avoid speaker burnout during peak output.",
			"url": "http://harbingerproaudio.com/?product=m60",
			"warranty": "2 years"
		}, {
			"brand": "harbinger",
			"images": ["http://harbingerproaudio.com/wp-content/uploads/2014/02/Harbinger_VaRi_V2112_FT-100x100.jpg", "http://harbingerproaudio.com/wp-content/uploads/2014/02/Harbinger_VaRi_2112_LT-100x100.jpg", "http://harbingerproaudio.com/wp-content/uploads/2014/02/Harbinger_VaRi_V2112_RT-600x600.jpg", "http://harbingerproaudio.com/wp-content/uploads/2014/02/Harbinger_VaRi_2112_BK.jpg"],
			"manualUrl": "http://harbingerproaudio.com/wp-content/uploads/2014/03/Manuals/Harbinger_Vari-Series_Manual.pdf",
			"name": "V2112",
			"specs": "AMPLIFIER \n• 600 watt peak power\n• Class-D amplification design\n• Input 1: XLR/TRS balanced inputs with Mic/Line switch\n• Input 2: XLR +4dB balanced jack, RCA -10dB unbalanced jacks\n• Input gain control on each channel\n• 1/8” mini TRS unbalanced jack for MP3 players\n• XLR line output +4dB\n• +/- 12dB shelf, 100Hz Low EQ – +/- 12dB shelf, 10kHz High EQ\n• 115V / 60Hz power input\n• Power & Signal/Clip LEDs\nSPEAKER \n• 12” 2-way vented design speakers\n• 55 – 20kHz frequency response\n• 118dB Max SPL\n• 1.35” compression driver @ 8 ohm\n• 1.2mm steel grille\n• 1-3/8in stand pole mount with M6 screw\nDIMENSIONS & WEIGHT \n• 15.16in x 13.7in 23.46in / 385mm x 348mm x 596mm\n• 35.2lb / 15kg",
			"url": "http://harbingerproaudio.com/?product=v212",
			"warranty": "2 years"
		}, {
			"brand": "harbinger",
			"images": ["http://harbingerproaudio.com/wp-content/uploads/2014/02/Harbinger_V2115-fT.jpg", "http://harbingerproaudio.com/wp-content/uploads/2014/02/Harbinger_V2115_LT.jpg", "http://harbingerproaudio.com/wp-content/uploads/2014/02/Harbinger_V2115_RT.jpg", "http://harbingerproaudio.com/wp-content/uploads/2014/02/Harbinger_VaRi_2115-Back-panel.jpg"],
			"manualUrl": "http://harbingerproaudio.com/wp-content/uploads/2014/03/Manuals/Harbinger_Vari-Series_Manual.pdf",
			"name": "V2115",
			"specs": "FEATURES\n• 600 watts Class-D power for venue-filling sound\n• Limiter with clip indicator protects your system from overload\n• 3-channel mixer with a variety of input/output options\n• 2-band EQ dials up the ideal sound for any function\n• Line Out for linking multiple speakers\n• Integrated handles are balanced for easy transport\n• Rugged steel grille protects speakers from abuse\n• 1–3/8” mount for use with standard speaker poles\nSPECIFICATIONS\nAMPLIFIER\n• 600 watt peak power\n• Class-D amplification design\n• Input 1: XLR/TRS balanced inputs with Mic/Line switch\n• Input 2: XLR +4dB balanced jack, RCA -10dB unbalanced jacks\n• Input gain control on each channel\n• 1/8” mini TRS unbalanced jack for MP3 players\n• XLR line output +4dB – +/- 12dB shelf, 100Hz Low EQ\n• +/- 12dB shelf, 10kHz High EQ\n• 115V / 60Hz power input\n• Power & Signal/Clip LEDs\nSPEAKER\n• 15” 2-way vented design speakers\n• 45 – 20kHz frequency response\n• 120dB Max SPL\n• 1.35” compression driver @ 8 ohm\n• 1.2mm steel grille\n• 1-3/8in stand pole mount with M6 screw \nDimensions & Weight\n• 18.11in x 16.34in x 27.64in / 460mm x 415mm x 702mm\n• 41.8lbs / 15kg",
			"url": "http://harbingerproaudio.com/?product=v2115",
			"warranty": "2 years"
		}],
		"showName": false,
		"url": "http://harbingerproaudio.com/"
	}, {
		"logo": "http://simmonsdrums.net/wp-content/uploads/2014/05/0001_Simmons-SD1500-Kit_FT-150x150.jpg",
		"name": "Simmons",
		"phone": "888-621-4008",
		"products": [{
			"brand": "simmons",
			"factoryReset": "Turn on the module while pressing the [+] and [-] buttons simultaneously.",
			"images": ["http://simmonsdrums.net/wp-content/uploads/2015/02/Simmons-SD100-FT.jpg", "http://simmonsdrums.net/wp-content/uploads/2015/02/Simmons-SD100-Zoom-LT.jpg", "http://simmonsdrums.net/wp-content/uploads/2015/02/Simmons-SD100-TOP.jpg", "http://simmonsdrums.net/wp-content/uploads/2015/02/Simmons-SD100-RT.jpg", "http://simmonsdrums.net/wp-content/uploads/2015/02/Simmons-SD100-LT.jpg", "http://simmonsdrums.net/wp-content/uploads/2015/02/Simmons-SD100-BK.jpg"],
			"manualUrl": "http://simmonsdrums.net/manuals/Simmons_SD100_Manual.pdf",
			"name": "SD100",
			"specs": "• Sound module includes, 10 drum kits, 179 sounds and 10 songs\n• Simple, easy-to-navigate interface\n• Simmons SD100 drum pads provide great feel and easy playability\n• 1/8” TRS line stereo output\n• 1/8” TRS line input for MP3 players\n• USB MIDI connection\n• Robust multi-pin connector to pads for easy setup and breakdowns\n• Integrated sturdy tripod stand with stable 3-point design\n• Drum bar with snare, 3 toms and drum module\n• Hi-hat control pedal and integrated kick pedal/trigger",
			"url": "http://simmonsdrums.net/product/sd100kit/",
			"warranty": "90 days"
		}, {
			"brand": "simmons",
			"factoryReset": "Press UTILITY. Press the PAGE +/- buttons until you see \"RESET\" on the display. Press SAVE/ENTER. You should see \"RESETPARA\" on the display, which only resets certain parameters. Press the PAGE + button to bring up \"RESETALL\". Press the SAVE/ENTER button. You should see \"RESET OK\" on the display.",
			"images": ["http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-Feat_Prod-SD1000_Kit_FT.jpg", "http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-SD1000_Kit_RT1.jpg", "http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-SD1000_Module_RT.jpg", "http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-SD1000_KIt_BK.jpg"],
			"manualUrl": "http://simmonsdrums.net/wp-content/uploads/2014/05/Manuals/SD1000_Manual.pdf",
			"name": "SD1000",
			"specs": "• 5-Piece Electronic Kit\n• 8 S1000 Series Pads: 5 drum pads and 3 cymbal pads\n• S1000 Pads offer realistic response, higher sensitivity, and less false triggering between zones\n• Dual zone snare for more realistic sounds, and wider strike options\n• Multi-position hi-hat foot controller provides a natural feel from full-open to full-closed\n• 9” kick pad accommodates double bass drum pedals\n• SD1000 Sound Module with 516 drum sounds and 55 drum kits\n• Variable Attack Response (V.A.R.) technology provides stunningly realistic dynamics and natural response\n• Large backlit LED screen and plenty of quick-access buttons\n• Multi-pin quick connect cable harness\n• Eye-catching anodized-blue rack complete with all hardware\n• Detailed Owner’s Manual\n• Includes drum sticks",
			"url": "http://simmonsdrums.net/product/sd1000-5-piece-electronic-drum-set/",
			"warranty": "2 years"
		}, {
			"brand": "simmons",
			"factoryReset": "From page 34 of the manual:\n1. Press the [Utility] button.\n2. Press the [Page -/+] buttons until you get to \"RESET\" on the display.\n3. Press [SAVE/ENTER]. You will see 'ResetPara' on the display, which only resets certain parameters. I would advise using the [Page +] button to bring up 'ResetAll'.\n4. Press the [SAVE/ENTER] button. You will see \"RESET OK\" on the display.",
			"images": ["http://simmonsdrums.net/wp-content/uploads/2014/05/0001_Simmons-SD1500-Kit_FT.jpg", "http://simmonsdrums.net/wp-content/uploads/2014/05/0000_Simmons-SD1500-Kit_BK.jpg", "http://simmonsdrums.net/wp-content/uploads/2014/05/0002_Simmons-SD1500-Kit_RT.jpg", "http://simmonsdrums.net/wp-content/uploads/2014/05/0003_Simmons-SD1500-rack-BK.jpg", "http://simmonsdrums.net/wp-content/uploads/2014/05/0005_Simmons-SD1500-rack-LT.jpg"],
			"imgToShow": 1,
			"manualUrl": "http://simmonsdrums.net/wp-content/uploads/2014/05/Manuals/_SD1500%20Manual.pdf",
			"name": "SD1500",
			"showImg": false,
			"showSpecs": false,
			"specs": "• 6-piece electronic drum set plus 4 cymbals (2 crash, triple zone ride, and hi-hat)\n• 10 total pads, 22 specific trigger points on the drum pads\n• New Simmons multi-position hi-hat pedal\n• Triple-zone snare pad & floor tom — center and rim sensor for rim shot and cross stick samples\n• Triple-zone ride — bell, bow, edge plus choke capability\n• Dual-zone toms with membrane sensors\n• Dual-zone crash cymbals with choke capability\n• SD1000 sound module with 99 drum sets, 516 sounds and 210 songs\n– Custom Sound Library and 7-track programmable sequencer\n– Variable Attack Response technology\n• New heavy duty hexagonal drum rack with die cast aluminum hardware and memory lock mounts\n• New kick drum stand with high-stability legs, and a large kick pad surface that supports single and double pedals",
			"url": "http://simmonsdrums.net/product/sd1500kit/",
			"warranty": "2 years"
		}, {
			"brand": "simmons",
			"factoryReset": "Hold down the + and - buttons simultaneously while turning on the module (see page 16 of the manual).",
			"images": ["http://simmonsdrums.net/wp-content/uploads/2015/07/Simmons-SD300KIT-FT.jpg", "http://simmonsdrums.net/wp-content/uploads/2015/07/Simmons-SD300KIT-HiPspctv.jpg", "http://simmonsdrums.net/wp-content/uploads/2015/07/Simmons-SD300KIT-LT.jpg", "http://simmonsdrums.net/wp-content/uploads/2015/07/Simmons-SD300KIT-RT.jpg", "http://simmonsdrums.net/wp-content/uploads/2015/07/Simmons-SD300KIT-TOP.jpg", "http://simmonsdrums.net/wp-content/uploads/2015/07/Simmons-SD300KIT-Rear.jpg", "http://simmonsdrums.net/wp-content/uploads/2015/07/Simmons-SD300KIT-Module_FT.jpg", "http://simmonsdrums.net/wp-content/uploads/2015/07/Simmons-SD300KIT-Rack-FT.jpg"],
			"manualUrl": "http://simmonsdrums.net/manuals/Simmons-SD300-Manual.pdf",
			"name": "SD300",
			"specs": "• 5-piece compact drum kit\n• Pads and Controllers\n   – Rugged 8” pads for snare and 3 toms\n   – Durable 8” pads for hi-hat, ride, and crash cymbals\n   – Hi-hat controller\n   – Kick pedal with integrated kick trigger\n• SD300 Sound Module\n   – 179 custom sounds\n   – 10 preset drum kits, plus user preset\n   – 10 songs, plus one user song\n• Simple interface with easy and comprehensive navigation\n• Multi-pin pad connector\n• USB/MIDI computer connection\n• Stereo and headphone outputs",
			"url": "http://simmonsdrums.net/product/sd300kit/",
			"warranty": "90 days"
		}, {
			"brand": "simmons",
			"factoryReset": "Press the UTILITY button, then press the PAGE button until you see \"Reset All\", then press the SAVE button.",
			"images": ["http://simmonsdrums.net/wp-content/uploads/2014/09/J08759000000000_SD500-FT.jpg", "http://simmonsdrums.net/wp-content/uploads/2014/09/J08759000000000_Simmons_SD500-Angle_RT.jpg", "http://simmonsdrums.net/wp-content/uploads/2014/09/J08759000000000_Simmons_SD500-Modual_FT.jpg", "http://simmonsdrums.net/wp-content/uploads/2014/09/Simmons-SD500-Drum-Pad.jpg", "http://simmonsdrums.net/wp-content/uploads/2014/09/Simmons-SD500-Cymbal-Pad.jpg"],
			"manualUrl": "http://simmonsdrums.net/wp-content/uploads/2014/08/SD500-Manual.pdf",
			"name": "SD500",
			"specs": "• 5-piece full-sized drum kit\n• New 500 Series Pads\n   – Sleek look, realistic feel, stay in place design\n   – 9” dual zone snare drum pad.\n   – 8” tom pads\n   – 10” crash cymbal with choke function\n   – 12” ride cymbal\n   – 10” hi-hat pad\n   – Hi-hat pedal\n   – Kick pad module with integrated kick pedal\n• SD500 Module\n   – Sleek new look with easy navigation\n   – 16 character, backlit, blue LCD screen\n   – Detachable stick rest\n   – High quality custom Simmons drum library with 64MB sample ROM and 64 voice polyphony\n   – 50 Drum Kits (40 preset / 10 user)\n   – 352 drum sounds\n   – 60 songs (50 preset / 10 user) with 50 customized drum patterns for practice\n   – 2 Demo songs\n• Variable Attack Response (V.A.R.) technology for better playability and performance\n   – Intelligent sample playback\n   – Pads respond differently base on dynamics\n   – Round-Robin alternating samples on snare and ride cymbal\n• USB / MIDI connectivity to computer\n• Stereo 1/8” TRS input for audio from MP3 player\n• 8 total trigger inputs on single multi-pin connector for clean cable management\n• Rugged steel rack with robust custom T-fitting and extra stable rubber feet",
			"url": "http://simmonsdrums.net/product/sd500kit/",
			"warranty": "2 years"
		}, {
			"brand": "simmons",
			"factoryReset": "Hold down the + and - buttons simultaneously while turning the module on (this can also be seen on page 18 of the manual).",
			"images": ["http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-SD5X_Kit_FT.jpg", "http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-Feat_Prod-SD5X_Top-Angle.jpg", "http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-SD5X-Sound-Module.jpg", "http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-SD5X-BackBrain.jpg", "http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-SD5X_Hihat_Crash_Inset.jpg"],
			"manualUrl": "http://simmonsdrums.net/wp-content/uploads/2014/05/Manuals/SD5X_Manual.pdf",
			"name": "SD5X",
			"specs": "• 5-piece kit with hi-hat and cymbal pads\n• 4 pads for snare, rack toms and floor tom\n• Kick pad provides enough room for double-kick pedals.\n• Sound Module: 130 acoustic and electronic drum and percussion voices, 14 drum kits with pad voice assignment, reverb, and volume, 40 song style patterns for accompaniment, and adjustable tempo from 30 to 280 BPM.\n• Easy-to-read, multi-function display shows all parameter settings\n• Input/output connections: USB, MIDI out, stereo line outs, MP3 inputs, headphone out\n• Rugged lightweight aluminum frame/stand for easy transportation",
			"url": "http://simmonsdrums.net/product/sd5x/",
			"warranty": "2 years"
		}, {
			"brand": "simmons",
			"factoryReset": "Turn on the power while holding the + and - buttons simultaneously.",
			"images": ["http://simmonsdrums.net/wp-content/uploads/2014/08/J09939000000000_Simmons_SD5Xpress_LT.jpg", "http://simmonsdrums.net/wp-content/uploads/2014/08/J09939000000000_Simmons_SD5Xpress_Close-Up_RT.jpg", "http://simmonsdrums.net/wp-content/uploads/2014/08/sd5Xp-sound-module.jpg"],
			"manualUrl": "http://simmonsdrums.net/wp-content/uploads/2014/08/SD5Xpress-Manual.pdf",
			"name": "SD5Xpress",
			"specs": "• 5-piece, full-sized kit configuration\n• Four 7.5” drum pads\n• Three cymbal pads: hi-hat, ride and crash\n• Includes kick pedal and trigger\n• SD5Xp Digital Sound Module\n• 10 preset drum kits\n• 107 drum sounds\n• 40 preset patterns\n• Easy-to-use controls\n• USB/MIDI out\n• Aux In for MP3 players\n• Stereo line level out\n• Headphone out\n• Rugged aluminum drum rack\n• Easy to use, ultra-stable clamps\n• Adjustable pads for personalized configuration\n• Multi-pin connector for easy set-up and clean cable management",
			"url": "http://simmonsdrums.net/product/sd5xpress/",
			"warranty": "2 years"
		}, {
			"brand": "simmons",
			"factoryReset": "Hold down the TEMPO + and TEMPO -  buttons while turning on the module (from page 13 of the manual).",
			"images": ["http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-SD7K-FT1.jpg", "http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-SD7K-HiHat.jpg", "http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-SD7K-snare.jpg", "http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-SD7K-Cymbal.jpg", "http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-SD7K_brain_front.jpg", "http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-SD7K-brain.jpg", "http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-SD7K-brain-BK.jpg", "http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-SD7K-Bass-Pad-RT.jpg", "http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-SD7K-HiHat-Pedal.jpg", "http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-SD7K-Detail-Rack.jpg"],
			"manualUrl": "http://simmonsdrums.net/wp-content/uploads/2014/05/Manuals/SD7K_Manual.pdf",
			"name": "SD7K",
			"specs": "• Drum module\n• One crash cymbal pad\n• One ride cymbal pad\n• One hi-hat cymbal pad\n• Hi-hat controller pedal\n• Three tom pads\n• One snare drum pad\n• One kick drum stand and pad\n• Supporting frame\n• Bass pedal sold separately.",
			"url": "http://simmonsdrums.net/product/sd7k/",
			"warranty": "2 years"
		}, {
			"brand": "simmons",
			"factoryReset": "Hold down the TEMPO + and TEMPO - buttons while turning on the module (from page 13 of the manual).",
			"images": ["http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-SD7PK-2.jpg", "http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-SD7PK_Brain.jpg", "http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-SD7PK.jpg"],
			"manualUrl": "http://simmonsdrums.net/wp-content/uploads/2014/05/Manuals/SD7PK_Manual.pdf",
			"name": "SD7PK",
			"specs": "FEATURES\n• High-quality drum and cymbal pads\n• for professional sound and feel\n• Sturdy frame and rack clamps\n• enhance durability\n• Versatile drum module features a\n• variety of sound/rhythm choices\nKIT COMPONENTS\n• 1 Kick pad\n• 1 Dual-zone snare pad\n• 3 Tom pads\n• 3 Cymbal pads\n• 1 Hi-hat foot control pedal\n• Sturdy and lightweight aluminum frame\n• for easy set-up\nMODULE\n• 300 Acoustic and electronic drum and\n• percussion voices\n• 20 Factory preset drum kits\n• 30 User programmable kits\n• 50 preset songs\n• Stereo line outputs/headphone output\n• MIDI ports for connection to computer\n• and other MIDI devices\nINCLUDES:\n• Drum key\n• Drum sticks (1 pair)\n• 9V DC adapter\n• All connecting cables (9x)\n• Instruction manual",
			"url": "http://simmonsdrums.net/product/sd7pk/",
			"warranty": "2 years"
		}, {
			"brand": "simmons",
			"factoryReset": "Press UTILITY, then scroll through the sub-menus until you see 'Reset'. Select this, then press + to confirm.",
			"images": ["http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-SD9K-FT.jpg", "http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-SD9K-BT-ANGL.jpg", "http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-SD9K-Brain-Lg.jpg", "http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-SD9K-Bass-Drum-Pad-FT.jpg", "http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-SD9K-Group-Accssrs.jpg", "http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-SD9K-Hi-Hat-Pedal-RT.jpg", "http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-SD9KR-FT-v2.jpg", "http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-SD9KR-Module-RT.jpg"],
			"manualUrl": "http://simmonsdrums.net/wp-content/uploads/2014/05/Manuals/SD9K_Manual.pdf",
			"name": "SD9K",
			"specs": "COMPONENTS\n• (1) SD9 Module\n• (1) Kick pad\n• (1) 11\" dual-zone snare pad\n• (3) 9\" tom pads\n• (1) 11\" floor tom pad\n• (2) Dual-zone crash pads with choke\n• (1) 14\" dual-zone ride pad with choke\n• (1) Dual-zone hi-hat pad with choke\n• (1) Hi-hat controller pedal\n• (1) Sturdy 4-legged drum rack with all mounting hardware\nDRUM KITS\n• Drum kits: 100 total (40 preset kits + 59 user kits + 1 external MIDI kit)\n• General MIDI kits: 12 GM kits\nINSTRUMENTS\n• Drum voices: 725 (drums, percussion, SFX) + 19 hi-hat combos\n• General MIDI backing voices: 128 GM instruments\n• Maximum polyphony: 64 notes\nEFFECT TYPES\n• Reverb/Delay\n• 4-band master EQ\nSEQUENCER\n• Preset songs: 110\n• User songs: 100\n• External MIDI control song: 1\n• Song parts: 7 (drum, percussion, part 1 - part 5)\n• Play modes: one shot, loop\n• Tempo: 30 - 280\n• Resolution: 192 ticks per quarter note\n• Maximum storage function: 12,000 notes\n• Metronome function\n• Track mute function\nSD CARD READER\n• Save/load kits, songs and user settings\n• Play standard MIDI files (up to 16 channels)\n• Update operating firmware\nMIDI & USB PORTS\n• Trigger external drum sound generator (sound module, computer software)",
			"url": "http://simmonsdrums.net/product/sd9k-2/",
			"warranty": "2 years"
		}, {
			"brand": "simmons",
			"factoryReset": "Turn on the module while pressing the [+] and [-] buttons simultaneously.",
			"images": ["http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-Feat_Prod-SDXpress-Kit_FT.jpg", "http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-SDXpress-Kit_LT.jpg", "http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-SDXpress-Kit_TOP.jpg", "http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-SDXpress-Pedal_LT.jpg"],
			"manualUrl": "http://simmonsdrums.net/wp-content/uploads/2014/05/Manuals/SDXpress_Manual.pdf",
			"name": "SDXpress",
			"specs": "• Pads - 7 drum pads with touch response and includes two pedals for bass drum and hi-hat\n• Sounds - 193 percussion voices\n• Drum Sets - 10 Preset sets, 1 User set\n• Songs - 10 Songs\n• Overall Controls - Tempo, Main Volume\n• Metronome - Voice, Click or Light\n• Connections - 9V adapter, head phones, USB (MIDI IN/OUT), bass drum and hi-hat controller\n• Dimension - 500mm (w) x 370mm (d) x 157mm (h)\n• Weight - 3.3Kg\n• Power Supply - 9V adapter / 6 C-type batteries\n• Accessories - Drum sticks, two controller pedals",
			"url": "http://simmonsdrums.net/product/sd-xpress/",
			"warranty": "90 days"
		}, {
			"brand": "simmons",
			"factoryReset": "Turn on the module while pressing the [+] and [-] buttons simultaneously",
			"images": ["http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-SDXPress2-Kit_FT.jpg", "http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-SDXpress2-Kit_LT.jpg", "http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-SDXpress2-Kit_TOP.jpg", "http://simmonsdrums.net/wp-content/uploads/2013/09/Simmons-SDXpress2_Module_FT.jpg"],
			"manualUrl": "http://simmonsdrums.net/wp-content/uploads/2014/05/Manuals/SDXpress2_Manual.pdf",
			"name": "SDXpress2",
			"specs": "• 5-piece compact electronic kit\n• 3 tom pads pre-mounted to crossbar\n• 3 velocity sensitive cymbal pads for hi-hat, crash and ride\n• SD Xpress drum module with 10 drum kits, 193 individual drum sounds, 10 song styles and song recorder\n• Base with built-in hi-hat and kick pedals\n• Easy to assemble drum rack and support bars\n• Owner’s manual\n• Pair of drum sticks",
			"url": "http://simmonsdrums.net/product/sd-xpress-2/",
			"warranty": "90 days"
		}, {
			"brand": "simmons",
			"images": ["http://simmonsdrums.net/wp-content/uploads/2014/06/0003_J05905_Simmons-Stryke6_A.jpg", "http://simmonsdrums.net/wp-content/uploads/2014/06/0002_J05905_Simmons-Stryke6_B.jpg", "http://simmonsdrums.net/wp-content/uploads/2014/06/0001_J05905_Simmons-Stryke6_C.jpg", "http://simmonsdrums.net/wp-content/uploads/2014/06/0000_J05905_Simmons-Stryke6_D.jpg"],
			"manualUrl": "",
			"name": "Stryke6",
			"specs": "• Versatile, first-ever iPad-based drum controller\n• Can also be used with any USB/MIDI computer\n• Ultra-small footprint with 6 velocity-sensitive drum pads\n• Access to a wide range of sounds\n• Kick and hi-hat pedals provide a real drum playing experience\n• Works with most MIDI applications\n• Free and fun, downloadable Stryke Drums iPad app (from the Apple App Store)\n• Learn to play drums in an engaging, interactive environment using app-based tutorials and the color-coded pads\n• Includes drum sticks and connections for Lighting and 30pin iPads and USB",
			"url": "http://simmonsdrums.net/product/stryke-6/",
			"warranty": "90 days"
		}],
		"showName": true,
		"url": "http://simmonsdrums.net/"
	}, {
		"logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8grfb16PkQKBH3gZhkBxQ-KJobSKOCj6HXCGAtHgR5yamt-7BZg",
		"name": "Williams",
		"phone": "888-241-1582",
		"products": [{
			"brand": "williams",
			"images": ["http://williamspianos.com/wp-content/uploads/2014/12/Williams_Allegro2_TOP-900x675.jpg", "http://williamspianos.com/wp-content/uploads/2014/12/Williams-Allegro2_BK.jpg", "http://williamspianos.com/wp-content/uploads/2014/12/Williams_Allegro2_LT.jpg", "http://williamspianos.com/wp-content/uploads/2014/12/Williams_Allegro2_RT.jpg", "http://williamspianos.com/wp-content/uploads/2014/12/Williams_Allegro2_FT1.jpg"],
			"manualUrl": "http://williamspianos.com/wp-content/uploads/usermanuals/Williams_Allegro_2_Keyboard_Manual.pdf",
			"name": "Allegro 2",
			"specs": "• 88 hammer-action weighted keys for ultra-realistic piano feel\n• New Williams sound library with unique, hi-definition instrument sounds including grand piano, electric pianos, organs, strings, synths and basses\n• Modulation/FX control for realistic, expressive control of rotary and vibrato effects on select instruments\n• Bright LCD ensures easy readability and parameter adjustment\n• USB/MIDI connectivity for added flexibility for computers and recording\n• Convenient built-in speakers, metronome and music rest\n• Battery or AC operation (with optional AC adapter)\n• The optional ESS1 Essentials Pack includes power supply, sustain pedal and headphones\n• 5 free songs with McCarthy Music educational software",
			"subtitle": "88-key Digital Piano",
			"url": "http://williamspianos.com/product/williams-allegro-2-digital-piano/",
			"warranty": "1 year"
		}, {
			"brand": "williams",
			"factoryReset": "Press and hold the REVERB and CHORUS buttons simultaneously while turning the piano on. Once the piano is on, all the LED's will light up quickly to show that the factory reset was successful.",
			"images": ["http://williamspianos.com/wp-content/uploads/2015/03/Williams_Legato_RichBlack_fs-510x510.jpg", "http://williamspianos.com/wp-content/uploads/2014/12/Williams_Legato_RichBlack_HighAngleFT.jpg", "http://williamspianos.com/wp-content/uploads/2014/12/Williams_Legato_RichBlack_RT.jpg"],
			"manualUrl": "http://williamspianos.com/wp-content/uploads/usermanuals/10190_Williams_Legato_Keyboard_Manual.pdf",
			"name": "Legato",
			"specs": "• 88 semi-weighted keys\n• 5 rich sounds: piano, electric piano, organ, synth and bass\n• Convenient, built-in metronome\n• Built-in speakers\n• Music rest\n• Battery or AC operation (with optional AC adapter)\n• Optional ESS1 Essentials Pack includes power supply, sustain pedal and headphones\n• 5 free songs with McCarthy Music educational software",
			"url": "http://williamspianos.com/product/williams-legato-digital-piano/",
			"warranty": "1 year"
		}, {
			"brand": "williams",
			"factoryReset": "Turn the power off, then press and hold the transpose and octave buttons while you turn the power on. The display should say \"Reset OK\" (these steps can also be found on page 17 of the manual).",
			"images": ["http://williamspianos.com/wp-content/uploads/2015/03/Williams-Overture2-RT.jpg", "http://williamspianos.com/wp-content/uploads/2015/03/Williams-Overture2-FT.jpg", "http://williamspianos.com/wp-content/uploads/2015/03/Williams-Overture2-FT-Covered.jpg", "http://williamspianos.com/wp-content/uploads/2015/03/Williams-Overture2-LT.jpg", "http://williamspianos.com/wp-content/uploads/2015/03/Williams-Overture2-BK.jpg", "http://williamspianos.com/wp-content/uploads/2015/03/Williams-Overture2-BT-LT.jpg", "http://williamspianos.com/wp-content/uploads/2015/03/Williams-Overture2-BT-RT.jpg"],
			"manualUrl": "http://williamspianos.com/wp-content/uploads/usermanuals/Williams-Overture2-Manual.pdf",
			"name": "Overture 2",
			"specs": "• Best-in-class ebony gloss finish for an elegant look with any decor\n• 88 hammer-action fully weighted keys provides outstanding feel and response\n• 147 total sounds, including 15 high-definition custom sounds; 64Mbyte sample ROM for higher-sampled sounds: Grand Piano, Electric Pianos, Organs, Pipe Organ, Clavinet, Harpsichord, Upright Bass, Electric Bass, Strings\n• Complete General MIDI set for accompaniment, total 128 playable sounds\n• Sustain, Soft, and Sostenuto pedals for realistic playability\n• 64-voice polyphony for deep, layered orchestrations\n• Modulation/FX control offers realistic rotary and vibrato effects on select instruments\n• 4-speaker stereo system provides rich, immersive sound\n• Intuitive control panel with easy-to-read blue LCD display\n• Front panel USB Host Port for thumb-drive MIDI playback\n• USB/MIDI connection, MP3 input, stereo outputs with 1Ž4” and RCA jacks\n• Headphone output for private practice\n• Music rest\n• 5 free songs with McCarthy Music educational software",
			"url": "http://williamspianos.com/product/williams-overture-2-digital-piano/",
			"warranty": "1 year"
		}, {
			"brand": "williams",
			"factoryReset": "Turn the power off, then press and hold the transpose and octave buttons while you turn the power on. The display should say \"Reset OK\" (these steps can also be found on page 16 of the manual).",
			"images": ["http://williamspianos.com/wp-content/uploads/2015/02/Williams_Rhapsody2_RT-510x510.jpg", "http://williamspianos.com/wp-content/uploads/2015/02/Williams_Rhapsody2_FT-157x157.jpg", "http://williamspianos.com/wp-content/uploads/2015/02/Williams_Rhapsody2_LT-157x157.jpg", "http://williamspianos.com/wp-content/uploads/2015/02/Williams_Rhapsody2_BK-157x157.jpg", "http://williamspianos.com/wp-content/uploads/2015/02/Williams_Rhapsody2_BTY2-157x157.jpg", "http://williamspianos.com/wp-content/uploads/2015/02/Williams_Rhapsody2_BTY1-157x157.jpg"],
			"manualUrl": "http://williamspianos.com/wp-content/uploads/usermanuals/Williams_Rhapsody2_Manual.pdf",
			"name": "Rhapsody 2",
			"specs": "• Elegant PVC wood-like finish for great looks in any decor\n• 88 hammer-action, fully weighted keys provides outstanding feel and response\n• 12 high-definition custom sounds on 32Mbyte sample ROM – Grand Pianos, Electric Pianos, Organs, Classical Guitar, Upright Bass, Electric Bass, Strings, Synth Pad, Vibes\n• Sustain and Sostenuto pedals for realistic playability\n• 64-voice polyphony for deep, layered orchestrations\n• Modulation/FX control offers realistic rotary and vibrato effects on select instruments\n• Stereo system provides immersive sound\n• Intuitive control panel with easy-to-read blue LCD display\n• USB/MIDI connection, MP3 input, stereo outputs with 1Ž4” jacks\n• Headphone output for private practice\n• Music rest\n• 5 free songs with McCarthy Music educational software",
			"url": "http://williamspianos.com/product/williams-rhapsody-2-digital-piano/",
			"warranty": "1 year"
		}],
		"showName": true,
		"url": "http://williamspianos.com/"
	}];

	this.brands = brands;

}]);
