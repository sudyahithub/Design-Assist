document.querySelectorAll('select, textarea').forEach(el => {
  const key = el.id || el.name;

  // Save on change
  el.addEventListener('change', () => {
    localStorage.setItem(key, el.value);
    if (typeof generatePrompt === 'function') generatePrompt();
    if (typeof updateStructuredView === 'function') updateStructuredView();
    if (typeof updatePinterestQuery === 'function') updatePinterestQuery();
  });

  // Save textarea live input
  if (el.tagName === 'TEXTAREA') {
    el.addEventListener('input', () => {
      localStorage.setItem(key, el.value);
      if (typeof generatePrompt === 'function') generatePrompt();
      if (typeof updateStructuredView === 'function') updateStructuredView();
      if (typeof updatePinterestQuery === 'function') updatePinterestQuery();
    });
  }

  // Restore on load
  const saved = localStorage.getItem(key);
  if (saved) el.value = saved;
});

// Trigger caution on reload or tab close
window.addEventListener('beforeunload', (event) => {
  // Check if any changes were made (you can customize this check)
  const isFormDirty = Array.from(document.querySelectorAll('select, textarea'))
    .some(el => {
      const key = el.id || el.name;
      const saved = localStorage.getItem(key);
      return el.value !== saved;
    });

  if (isFormDirty) {
    // Required for Chrome to show confirmation dialog
    event.preventDefault();
    event.returnValue = '';
  }
});

