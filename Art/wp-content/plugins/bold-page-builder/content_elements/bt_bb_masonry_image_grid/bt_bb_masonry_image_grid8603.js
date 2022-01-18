(function( $ ) {
	"use strict";
	
	var bt_bb_masonry_image_grid_fix_resize = function() {
		$( '.bt_bb_masonry_image_grid .bt_bb_grid_item' ).each(function() {
			$( this ).height( Math.floor( $( this ).width() * $( this ).data( 'hw' ) ) );
		});
		$( '.bt_bb_masonry_image_grid' ).each( function() {
			$( this ).width( 'initial' );
			var child_margin = parseInt( $( this ).find( '.bt_bb_masonry_post_image_content' ).css( 'margin-right' ) ) + parseInt( $( this ).find( '.bt_bb_masonry_post_image_content' ).css( 'margin-left' ) );
			var base_item_width =  ( $( this ).width() - child_margin ) / ( $( this ).data( 'columns' ) ) ;
			if ( Math.ceil( base_item_width ) != base_item_width ) {
				$( this ).width( $( this ).data( 'columns' ) * Math.ceil( base_item_width ) + child_margin );
			} 				
		});

	}

	var bt_bb_masonry_image_grid_load_images = function( ) {
		$( '.bt_bb_masonry_image_grid' ).each(function() {
			var page_bottom = $( window ).scrollTop() + $( window ).height();
			$( this ).find( '.bt_bb_grid_item' ).each(function() {
				var this_top = $( this ).offset().top;
				if ( this_top < page_bottom + $( window ).height() ) {
					var img_src = $( this ).data( 'src' );
					var img_title = $( this ).data( 'title' );
					var img_src_full = $( this ).data( 'src-full' );
					if ( img_src !== '' && $( this ).find('.bt_bb_grid_item_inner_image').html() == '' ) {
						$( this ).find('.bt_bb_grid_item_inner_image').html( '<img src="' + img_src + '" title="' + img_title + '" alt="' + img_title + '" data-src-full="' + img_src_full + '">' );
					}
				}
			});
		});
	}	


	$( window ).load(function() {

		bt_bb_masonry_image_grid_fix_resize();
		
		$( '.bt_bb_masonry_post_image_content' ).masonry({
			columnWidth: '.bt_bb_grid_sizer',
			itemSelector: '.bt_bb_grid_item',
			gutter: 0,
			percentPosition: true
		});
		
		bt_bb_masonry_image_grid_load_images();

		$( window ).on( 'resize', function() {
			bt_bb_masonry_image_grid_fix_resize();
		});
		
		$( window ).on( 'scroll', function() {
			bt_bb_masonry_image_grid_load_images();
		});
		
		setTimeout(function() {
			$( '.bt_bb_masonry_post_image_content' ).masonry( 'layout' );
		}, 10 );
		
		$( '.bt_bb_masonry_image_grid' ).not( '.bt_bb_no_lightbox' ).each(function() {
			$( this ).magnificPopup({
				delegate: '.bt_bb_grid_item',
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
	});

})( jQuery );