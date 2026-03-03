document.addEventListener('DOMContentLoaded', function() {
    console.log("imported");
  // Find all code blocks
  const codeBlocks = document.querySelectorAll('pre code');

  codeBlocks.forEach(function(codeBlock) {
    // Create wrapper if pre doesn't have one already
    let pre = codeBlock.tagName === 'PRE' ? codeBlock : codeBlock.parentElement;

    // Skip if already has a copy button
    if (pre.querySelector('.copy-button')) return;

    // Create copy button
    const button = document.createElement('button');
    button.className = 'copy-button';
    button.textContent = 'Copy';
    button.setAttribute('aria-label', 'Copy code to clipboard');

    // Add button to the pre element
    pre.style.position = 'relative';
    pre.appendChild(button);

    // Copy functionality
    button.addEventListener('click', function() {
      // Get the code text (handle both direct pre and pre > code structures)
      const code = pre.querySelector('code') || pre;
      const text = code.textContent;

      // Copy to clipboard
      navigator.clipboard.writeText(text).then(function() {
        // Success feedback
        button.textContent = 'Copied!';
        button.classList.add('copied');

        // Reset button after 2 seconds
        setTimeout(function() {
          button.textContent = 'Copy';
          button.classList.remove('copied');
        }, 2000);
      }).catch(function(err) {
        // Error feedback
        console.error('Failed to copy:', err);
        button.textContent = 'Failed';
        setTimeout(function() {
          button.textContent = 'Copy';
        }, 2000);
      });
    });
  });
});