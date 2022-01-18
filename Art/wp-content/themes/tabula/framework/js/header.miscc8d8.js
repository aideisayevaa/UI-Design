'use strict';

var bt_initHeader;

(function( $ ) {
	
	var hasCentralMenu, verticalMenuEnabled, belowMenu, btStickyEnabled, responsiveMenuPosition, fullScreenMenuEnabled;
	
	function initial_header_setup() {
		
		var isTouchDevice = ( 'ontouchstart' in window ) || ( navigator.MaxTouchPoints > 0 ) || ( navigator.msMaxTouchPoints > 0 );
		
		if ( isTouchDevice ) {
			$( 'html' ).addClass( 'touch' );
			$( 'html' ).removeClass( 'no-touch' );
		} else {
			$( 'html' ).addClass( 'no-touch' );
			$( 'html' ).removeClass( 'touch' );
		}
		
		hasCentralMenu = $( 'body' ).hasClass( 'btMenuCenterEnabled' );
		verticalMenuEnabled = $( 'body' ).hasClass( 'btMenuVerticalLeftEnabled' ) || $( 'body' ).hasClass( 'btMenuVerticalRightEnabled' );
		fullScreenMenuEnabled = $( 'body' ).hasClass( 'btMenuFullScreenCenter' );
		
		if ( $( 'body' ).hasClass( 'rtl' ) ) {
			responsiveMenuPosition = 'Right';
		} else {
			responsiveMenuPosition = 'Left';
		}
		
		belowMenu = $( 'body' ).hasClass( 'btBelowMenu' );
		btStickyEnabled = $( 'body' ).hasClass( 'btStickyEnabled' );
		
		if ( typeof window.btStickyOffset == 'undefined' ) window.btStickyOffset = 250;
		if ( typeof window.responsiveResolution == 'undefined' ) window.responsiveResolution = '1200';
	}
	
	function final_header_setup() {
		
		$( 'li.btMenuWideDropdown' ).addClass(function(){
			return 'btMenuWideDropdownCols-' + $( this ).children( 'ul' ).children( 'li' ).length;
		});
	
		$( 'li.btMenuWideDropdown' ).each(function() {
			var maxChildItems = 0;
			$( this ).find( '> ul > li > ul' ).each(function( index ) {
				if ( $( this ).children().length > maxChildItems ) {
					maxChildItems = $( this ).children().length;
				}
			});
			$( this ).find( '> ul > li > ul' ).each(function( index ) {
				var bt_menu_base_length = $( this ).children().length;
				if ( bt_menu_base_length < maxChildItems ) {
					for ( var i = 0; i < maxChildItems - bt_menu_base_length; i++ ) {
						$( this ).append( '<li class="btEmptyParentElement"><a class="btEmptyElement">&nbsp;</a></li>' );
					} 
				}
			});
		});

		/* Show hide menu */

		$( '.btHorizontalMenuTrigger, .bt-horizontal-menu-trigger' ).on( 'click', function () {
			$( 'body' ).toggleClass( 'btShowMenu' );
			return false;
		});
		
		$( '.bt-fullscreen-menu-trigger' ).on( 'click', function () {
			$( 'body' ).toggleClass( 'bt-show-fullscreen-menu' );
			return false;
		});

		/* responsive menu toggler */

		$( '.btVerticalMenuTrigger, .bt-vertical-menu-trigger' ).on( 'click', function () {
			$( 'body' ).toggleClass( 'btMenuVerticalOn' );
			return false;
		});
	}
	
	function top_tools_search() {
		/* Top tools search */
		
		$('.mainHeader .btSearchInner').prependTo('body').addClass( 'btFromTopBox' );
		
		$('.mainHeader .widget_search').addClass( 'btIconWidget' );
		$( '.mainHeader .btSearch, .btFromTopBox .btSearchInnerClose' ).on( 'click', function () {
			$( 'body' ).toggleClass( 'btTopToolsSearchOpen' );
			
			if( $( 'body' ).hasClass( 'btTopToolsSearchOpen' ) ) {
				if ( $( '.btSearchInnerContent form input:text:visible:first' ).length ) boldthemes_requestTimeout( add_focus_to_serach, 500);
			}
			return false;
		});

	}
	
	function add_focus_to_serach() {
		// Focus to search field
		$( '.btSearchInnerContent form input:text:visible:first' ).focus();
	}

	function divide_menu() {

		if ( $( '.btTextLogo' ).length ) {
			var logoWidth = $( '.mainHeader .logo' ).width();
		} else  {
			if ( $( '.mainHeader .logo .btMainLogo' ).data( 'hw' ) ) {
				var logoWidth = $( '.mainHeader .logo' ).height() * $( '.mainHeader .logo .btMainLogo' ).data( 'hw' );
			} else {
				var logoWidth = $( '.mainHeader .logo' ).height() * 3;
			}
			
		}

		$( '.menuPort nav' ).addClass( 'leftNav' );
		$( '.menuPort' ).append( '<nav class="rightNav"><ul></ul></nav>' );
		var halfItems = Math.ceil( $( '.menuPort nav.leftNav ul>li:not(li li)' ).length * .5 );
		$( '.menuPort nav.rightNav > ul' ).append( $( '.menuPort nav.leftNav > ul > li' ).slice ( halfItems ) );
		$( '.menuPort nav.leftNav > ul > li' ).slice( halfItems ).remove();
		
		$( '.mainHeader .logo' ).css( 'transform', 'translateX(' + Math.round(-logoWidth * .5) + 'px)' );
		$( '.mainHeader .logo' ).css( 'width', logoWidth + 'px' );
		$( '.menuPort nav.leftNav' ).attr( 'style', '--margin:' + Math.round( logoWidth * .5 ) + 'px;margin-right:' + Math.round( logoWidth * .5 ) + 'px;' );
		$( '.menuPort nav.rightNav' ).attr( 'style', '--margin:' + Math.round( logoWidth * .5 ) + 'px;margin-left:' + Math.round( logoWidth * .5 ) + 'px;' );
	}
	
	/* Activate sticky function and call */
	
	function boldthemes_activate_sticky() {
		
		var fromTop = $( window ).scrollTop();
		if ( fromTop > window.btStickyOffset && !$('body').hasClass('btStickyHeaderActive') ) {
			$( 'body' ).addClass( 'btStickyHeaderActive' );
			/* 
			window.bt_openHeader = setTimeout( function() { 
				boldthemes_activate_sticky_open(); 
			}, 500 );
			*/
			boldthemes_requestTimeout( boldthemes_activate_sticky_open, 500);
		} else if ( fromTop <= window.btStickyOffset && $('body').hasClass('btStickyHeaderActive') && !$('body').hasClass('btStickyHeaderClosed') ) {
			$( 'body' ).addClass( 'btStickyHeaderClosed' );
			/*
			window.bt_closeHeader = setTimeout( function() { 
				boldthemes_activate_sticky_close() 
			}, 250 );
			*/
			boldthemes_requestTimeout( boldthemes_activate_sticky_close, 500);
		}
	}
	
	function boldthemes_activate_sticky_open() {
		$( 'body' ).addClass( 'btStickyHeaderOpen' );  		
	}
	function boldthemes_activate_sticky_close() {
		$( 'body' ).removeClass( 'btStickyHeaderActive btStickyHeaderOpen btStickyHeaderClosed' ); 		
	}
	
	window.boldthemes_requestTimeout = function(fn, delay) {
		if( !window.requestAnimationFrame      	&& 
			!window.webkitRequestAnimationFrame && 
			!(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
			!window.oRequestAnimationFrame      && 
			!window.msRequestAnimationFrame)
				return window.setTimeout(fn, delay);
				
		var start = new Date().getTime(),
			handle = new Object();
			
		function loop(){
			var current = new Date().getTime(),
				delta = current - start;
				
			delta >= delay ? fn.call() : handle.value = boldthemes_requestAnimFrame(loop);
		};
		
		handle.value = boldthemes_requestAnimFrame(loop);
		return handle;
	};
	
	window.boldthemes_requestAnimFrame = (function() {
		return  window.requestAnimationFrame       || 
				window.webkitRequestAnimationFrame || 
				window.mozRequestAnimationFrame    || 
				window.oRequestAnimationFrame      || 
				window.msRequestAnimationFrame     || 
				function(/* function */ callback, /* DOMElement */ element){
					window.setTimeout(callback, 1000 / 60);
				};
	})();
	
	/* Vertical menu setup */
	
	function responsive_menu_handler() {
		if ( !fullScreenMenuEnabled ) {
			if ( !verticalMenuEnabled ) {
				$(window).on("resize", function(event){
					if( window.innerWidth < window.responsiveResolution ) {
						$( 'body' ).addClass( 'btMenuVertical' + responsiveMenuPosition + ' btMenuVertical' ).removeClass( 'btMenuHorizontal' );
					} else {
						$( 'body' ).removeClass( 'btMenuVertical btMenuVertical' + responsiveMenuPosition + ' btMenuVerticalOn' ).addClass( 'btMenuHorizontal' );				
					}
					boldthemes_calculate_content_padding();
				});	
			}
		}
	}

	function init_menu() {
            		
		initial_header_setup();
		
		if ( !fullScreenMenuEnabled ) {
			if ( verticalMenuEnabled ) {
				if ( $( 'body' ).hasClass( 'btMenuVerticalLeftEnabled' )) $( 'body' ).addClass( 'btMenuVerticalLeft btMenuVertical' );
				if ( $( 'body' ).hasClass( 'btMenuVerticalRightEnabled' )) $( 'body' ).addClass( 'btMenuVerticalRight btMenuVertical' );
			} else {
				if ( $( 'body' ).hasClass( 'btMenuRightEnabled' )) $( 'body' ).addClass( 'btMenuRight btMenuHorizontal' );
				if ( $( 'body' ).hasClass( 'btMenuLeftEnabled' )) $( 'body' ).addClass( 'btMenuLeft btMenuHorizontal' );
				if ( $( 'body' ).hasClass( 'btMenuCenterBelowEnabled' )) $( 'body' ).addClass( 'btMenuCenterBelow btMenuHorizontal' );
				if ( $( 'body' ).hasClass( 'btMenuCenterEnabled' )) $( 'body' ).addClass( 'btMenuCenter btMenuHorizontal' );
				/* Switch to vertical */
				if( window.innerWidth < window.responsiveResolution ) {
					$( 'body' ).addClass( 'btMenuVertical' + responsiveMenuPosition + ' btMenuVertical' ).removeClass( 'btMenuHorizontal' );
				} else {
					$( 'body' ).removeClass( 'btMenuVertical btMenuVertical' + responsiveMenuPosition + ' btMenuVerticalOn' ).addClass( 'btMenuHorizontal' );				
				}
			}	
		}	
			
		// Move content below menu, must be donne after menu switch
		if ( ! belowMenu ) {
			boldthemes_calculate_content_padding();
		}
		
		setTimeout( function() { $( 'body' ).addClass( 'btMenuInitFinished' ); }, 100 );
		
		if ( btStickyEnabled ) {
			setTimeout( function() { 
				$( window ).scroll(function(){
					boldthemes_activate_sticky();
				});
			}, 1000 );
		}
		
		/* Menu split */
		
		if ( hasCentralMenu ) divide_menu();

		/* Menu sub togglers */
		
		$( '.menuPort ul ul' ).parent().prepend( '<div class="subToggler"></div>');

		$( '.menuPort ul li' ).on( 'mouseenter mouseleave', function (e) {
			if ( $( 'body' ).hasClass( 'btMenuVertical' ) || $( 'body' ).hasClass( 'btMenuFullScreenCenter' ) || $( 'html' ).hasClass( 'touch' ) ) {
				return false;
			}
			e.preventDefault();
			$( this ).siblings().removeClass( 'on' );
			$( this ).toggleClass( 'on' );
		});
		
		$( '.menuPort ul.menu' ).on( 'mouseenter mouseleave', function (e) {
			if ( $( 'body' ).hasClass( 'btMenuVertical' ) || $( 'body' ).hasClass( 'btMenuFullScreenCenter' ) || $( 'html' ).hasClass( 'touch' ) ) {
				return false;
			}
			$( this ).toggleClass( 'hover' );
		});

		$( 'div.subToggler' ).on( 'click', function(e) {
			var parent_item = $( this ).parent();
			parent_item.siblings().removeClass( 'on' );
			parent_item.toggleClass( 'on' );
			if ( parent_item.parent().hasClass( 'menu' ) ) parent_item.parent().toggleClass( 'hover' );
			if ( $( 'body' ).hasClass( 'btMenuVertical' ) ) {
				parent_item.find( 'ul' ).first().slideToggle( 200 );
			}
			return false;
		});
		
		final_header_setup();
		
	}
	
	/* Calculate content padding for not below menu */
	
	function boldthemes_calculate_content_padding() {
		if ( ! belowMenu ) {
			if( $( window ).width() < window.responsiveResolution || verticalMenuEnabled || fullScreenMenuEnabled ) {
				$( '.btContentWrap, .bt-content-wrap' ).css( 'padding-top', $( '.btVerticalHeaderTop, .bt-vertical-header-top' ).height() +'px');
			} else if ( !$( 'body' ).hasClass( 'btStickyHeaderActive' ) ) {
				$( '.btContentWrap, .bt-content-wrap' ).css( 'padding-top', $( '.mainHeader' ).height() +'px');
			}	
		}
	}

	function reinit_menu() {
		top_tools_search();
		setTimeout(function(){ init_menu(); }, 100);
		boldthemes_calculate_content_padding();
	}

	$( window ).on( 'load', function() { 
		boldthemes_calculate_content_padding();
	});	
	
	bt_initHeader = reinit_menu;
	top_tools_search();
	init_menu();
	responsive_menu_handler();
	
	
})( jQuery );