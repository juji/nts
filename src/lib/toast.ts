import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

export function showError(str: string){

  Toastify({
    text: str,
    duration: 3000,
    close: false,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    className: 'toast-error',
    onClick: function(){} // Callback after click
  }).showToast();

}
