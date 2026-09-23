/* ========================================
   POSSE Portfolio — App Logic
   ======================================== */

(function () {
  'use strict';

  // ── DATA ──────────────────────────────────────────

  // Posters & Graphic Design — compressed to assets/posters/ (110-197KB each)
  const posters = [
    { src: 'assets/posters/Artboard 1.jpg' },
    { src: 'assets/posters/Artboard 1 copy.jpg' },
    { src: 'assets/posters/Artboard 1 copy 2.jpg' },
    { src: 'assets/posters/Hit-THe bell.jpg' },
    { src: 'assets/posters/ClashRoyal.jpg' },
    { src: 'assets/posters/GodFather.jpg' },
    { src: 'assets/posters/TechWhiz.jpg' },
  ];

  // Shorts / Reels (Instagram posts — open in new tab)
  const shorts = [
    {
      url: 'https://www.instagram.com/p/DEl8GSrv4W5/',
      title: 'Short Edit #1',
      code: 'DEl8GSrv4W5',
    },
    {
      url: 'https://www.instagram.com/p/DDg8h_2BoP2/',
      title: 'Short Edit #2',
      code: 'DDg8h_2BoP2',
    },
    {
      url: 'https://www.instagram.com/p/C1cXCXnr9Yd/',
      title: 'Short Edit #3',
      code: 'C1cXCXnr9Yd',
    },
  ];

  // Long-form YouTube videos
  const videos = [
    {
      id: 'X7sBxblLxNM',
      title: 'Goku vs Great Ape Vegeta — Dragon Ball Sparking Zero',
    },
    {
      id: 'fuesDZNs3QI',
      title: 'Epic Fight with Vegeta — Dragon Ball Sparking Zero',
    },
    {
      id: 'qhw2BcOhi2A',
      title: 'Trading Hall — Minecraft Hardcore Ep. 08',
    },
    {
      id: 'hyxMV187Piw',
      title: '100 Days in Hardcore Minecraft',
    },
    {
      id: 'yAYoZ1A-L-U',
      title: 'Exploring Caves Without Armor — Minecraft Hardcore',
    },
  ];

  // Thumbnails (from "Thumbnails/" folder)
  const thumbnails = [
    '(1).jpg', '(1).png', '(2).jpg', '(3).jpg', '(4).jpg',
    '(5).jpg', '(6).jpg', '(7).jpg', '(8).jpg', '(9).jpg',
    '(10).jpg', '(11).jpg', '(12).jpg', '(13).jpg', '(14).jpg',
    '1.jpg', '234.jpg', '32.jpg', '32qe.jpg',
    'asv2q.jpg', 'asw.jpg', 'daq.jpg', 'jg.jpg',
    'level-devil.jpg', 'ym5r.jpg',
  ].map(f => ({ src: 'Thumbnails/' + f }));

  // Mailto templates by section
  const mailtoLinks = {
    posters: 'mailto:ujjwalkumar95655@gmail.com?subject=Graphic%20Design%20Project&body=Hey%20POSSE%2C%0A%0AI%20saw%20your%20design%20work%20and%20I%E2%80%99d%20like%20to%20discuss%20a%20project.%0A%0A',
    shorts: 'mailto:ujjwalkumar95655@gmail.com?subject=Short-form%20Video%20Editing&body=Hey%20POSSE%2C%0A%0AI%20need%20short-form%20video%20editing%20and%20came%20across%20your%20work.%0A%0A',
    videos: 'mailto:ujjwalkumar95655@gmail.com?subject=Video%20Editing%20Project&body=Hey%20POSSE%2C%0A%0AI%E2%80%99m%20looking%20for%20a%20video%20editor%20and%20your%20work%20caught%20my%20eye.%0A%0A',
    thumbnails: 'mailto:ujjwalkumar95655@gmail.com?subject=Thumbnail%20Design&body=Hey%20POSSE%2C%0A%0AI%20need%20YouTube%20thumbnails%20designed.%20Let%E2%80%99s%20talk.%0A%0A',
  };

  // SVG icons (clean white, no color)
  const playSVG = '<svg viewBox="0 0 24 24" fill="white"><polygon points="8,5 19,12 8,19"/></svg>';
  const externalSVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>';

  // ── DOM REFS ─────────────────────────────────────

  const gridPosters = document.getElementById('grid-posters');
  const gridShorts = document.getElementById('grid-shorts');
  const gridVideos = document.getElementById('grid-videos');
  const gridThumbnails = document.getElementById('grid-thumbnails');
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');
  const modalHire = document.getElementById('modal-hire');
  const modalClose = document.querySelector('.modal-close');
  const tabs = document.querySelectorAll('.tab');

  // ── RENDER FUNCTIONS ─────────────────────────────

  function createImageItem(item, section) {
    const div = document.createElement('div');
    div.className = 'grid-item';
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.alt = '';
    img.src = item.src;
    // Log warning if image fails to load
    img.onerror = function () {
      console.warn('Failed to load:', item.src);
    };
    div.appendChild(img);
    div.addEventListener('click', () => openImageModal(item.src, section));
    return div;
  }

  function createVideoItem(video) {
    const div = document.createElement('div');
    div.className = 'grid-item';

    const img = document.createElement('img');
    img.className = 'grid-thumb';
    img.loading = 'lazy';
    img.alt = video.title || '';
    img.src = 'https://img.youtube.com/vi/' + video.id + '/mqdefault.jpg';
    div.appendChild(img);

    const playIcon = document.createElement('div');
    playIcon.className = 'play-icon';
    playIcon.innerHTML = playSVG;
    div.appendChild(playIcon);

    div.addEventListener('click', () => openVideoModal(video.id, 'videos'));
    return div;
  }

  function createShortItem(short) {
    const div = document.createElement('div');
    div.className = 'grid-item short-item';

    // Instagram embed card — shows real post via Instagram's embed iframe
    const embedFrame = document.createElement('iframe');
    embedFrame.className = 'grid-thumb ig-embed';
    embedFrame.src = 'https://www.instagram.com/p/' + short.code + '/embed/';
    embedFrame.loading = 'lazy';
    embedFrame.setAttribute('frameborder', '0');
    embedFrame.setAttribute('scrolling', 'no');
    embedFrame.setAttribute('allowtransparency', 'true');
    div.appendChild(embedFrame);

    // Clickable overlay (since iframe captures clicks)
    const overlay = document.createElement('a');
    overlay.className = 'short-overlay';
    overlay.href = short.url;
    overlay.target = '_blank';
    overlay.rel = 'noopener';

    const playIcon = document.createElement('div');
    playIcon.className = 'play-icon';
    playIcon.innerHTML = playSVG;
    overlay.appendChild(playIcon);

    // Badge
    const badge = document.createElement('div');
    badge.className = 'external-badge';
    badge.innerHTML = externalSVG + ' IG';
    overlay.appendChild(badge);

    div.appendChild(overlay);

    return div;
  }

  // ── POPULATE GRIDS ───────────────────────────────

  function renderAll() {
    // Posters
    posters.forEach(item => {
      gridPosters.appendChild(createImageItem(item, 'posters'));
    });

    // Shorts
    shorts.forEach(item => {
      gridShorts.appendChild(createShortItem(item));
    });

    // Videos
    videos.forEach(video => {
      gridVideos.appendChild(createVideoItem(video));
    });

    // Thumbnails
    thumbnails.forEach(item => {
      gridThumbnails.appendChild(createImageItem(item, 'thumbnails'));
    });
  }

  // ── TAB SWITCHING ────────────────────────────────

  function switchTab(tabName) {
    // Update tab buttons
    tabs.forEach(t => {
      const isActive = t.dataset.tab === tabName;
      t.classList.toggle('active', isActive);
      t.setAttribute('aria-selected', isActive);
    });

    // Update panels
    document.querySelectorAll('.tab-panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === 'panel-' + tabName);
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      switchTab(tab.dataset.tab);
    });
  });

  // ── MODAL ────────────────────────────────────────

  let currentSection = 'posters';

  function openImageModal(src, section) {
    currentSection = section;
    modalContent.innerHTML = '<img src="' + src + '" alt="">';
    modalHire.href = mailtoLinks[section];
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function openVideoModal(videoId, section) {
    currentSection = section;
    // Responsive iframe size
    const width = Math.min(window.innerWidth - 64, 800);
    const height = Math.round(width * 9 / 16);
    modalContent.innerHTML =
      '<iframe width="' + width + '" height="' + height + '" ' +
      'src="https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0" ' +
      'allow="autoplay; encrypted-media" allowfullscreen></iframe>';
    modalHire.href = mailtoLinks[section];
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Kill any playing video iframes
    setTimeout(() => {
      modalContent.innerHTML = '';
    }, 250);
  }

  modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // ── GLASS LENS CURSOR EFFECT ──────────────────────

  const lens = document.getElementById('glass-lens');
  let lensX = 0, lensY = 0;
  let targetX = 0, targetY = 0;
  let lensActive = false;

  // Only enable on non-touch devices
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (!isTouch && lens) {
    document.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!lensActive) {
        lensActive = true;
        lens.classList.add('visible');
        lensX = targetX;
        lensY = targetY;
        animateLens();
      }
    });

    document.addEventListener('mouseleave', () => {
      lensActive = false;
      lens.classList.remove('visible');
    });

    function animateLens() {
      if (!lensActive) return;
      // Smooth easing — lens trails the cursor slightly
      lensX += (targetX - lensX) * 0.12;
      lensY += (targetY - lensY) * 0.12;
      lens.style.left = lensX + 'px';
      lens.style.top = lensY + 'px';
      requestAnimationFrame(animateLens);
    }
  }

  // ── INIT ─────────────────────────────────────────

  renderAll();

})();
