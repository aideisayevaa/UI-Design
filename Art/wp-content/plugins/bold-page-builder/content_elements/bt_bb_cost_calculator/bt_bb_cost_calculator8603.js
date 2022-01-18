(function( $ ) {
	"use strict";
	
	$( document ).ready(function() {
		bt_bb_cost_calculator();
		
		// number
		$( '.bt_bb_widget_number input' ).on( 'keyup change', function() {
			$( this ).closest( '.bt_bb_cost_calculator_item' ).data( 'value', $( this ).val() );
			bt_bb_cost_calculator();
		});
		
		// select
		$( '.bt_bb_widget_select_selected' ).on( 'click', function() {
			$( this ).next().slideToggle( 200 );
		});
		
		$( '.bt_bb_widget_select_items > div' ).on( 'click', function() {
			$( this ).closest( '.bt_bb_cost_calculator_item' ).data( 'value', $( this ).data( 'value' ) );
			$( this ).parent().prev( '.bt_bb_widget_select_selected' ).html( $( this ).html() );
			$( this ).parent().slideToggle( 200 );
			bt_bb_cost_calculator();
		});		
		
		// switch
		$( '.bt_bb_widget_switch' ).on( 'click', function() {
			
			if ( $( this ).hasClass( 'on' ) ) {
				$( this ).closest( '.bt_bb_cost_calculator_item' ).data( 'value', '0' );
			} else {
				$( this ).closest( '.bt_bb_cost_calculator_item' ).data( 'value', $( this ).data( 'on' ) );
			}
			
			$( this ).toggleClass( 'on' );
			
			bt_bb_cost_calculator();
		});
		
	});
	
	var bt_bb_cost_calculator = function() {
		
		$( '.bt_bb_cost_calculator' ).each(function() {
			
			var total = 0;
			
			var current = 0;
			
			$( this ).find( '.bt_bb_cost_calculator_item' ).each(function() {
				current = parseFloat( $( this ).data( 'value' ) );
				if ( isNaN( current ) ) {
					current = 0;
				}				 
				total += current;
			});

			total = total.toFixed( 2 ).replace( /(\d)(?=(\d{3})+\.)/g, '$1,' );
			
			$( this ).find( '.bt_bb_cost_calculator_total_amount' ).html( total );
			
		});
	}

})( jQuery );