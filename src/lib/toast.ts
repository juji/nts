import Toastify from 'toastify-js'

export function showError(str: string){

  Toastify({
    text: str,
    duration: 3000,
    close: false,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "var(--toast-error-bg)",
      color: "var(--toast-error-fg)"
    },
    onClick: function(){} // Callback after click
  }).showToast();

}
