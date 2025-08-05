import './modal.css';
import Helper, { _ } from '../../helper';
import iconButton from '../icon-button/iconButton';

/**
 * Modal that can be updated with content
 * @returns {Object} The modal Object
 */
const Modal = (() => {
  // Create important element
  const contentArea = _('div.modal-content-area');

  const close = iconButton({
    aria: 'Schließen',
    icon: '\\e5cd',
  });

  // Link button to the Helper functions
  close.addEventListener('click', Helper.closeModal);

  // Wrap the content
  const HTMLElement = _('dialog#modal', [
    _('form[method="dialog"]', [close, contentArea]),
    contentArea,
  ]);

  // Link the elements to the Helper functions
  Helper.modal = contentArea;
  Helper.dialog = HTMLElement;

  // Function to update the real viewport height
  const updateViewportHeight = () => {
    const vh = window.innerHeight;
    document.documentElement.style.setProperty(
      '--real-viewport-height',
      `${vh}px`,
    );
  };

  // Update on initial load
  updateViewportHeight();

  // Update on resize (includes keyboard opening/closing on mobile)
  window.addEventListener('resize', () => {
    updateViewportHeight();
  });

  return { HTMLElement, contentArea };
})();

export default Modal;
