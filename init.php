<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function gutentag_cgb_block_assets() { // phpcs:ignore
	wp_enqueue_style('style', get_stylesheet_uri(), NULL, microtime(), 'all');

	// Register block editor script for backend.
	wp_register_script(
		'gutentag-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-api' ), // Dependencies, defined above.
		null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	// WP Localized globals. Use dynamic PHP stuff in JavaScript via `cgbGlobal` object.
	wp_localize_script(
		'gutentag',
		'cgbGlobal', // Array containing dynamic data for a JS Global.
		[
			'pluginDirPath' => plugin_dir_path( __DIR__ ),
			'pluginDirUrl'  => plugin_dir_url( __DIR__ ),
			// Add more data here that you want to access from `cgbGlobal` object.
		]
	);

	/**
	 * Register Gutenberg block on server-side.
	 *
	 * Register the block on server-side to ensure that the block
	 * scripts and styles for both frontend and backend are
	 * enqueued when the editor loads.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
	 * @since 1.16.0
	 */
 	register_block_type( 'gutentag/home-atf', array( 'editor_script' => 'gutentag-js', ) );
	register_block_type( 'gutentag/loc-atf', array( 'editor_script' => 'gutentag-js', ) );
	register_block_type( 'gutentag/section', array( 'editor_script' => 'gutentag-js', ) );
 	register_block_type( 'gutentag/flex', array( 'editor_script' => 'gutentag-js', ) );

	register_block_type( 'gutentag/card', array( 'editor_script' => 'gutentag-js', ) );
	register_block_type( 'gutentag/mega', array( 'editor_script' => 'gutentag-js', ) );
	register_block_type( 'gutentag/show', array( 'editor_script' => 'gutentag-js', ) );
	register_block_type( 'gutentag/simple-card', array( 'editor_script' => 'gutentag-js', ) );
	register_block_type( 'gutentag/hidshow', array( 'editor_script' => 'gutentag-js', ) );



	register_block_type( 'gutentag/fp-section', array( 'editor_script' => 'gutentag-js', ) );

	register_block_type( 'gutentag/gastronomia-item', array( 'editor_script' => 'gutentag-js', ) );

	// register_block_type( 'gutentag/load-post', array( 'editor_script' => 'gutentag-js', ) );
	// register_block_type( 'gutentag/load-cont', array( 'editor_script' => 'gutentag-js', ) );
}

// Hook: Block assets.
add_action( 'init', 'gutentag_cgb_block_assets' );




function my_mario_block_category( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array( 'slug' => 'multicard', 'title' => __( 'Cards', 'multicard' ), ),
			array( 'slug' => 'sections', 'title' => __( 'Sections', 'sections' ), ),
		)
	);
}
add_filter( 'block_categories', 'my_mario_block_category', 10, 2);
