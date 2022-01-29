import ReactModal from "react-modal";
import { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Modal.module.scss";
import cx from "classnames";

class Modal extends Component {
  static propTypes = {
    /* Inline styling, use when absolutely necessary */
    style: PropTypes.object,
    /* Modal content */
    children: PropTypes.any,
    /* Modal content classNames */
    className: PropTypes.string,
    /* On close */
    onRequestClose: PropTypes.func,
    /* Whether to show close button or not */
    hideCloseButton: PropTypes.bool,
    /* Classname of overlay/backdrop */
    overlayClassName: PropTypes.string,
    /* If true modal will close on backdrop/overlay's click, true by default */
    shouldCloseOnOverlayClick: PropTypes.bool,
    /* Whether escape key should close the modal or not */
    shouldCloseOnEscape: PropTypes.bool,
    /* Cross button classname */
    crossButtonClassName: PropTypes.string,

    isPostPage: PropTypes.bool,
  };

  static defaultProps = {
    shouldCloseOnEscape: true,
    shouldCloseOnOverlayClick: false,
  };

  UNSAFE_componentWillMount() {
    const hjar = document.getElementsByClassName("_hj_feedback_container");
    if (hjar.length) hjar[0].style.display = "none";
    if (this.props.shouldCloseOnEscape && !this.props.isPostPage)
      document.addEventListener("keyup", this.handleKeyPress);
  }

  componentWillUnmount() {
    const hjar = document.getElementsByClassName("_hj_feedback_container");
    if (hjar.length) hjar[0].style.display = "";
    if (this.props.shouldCloseOnEscape && !this.props.isPostPage)
      document.removeEventListener("keyup", this.handleKeyPress);
  }

  handleKeyPress = (event) => {
    event.stopImmediatePropagation();
    if (event.keyCode === 27) {
      this.handleCloseClick();
    }
  };

  handleCloseClick = () => {
    this.props.onRequestClose();
  };

  render() {
    const {
      children,
      className = "",
      overlayClassName = "",
      crossButtonClassName = "",
      ...props
    } = this.props;

    const _className = cx(styles.modal, className);

    const _overlayClassName = cx(styles.overlay, overlayClassName);

    return (
      <ReactModal
        isOpen
        ariaHideApp={false}
        contentLabel="Modal"
        className={_className}
        overlayClassName={_overlayClassName}
        {...props}
      >
        {this.props.hideCloseButton ? null : (
          <div
            className={cx(
              styles.closeButton,
              "flex_centered",
              crossButtonClassName
            )}
            onClick={this.handleCloseClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#1C1C1C"
              width="24"
              height="24"
              viewBox="0 0 20 20"
              aria-labelledby="icon-svg-title- icon-svg-desc-"
              role="img"
            >
              <title>cross</title>
              <path d="M11.42 10.42l3.54-3.54c0.38-0.4 0.38-1.040 0-1.42s-1.020-0.4-1.42 0l-3.54 3.54-3.54-3.54c-0.4-0.4-1.020-0.4-1.42 0s-0.38 1.020 0 1.42l3.54 3.54-3.54 3.54c-0.38 0.38-0.38 1.020 0 1.42 0.2 0.18 0.46 0.28 0.72 0.28s0.5-0.1 0.7-0.28l3.54-3.56 3.54 3.56c0.2 0.18 0.46 0.28 0.72 0.28s0.5-0.1 0.7-0.28c0.38-0.4 0.38-1.040 0-1.42l-3.54-3.54z"></path>
            </svg>
          </div>
        )}
        {children}
      </ReactModal>
    );
  }
}

export default Modal;
