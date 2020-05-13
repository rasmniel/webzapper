
/*
 * Meta types used internally.
 */
// Content script fires this to determine whether there's a master to declare inputs to.
export const MASTER_CHECK = 'master_check';

/*
 * Requests for input declarations sent from the user client or internally.
 */

// Shorthand for requesting both forms and anchors.
// Only sent internally from background script on certain events.
export const REQUEST_INPUTS = 'request_inputs';

// Request for a form declaration.
export const REQUEST_FORMS = 'request_forms';

// Request for an anchor declaration.
export const REQUEST_ANCHORS = 'request_anchors';

// Request for a video declaration.
export const REQUEST_VIDEOS = 'request_videos';


/*
 * Input declarations. Used in content script to signify which input data is coming through.
 */

// Declare forms available on the page.
// May take a query for specificity. (not implemented yet)
export const DECLARE_FORMS = 'declare_forms';

// Declare anchors in a paginated list.
// May take a search query and page number as arguments.
export const DECLARE_ANCHORS = 'declare_anchors';

// Declare videos on the page.
export const DECLARE_VIDEOS = 'declare_videos';


/*
 * Slave commands; navigation, input mutation, and actions.
 */

// Navigate one tab right or left.
// Calls with this type do not reach the content script,
// because the background script handles tab navigation.
export const NAVIGATE_TAB = 'navigate_tab';

// Navigate to a specified url.
export const NAVIGATE_URL = 'navigate_url';

// Navigate back and forward in browsing history state.
export const NAVIGATE_HISTORY = 'navigate_history';

// Change the value of an input.
export const CHANGE_INPUT = 'change_input';

// Control video playback.
export const CONTROL_VIDEO = 'control_video';

// Submit an input form.
export const SUBMIT_FORM = 'submit_form';

// Click an element by selector.
export const CLICK_ELEMENT = 'click_element';

// Scroll with a controlled input flow to spare the server too many requests.
export const SMOOTH_SCROLL = 'smooth_scroll';