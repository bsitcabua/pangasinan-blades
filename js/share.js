(function initializeProductSharing(global) {
  'use strict';

  const SITE_URL = 'https://www.pangasinanblades.com';
  const SHARE_PREVIEW_VERSION = '3';
  const modal = document.querySelector('[data-share-modal]');
  if (!modal) return;

  const titleElement = modal.querySelector('[data-share-title]');
  const descriptionElement = modal.querySelector('[data-share-description]');
  const statusElement = modal.querySelector('[data-share-status]');
  const qrPanel = modal.querySelector('[data-share-qr]');
  const qrCode = modal.querySelector('[data-share-qr-code]');
  const qrLabel = modal.querySelector('[data-share-qr-label]');
  const panel = modal.querySelector('.share-panel');
  let activeShare = null;
  let returnFocus = null;

  function productDescription(product) {
    if (product.description) return product.description;
    return `${product.name} from the ${product.series}, handcrafted by Pangasinan Blades and configurable to your preferred specifications.`;
  }

  function productShareData(product) {
    const details = product.details || {};
    const specs = [
      details.bladeLength && `Blade Length: ${details.bladeLength}`,
      details.steel && `Steel: ${details.steel}`,
      details.handle && `Handle: ${details.handle}`,
      details.sheath && `Scabbard: ${details.sheath}`,
    ].filter(Boolean).join('\n');
    const destinationUrl = `${SITE_URL}/collection/?id=${encodeURIComponent(product.id)}`;
    const url = `${SITE_URL}/share/?id=${encodeURIComponent(product.id)}&v=${SHARE_PREVIEW_VERSION}`;
    return {
      title: `${product.name} | Pangasinan Blades`,
      heading: product.name,
      description: productDescription(product),
      text: `${productShareDataText(product)}${specs ? `\n\n${specs}` : ''}\n\n${destinationUrl}`,
      url,
    };
  }

  function productShareDataText(product) {
    return product.shareText || `${product.name} — ${productDescription(product)}`;
  }

  function collectionShareData() {
    const url = `${SITE_URL}/index.html#full-collection`;
    return {
      title: 'The Complete Collection | Pangasinan Blades',
      heading: 'The Complete Collection',
      description: 'Explore handcrafted Filipino blades across the Itak, Bolo, Moro, Combat, Outdoor, International, and Kitchen series.',
      text: `Explore the complete Pangasinan Blades collection of handcrafted and customizable Filipino blades.\n\n${url}`,
      url,
    };
  }

  function dataForTrigger(trigger) {
    if (trigger.dataset.shareKind === 'collection') return collectionShareData();
    const productId = Number(trigger.dataset.shareProductId || new URLSearchParams(location.search).get('id'));
    const product = (global.PANGASINAN_PRODUCTS || []).find(item => Number(item.id) === productId);
    return product ? productShareData(product) : collectionShareData();
  }

  function setStatus(message, isError = false) {
    statusElement.textContent = message;
    statusElement.classList.toggle('is-error', isError);
  }

  function openModal(data, trigger) {
    activeShare = data;
    returnFocus = trigger;
    titleElement.textContent = `Share ${data.heading}`;
    descriptionElement.textContent = data.description;
    const nativeButton = panel.querySelector('[data-share-action="native"]');
    if (nativeButton) nativeButton.hidden = typeof navigator.share !== 'function';
    if (qrPanel) qrPanel.hidden = true;
    panel.scrollTop = 0;
    setStatus('');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('share-dialog-open');
    panel.querySelector('[data-share-action="copy"]')?.focus();
  }

  function closeModal() {
    if (!modal.classList.contains('open')) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('share-dialog-open');
    panel.scrollTop = 0;
    if (qrPanel) qrPanel.hidden = true;
    activeShare = null;
    const focusTarget = returnFocus;
    returnFocus = null;
    focusTarget?.focus();
  }

  async function copyText(value) {
    if (navigator.clipboard && global.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return;
    }
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand('copy');
    textarea.remove();
    if (!copied) throw new Error('Copy failed');
  }

  function popup(url) {
    global.open(url, '_blank', 'noopener,noreferrer');
  }

  async function runFallbackAction(action) {
    if (!activeShare) return;
    const { title, text, url } = activeShare;
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedText = encodeURIComponent(text);
    const links = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedText}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      email: `mailto:?subject=${encodedTitle}&body=${encodedText}`,
    };

    try {
      if (action === 'native') {
        if (typeof navigator.share === 'function') {
          await navigator.share({ title, text: activeShare.description, url });
        }
      } else if (action === 'qr') {
        if (!qrPanel || !qrCode || typeof global.QRCode !== 'function') throw new Error('QR generator unavailable');
        qrCode.querySelectorAll('canvas, table, img:not(.share-qr-logo)').forEach(element => element.remove());
        new global.QRCode(qrCode, {
          text: url,
          width: 280,
          height: 280,
          colorDark: '#080808',
          colorLight: '#ffffff',
          correctLevel: global.QRCode.CorrectLevel.H,
        });
        qrLabel.textContent = activeShare.heading === 'The Complete Collection' ? 'Scan to open the collection' : `Scan to open ${activeShare.heading}`;
        qrPanel.hidden = false;
        panel.scrollTo({ top: Math.max(0, qrPanel.offsetTop - 72), behavior: 'smooth' });
        setStatus('QR code ready to scan.');
      } else if (action === 'copy') {
        await copyText(url);
        setStatus('Share link copied to clipboard.');
      } else if (action === 'messenger') {
        const messengerWindow = global.open('about:blank', '_blank');
        if (messengerWindow) messengerWindow.opener = null;
        try {
          await copyText(text);
          setStatus('Share message copied. Paste it into Messenger.');
          if (messengerWindow) messengerWindow.location.href = 'https://www.messenger.com/';
          else popup('https://www.messenger.com/');
        } catch (error) {
          messengerWindow?.close();
          throw error;
        }
      } else if (links[action]) {
        if (action === 'email') global.location.href = links[action];
        else popup(links[action]);
      }
    } catch (error) {
      if (error?.name === 'AbortError') return;
      setStatus(
        action === 'qr'
          ? 'Unable to generate the QR code. Please try again.'
          : 'Unable to complete this sharing action. Please try again.',
        true
      );
    }
  }

  async function shareFromTrigger(trigger) {
    const data = dataForTrigger(trigger);
    openModal(data, trigger);
  }

  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-share-trigger]');
    if (trigger) {
      event.preventDefault();
      event.stopPropagation();
      shareFromTrigger(trigger);
      return;
    }
    const action = event.target.closest('[data-share-action]');
    if (action) runFallbackAction(action.dataset.shareAction);
    if (event.target.closest('[data-share-close]')) closeModal();
  });

  document.addEventListener('keydown', event => {
    if (!modal.classList.contains('open')) return;
    if (event.key === 'Escape') closeModal();
    if (event.key !== 'Tab') return;
    const focusable = [...panel.querySelectorAll('button, a[href]')].filter(item => !item.disabled);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });

  global.PangasinanShare = { shareFromTrigger, closeModal };
})(window);
