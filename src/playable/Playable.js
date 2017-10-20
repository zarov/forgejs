/**
 * Abstract playable object class. This class is aimed to be used by objects
 * that share similar playable properties, especially a status.
 * This class extends by default {@link FORGE.BaseObject} but can extend any
 * specified class.
 *
 * @constructor FORGE.PlayableObject
 * @param {FORGE.Viewer} viewer - {@link FORGE.Viewer} reference.
 * @param {string} name - the name of the caller
 * @param {function=} parent - the class to extends, by default FORGE.BaseObject
 * @param {Array=} args - an array containing the arguments to give to the parent
 */
FORGE.PlayableObject = function(viewer, name, parent, args)
{
    /**
     * The viewer reference.
     * @name FORGE.PlayableObject#_viewer
     * @type {FORGE.Viewer}
     * @private
     */
    this._viewer = viewer;

    /**
     * The status of the playable object. This list of available status is
     * available in the PlayableStatus namespace.
     * @name FORGE.PlayableObject#_status
     * @type {number}
     * @private
     */
    this._status = 1;

    /**
     * Special case: if a parent is suggested, this is not a BaseObject as the
     * root object, but the parent
     * @name FORGE.PlayableObject#_parent
     * @type {function=}
     * @private
     */
    this._parent = parent;

    if (typeof parent !== "function")
    {
        this._parent = FORGE.BaseObject;
        args = [name];
    }

    this._parent.apply(this, args);
};

FORGE.PlayableObject.prototype = Object.create(FORGE.PlayableObject.prototype);
FORGE.PlayableObject.prototype.constructor = FORGE.PlayableObject;

/**
 * Boot sequence.
 * @method FORGE.PlayableObject#_boot
 * @private
 */
FORGE.PlayableObject.prototype._boot = function()
{
    if (typeof this._parent.prototype._boot === "function")
    {
        this._parent.prototype._boot.call(this);
    }

    // Listen to the Page Visibility event
    this._viewer.onPause.add(this._onVisibilityChange, this);
    this._viewer.onResume.add(this._onVisibilityChange, this);
};

/**
 * Handles the change of the visibility of the page.
 * @method FORGE.PlayableObject#_onVisibilityChange
 * @param {FORGE.Event} event - the received event
 * @private
 */
FORGE.PlayableObject.prototype._onVisibilityChange = function(event)
{
    var status = document[FORGE.Device.visibilityState];
    var external = (event.data.internal === undefined);

    // Pause if playing, leaving and authorized to pause
    if ((status === "hidden" || external === true) && this._status === FORGE.PlayableStatus.PLAYING)
    {
        this._status = FORGE.PlayableStatus.HIDDEN;
        return;
    }

    // Resume if paused, entering and authorized to resume
    if ((status === "visible" || external === true) && this._status === FORGE.PlayableStatus.HIDDEN)
    {
        this._status = FORGE.PlayableStatus.PLAYING;
        return;
    }
};

/**
 * Destroy sequence.
 * @method FORGE.PlayableObject#destroy
 */
FORGE.PlayableObject.prototype.destroy = function()
{
    this._viewer.onPause.remove(this._onVisibilityChange, this);
    this._viewer.onResume.remove(this._onVisibilityChange, this);

    if (typeof this._parent.prototype.destroy === "function")
    {
        this._parent.prototype.destroy.call(this);
    }
};

/**
 * Get the status of the playable object.
 * @name FORGE.PlayableObject#status
 * @readonly
 * @type {number}
 */
Object.defineProperty(FORGE.PlayableObject.prototype, "status",
{
    /** @this {FORGE.PlayableObject} */
    get: function()
    {
        return this._status;
    }
});
