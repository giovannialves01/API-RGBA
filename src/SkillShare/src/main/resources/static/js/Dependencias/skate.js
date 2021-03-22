/**
 * ================================================================================
 * Rummage
 * jQuery Searchables
 * --------------------------------------------------------------------------------
 * Author:      Andrew Hosgood
 * Version:     2.8.1
 * Date:        08/11/2014
 * ================================================================================
 */

(
	function( $ ) {
		try {
			if( window.jQuery ) {
				$( '.banner-slider' ).each(
					function() {
						var jqoThisSlider = $( this ),
							jqoThisSliderContents = jqoThisSlider.find( '.banner-slider-contents' ),
							jqoThisSliderArrows = jqoThisSlider.find( '.banner-slider-arrows' ),
							jqoThisSliderBlobs = jqoThisSlider.find( '.banner-slider-blobs' ),
							intSlides = jqoThisSliderContents.children().length,
							intSlide = 0,
							intTransition = 800,
							intDelay = 2000,
							funSlide = function() {
								jqoThisSliderBlobs.find( '.current' ).removeClass( 'current' );
								intSlide++;
								if( intSlide < intSlides ) {
									jqoThisSliderContents.animate(
										{
											left: '-' + ( intSlide * 100 ) + '%'
										},
										intTransition,
										function() {
											jqoThisSliderBlobs.find( ':nth-child(' + ( intSlide + 1 ) + ')' ).addClass( 'current' );
											timSlide = setTimeout( funSlide, intDelay );
										}
									);
								} else {
									jqoThisSliderContents.animate(
										{
											left: '-' + ( intSlide * 100 ) + '%'
										},
										intTransition,
										function() {
											intSlide = 0;
											jqoThisSliderContents.css(
												{
													left: '0'
												}
											);
											jqoThisSliderBlobs.find( ':nth-child(' + ( intSlide + 1 ) + ')' ).addClass( 'current' );
											timSlide = setTimeout( funSlide, intDelay );
										}
									);
								}
							},
							timSlide;

						//jqoThisSliderContents.append( jqoThisSliderContents.find( '> :first-child' ).clone() );
						jqoThisSliderContents.children( ':last-child' ).after( jqoThisSliderContents.find( '> :first-child' ).clone() );

						for( var intNav = 0; intNav < intSlides; intNav++ ) {
							jqoThisSliderBlobs.append( '<li/>' );
						}

						jqoThisSliderArrows.on( 'click', 'li.previous',
							function() {
								clearInterval( timSlide );
								jqoThisSliderContents.stop( true );
								intSlide -= 2;
								funSlide();
							}
						).on( 'click', 'li.next',
							function() {
								clearInterval( timSlide );
								jqoThisSliderContents.stop( true );
								funSlide();
							}
						),
							jqoThisSliderBlobs.on( 'click', 'li',
								function() {
									clearInterval( timSlide );
									jqoThisSliderContents.stop( true );
									intSlide = $( this ).index() - 1;
									funSlide();
								}
							).find( ':nth-child(' + ( intSlide + 1 ) + ')' ).addClass( 'current' );

						timSlide = setTimeout( funSlide, intDelay );
					}
				);
			} else {
				throw 'Skate requires jQuery to run';
			}
		} catch( err ) {
			if( window.console ) {
				if( window.console.error ) {
					console.error( err );
				} else if( window.console.log ) {
					console.log( err );
				}
			}
		}
	}
)( jQuery );