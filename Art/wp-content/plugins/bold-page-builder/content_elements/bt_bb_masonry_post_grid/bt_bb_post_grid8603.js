(function( $ ) {
	"use strict";
	
	var bt_bb_post_grid_resize = function( root ) {
		root.each(function() {
			$( this ).find( '.bt_bb_grid_item' ).each(function() {
				$( this ).find( '.bt_bb_grid_item_post_thumbnail' ).height( Math.floor( $( this ).width() * $( this ).data( 'hw' ) ) );
			});
		});
	}

	var bt_bb_post_grid_load_images = function( root ) {
		root.each(function() {
			var page_bottom = $( window ).scrollTop() + $( window ).height();
			$( this ).find( '.bt_bb_grid_item' ).each(function() {
				var this_top = $( this ).offset().top;
				if ( this_top < page_bottom + $( window ).height() ) {
					var img_src = $( this ).data( 'src' );
					if ( img_src !== '' && $( this ).find( '.bt_bb_grid_item_post_thumbnail a' ).html() == '' ) {
						$( this ).find( '.bt_bb_grid_item_post_thumbnail a' ).html( '<img src="' + img_src + '" alt="' + $( this ).data( 'alt' ) + '">' );
					}
				}
			});
		});
	}

	var bt_bb_post_grid_load_items = function( root ) {
		root.each(function() {
			var loading = root.data( 'loading' );
			if ( loading === undefined || ( loading != 'loading' && loading != 'no_more' ) ) {
				var page_bottom = $( window ).scrollTop() + $( window ).height();
				$( this ).find( '.bt_bb_grid_item' ).each(function() {
					var this_top = $( this ).offset().top;
					if ( this_top < page_bottom + $( window ).height() ) {
						if ( $( this ).is( ':last-child' ) ) {
							var root_data_offset = root.data( 'offset' );
							var offset = parseInt( root_data_offset === undefined ? 0 : root_data_offset ) + parseInt( root.data( 'number' ) );
							bt_bb_post_grid_load_posts( root, offset );
							return false;
						}
					}
				});
			}
		});
	}

	var bt_bb_post_grid_load_posts = function( root, offset ) {

		if ( offset == 0 ) {
			root.addClass( 'bt_bb_grid_hide' );
			root.find( '.bt_bb_grid_item' ).remove();
			if ( root.hasClass( 'masonry' ) ) {
				root.masonry( 'destroy' );
			}
		}

		root.parent().find( '.bt_bb_post_grid_loader' ).show();

		var action = 'bt_bb_get_grid';

		var root_data_number = root.data( 'number' );

		var data = {
			'action': action,
			'number': root_data_number,
			'category': root.data( 'category' ),
			'show': root.data( 'show' ),
			'bt-bb-masonry-post-grid-nonce': root.data( 'bt-bb-masonry-post-grid-nonce' ),
			'post-type': root.data( 'post-type' ),
			'offset': offset
		};

		root.data( 'loading', 'loading' );

		$.ajax({
			type: 'POST',
			url: ajax_object.ajax_url,
			data: data,
			async: true,
			success: function( response ) {

				if ( response == '' ) {
					root.data( 'loading', 'no_more' );
					root.parent().find( '.bt_bb_post_grid_loader' ).hide();
					return;
				}

				var $content = $( response );
				root.append( $content );
				bt_bb_post_grid_resize( root );

				root.data( 'offset', offset );

				if ( offset > 0 ) {
					root.masonry( 'appended', $content );
				} else {
					if ( $( 'html' ).attr( 'dir' ) == 'rtl' ) {
						root.masonry({
							columnWidth: '.bt_bb_grid_sizer',
							itemSelector: '.bt_bb_grid_item',
							gutter: 0,
							percentPosition: true,
							isRTL: true
						});	
					} else {
						root.masonry({
							columnWidth: '.bt_bb_grid_sizer',
							itemSelector: '.bt_bb_grid_item',
							gutter: 0,
							percentPosition: true
						});
					}
				}
				root.parent().find( '.bt_bb_post_grid_loader' ).hide();
				root.removeClass( 'bt_bb_grid_hide' );
				$( '.bt_bb_grid_container' ).css( 'height', 'auto' );

				bt_bb_post_grid_load_images( root );

				if ( root.data( 'auto-loading' ) == 'auto_loading' ) {
					root.data( 'loading', '' );
				} else {
					root.data( 'loading', 'no_more' );
				}

			},
			error: function( response ) {
				root.parent().find( '.bt_bb_post_grid_loader' ).hide();
				root.removeClass( 'bt_bb_grid_hide' );			
			}
		});
	}

	$( document ).ready(function() {

		$( window ).on( 'resize', function() {
			bt_bb_post_grid_resize( $( '.bt_bb_masonry_post_grid_content' ) );
		});

		$( window ).on( 'scroll', function() {
			bt_bb_post_grid_load_images( $( '.bt_bb_masonry_post_grid_content' ) );
			bt_bb_post_grid_load_items( $( '.bt_bb_masonry_post_grid_content' ) );
		});

		$( '.bt_bb_masonry_post_grid_content' ).each(function() {
			var grid_content = $( this );
			bt_bb_post_grid_load_posts( grid_content, 0 );
		});

		$( '.bt_bb_post_grid_filter_item' ).on( 'click', function() {
			var root = $( this ).closest( '.bt_bb_grid_container' );
			root.height( root.height() );
			$( this ).parent().find( '.bt_bb_post_grid_filter_item' ).removeClass( 'active' ); 
			$( this ).addClass( 'active' );
			var grid_content = $( this ).closest( '.bt_bb_masonry_post_grid' ).find( '.bt_bb_masonry_post_grid_content' );
			grid_content.data( 'category', $( this ).data( 'category' ) );
			bt_bb_post_grid_load_posts( grid_content, 0 );
		});

	});
})( jQuery );