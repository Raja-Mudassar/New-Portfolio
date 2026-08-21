document.getElementById("year").textContent = new Date().getFullYear();

const hireBtn = document.getElementById('hireBtn');
const hireBtnContact = document.getElementById('hireBtnContact');

// Build absolute URLs from current document location and try opening candidates.
const resumeCandidates = ['resume.pdf', 'resume.pdf.pdf', 'resume.html'];
function tryOpenCandidates(e) {
  // allow normal Ctrl/Cmd-click or middle-click to work
  if (e.ctrlKey || e.metaKey || e.button === 1) return;
  e.preventDefault();

  // base URL (ends with /)
  let base = location.href;
  // If location is file:///.../index.html or http://.../index.html, strip after last '/'
  if (base.indexOf('/') !== -1) {
    base = base.substring(0, base.lastIndexOf('/') + 1);
  }

  for (const candidate of resumeCandidates) {
    try {
      const url = encodeURI(base + candidate);
      const w = window.open(url, '_blank');
      if (w) return; // opened
    } catch (err) {
      // ignore and try next
    }
  }

  // last resort: navigate current window to first candidate absolute URL
  window.location.href = encodeURI(base + resumeCandidates[0]);
}

// No additional click handlers — anchors in HTML point directly to the correct file.

// WhatsApp contact widget: shows a floating WhatsApp button when user clicks any link to #contact
(function() {
  const waNumber = '923408938918';

  // create widget
  const widget = document.createElement('div');
  widget.id = 'whatsappWidget';
  widget.className = 'whatsapp-widget';
  widget.setAttribute('aria-hidden', 'true');
  widget.innerHTML = `
    <a id="whatsappLink" class="whatsapp-btn" href="#" target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
    <button id="whatsappClose" class="whatsapp-close" aria-label="Close WhatsApp">✕</button>
  `;
  document.body.appendChild(widget);

  const waLink = document.getElementById('whatsappLink');
  const waClose = document.getElementById('whatsappClose');

  function updateLink() {
    const num = (waNumber || '').toString().replace(/\D/g, '');
    const text = encodeURIComponent('Hello, I saw your portfolio and would like to connect.');
    if (num) waLink.href = `https://wa.me/${num}?text=${text}`;
    else waLink.href = '#';
  }

  function showWidget() {
    widget.classList.add('show');
    widget.setAttribute('aria-hidden', 'false');
  }

  function hideWidget() {
    widget.classList.remove('show');
    widget.setAttribute('aria-hidden', 'true');
  }

  waClose.addEventListener('click', hideWidget);

  // Attach to all anchors that link to #contact
  document.querySelectorAll('a[href="#contact"]').forEach(a => {
    a.addEventListener('click', function () {
      // delay slightly so default scroll completes
      setTimeout(showWidget, 300);
    });
  });

  // If page loads with #contact in URL, show widget
  if (location.hash === '#contact') setTimeout(showWidget, 300);

  updateLink();
})();
