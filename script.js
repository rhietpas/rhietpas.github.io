/* ==========================================================================
   Ryan Hietpas, MPA — Interactive Website Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('main section[id]');

  // 1. Sticky header scroll shadow
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

  // 6. Case Study & Essay Drawer
  const drawerContent = {
    'cgtxchange': {
      kicker: 'Venture · Strategy · Architecture',
      title: 'CGTxchange — Joint Venture of ASGCT & OXTL',
      sections: [
        {
          label: 'The Initiative',
          text: 'CGTxchange is a for-profit venture created as a joint effort between the American Society of Gene & Cell Therapy (ASGCT) and OXTL, designed to bring commercial agility and specialized digital capabilities to the cell and gene therapy ecosystem.'
        },
        {
          label: 'The Approach',
          text: 'Serving as Senior Director, I lead platform strategy, cross-organizational technical alignment, and operational execution—bridging mission-driven scientific credibility with scalable commercial product delivery.'
        },
        {
          label: 'The Impact',
          text: 'Establishing a durable, high-trust digital foundation that connects stakeholders across research, clinical translation, and industry.'
        }
      ]
    },
    'ai-governance': {
      kicker: 'AI Strategy · Policy · Enablement',
      title: 'Association AI Readiness & Governance Framework',
      sections: [
        {
          label: 'The Challenge',
          text: 'Across mission-driven organizations, individual staff members often experiment with generative AI tools in silos—creating uneven quality, data privacy exposure, and uncertainty around acceptable use.'
        },
        {
          label: 'The Approach',
          text: 'Designed a pragmatic, human-centered AI governance program: clear responsible-use guidelines, a vendor and data-classification rubric, and department-level workflow pilots focused on augmenting human judgment rather than replacing institutional expertise.'
        },
        {
          label: 'The Outcome',
          text: 'Established shared organizational fluency, reduced shadow-AI risk, and empowered cross-functional teams to evaluate AI-generated outputs critically while preserving the human connection central to member communities.'
        }
      ]
    },
    'data-ecosystem': {
      kicker: 'Architecture · Integration · Analytics',
      title: 'Unified Member & Scientific Data Ecosystem',
      sections: [
        {
          label: 'The Challenge',
          text: 'Scientific societies and associations frequently operate with member, abstract, event, and learning data fragmented across legacy systems—making holistic member engagement hard to measure.'
        },
        {
          label: 'The Approach',
          text: 'Architected clean integration pathways connecting core AMS/CRM records, educational platforms, and event touchpoints into a governed reporting layer with consistent identity resolution.'
        },
        {
          label: 'The Outcome',
          text: 'Delivered a reliable single source of truth for leadership and program teams, enabling faster strategic planning and more personalized, relevant member experiences.'
        }
      ]
    },
    'meeting-scale': {
      kicker: 'Infrastructure · Reliability · UX',
      title: 'Digital Platform & Annual Meeting Scale',
      sections: [
        {
          label: 'The Challenge',
          text: 'Flagship scientific conferences and year-round educational programming place intense, spiky demand on web properties, authentication flows, and digital content delivery.'
        },
        {
          label: 'The Approach',
          text: 'Modernized core web architecture, streamlined single sign-on (SSO) journeys, and instituted pre-event load testing and observability playbooks with cross-functional staff.'
        },
        {
          label: 'The Outcome',
          text: 'Seamless digital reliability during peak global traffic windows, paired with a cleaner, more intuitive experience for researchers, clinicians, and attendees.'
        }
      ]
    },
    'security-resilience': {
      kicker: 'Security · Risk · Governance',
      title: 'Pragmatic Cybersecurity & Vendor Resilience',
      sections: [
        {
          label: 'The Challenge',
          text: 'Lean technology teams must protect sensitive member and organizational data against modern threats without introducing friction that slows down daily collaboration.'
        },
        {
          label: 'The Approach',
          text: 'Implemented risk-tiered vendor assessments, modern identity and access management (IAM), and practical, scenario-based staff security training.'
        },
        {
          label: 'The Outcome',
          text: 'Elevated organizational security posture and board-level risk visibility while keeping everyday workflows fast and frictionless.'
        }
      ]
    },
    'quiet-infrastructure': {
      kicker: 'Perspective Note · 2 Min Read',
      title: 'Quiet Infrastructure: Why Boring Systems Win',
      sections: [
        {
          label: 'On Restraint in Technology Leadership',
          text: 'In an era where every software vendor promises revolutionary transformation, the highest-leverage work a technology leader can do is often invisible: simplifying integrations, retiring brittle workarounds, and documenting clear ownership.'
        },
        {
          label: 'Governance as an Enabler',
          text: 'Drawing from public administration, good governance is never about bureaucracy for its own sake. Clear decision rights and thoughtful guardrails give teams the confidence to move faster—especially when adopting emerging tools like AI.'
        },
        {
          label: 'Serving the Mission',
          text: 'When infrastructure is quiet, dependable, and aligned with human workflows, staff spend less time fighting their tools and more time advancing the scientific and member communities they serve.'
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

  // 7. Contact Form Submission (Client-side validation & confirmation)
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

      formStatus.textContent = `Thank you, ${name}. Your note is ready—feel free to connect directly via LinkedIn as well.`;
      contactForm.reset();
    });
  }
});
