(function( $ ) { 
	"use strict";
	// animations
	window.bt_bb_animate_elements = function() {
		var $elems = $( '.animate:not(.animated)' );
		$elems.each(function() {
			var $elm = $(this);
			if ( isOnScreen( $elm ) ) {
				$elm.addClass( 'animated' );
				if ( $elm.hasClass( 'bt_bb_counter' ) ) {
					bt_bb_animate_counter( $elm );
				}
			}
		});
		bt_bb_lazy_load_images();
		$( '.slick-slider .slick-slide:not(.slick-active) .animate' ).removeClass( 'animated' );
	}
	
	// lazy image load
	window.bt_bb_lazy_load_images = function() {
		var $elems = $( 'img.btLazyLoadImage:not(.btLazyLoaded)' );
		$elems.each(function() {
			var $elm = $(this);
			if ( isOnScreen( $elm, -200 ) ) {
				$elm.addClass( 'btLazyLoaded' );
				// console.log($elm.data( 'image_src' ));
				$elm.attr( 'src', $elm.data( 'image_src' ));
			}
		});
		var $elems = $( 'image.btLazyLoadImage:not(.btLazyLoaded)' );
		$elems.each(function() {
			var $elm = $(this);
			if ( isOnScreen( $elm, -200 ) ) {
				$elm.addClass( 'btLazyLoaded' );
				// console.log($elm.data( 'image_src' ));
				$elm.attr( 'xlink:href', $elm.data( 'image_src' ));
			}
		});
		var $elems = $( '.btLazyLoadBackground:not(.btLazyLoaded)' );
		$elems.each(function() {
			var $elm = $(this);
			if ( isOnScreen( $elm, -200 ) ) {
				$elm.addClass( 'btLazyLoaded' );
				$elm.css( 'background-image', 'url(' + $elm.data( 'background_image_src' ) + ')' );
			}
		});
	}
	
	// isOnScreen fixed
	
	function iOSversion() {
	  if (/iP(hone|od|ad)/.test(navigator.platform)) {
		// supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
		var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
		return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
	  } else {
		  return false;
	  }
	}

	var ver = iOSversion();
	
	// isOnScreen
	
	function isOnScreen( elem, top_offset ) {
		if ( ver && ver[0] == 13 ) return true;
		top_offset = ( top_offset === undefined ) ? 75 : top_offset;
		var element = elem.get( 0 );
		if ( element == undefined ) return false;
		var bounds = element.getBoundingClientRect();
		var output = bounds.top + top_offset < window.innerHeight && bounds.bottom > 0;
		// alert(output);
		return output;
	}

	// animate counter
	
	function bt_bb_animate_counter( $elm ) {
		var number_length = $elm.data( 'digit-length' );
		for ( var i = parseInt( number_length ); i > 0; i-- ) {
			var digit = parseInt( $elm.children( '.p' + i ).data( 'digit' ) );
			if ( digit == 0 ) digit = 10;
			if ( isNaN( digit ) ) digit = 10;
			for ( var j = 0; j <= digit; j++ ) {
				$elm.children( '.p' + i ).css( 'transform', 'translateY(-' + digit * $elm.outerHeight() + 'px)' );
			}
			$elm.addClass( 'animated' );
		}
		
		return false;
	}
	
	// paralax helpers 
	
	window.bt_bb_requestAnimFrame = function() {
		return (
			window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function( callback ) {
				window.setTimeout( callback, 1000 / 60 );
			}
		);
	}();
	
	window.is_edge = ( navigator.userAgent.indexOf('Edge') !== -1 ) ? true : false;

	window.bt_bb_raf_loop = function() {
		var win_w = window.innerWidth;
		var win_h = window.innerHeight;
		$( 'html.bt_bb_backgroud_fixed_supported .bt_bb_parallax' ).each(function() {
			if ( $( 'html' ).attr( 'data-bt_bb_screen_resolution' ) !== 'xl' ) {
				$( this )[0].style.backgroundPosition = 'center center';
				return false;
			} else {
					var bounds = this.getBoundingClientRect();
					if ( bounds.top < win_h && bounds.bottom > 0 ) {
						var speed = parseFloat( $( this ).attr( 'data-parallax' ) ) + 0.0001;
						if ( window.is_edge ) speed = - speed / 5;
						var offset = 0;
						if ( win_w > 1024 ) offset = parseFloat( $( this ).attr( 'data-parallax-offset' ) );
						var ypos = ( bounds.top ) * speed;
						if ( ypos > -0.5 && ypos < 0.5  ) {
							ypos = 0;
						}
						$( this )[0].style.backgroundPosition = '50% ' + ( ypos + offset ) + 'px';	
					}				
			}


		});
		window.bt_bb_raf_lock = false;
	}
	
	// touch screen detect
	
	window.bt_detect_touch = function() {
	  if (typeof window !== 'undefined') {
		var bt_has_touch = Boolean(
		  'ontouchstart' in window ||
		  window.navigator.maxTouchPoints > 0 ||
		  window.navigator.msMaxTouchPoints > 0 ||
		  window.DocumentTouch && document instanceof DocumentTouch
		);
		if ( bt_has_touch ) $('html').addClass( 'bt_bb_touch' );
	  }
	}
	
	// screen detect
	
	window.bt_bb_get_screen_resolution = function() {
		var width = Math.max( document.documentElement.clientWidth, window.innerWidth || 0 );
		var res = 'xl';
		if (width <= 1200) res = 'lg';
		if (width <= 992) res = 'md';
		if (width <= 768) res = 'sm';
		if (width <= 480) res = 'xs';
		
		$( 'html' ).attr( 'data-bt_bb_screen_resolution', res );
		
		$( '[data-bt-override-class]' ).each(function() {
			var override_classes = $( this ).data( 'bt-override-class' );
			for ( var prefix in override_classes ) {
				if ( override_classes[ prefix ][ res ] !== undefined ) {
					var new_class = prefix + override_classes[ prefix ][ res ];
				} else {
					var new_class = prefix + override_classes[ prefix ][ 'xl' ];
				}
				$( this ).removeClass( override_classes[ prefix ][ 'current_class' ] );
				$( this ).addClass( new_class );
				override_classes[ prefix ][ 'current_class' ] = new_class;
				$( this ).data( 'override_classes', override_classes );
			};

		});
		
	}


	
	// Test fixed background support for iOS devices
	
	window.bt_bb_check_ios_fixed_background_support = function() {
		return ( /iPad|iPhone|iPod/.test(navigator.userAgent) && ! window.MSStream ) ||
			   ( /MacIntel/.test(navigator.platform) && $('html').hasClass( 'bt_bb_touch' ) );
			   
			   /* /MacIntel/... <- checks iPadPro */
	}
	
	// Test fixed background support
	
	window.bt_bb_check_fixed_background = function() {
		var el = document.createElement('div');
		try {
			if ( ! ( 'backgroundAttachment' in el.style ) || bt_bb_check_ios_fixed_background_support() ) {
				$( 'html' ).removeClass( 'bt_bb_backgroud_fixed_supported' );
				return false;
			}
			el.style.backgroundAttachment = 'fixed';
			if ( ( 'fixed' === el.style.backgroundAttachment ) ) {
				$( 'html' ).addClass( 'bt_bb_backgroud_fixed_supported' );
				return true;			
			}
		}
		catch (e) {
			$( 'html' ).removeClass( 'bt_bb_backgroud_fixed_supported' );
			return false;
		}
	}
	
	// Countdown timer helpers
	
	window.bt_bb_countdown = function( elem, selector, i, arr, arr_prev ) {
		
		if ( arr[ i ] !== arr_prev[ i ] || elem.find( selector ).children().eq( 0 ).html() == '' ) {
			elem.find( selector ).children().addClass( 'countdown_anim' );
			elem.find( selector ).children().eq( 0 ).html( arr[ i ] );
			elem.find( selector ).children().eq( 1 ).html( arr_prev[ i ] );
			setTimeout(function() {
				elem.find( selector ).children().eq( 1 ).html( elem.find( selector ).children().eq( 0 ).html() );
				elem.find( selector ).children().removeClass( 'countdown_anim' );
			}, 300 );
		}
	}
	
	window.bt_bb_countdown_output = function( elem ) {
		
		var s = elem.data( 'init-seconds' );
		
		var delta = s;
		
		var days = Math.floor( delta / 86400 );
		delta -= days * 86400;

		var hours = Math.floor( delta / 3600 ) % 24;
		delta -= hours * 3600;

		var minutes = Math.floor( delta / 60 ) % 60;
		delta -= minutes * 60;

		var seconds = delta;
		
		if ( hours < 10 ) {
			hours = '0' + hours;
		}
		
		if ( minutes < 10 ) {
			minutes = '0' + minutes;
		}

		if ( seconds < 10 ) {
			seconds = '0' + seconds;
		}

		var seconds_arr_prev = seconds.toString().split( '' );
		var minutes_arr_prev = minutes.toString().split( '' );
		var hours_arr_prev = hours.toString().split( '' );		
		
		s = s - 1;
		if ( s < 0 ) {
			s = 0;
		}
		
		var delta = s;
		
		var days = Math.floor( delta / 86400 );
		delta -= days * 86400;

		var hours = Math.floor( delta / 3600 ) % 24;
		delta -= hours * 3600;

		var minutes = Math.floor( delta / 60 ) % 60;
		delta -= minutes * 60;

		var seconds = delta;
		
		if ( hours < 10 ) {
			hours = '0' + hours;
		}
		
		if ( minutes < 10 ) {
			minutes = '0' + minutes;
		}

		if ( seconds < 10 ) {
			seconds = '0' + seconds;
		}
		
		var seconds_arr = seconds.toString().split( '' );
		var minutes_arr = minutes.toString().split( '' );
		var hours_arr = hours.toString().split( '' );

		for ( var i = 0; i <= 1; i++ ) {
			bt_bb_countdown( elem, '.seconds .n' + i, i, seconds_arr, seconds_arr_prev );
			bt_bb_countdown( elem, '.minutes .n' + i, i, minutes_arr, minutes_arr_prev );
			bt_bb_countdown( elem, '.hours .n' + i, i, hours_arr, hours_arr_prev );
		}
		
		var days_prev = 0;
		
		if ( days != days_prev ) {
			var days_arr = days.toString().split( '' );
			
			var days_html = '';
			for ( var i = 0; i < days_arr.length; i++ ) {
				days_html += '<span>' + days_arr[ i ] + '</span>';
			}

			elem.find( '.days' ).html( days_html + '<span class="days_text"><span>' + elem.find( '.days' ).data( 'text' ) + '</span></span>' );
		}
		
		days_prev = days;

		elem.data( 'init-seconds', s );		

	}
	
	function bt_bb_fix_slider_heights(){
		$( '.bt_bb_content_slider.bt_bb_height_keep-height .slick-slider' ).each(function( index ) {
			$( this ).find('.slick-slide').height('auto');
			var slickTrack = $( this ).find('.slick-track');
			var slickTrackHeight = $(slickTrack).height();
			$( this ).find('.slick-slide').css('height', slickTrackHeight + 'px');
		});
	}

	function bt_bb_init_elements() {
		
		// get row structure
		
		$( '.bt_bb_section .bt_bb_row' ).each( function( index ) {
			var data_structure = [];
			$( this ).data( 'structure', "0" );
			$( this ).find('.bt_bb_column').each( function( index ) {
				data_structure.push( $( this ).data( 'width' ) );
			});
			$( this ).attr( 'data-structure', data_structure.join("-") );
		});
		
		$( '.bt_bb_row_inner' ).each( function( index ) {
			var data_structure = [];
			$( this ).data( 'structure', "0" );
			$( this ).find('.bt_bb_column_inner').each( function( index ) {
				data_structure.push( $( this ).data( 'width' ) );
			});
			$( this ).attr( 'data-structure', data_structure.join("-") );
		});
		
		// slick slider
		
		$( '.slick-slider' ).slick();
		$( '.slick-slider .slick-prev, .slick-slider .slick-next, .slick-slider .slick-dots li' ).click(function() {
			$( this ).closest( '.slick-slider' ).slick( 'slickPause' );
		});
		$( '.bt_bb_slider.bt_bb_use_lightbox .slick-slider .bt_bb_slider_item' ).click(function() {
			$( this ).closest( '.slick-slider' ).slick( 'slickPause' );
		});
		
		// image slider lightbox
		
		$( '.bt_bb_slider.bt_bb_use_lightbox' ).each(function() {
			$( this ).magnificPopup({
				delegate: '.bt_bb_slider_item:not(.slick-cloned)',
				type: 'image',
				gallery:{
					enabled: true
				},
				callbacks: {
					elementParse: function( item ) { item.src = item.el.data( 'src-full' ); }
				},
				closeBtnInside: false,
				fixedContentPos: false
			});
		});
		
		// image lightbox
		
		$( '.bt_bb_image.bt_bb_use_lightbox a' ).each(function() {
			$( this ).magnificPopup({
				delegate: 'img',
				type: 'image',
				gallery:{
					enabled: true
				},
				callbacks: {
					elementParse: function( item ) { item.src = item.el.data( 'full_image_src' ); }
				},
				closeBtnInside: false,
				fixedContentPos: false
			});
			/*return false;*/
		});

		// force slider item equal height when keep height is active

		$('.bt_bb_content_slider.bt_bb_height_keep-height .slick-slider').on('setPosition', function () {
			bt_bb_fix_slider_heights();
			$( this ).find( '*[aria-hidden=true] a, *[aria-hidden=true] button' ).attr( 'tabindex', -1 );
			$( this ).find( '*[aria-hidden=false] a, *[aria-hidden=false] button' ).removeAttr( 'tabindex' );
		});
		$(window).on('resize', function(e) {
			bt_bb_fix_slider_heights();
			bt_bb_get_screen_resolution();
		});
		 	
		// bt_bb_elements.js resets animated class
		$( '.slick-slider' ).on('beforeChange', function(event, slick, currentSlide, nextSlide){
		  $( this ).find( '.slick-slide .animated' ).removeClass( 'animated' );
		  $( this ).find( '.slick-slide[data-slick-index='+nextSlide+'] .animate' ).addClass( 'animated' );
		});

		// tabs
		$( '.bt_bb_tabs .bt_bb_tabs_header li' ).click(function() {
			$( this ).siblings().removeClass( 'on' );
			$( this ).addClass( 'on' );
			$( this ).closest( '.bt_bb_tabs' ).find( '.bt_bb_tab_item' ).removeClass( 'on' );
			$( this ).closest( '.bt_bb_tabs' ).find( '.bt_bb_tab_item' ).eq( $( this ).index() ).addClass( 'on' );
			

		});
		$( '.bt_bb_tabs' ).each(function() {
			$( this ).find( 'li' ).first().click();
		});
		
		// Detect touch
		
		bt_detect_touch();
		
		// Get screen resolution
		
		bt_bb_get_screen_resolution();

		// parallax
		
		bt_bb_check_fixed_background();
		
		if ( $( 'html.bt_bb_backgroud_fixed_supported .bt_bb_parallax' ).length > 0 ) {


			window.bt_bb_raf_lock = false;

			$( window ).on( 'mousewheel', function( e ) { });
			
			$( window ).on( 'scroll', function() {
				if ( ! window.bt_bb_raf_lock ) {
					window.bt_bb_raf_lock = true;
					bt_bb_requestAnimFrame( bt_bb_raf_loop );
				}
			});
			
			bt_bb_requestAnimFrame( bt_bb_raf_loop );

			$( window ).on( "load", function() { 
				bt_bb_requestAnimFrame( bt_bb_raf_loop );
			});

		}

		// Countdown
		
		$( '.btCountdownHolder' ).each(function() {

			var cd = $( this );
			var s = cd.data( 'init-seconds' );

			bt_bb_countdown_output( cd );

			setInterval(function() {
				bt_bb_countdown_output( cd );
			}, 1000 );
		});		
	}

	// google maps
	
	window.bt_bb_gmap_init_static_new = function ( map_id ) {
		var mapElement_jQuery = jQuery( '#' + map_id );
		if ( mapElement_jQuery.data( 'init-finished' ) == true ) return false;
		var zoom = ( typeof mapElement_jQuery.data( 'zoom' ) !== 'undefined' ) ? mapElement_jQuery.data( 'zoom' ) : 8;
		var custom_style = ( typeof mapElement_jQuery.data( 'custom-style' ) !== 'undefined' ) ? mapElement_jQuery.data( 'custom-style' ) : '';
		var api_key = ( typeof mapElement_jQuery.data( 'api-key' ) !== 'undefined' ) ? mapElement_jQuery.data( 'api-key' ) : '';
		var height = ( typeof mapElement_jQuery.data( 'height' ) !== 'undefined' ) ? mapElement_jQuery.data( 'height' ) : 0;
		bt_bb_gmap_init_static( map_id, zoom, custom_style, height, api_key );
		mapElement_jQuery.data( 'init-finished', true );
		
	}
	
	window.bt_bb_gmap_init_new = function ( map_id ) {
		var mapElement_jQuery = jQuery( '#' + map_id );
		if ( mapElement_jQuery.data( 'init-finished' ) == true ) return false;
		var zoom = ( typeof mapElement_jQuery.data( 'zoom' ) !== 'undefined' ) ? mapElement_jQuery.data( 'zoom' ) : 8;
		var custom_style = ( typeof mapElement_jQuery.data( 'custom-style' ) !== 'undefined' ) ? mapElement_jQuery.data( 'custom-style' ) : '';
		bt_bb_gmap_init( map_id, zoom, custom_style );
		mapElement_jQuery.data( 'init-finished', true );
	}
	
	document.addEventListener("readystatechange", function() {  
		if ( ( document.readyState === "interactive" || document.readyState === "complete" ) ) {  
			if ( typeof( bt_bb_gmap_init_new ) !== typeof(Function) ) { 
				return false;
			}
			$( ".bt_bb_google_maps_map" ).each(function( index ) {
				if ( $( this ).data( 'map-type' ) != 'static' ) {
					bt_bb_gmap_init_new( $( this ).attr( 'id' ) );
				} else {
					bt_bb_gmap_init_static_new( $( this ).attr( 'id' ) );
				};
			});
			
		};
	}, false);

	window.bt_bb_gmap_init_static = function ( map_id, zoom, custom_style, height, api_key ) {
		
		if ( parseInt( height ) <= 0 ) height = 400;
		
		var container = jQuery( '#' + map_id ).parent();
		
		var locations = container.find( '.bt_bb_map_location' );
		
		var center_map = container.data( 'center' );
		if ( center_map == 'no' ) {
			center_map = false;
		} else {
			center_map = true;
		}

		var lat_sum = 0;
		var lng_sum = 0;
		var markerStr = '';
		var n = 0;
		var colors = ['blue', 'green', 'red', 'purple', 'yellow', 'gray', 'orange', 'white', 'black', 'brown' ]
	
		locations.each(function() {
			
			var lat = jQuery( this ).data( 'lat' );
			var lng = jQuery( this ).data( 'lng' );
			var iconStr = jQuery( this ).data( 'icon' ) != "" ? 'scale:2%7Cicon:' + jQuery( this ).data( 'icon' ) : 'size:mid%7Ccolor:' + colors[n];

			lat_sum += parseFloat(lat);
			lng_sum += parseFloat(lng);
			
			markerStr += '&markers=' + iconStr + '%7C' + lat + ',' + lng;

			var centerLatLng = [ lat, lng ];

			n++;
		});
		

		if ( center_map ) {
			var centerLatLng = [ lat_sum / n, lng_sum / n ];
		}
		
		var img_src = '<img src="https://maps.googleapis.com/maps/api/staticmap?center=' + centerLatLng.toString() + '&zoom=' + zoom + markerStr + '&size=640x' + height + '&scale=2&style=' + atob( custom_style ) + '&key=' + api_key + '">';
		container.find( '.bt_bb_google_maps_map.bt_bb_map_map' ).append( img_src ).on('click', function(){ $( '.bt_bb_map_location_show' ).removeClass( 'bt_bb_map_location_show' ).nextOrFirst().addClass( 'bt_bb_map_location_show' ) });
		
		locations.eq( 0 ).addClass( 'bt_bb_map_location_show' );
		
		jQuery( '#' + map_id ).data( 'init-finished', true );
		
	}
	
	$.fn.nextOrFirst = function( selector ) {
	  var next = this.next( selector );
	  return ( next.length ) ? next : this.prevAll( selector ).last();
	};
	
	window.bt_bb_gmap_init = function ( map_id, zoom, custom_style ) {

		var myLatLng = new google.maps.LatLng( 0, 0 );
		var mapOptions = {
			zoom: zoom,
			center: myLatLng,
			scrollwheel: false,
			scaleControl:true,
			zoomControl: true,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.SMALL,
				position: google.maps.ControlPosition.RIGHT_CENTER
			},
			streetViewControl: true,
			mapTypeControl: true
		}

		var mapElement = document.getElementById( map_id );

		if ( mapElement )
		{
			var map = new google.maps.Map( mapElement, mapOptions );

			if ( custom_style != '' ) {
				
				var style_array = [];
				
				if ( custom_style != '' ) {
					style_array = JSON.parse( atob( custom_style ) );
				}
				
				var customMapType = new google.maps.StyledMapType( style_array, {
					name: 'Custom Style'
				});

				var customMapTypeId = 'custom_style';
				map.mapTypes.set( customMapTypeId, customMapType );
				map.setMapTypeId( customMapTypeId );
			}

			var n = 0;

			var container = jQuery( '#' + map_id ).parent();
			
			var locations = container.find( '.bt_bb_map_location' );
			
			var center_map = container.data( 'center' );
			if ( center_map == 'no' ) {
				center_map = false;
			} else {
				center_map = true;
			}

			var lat_sum = 0;
			var lng_sum = 0;
		
			locations.each(function() {
				
				var lat = jQuery( this ).data( 'lat' );
				var lng = jQuery( this ).data( 'lng' );
				var icon = jQuery( this ).data( 'icon' );

				lat_sum += parseFloat(lat);
				lng_sum += parseFloat(lng);

				var myLatLng = new google.maps.LatLng( lat, lng );
				var marker = new google.maps.Marker({
					position: myLatLng,
					map: map,
					icon: icon,
					count: n
				});
				
				if ( ! center_map && n == 0 ) {
					map.setCenter( myLatLng );
				}
				
				locations.eq( 0 ).addClass( 'bt_bb_map_location_show' );
				
				marker.addListener( 'click', function() {
					//map.setZoom( zoom );
					//map.setCenter( marker.getPosition() );
					var reload = true;
					if ( locations.eq( this.count ).hasClass( 'bt_bb_map_location_show' ) && !container.hasClass( 'bt_bb_map_no_overlay' ) ) reload = false; 
					container.removeClass( 'bt_bb_map_no_overlay' );
					locations.removeClass( 'bt_bb_map_location_show' );
					if ( reload ) locations.eq( this.count ).addClass( 'bt_bb_map_location_show' );
				});
				
				n++;
			});

			if ( center_map ) {
				var centerLatLng = new google.maps.LatLng( lat_sum / n, lng_sum / n );
				map.setCenter( centerLatLng );
			}
		}
		
		jQuery( '#' + map_id ).data( 'init-finished', true );
		
	}
	
	// leaflet map init
	
	var map = null;
	 
	window.bt_bb_leaflet_init = function ( map_id, zoom, max_zoom, predefined_style, scroll_wheel, custom_style, zoom_control ) { 
		onImagesLoaded( $('#' + map_id ).parent(), function() {
			bt_bb_leaflet_init_late ( map_id, zoom, max_zoom, predefined_style, scroll_wheel, custom_style, zoom_control );
		});

	}
	
	window.bt_bb_leaflet_init_late = function ( map_id, zoom, max_zoom, predefined_style, custom_style, scroll_wheel, zoom_control ) {
		
		var lat_center     = 0;
		var lng_center     = 0;

		var container   = jQuery( '#' + map_id ).parent();
		var locations   = container.find( '.bt_bb_leaflet_map_location' );
		
		var center_map = container.data( 'center' );
		
		if ( center_map == 'no' ) {
			center_map = false;
		} else {
			center_map = true;
		}
		
		var markerClusters = L.markerClusterGroup();
		
		var lat_sum = 0;
		var lng_sum = 0; 
		var n = 0;

		locations.each(function() {

			var lat     = jQuery( this ).data( 'lat' );
			var lng     = jQuery( this ).data( 'lng' );
			var icon    = jQuery( this ).data( 'icon' );
			lat_sum += parseFloat(lat);
			lng_sum += parseFloat(lng);
			
			if ( n == 0 ) {
				 lat_center  = lat;
				 lng_center  =  lng;
			} 
			locations.eq( 0 ).addClass( 'bt_bb_map_location_show' ); 
			locations.eq( 0 ).addClass( 'bt_bb_map_location_show' );
			
			var myIcon = L.icon({
				iconUrl: icon,
				iconRetinaUrl: icon,
				iconSize: [45, 58],
				iconAnchor: [9, 21],
				popupAnchor: [0, -14]
			  });
			// console.log(lat);
			// console.log(lng);
			var m = L.marker( [ lat, lng ], { icon: myIcon, id: n,  lat: lat, lng:lng } ).on("click", markerOnClick);
			markerClusters.addLayer( m );  
			
			n++;
		});
		
		if ( center_map ) {
			lat_center  = lat_sum / n;
			lng_center  = lng_sum / n;
		}

		map = L.map( document.getElementById( map_id ) ).setView( [lat_center, lng_center], zoom );
		
		var tiles_arr = [];
		
		if ( parseInt( predefined_style ) > 0 ) {
			tiles_arr = tiles_arr.concat( map_leaflet_source_arr[ predefined_style ] );
		} 
		
		if ( custom_style != '' ) {
			custom_style = atob(custom_style);
			var tmp_arr = custom_style.split('\n');
			$.each( tmp_arr, function ( index, tmp ) {
				
				tiles_arr = tiles_arr.concat( [tmp.split(',')] );
			} );
		}
		
		$.each( tiles_arr, function ( index, tile ) {
			L.tileLayer( 
				tile[0], 
				{
					attribution: tile[1],
					maxZoom: max_zoom,
					subdomains: ['a','b','c']
				}
			).addTo( map );			
		} );
		
		map.addLayer( markerClusters );

		if ( scroll_wheel == '' ) {
			map.scrollWheelZoom.disable();
		}
		
		map.removeControl(map.zoomControl);
		
		if ( zoom_control ) {
			L.control.zoom({
				 position:'topright'
			}).addTo(map);		
		}
		

	   
		function markerOnClick( e ) {
			var attributes = e.target.options;
			var id = attributes.id;
			var reload = true;
			if ( locations.eq( id ).hasClass( 'bt_bb_leaflet_map_location_show' ) && !container.hasClass( 'bt_bb_leaflet_map_no_overlay' ) ) reload = false; 
			container.removeClass( 'bt_bb_leaflet_map_no_overlay' );
			locations.removeClass( 'bt_bb_leaflet_map_location_show' );
			if ( reload ) locations.eq( id ).addClass( 'bt_bb_leaflet_map_location_show' );
			
			if ( locations.eq( id ).hasClass( 'bt_bb_map_location_show' ) && !container.hasClass( 'bt_bb_map_no_overlay' ) ) reload = false; 
			container.removeClass( 'bt_bb_map_no_overlay' );
			locations.removeClass( 'bt_bb_map_location_show' );
			if ( reload ) locations.eq( id ).addClass( 'bt_bb_map_location_show' );
		}
	} 
	
	// do event if all images in container are loaded
	
	function onImagesLoaded( container, event ) {
		var images = container.find( '.bt_bb_leaflet_map_content img' );
		var loaded = images.length;
		if ( loaded > 0 ) {
			for (var i = 0; i < images.length; i++ ) {
				if ( images[i].complete ) {
					loaded--;
					if ( loaded == 0 ) {
						event();
					}
				} else {
					images[i].addEventListener( 'load', function() {
						loaded--;
						if ( loaded == 0 ) {
							event();
						}
					});
				}
			}			
		} else {
			event();
		} 
	}
	
	// general init
	
	var bt_bb_init_finished = false;
	
	document.addEventListener('readystatechange', function() {
		if ( ! bt_bb_init_finished && ( document.readyState === 'interactive' || document.readyState === 'complete' ) ) {
			bt_bb_init_elements();			
		
			if( ! $('body').hasClass('bodyPreloader') ) {
				bt_bb_animate_elements();	
			} else {
				setTimeout( function() {
					bt_bb_animate_elements();
				}, 5000 );
			}
			$( window ).on( 'scroll', function() { 
				bt_bb_animate_elements(); 
			});
			$( window ).on( 'resize', function( e ) {		
				setTimeout( function() {
					var $elems = $( '.bt_bb_counter.animated' );
					$elems.each(function() {
						var $elm = $( this );
						$elm.removeClass( 'animated' );
						bt_bb_animate_counter( $elm );
					});
				}, 1000 );		
			});
			bt_bb_init_finished = true;		
		}

	}, false);

	

}( jQuery ));