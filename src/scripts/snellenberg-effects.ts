// Snellenberg Interactive Effects System for Astro

export function initSnellenbergEffects() {
  if (typeof window === 'undefined') return;

  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReduced) return;

  // 1. Magnetic Elements Physics
  initMagneticElements();

  // 2. Floating Work Hover Preview Modal
  initHoverPreviewModal();

  // 3. Kinetic Velocity Marquee
  initKineticMarquee();

  // 4. Curved Rounded-Div Footer Transition
  initRoundedDivTransitions();

  // 5. Floating Magnetic Menu Badge
  initFloatingMenuBadge();

  // 6. Dennis Snellenberg Elastic Overlay Drawer
  initDrawerController();

  // 7. Curved handoff for internal navigation
  initPageTransitions();
}

function initMagneticElements() {
  const magneticEls = document.querySelectorAll<HTMLElement>('[data-magnetic]');

  magneticEls.forEach((el) => {
    const strength = parseFloat(el.dataset.magneticStrength || '0.35');
    const textEl = el.querySelector<HTMLElement>('.magnetic-text') || el;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId: number | null = null;

    const render = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      if (textEl !== el) {
        textEl.style.transform = `translate3d(${currentX * 0.45}px, ${currentY * 0.45}px, 0)`;
      }

      if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        animationFrameId = null;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      targetX = (e.clientX - centerX) * strength;
      targetY = (e.clientY - centerY) * strength;

      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const onMouseLeave = () => {
      targetX = 0;
      targetY = 0;
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);
  });
}

function initHoverPreviewModal() {
  const previewTargets = document.querySelectorAll<HTMLElement>('[data-preview-image]');
  if (!previewTargets.length) return;

  // Create preview modal element if not present
  let modal = document.querySelector<HTMLElement>('.snellenberg-preview-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'snellenberg-preview-modal';
    modal.innerHTML = `
      <div class="preview-img-container">
        <img src="" alt="" class="preview-img" />
      </div>
      <div class="preview-badge">
        <span class="preview-badge-text">View</span>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const imgEl = modal.querySelector<HTMLImageElement>('.preview-img');
  const badgeText = modal.querySelector<HTMLElement>('.preview-badge-text');

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let activeTarget: HTMLElement | null = null;
  let animationFrameId: number | null = null;

  const updatePosition = () => {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;

    if (modal) {
      const scale = modal.classList.contains('is-active') ? 1 : 0.5;
      modal.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) scale(${scale})`;
    }

    if (activeTarget) {
      animationFrameId = requestAnimationFrame(updatePosition);
    } else {
      animationFrameId = null;
    }
  };

  previewTargets.forEach((target) => {
    target.addEventListener('mouseenter', (e: MouseEvent) => {
      const imgSrc = target.dataset.previewImage;
      const label = target.dataset.previewLabel || 'View';

      if (imgEl && imgSrc) {
        imgEl.src = imgSrc;
      }
      if (badgeText) {
        badgeText.textContent = label;
      }

      activeTarget = target;
      targetX = e.clientX;
      targetY = e.clientY;

      if (!currentX && !currentY) {
        currentX = targetX;
        currentY = targetY;
      }

      modal?.classList.add('is-active');

      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(updatePosition);
      }
    });

    target.addEventListener('mousemove', (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    });

    target.addEventListener('mouseleave', () => {
      activeTarget = null;
      modal?.classList.remove('is-active');
    });
  });
}

function initKineticMarquee() {
  const marquees = document.querySelectorAll<HTMLElement>('.kinetic-marquee');
  if (!marquees.length) return;

  let lastScrollY = window.scrollY;
  let scrollSpeed = 0;

  marquees.forEach((marquee) => {
    const track = marquee.querySelector<HTMLElement>('.marquee-track');
    if (!track) return;

    let position = 0;

    const animate = () => {
      const baseSpeed = 1.4;
      const currentSpeed = baseSpeed + scrollSpeed * 0.18;
      
      position -= currentSpeed;

      const trackWidth = track.scrollWidth / 2;
      if (Math.abs(position) >= trackWidth) {
        position = 0;
      }

      track.style.transform = `translate3d(${position}px, 0, 0)`;
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  });

  let scrollTimeout: any = null;
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY;
    scrollSpeed = Math.min(Math.abs(delta), 40);
    lastScrollY = currentScrollY;

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      scrollSpeed = 0;
    }, 100);
  }, { passive: true });
}

