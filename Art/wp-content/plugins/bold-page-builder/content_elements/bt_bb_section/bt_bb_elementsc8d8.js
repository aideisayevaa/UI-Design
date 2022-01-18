(function( $ ) {
	"use strict";
	function bt_bb_video_background() {
		$( '.bt_bb_section.video' ).each(function() {
			var video = $( this ).find( '.mbYTP_wrapper video' );
			var w = $( this ).outerWidth();
			var h = $( this ).outerHeight();
			if ( w / h > 16 / 9 ) {
				video.css( 'width', '105%' );
				video.css( 'height', '' );
			} else {
				video.css( 'width', '' );
				video.css( 'height', '105%' );
			}
		});
	}

	window.bt_bb_video_callback = function( v ) {
		$( v ).parent().addClass( 'video_on' );
	}

	$( document ).ready(function () {
		bt_bb_video_background();
	});

	$( window ).on( 'resize', function( e ) {		
		bt_bb_video_background();		
	});
	
	$( window ).on( 'load', function( e ) {		
		$( 'a[href*="#"]:not([href="#"]):not([href*="#tab-"])' ).not( '.menu-scroll-down' ).on( 'click', function() { // .menu-scroll-down - 2017 theme, #tab- woocommerce tabs
			if ( location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname ) {
				var target = $( this.hash );
				target = target.length ? target : $( '[name=' + this.hash.slice(1) +']' );
				if ( target.length ) {
					$( 'html, body' ).animate({
						scrollTop: target.offset().top + parseFloat( window.bt_bb_scroll_nav_offset ? window.bt_bb_scroll_nav_offset : 0 )
					}, 1000 );
					if ( $( 'body' ).hasClass( 'btMenuVerticalOn' ) ) $( '.bt-vertical-menu-trigger, .btVerticalMenuTrigger' ).trigger( 'click' );
					return false;
				}
			}
		});		
	});	
})( jQuery );