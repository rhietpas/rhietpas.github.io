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

  // 6. Case Study Slide-Over Drawer
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
          text: 'I co-lead day-to-day management of CGTxchange, LLC, advise the ASGCT CEO (who sits on the CGTxchange board) on operational and development plans, and lead security and compliance—including penetration testing, a policy library, and third-party security assessments.'
        }
      ]
    },
    'asgct-web': {
      kicker: 'Web Redesign · $500K Budget · 2× Award Winner',
      title: 'ASGCT Three-Property Web Redesign',
      sections: [
        {
          label: 'Scope & Budget Discipline',
          text: 'Led the 2024–2025 redesign and launch of three distinct web properties—asgct.org, annualmeeting.asgct.org, and patienteducation.asgct.org—finishing within $5,000 of the $500,000 project budget.'
        },
        {
          label: 'Recognition',
          text: 'Earned a Gold Award for Best Website in the Association TRENDS All-Media Contest (TRENDY Awards, March 2026) and an Award of Distinction from the Communicator Awards (May 2026).'
        }
      ]
    },
    'systems-modernization': {
      kicker: 'CRM · Finance · Annual Meeting',
      title: 'Core Systems & Finance Modernization at ASGCT',
      sections: [
        {
          label: 'Membership & Marketing',
          text: 'Led adoption of HubSpot across development, marketing, and membership teams, improving event history tracking and data sharing between HubSpot and iMIS.'
        },
        {
          label: 'Finance Modernization',
          text: 'Partnered with the Finance Director to implement Ramp—replacing physically signed checks and emailed expense spreadsheets—and Sage Intacct, replacing a third-party accounting service.'
        },
        {
          label: 'Annual Meeting Technology',
          text: 'Implemented a new Annual Meeting registration system (MCI/Cvent) and led adoption of M-Events for Annual Meeting abstract management.'
        }
      ]
    },
    'ai-governance': {
      kicker: 'AI Policy · Copilot & Claude · Staff Adoption',
      title: 'Organization-Wide AI Governance & Rollout',
      sections: [
        {
          label: 'Policy & Executive Alignment',
          text: 'Developed and led adoption of staff AI acceptable use policies at ASGCT, working directly with the CEO to define permissions, data-handling rules, and clear expectations.'
        },
        {
          label: 'Practical Deployment',
          text: 'Rolled out Microsoft Copilot and Claude to staff with practical guidance on appropriate use, and enabled native AI features inside existing platforms like HubSpot under the same governance framework.'
        }
      ]
    },
    'it-operations': {
      kicker: 'IT Operations · Office Build-Out · Staffing',
      title: 'In-House IT Transition & New Office Build-Out',
      sections: [
        {
          label: 'In-House IT Transition',
          text: 'Transitioned day-to-day IT support from an external managed services provider (MSP) to an in-house IT Manager reporting to the Senior Director of Technology, improving response times and institutional knowledge.'
        },
        {
          label: 'New Office Technology Build-Out',
          text: 'Led the full technology build-out of ASGCT’s new office space—covering modern networking, door access and camera security, and smart display audio-visual systems in meeting rooms—while managing over $600,000 in annual software licensing and vendor agreements.'
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
