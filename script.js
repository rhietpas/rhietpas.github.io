/* ==========================================================================
   Ryan Hietpas, MPA — Interactive Website Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('main section[id]');

  // 1. Sticky header scroll state
  const onScroll = () => {
    if (window.scrollY > 24) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 2. Mobile navigation toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navItems.forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Scrollspy for active navigation links
  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navItems.forEach((a) => {
            a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
  );
  sections.forEach((sec) => spyObserver.observe(sec));

  // 4. Subtle scroll-reveal animations
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  // 5. Initiative category filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const initiativeCards = document.querySelectorAll('.initiative-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      initiativeCards.forEach((card) => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // 6. Case Study Slide-Over Drawer (public-safe executive summaries)
  const drawerContent = {
    'cgtxchange': {
      kicker: 'Joint Venture · AI Marketplace · Security',
      title: 'CGTxchange, LLC (ASGCT & OTXL)',
      sections: [
        {
          label: 'The Problem',
          text: 'Policy and market shifts have left hundreds of rare-disease cell and gene therapy programs shelved or underfunded—often because program owners and potential partners lack an efficient way to find and evaluate each other.'
        },
        {
          label: 'The Platform',
          text: 'Built jointly by ASGCT and Orphan Therapeutics Accelerator (OTXL), CGTxchange is a curated, AI-enabled marketplace where program owners list clinical-stage and deprioritized CGT assets (in vivo viral GTx, ex vivo gene-modified cell therapies, ASOs) and investors or in-licensors review standardized scoring across competitive landscape, preclinical safety, and clinical efficacy alongside streamlined data rooms.'
        },
        {
          label: 'My Role',
          text: 'I co-lead day-to-day management of CGTxchange, LLC, advise board leadership on operational and development plans, and serve as designated Security Officer and Technology Lead—overseeing vendor agreements, third-party penetration testing, a formal security policy library, and data-protection governance.'
        }
      ]
    },
    'asgct-web': {
      kicker: 'Web Redesign · Three Properties · 2× Award Winner',
      title: 'ASGCT Three-Property Web Redesign',
      sections: [
        {
          label: 'Scope & Delivery',
          text: 'Led the 2024–2025 redesign and launch of three distinct public web properties—asgct.org, annualmeeting.asgct.org, and patienteducation.asgct.org—delivering the multi-site program on budget.'
        },
        {
          label: 'Recognition',
          text: 'Earned a Gold Award for Best Website in the Association TRENDS All-Media Contest (TRENDY Awards, March 2026) and an Award of Distinction from the Communicator Awards (May 2026).'
        }
      ]
    },
    'systems-modernization': {
      kicker: 'Integration Architecture · Events · Finance',
      title: 'Enterprise Systems & Event Ecosystem',
      sections: [
        {
          label: 'System-of-Record Architecture',
          text: 'Designed clean integration boundaries across membership, CRM, development, and marketing—keeping the AMS as the authoritative source of record and single sign-on identity provider while enabling reliable data sync into CRM and event platforms.'
        },
        {
          label: 'Annual Meeting & Scientific Events',
          text: 'Led implementation and end-to-end integration testing across registration, exhibitor portals, abstract management, and attendee engagement tools to support high-volume scientific conferences.'
        },
        {
          label: 'Finance & Operations Modernization',
          text: 'Partnered with Finance leadership to modernize expense management, spend tracking, and accounting workflows on modern cloud platforms.'
        }
      ]
    },
    'ai-governance': {
      kicker: 'AI Policy · Enterprise Rollout · Custom Prototypes',
      title: 'Organization-Wide AI Governance & Adoption',
      sections: [
        {
          label: 'Policy & Guardrails',
          text: 'Partnered with executive leadership to author and maintain an AI Acceptable Use Policy—establishing clear human-review requirements, approved enterprise tools, and strict boundaries around member, financial, and unpublished scientific data.'
        },
        {
          label: 'Rollout & Practical Tooling',
          text: 'Guided staff adoption of enterprise AI platforms (Microsoft Copilot and Claude) and built targeted internal software prototypes with AI when off-the-shelf commercial tools were oversized or cost-prohibitive.'
        }
      ]
    },
    'it-operations': {
      kicker: 'IT Operations · Vendor Strategy · Office Build-Out',
      title: 'In-House IT Transition & Infrastructure Modernization',
      sections: [
        {
          label: 'In-House IT Leadership',
          text: 'Transitioned day-to-day IT operations from an external managed services provider (MSP) to an in-house IT management model—separating daily support and device operations from executive systems architecture and vendor strategy.'
        },
        {
          label: 'Portfolio Discipline & Office Build-Out',
          text: 'Consolidated redundant software licenses, instituted structured RFP and SOW contract reviews (covering data ownership, security, and liability), and led the full network, security, and A/V technology build-out for ASGCT’s new office.'
        }
      ]
    },
    'msci-leadership': {
      kicker: 'Strategic Planning · BI · Chapters',
      title: 'MSCI Digital Operations & Remote Transition (2012–2023)',
      sections: [
        {
          label: 'Executive & Chapter Leadership',
          text: 'Served on the four-person team that built MSCI’s short- and long-term strategic plan, managed the MSCI product council and five regional chapters, and led the Build-Now.org infrastructure investment campaign.'
        },
        {
          label: 'Platforms & Analytics',
          text: 'Oversaw iMIS, Higher Logic, Informz, WordPress (2018 W³ Gold Award for msci.org), Sarus LMS, Concur synced to Dynamics, and a Tableau BI reporting site tracking membership, sales, conferences, and web activity—plus a custom web scholarship system that saved over 100 staff-hours per year.'
        },
        {
          label: 'Remote Transition & Security',
          text: 'Led MSCI’s transition to all-remote staff operations (Teams, Zoom, cloud storage) and virtual member events with zero significant security breaches, backed by universal 2FA, encrypted VPN, and ongoing staff phishing and ransomware training.'
        }
      ]
    }
  };

  const backdrop = document.getElementById('modal-backdrop');
  const modalClose = document.getElementById('modal-close');
  const modalKicker = document.getElementById('modal-kicker');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');

  const openDrawer = (key) => {
    const data = drawerContent[key];
    if (!data) return;

    modalKicker.textContent = data.kicker;
    modalTitle.textContent = data.title;
    modalBody.innerHTML = data.sections
      .map(
        (sec) => `
          <h4 class="modal-section-label">${sec.label}</h4>
          <p>${sec.text}</p>
        `
      )
      .join('');

    backdrop.classList.add('open');
    backdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  };

  const closeDrawer = () => {
    backdrop.classList.remove('open');
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-drawer]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      openDrawer(trigger.dataset.drawer);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeDrawer);
  }

  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeDrawer();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) {
      closeDrawer();
    }
  });

  // 7. Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        formStatus.textContent = 'Please complete your name, email, and message.';
        return;
      }

      formStatus.textContent = `Thanks, ${name}. For the fastest response, please also connect directly via LinkedIn.`;
      contactForm.reset();
    });
  }
});