function initRoundedDivTransitions() {
  const roundedWraps = document.querySelectorAll<HTMLElement>('.rounded-div-wrap');
  if (!roundedWraps.length) return;

  const onScroll = () => {
    roundedWraps.forEach((wrap) => {
      const roundedDiv = wrap.querySelector<HTMLElement>('.rounded-div');
      if (!roundedDiv) return;

      const rect = wrap.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.top < viewportHeight && rect.bottom > 0) {
        const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (viewportHeight * 0.8)));
        const heightPx = (1 - progress) * 90;
        roundedDiv.style.height = `${heightPx}px`;
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initFloatingMenuBadge() {
  const badge = document.querySelector<HTMLElement>('.floating-menu-badge');
  if (!badge) return;

  const onScroll = () => {
    if (window.scrollY > 280) {
      badge.classList.add('is-visible');
    } else {
      badge.classList.remove('is-visible');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initDrawerController() {
  const drawer = document.getElementById('nav-drawer');
  if (!drawer) return;

  const triggers = document.querySelectorAll('[data-drawer-trigger], .floating-menu-badge');
  const closers = document.querySelectorAll('[data-drawer-close]');
  const curvePath = document.getElementById('drawer-curve-path') as SVGPathElement | null;

  let isOpen = false;
  let targetCurveX = 100;
  let currentCurveX = 100;
  let animFrameId: number | null = null;
  let closeTimeoutId: number | null = null;
  const drawerDuration = 650;

  const updateSVGPath = () => {
    currentCurveX += (targetCurveX - currentCurveX) * 0.12;

    if (curvePath) {
      // SVG viewBox height is 800
      curvePath.setAttribute('d', `M100,0 Q${Math.round(currentCurveX)},400 100,800 L100,800 L100,0 Z`);
    }

    if (Math.abs(targetCurveX - currentCurveX) > 0.1) {
      animFrameId = requestAnimationFrame(updateSVGPath);
    } else {
      currentCurveX = targetCurveX;
      if (curvePath) {
        curvePath.setAttribute('d', `M100,0 Q${targetCurveX},400 100,800 L100,800 L100,0 Z`);
      }
      animFrameId = null;
    }
  };

  const openDrawer = () => {
    if (closeTimeoutId) {
      window.clearTimeout(closeTimeoutId);
      closeTimeoutId = null;
    }

    isOpen = true;
    drawer.classList.remove('is-closing');
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Elastic bow outwards to the left, then spring back to 100
    currentCurveX = 0;
    targetCurveX = 100;

    if (animFrameId) cancelAnimationFrame(animFrameId);
    animFrameId = requestAnimationFrame(updateSVGPath);
  };

  const closeDrawer = () => {
    if (!isOpen) return;

    isOpen = false;

    // Reverse the opening bow while the panel retracts so both directions
    // share the same elastic curve rather than snapping back to a flat edge.
    currentCurveX = 100;
    targetCurveX = 0;
    if (animFrameId) cancelAnimationFrame(animFrameId);
    animFrameId = requestAnimationFrame(updateSVGPath);

    drawer.classList.remove('is-open');
    drawer.classList.add('is-closing');

    closeTimeoutId = window.setTimeout(() => {
      drawer.classList.remove('is-closing');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      targetCurveX = 100;
      currentCurveX = 100;
      closeTimeoutId = null;
    }, drawerDuration);
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  });

  closers.forEach((closer) => {
    closer.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
    });
  });

  // Keyboard Escape Handler
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeDrawer();
    }
  });

  window.addEventListener('drawer:close', closeDrawer);
}

