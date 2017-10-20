/**
 * @namespace {Object} FORGE.PlayableStatus
 */
FORGE.PlayableStatus = {};

/**
 * The Playable object is stopped.
 *
 * @name FORGE.PlayableStatus.STOPPED
 * @type {number}
 * @const
 */
FORGE.PlayableStatus.STOPPED = 1;

/**
 * The Playable object is playing.
 *
 * @name FORGE.PlayableStatus.PLAYING
 * @type {number}
 * @const
 */
FORGE.PlayableStatus.PLAYING = 2;

/**
 * The Playable object is paused.
 *
 * @name FORGE.PlayableStatus.PAUSED
 * @type {number}
 * @const
 */
FORGE.PlayableStatus.PAUSED = 4;

/**
 * The Playable object is ended.
 *
 * @name FORGE.PlayableStatus.ENDED
 * @type {number}
 * @const
 */
FORGE.PlayableStatus.ENDED = 8;

/**
 * The Playable object is hidden (Page Visibility event).
 *
 * @name FORGE.PlayableStatus.HIDDEN
 * @type {number}
 * @const
 */
FORGE.PlayableStatus.HIDDEN = 16;
