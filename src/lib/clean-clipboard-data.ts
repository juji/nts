import stripBom from 'strip-bom';

export function cleanClipboardText(e: ClipboardEvent){
  const pastedText = e.clipboardData?.getData('text/plain');
  return pastedText ? stripBom(pastedText) : ''
}

export function onPaste(e: ClipboardEvent){
  e.preventDefault()
  const sel = window.getSelection()
  if(!sel) return;
  if (!sel.rangeCount) return;
  const data = cleanClipboardText(e)
  sel.getRangeAt(0).insertNode(document.createTextNode(data));
  sel.collapseToEnd();
}