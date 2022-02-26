<?php
/**
 * Class is responsible for loading all static assets.
 *
 * @package GatherPress
 * @subpackage Core
 * @since 1.0.0
 */

namespace GatherPress\Core;

use \GatherPress\Core\Traits\Singleton;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Assets.
 */
class Assets {

	use Singleton;

	/**
	 * URL to `build` directory.
	 *
	 * @var string
	 */
	protected $build = GATHERPRESS_CORE_URL . 'assets/build/';

	/**
	 * Path to `build` directory.
	 *
	 * @var string
	 */
	protected $path = GATHERPRESS_CORE_PATH . '/assets/build/';

	/**
	 * Assets constructor.
	 */
	protected function __construct() {
		$this->setup_hooks();
	}

	/**
	 * Setup hooks.
	 */
	protected function setup_hooks() {
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueue_scripts' ), 10, 1 );
		add_action( 'enqueue_block_editor_assets', array( $this, 'block_enqueue_scripts' ) );
	}

	/**
	 * Enqueue frontend styles and scripts.
	 */
	public function enqueue_scripts() {
		$asset = require_once $this->path . 'blocks_style.asset.php';
		wp_enqueue_style(
			'gatherpress-blocks-style',
			$this->build . 'blocks_style.css',
			$asset['dependencies'],
			$asset['version']
		);

		$asset = require_once $this->path . 'blocks_frontend.asset.php';
		wp_enqueue_script(
			'gatherpress-blocks-frontend',
			$this->build . 'blocks_frontend.js',
			$asset['dependencies'],
			$asset['version'],
			true
		);

		if ( is_singular( 'gp_event' ) ) {
			global $post;

			wp_localize_script(
				'gatherpress-blocks-frontend',
				'GatherPress',
				$this->localize( $post->ID ?? 0 )
			);
		}
	}

	/**
	 * Enqueue backend styles and scripts.
	 */
	public function admin_enqueue_scripts( $hook ) {
		if ( 'post-new.php' === $hook || 'post.php' === $hook ) {
			$asset = require_once $this->path . 'panels.asset.php';
			wp_enqueue_script(
				'gatherpress-panels',
				$this->build . 'panels.js',
				$asset['dependencies'],
				$asset['version'],
				true
			);
		}
	}

	/**
	 * Enqueue block styles and scripts.
	 */
	public function block_enqueue_scripts() {
		$post_id = $GLOBALS['post']->ID ?? 0;
		$event   = new Event( $post_id );

		$asset = require_once $this->path . 'blocks_style.asset.php';
		wp_enqueue_style(
			'gatherpress-blocks-style',
			$this->build . 'blocks_style.css',
			$asset['dependencies'],
			$asset['version']
		);

		$asset = require_once $this->path . 'blocks_backend.asset.php';
		wp_enqueue_script(
			'gatherpress-blocks-backend',
			$this->build . 'blocks_backend.js',
			$asset['dependencies'],
			$asset['version'],
			true
		);

		wp_localize_script(
			'gatherpress-blocks-backend',
			'GatherPress',
			$this->localize( $post_id ),
		);
	}

	/**
	 * Localize data to JavaScript.
	 *
	 * @param int $post_id Post ID for an event.
	 *
	 * @return array
	 */
	protected function localize( int $post_id ): array {
		$event = new Event( $post_id );
		$settings = Settings::get_instance();
		return array(
			'attendees'        => ( $event->attendee ) ? $event->attendee->get_attendees() : array(), // @todo cleanup
			'current_user'     => ( $event->attendee && $event->attendee->get_attendee( get_current_user_id() ) ) ? $event->attendee->get_attendee( get_current_user_id() ) : '', // @todo cleanup
			'event_rest_api'   => home_url( 'wp-json/gatherpress/v1/event' ),
			'has_event_past'   => $event->has_event_past(),
			'nonce'            => wp_create_nonce( 'wp_rest' ),
			'post_id'          => $post_id,
			'event_datetime'   => $event->get_datetime(),
			'event_announced'  => ( get_post_meta( $post_id, 'gp-event-announce', true ) ) ? 1 : 0,
			'default_timezone' => sanitize_text_field( wp_timezone_string() ),
			'settings'         => array(
				'language' => $settings->get_value( $settings->prefix_key( 'language' ) ),
			),
		);
	}

}