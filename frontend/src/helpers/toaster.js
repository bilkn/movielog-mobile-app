import Toast from "react-native-root-toast";

const _messageQueue = [];
let _toast = null;

/**
 * Display multiple messages as a toast
 */
export default class Toaster {
  /**
   *
   * @example
   * Toaster.show('message'); // toast visible for Toast.durations.LONG by default
   * Toaster.show('message', 0); // won't hide automatically need to click on Toast
   * Toaster.show('message', 1500, true); // toast visible for given timestamp with animation
   *
   * @param {string} message - toast message
   * @param {boolean} success - false = error message, true = success message
   * @param {number} duration - time duration
   */
  static show(success, message, duration = Toast.durations.LONG) {
    _messageQueue.push({ message, success, duration });
    if (_messageQueue.length === 1) {
      // eslint-disable-next-line no-use-before-define
      _showToaster();
    }
  }
}

function _processQueue() {
  _messageQueue.shift();
  if (_messageQueue.length) {
    _showToaster();
  }
}

function _hideToaster() {
  Toast.hide(_toast);
  _processQueue();
}

function _showToaster() {
  const { message, success, duration } = _messageQueue[0];
  const hideOnPress = duration === 0;
  _toast = Toast.show(message, {
    containerStyle: {
      backgroundColor: success ? "#383D4E" : "#000",
    },
    shadowColor: "#0000000d",
    shadow: true,
    duration: Toast.durations.LONG,
    textColor: success ? "white" : "#FF3B30",
    position: 80,
    animation: true,
    onHide: () => {
      if (hideOnPress) {
        _processQueue();
      }
    },
  });

  if (!hideOnPress) {
    setTimeout(_hideToaster, duration);
  }
}