function initPageTransitions() {
  const overlay = document.getElementById('page-transition');
  const label = overlay?.querySelector<HTMLElement>('.page-transition-overlay__label');
  if (!overlay || !label) return;

  const sessionKey = 'krize-kster-page-transition';
  const windowNameMarker = '__krize_kster_page_transition__=';
  const transitionDuration = 1000;

  const clearOverlay = () => {
    overlay.classList.remove('is-active', 'is-covering', 'is-revealing');
    overlay.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('page-transition-active');
  };

  const replayArrival = () => {
    let pending: { label?: string; createdAt?: number } | null = null;

    try {
      const value = window.sessionStorage.getItem(sessionKey);
      if (value) pending = JSON.parse(value);
      window.sessionStorage.removeItem(sessionKey);
    } catch {
      // Continue with the window.name fallback below.
    }

    if (!pending) {
      try {
        const markerIndex = window.name.lastIndexOf(windowNameMarker);
        if (markerIndex >= 0) {
          const encoded = window.name.slice(markerIndex + windowNameMarker.length).split('|')[0];
          pending = JSON.parse(decodeURIComponent(encoded));
          window.name = window.name.replace(`${windowNameMarker}${encoded}`, '');
        }
      } catch {
        // The outgoing transition still completed; only the arrival replay is skipped.
      }
    }

    if (!pending?.label || !pending.createdAt || Date.now() - pending.createdAt > 5000) return;

    label.textContent = pending.label;
    overlay.classList.add('is-active', 'is-covering');
    overlay.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('page-transition-active');

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => overlay.classList.add('is-revealing'));
    });

    window.setTimeout(clearOverlay, transitionDuration);
  };

  const startTransition = (href: string, destinationLabel: string) => {
    const destination = new URL(href, window.location.href);
    label.textContent = destinationLabel;
    overlay.classList.add('is-active');
    overlay.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('page-transition-active');

    window.requestAnimationFrame(() => overlay.classList.add('is-covering'));

    try {
      const pendingTransition = JSON.stringify({ label: destinationLabel, createdAt: Date.now() });
      window.sessionStorage.setItem(sessionKey, pendingTransition);
      if (destination.pathname === '/' && !destination.hash) {
        window.sessionStorage.setItem('krize-kster-skip-next-home-loader', 'true');
      }

      const encodedTransition = encodeURIComponent(pendingTransition);
      if (!window.name.includes(`${windowNameMarker}${encodedTransition}`)) {
        window.name = `${window.name}${window.name ? '|' : ''}${windowNameMarker}${encodedTransition}`;
      }
    } catch {
      // Navigation still works if storage is unavailable; the window.name fallback is attempted below.
      try {
        const pendingTransition = encodeURIComponent(JSON.stringify({ label: destinationLabel, createdAt: Date.now() }));
        window.name = `${window.name}${window.name ? '|' : ''}${windowNameMarker}${pendingTransition}`;
        if (destination.pathname === '/' && !destination.hash && !window.name.includes('__krize_kster_skip_next_home_loader__')) {
          window.name = `${window.name}__krize_kster_skip_next_home_loader__`;
        }
      } catch {
        // Some embedded contexts block both persistence mechanisms.
      }
    }

    window.setTimeout(() => {
      // Reset beneath the covering overlay so every non-anchor route opens at
      // its header, independent of the source route's scroll position.
      if (!destination.hash) window.scrollTo(0, 0);
      if (!destination.pathname.endsWith('/') && !destination.pathname.includes('.')) {
        destination.pathname = `${destination.pathname}/`;
      }
      window.location.assign(`${destination.pathname}${destination.search}${destination.hash}`);
    }, transitionDuration);
  };

  document.querySelectorAll<HTMLAnchorElement>('[data-page-transition]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = new URL(link.href, window.location.href);
      if (target.origin !== window.location.origin || link.target === '_blank') return;

      const isCurrentPage = target.pathname === window.location.pathname && target.search === window.location.search && target.hash === window.location.hash;
      if (isCurrentPage) {
        if (link.closest('#nav-drawer')) window.dispatchEvent(new CustomEvent('drawer:close'));
        event.preventDefault();
        return;
      }

      event.preventDefault();
      if (link.closest('#nav-drawer')) window.dispatchEvent(new CustomEvent('drawer:close'));
      startTransition(`${target.pathname}${target.search}${target.hash}`, link.dataset.transitionLabel || link.textContent?.trim() || 'Loading');
    });
  });

  replayArrival();
}
