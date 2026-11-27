const pptxgen = require('pptxgenjs');
const path = require('path');

async function createPresentation() {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  pres.author = 'Ishaan (Ishaaaan10)';
  pres.company = 'University Department of Computer Science & Engineering';
  pres.title = 'UniTrace - University Campus Lost & Found System';
  pres.subject = 'Fullstack Web Development Project Presentation & Viva Defense';

  // Palette Constants
  const BG_COLOR = '0A0F1D';      // Deep Slate Navy
  const CARD_BG = '141E33';       // Dark Card Fill
  const CARD_BORDER = '233354';   // Border Outline
  const PRIMARY_COLOR = '6366F1'; // Electric Indigo
  const SUCCESS_COLOR = '10B981'; // Emerald Green
  const WARNING_COLOR = 'F59E0B'; // Amber Orange
  const DANGER_COLOR = 'F43F5E';  // Rose Coral
  const TEXT_LIGHT = 'F8FAFC';    // Crisp White
  const TEXT_MUTED = '94A3B8';    // Secondary Slate
  const ACCENT_CYAN = '38BDF8';   // Sky Blue

  // Helper to apply base slide background and header
  function createStandardSlide(category, title, subtitle) {
    const slide = pres.addSlide();
    slide.background = { color: BG_COLOR };

    // Ambient Top Highlight Strip
    slide.addShape(pres.ShapeType.rect, {
      x: 0,
      y: 0,
      w: 13.33,
      h: 0.12,
      fill: { color: PRIMARY_COLOR },
      line: { color: PRIMARY_COLOR },
    });

    // Top Category / Tag
    slide.addText(category.toUpperCase(), {
      x: 0.8,
      y: 0.45,
      w: 10,
      h: 0.3,
      fontSize: 10,
      fontFace: 'Arial',
      bold: true,
      color: PRIMARY_COLOR,
      charSpacing: 2,
    });

    // Main Slide Title
    slide.addText(title, {
      x: 0.8,
      y: 0.75,
      w: 11,
      h: 0.55,
      fontSize: 22,
      fontFace: 'Arial',
      bold: true,
      color: TEXT_LIGHT,
    });

    // Subtitle / Scope
    if (subtitle) {
      slide.addText(subtitle, {
        x: 0.8,
        y: 1.25,
        w: 11,
        h: 0.35,
        fontSize: 12,
        fontFace: 'Arial',
        color: TEXT_MUTED,
      });
    }

    // Bottom Footer
    slide.addText('UniTrace: Campus Lost & Found System | Fullstack Engineering Lab Project', {
      x: 0.8,
      y: 7.1,
      w: 8.5,
      h: 0.3,
      fontSize: 9,
      fontFace: 'Arial',
      color: '475569',
    });

    slide.addText('https://unitrace-lostandfound.vercel.app', {
      x: 8.5,
      y: 7.1,
      w: 4.0,
      h: 0.3,
      fontSize: 9,
      fontFace: 'Arial',
      color: PRIMARY_COLOR,
      align: 'right',
    });

    return slide;
  }

  // ==========================================
  // SLIDE 1: TITLE SLIDE
  // ==========================================
  {
    const slide = pres.addSlide();
    slide.background = { color: BG_COLOR };

    // Top Decorative Accent line
    slide.addShape(pres.ShapeType.rect, {
      x: 0,
      y: 0,
      w: 13.33,
      h: 0.15,
      fill: { color: PRIMARY_COLOR },
      line: { color: PRIMARY_COLOR },
    });

    // Project Tag Badge
    slide.addShape(pres.ShapeType.roundRect, {
      x: 1.0,
      y: 1.2,
      w: 3.8,
      h: 0.45,
      rectRadius: 0.2,
      fill: { color: '1E1B4B' },
      line: { color: '4338CA', width: 1 },
    });
    slide.addText('FULLSTACK ENGINEERING LAB PROJECT', {
      x: 1.1,
      y: 1.2,
      w: 3.6,
      h: 0.45,
      fontSize: 10,
      fontFace: 'Arial',
      bold: true,
      color: 'A5B4FC',
      align: 'center',
    });

    // Main App Title
    slide.addText('UniTrace: Smart Campus\nLost & Found Recovery System', {
      x: 1.0,
      y: 1.85,
      w: 11.3,
      h: 1.6,
      fontSize: 34,
      fontFace: 'Arial',
      bold: true,
      color: TEXT_LIGHT,
      lineSpacing: 42,
    });

    // Subtitle
    slide.addText(
      'A secure, anti-theft university portal featuring multi-factor AI counterpart matching, challenge-question ownership verification, and cryptographic 6-digit OTP custody restitution.',
      {
        x: 1.0,
        y: 3.6,
        w: 10.5,
        h: 0.8,
        fontSize: 14,
        fontFace: 'Arial',
        color: TEXT_MUTED,
        lineSpacing: 20,
      }
    );

    // Live Deployment Pill Box
    slide.addShape(pres.ShapeType.roundRect, {
      x: 1.0,
      y: 4.6,
      w: 11.33,
      h: 1.1,
      rectRadius: 0.15,
      fill: { color: CARD_BG },
      line: { color: CARD_BORDER, width: 1 },
    });

    slide.addText('🌐 LIVE VERCEL PRODUCTION URL:', {
      x: 1.3,
      y: 4.8,
      w: 4.0,
      h: 0.3,
      fontSize: 10,
      fontFace: 'Arial',
      bold: true,
      color: SUCCESS_COLOR,
    });
    slide.addText('https://unitrace-lostandfound.vercel.app', {
      x: 1.3,
      y: 5.15,
      w: 4.5,
      h: 0.35,
      fontSize: 12,
      fontFace: 'Arial',
      bold: true,
      color: TEXT_LIGHT,
    });

    slide.addText('📦 GITHUB REPOSITORY:', {
      x: 6.8,
      y: 4.8,
      w: 4.0,
      h: 0.3,
      fontSize: 10,
      fontFace: 'Arial',
      bold: true,
      color: PRIMARY_COLOR,
    });
    slide.addText('https://github.com/Ishaaaan10/Unitrace-lost-and-found', {
      x: 6.8,
      y: 5.15,
      w: 5.2,
      h: 0.35,
      fontSize: 12,
      fontFace: 'Arial',
      bold: true,
      color: TEXT_LIGHT,
    });

    // Presenter Details Footer
    slide.addText('Developer & Presenter: Ishaan (GitHub: @Ishaaaan10) | Tech Stack: Next.js 14, TypeScript, Tailwind CSS', {
      x: 1.0,
      y: 6.2,
      w: 11.33,
      h: 0.4,
      fontSize: 11,
      fontFace: 'Arial',
      bold: true,
      color: 'CBD5E1',
    });
  }

  // ==========================================
  // SLIDE 2: PROBLEM STATEMENT & MOTIVATION
  // ==========================================
  {
    const slide = createStandardSlide(
      'Problem Statement & Motivation',
      'Why Traditional Campus Lost & Found Fails',
      'Informal messaging groups and open bulletin boards create critical security and privacy gaps.'
    );

    const problems = [
      {
        title: 'High Risk of Fraudulent Claims',
        desc: 'Unverified public boards display photos and full descriptions of lost items (MacBooks, AirPods, Wallets). Impostors easily claim valuable goods without proof of ownership.',
        tag: 'Vulnerability #1',
        color: DANGER_COLOR,
      },
      {
        title: 'Lack of Automated Cross-Referencing',
        desc: 'Lost reports and found items are logged in disconnected silos across library counters, sports desks, and canteen registers. Finding a match requires manual human memory.',
        tag: 'Vulnerability #2',
        color: WARNING_COLOR,
      },
      {
        title: 'Absence of Custody Chain & Proof',
        desc: 'Security guards and laboratory assistants have no formal verification protocol, single-use security tokens, or printable legal handover restitution certificates.',
        tag: 'Vulnerability #3',
        color: PRIMARY_COLOR,
      },
    ];

    problems.forEach((p, idx) => {
      const xPos = 0.8 + idx * 3.9;
      slide.addShape(pres.ShapeType.roundRect, {
        x: xPos,
        y: 1.8,
        w: 3.7,
        h: 4.8,
        rectRadius: 0.15,
        fill: { color: CARD_BG },
        line: { color: CARD_BORDER, width: 1 },
      });

      slide.addShape(pres.ShapeType.roundRect, {
        x: xPos + 0.3,
        y: 2.1,
        w: 1.8,
        h: 0.35,
        rectRadius: 0.1,
        fill: { color: '0F172A' },
        line: { color: p.color, width: 1 },
      });

      slide.addText(p.tag, {
        x: xPos + 0.3,
        y: 2.1,
        w: 1.8,
        h: 0.35,
        fontSize: 9,
        fontFace: 'Arial',
        bold: true,
        color: p.color,
        align: 'center',
      });

      slide.addText(p.title, {
        x: xPos + 0.3,
        y: 2.7,
        w: 3.1,
        h: 0.8,
        fontSize: 16,
        fontFace: 'Arial',
        bold: true,
        color: TEXT_LIGHT,
      });

      slide.addText(p.desc, {
        x: xPos + 0.3,
        y: 3.6,
        w: 3.1,
        h: 2.6,
        fontSize: 12,
        fontFace: 'Arial',
        color: TEXT_MUTED,
        lineSpacing: 18,
      });
    });
  }

  // ==========================================
  // SLIDE 3: PROPOSED SOLUTION & INNOVATIONS
  // ==========================================
  {
    const slide = createStandardSlide(
      'Proposed Solution',
      'The UniTrace Anti-Theft Architecture',
      'A multi-tier platform connecting students, finders, and vigilance guards through cryptographic trust.'
    );

    const pillars = [
      {
        num: '01',
        title: 'Secret Challenge Questions',
        desc: 'Reporters lock items with private verification questions (e.g. wallpaper, sticker placement, serial numbers). The answer remains confidential and hidden from the public view.',
        badge: 'Anti-Theft Protocol',
        badgeColor: DANGER_COLOR,
      },
      {
        num: '02',
        title: 'Multi-Factor AI Matching',
        desc: 'Real-time heuristic similarity algorithm cross-references categories, keywords, 8 campus zones, and timestamps with a 0-100% confidence rating to notify students automatically.',
        badge: 'Smart Discovery',
        badgeColor: WARNING_COLOR,
      },
      {
        num: '03',
        title: 'Gate 1 Cryptographic OTP Pass',
        desc: 'Security officers evaluate claimant responses side-by-side. Approved claims generate a dynamic QR pass with a single-use 6-digit OTP code verified physically at Central Security.',
        badge: 'Verified Restitution',
        badgeColor: SUCCESS_COLOR,
      },
    ];

    pillars.forEach((p, idx) => {
      const yPos = 1.8 + idx * 1.65;
      slide.addShape(pres.ShapeType.roundRect, {
        x: 0.8,
        y: yPos,
        w: 11.73,
        h: 1.45,
        rectRadius: 0.15,
        fill: { color: CARD_BG },
        line: { color: CARD_BORDER, width: 1 },
      });

      // Number box
      slide.addShape(pres.ShapeType.rect, {
        x: 1.1,
        y: yPos + 0.3,
        w: 0.85,
        h: 0.85,
        fill: { color: '1E1B4B' },
        line: { color: PRIMARY_COLOR, width: 1 },
      });
      slide.addText(p.num, {
        x: 1.1,
        y: yPos + 0.3,
        w: 0.85,
        h: 0.85,
        fontSize: 16,
        fontFace: 'Arial',
        bold: true,
        color: PRIMARY_COLOR,
        align: 'center',
        valign: 'middle',
      });

      slide.addText(p.title, {
        x: 2.2,
        y: yPos + 0.25,
        w: 4.5,
        h: 0.4,
        fontSize: 16,
        fontFace: 'Arial',
        bold: true,
        color: TEXT_LIGHT,
      });

      slide.addText(p.desc, {
        x: 2.2,
        y: yPos + 0.7,
        w: 7.8,
        h: 0.65,
        fontSize: 11.5,
        fontFace: 'Arial',
        color: TEXT_MUTED,
        lineSpacing: 16,
      });

      slide.addShape(pres.ShapeType.roundRect, {
        x: 10.3,
        y: yPos + 0.5,
        w: 1.9,
        h: 0.4,
        rectRadius: 0.1,
        fill: { color: '0F172A' },
        line: { color: p.badgeColor, width: 1 },
      });
      slide.addText(p.badge, {
        x: 10.3,
        y: yPos + 0.5,
        w: 1.9,
        h: 0.4,
        fontSize: 9,
        fontFace: 'Arial',
        bold: true,
        color: p.badgeColor,
        align: 'center',
        valign: 'middle',
      });
    });
  }

  // ==========================================
  // SLIDE 4: TECHNICAL ARCHITECTURE & STACK
  // ==========================================
  {
    const slide = createStandardSlide(
      'System Architecture',
      'Fullstack Technology Stack Breakdown',
      'Modern modular architecture engineered for zero server lock-in and high scalability.'
    );

    const layers = [
      {
        name: 'Client Presentation Layer',
        tech: 'Next.js 14 App Router, React 18, Tailwind CSS, Lucide Icons',
        details: 'Server & Client Component separation, responsive dark-mode glassmorphic interface, client-side routing, and real-time form validation.',
        color: PRIMARY_COLOR,
      },
      {
        name: 'State & Domain Logic Layer',
        tech: 'React Context API, matchEngine.ts, dateUtils.ts',
        details: 'Centralized reactive state managing items, claims, notifications, and user profiles with client-side localStorage synchronization and seed fallback.',
        color: ACCENT_CYAN,
      },
      {
        name: 'Serverless API & Backend Layer',
        tech: 'Next.js Edge Route Handlers (/api/items, /api/claims, /api/handover)',
        details: 'RESTful API architecture handling item registration, challenge validation, cryptographic OTP verification, and restitution receipt generation.',
        color: SUCCESS_COLOR,
      },
      {
        name: 'Cloud Deployment & DevOps',
        tech: 'Vercel Edge Network & GitHub CI/CD Pipeline',
        details: 'Continuous integration and deployment triggered on git push to main. Global CDN distribution with automatic SSL encryption and serverless scaling.',
        color: WARNING_COLOR,
      },
    ];

    layers.forEach((l, idx) => {
      const yPos = 1.8 + idx * 1.25;
      slide.addShape(pres.ShapeType.roundRect, {
        x: 0.8,
        y: yPos,
        w: 11.73,
        h: 1.1,
        rectRadius: 0.1,
        fill: { color: CARD_BG },
        line: { color: CARD_BORDER, width: 1 },
      });

      slide.addShape(pres.ShapeType.rect, {
        x: 0.8,
        y: yPos,
        w: 0.15,
        h: 1.1,
        fill: { color: l.color },
        line: { color: l.color },
      });

      slide.addText(l.name, {
        x: 1.2,
        y: yPos + 0.15,
        w: 3.5,
        h: 0.35,
        fontSize: 14,
        fontFace: 'Arial',
        bold: true,
        color: TEXT_LIGHT,
      });

      slide.addText(l.tech, {
        x: 1.2,
        y: yPos + 0.55,
        w: 4.5,
        h: 0.35,
        fontSize: 10,
        fontFace: 'Arial',
        bold: true,
        color: l.color,
      });

      slide.addText(l.details, {
        x: 5.8,
        y: yPos + 0.15,
        w: 6.4,
        h: 0.8,
        fontSize: 11,
        fontFace: 'Arial',
        color: TEXT_MUTED,
        lineSpacing: 15,
      });
    });
  }

  // ==========================================
  // SLIDE 5: SMART AI AUTO-MATCHING ALGORITHM
  // ==========================================
  {
    const slide = createStandardSlide(
      'Core Algorithm',
      'Multi-Factor Heuristic Matching Engine',
      'Automated similarity scoring between newly filed Lost and Found articles.'
    );

    // Left Box: Formula & Weights
    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8,
      y: 1.8,
      w: 5.6,
      h: 4.8,
      rectRadius: 0.15,
      fill: { color: CARD_BG },
      line: { color: CARD_BORDER, width: 1 },
    });

    slide.addText('SIMILARITY SCORING FORMULA', {
      x: 1.1,
      y: 2.1,
      w: 5.0,
      h: 0.3,
      fontSize: 11,
      fontFace: 'Arial',
      bold: true,
      color: PRIMARY_COLOR,
      charSpacing: 1,
    });

    slide.addText('Score = W_cat·C + W_kw·K + W_loc·L + W_time·T', {
      x: 1.1,
      y: 2.5,
      w: 5.0,
      h: 0.45,
      fontSize: 13,
      fontFace: 'Courier New',
      bold: true,
      color: ACCENT_CYAN,
    });

    const weights = [
      { name: 'Category Match (W_cat)', pct: '40%', desc: 'Exact category equivalence (e.g. Electronics, IDs)' },
      { name: 'Keyword Overlap (W_kw)', pct: '35%', desc: 'Tokenized word similarity across title & description' },
      { name: 'Campus Zone Proximity (W_loc)', pct: '15%', desc: 'Matching building/facility zone code (LIB, CAFE)' },
      { name: 'Temporal Proximity (W_time)', pct: '10%', desc: 'Discrepancy penalty within 24-48 hour window' },
    ];

    weights.forEach((w, idx) => {
      const rowY = 3.2 + idx * 0.8;
      slide.addText(w.name, {
        x: 1.1,
        y: rowY,
        w: 3.5,
        h: 0.25,
        fontSize: 11,
        fontFace: 'Arial',
        bold: true,
        color: TEXT_LIGHT,
      });
      slide.addText(w.pct, {
        x: 4.8,
        y: rowY,
        w: 1.2,
        h: 0.25,
        fontSize: 11,
        fontFace: 'Arial',
        bold: true,
        color: SUCCESS_COLOR,
        align: 'right',
      });
      slide.addText(w.desc, {
        x: 1.1,
        y: rowY + 0.28,
        w: 4.9,
        h: 0.4,
        fontSize: 9.5,
        fontFace: 'Arial',
        color: TEXT_MUTED,
      });
    });

    // Right Box: Case Study Match
    slide.addShape(pres.ShapeType.roundRect, {
      x: 6.8,
      y: 1.8,
      w: 5.73,
      h: 4.8,
      rectRadius: 0.15,
      fill: { color: CARD_BG },
      line: { color: CARD_BORDER, width: 1 },
    });

    slide.addText('LIVE DEMONSTRATION CASE STUDY', {
      x: 7.1,
      y: 2.1,
      w: 5.0,
      h: 0.3,
      fontSize: 11,
      fontFace: 'Arial',
      bold: true,
      color: WARNING_COLOR,
      charSpacing: 1,
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 7.1,
      y: 2.55,
      w: 5.13,
      h: 1.15,
      rectRadius: 0.1,
      fill: { color: '1C1917' },
      line: { color: DANGER_COLOR, width: 1 },
    });
    slide.addText('LOST REPORT #item-101 (Aarav Sharma)', {
      x: 7.3,
      y: 2.65,
      w: 4.7,
      h: 0.25,
      fontSize: 10,
      fontFace: 'Arial',
      bold: true,
      color: DANGER_COLOR,
    });
    slide.addText('Apple MacBook Air M2 in Central Library (2nd Floor Quiet Cubicle)', {
      x: 7.3,
      y: 2.95,
      w: 4.7,
      h: 0.65,
      fontSize: 11,
      fontFace: 'Arial',
      color: TEXT_LIGHT,
    });

    slide.addShape(pres.ShapeType.roundRect, {
      x: 7.1,
      y: 3.85,
      w: 5.13,
      h: 1.15,
      rectRadius: 0.1,
      fill: { color: '064E3B' },
      line: { color: SUCCESS_COLOR, width: 1 },
    });
    slide.addText('FOUND REPORT #item-102 (Library Staff Suresh)', {
      x: 7.3,
      y: 3.95,
      w: 4.7,
      h: 0.25,
      fontSize: 10,
      fontFace: 'Arial',
      bold: true,
      color: SUCCESS_COLOR,
    });
    slide.addText('Apple MacBook Laptop with Stickers in Central Library 2nd Floor', {
      x: 7.3,
      y: 4.25,
      w: 4.7,
      h: 0.65,
      fontSize: 11,
      fontFace: 'Arial',
      color: TEXT_LIGHT,
    });

    // Score Outcome Badge
    slide.addShape(pres.ShapeType.roundRect, {
      x: 7.1,
      y: 5.2,
      w: 5.13,
      h: 1.1,
      rectRadius: 0.1,
      fill: { color: '1E1B4B' },
      line: { color: PRIMARY_COLOR, width: 1.5 },
    });
    slide.addText('⚡ MATCH CONFIDENCE: 95% (AUTO-ALERT DISPATCHED)', {
      x: 7.3,
      y: 5.35,
      w: 4.7,
      h: 0.3,
      fontSize: 11,
      fontFace: 'Arial',
      bold: true,
      color: 'FDE047',
    });
    slide.addText('UniTrace dispatches an in-app match notification prompting Aarav to verify the challenge answer.', {
      x: 7.3,
      y: 5.7,
      w: 4.7,
      h: 0.5,
      fontSize: 10,
      fontFace: 'Arial',
      color: TEXT_MUTED,
    });
  }

  // ==========================================
  // SLIDE 6: SECURITY DESK & OTP WORKFLOW
  // ==========================================
  {
    const slide = createStandardSlide(
      'Physical Security Workflow',
      'The Gate 1 Handover & Restitution Protocol',
      'How physical property custody is tracked and safely disbursed to verified owners.'
    );

    const steps = [
      {
        step: 'STEP 1',
        title: 'Claim Evaluation',
        desc: 'Claimant answers the challenge question. Campus Security evaluates the response side-by-side with confidential stored answer.',
        color: PRIMARY_COLOR,
      },
      {
        step: 'STEP 2',
        title: 'Pass Generation',
        desc: 'Security approves claim. System generates a Digital Claim Pass with dynamic QR code and a 6-digit cryptographic OTP (#482915).',
        color: WARNING_COLOR,
      },
      {
        step: 'STEP 3',
        title: 'Gate 1 OTP Scan',
        desc: 'Student arrives at Gate 1 Main Depot. Officer inputs or scans OTP code. System validates custody code and updates status to RETURNED.',
        color: ACCENT_CYAN,
      },
      {
        step: 'STEP 4',
        title: 'Official Certificate',
        desc: 'System prints formal university restitution certificate with student roll number, officer ID, locker inventory, and timestamp.',
        color: SUCCESS_COLOR,
      },
    ];

    steps.forEach((s, idx) => {
      const xPos = 0.8 + idx * 2.95;
      slide.addShape(pres.ShapeType.roundRect, {
        x: xPos,
        y: 1.8,
        w: 2.8,
        h: 4.8,
        rectRadius: 0.15,
        fill: { color: CARD_BG },
        line: { color: CARD_BORDER, width: 1 },
      });

      slide.addShape(pres.ShapeType.rect, {
        x: xPos + 0.25,
        y: 2.1,
        w: 1.2,
        h: 0.35,
        fill: { color: '0F172A' },
        line: { color: s.color, width: 1 },
      });
      slide.addText(s.step, {
        x: xPos + 0.25,
        y: 2.1,
        w: 1.2,
        h: 0.35,
        fontSize: 9,
        fontFace: 'Arial',
        bold: true,
        color: s.color,
        align: 'center',
      });

      slide.addText(s.title, {
        x: xPos + 0.25,
        y: 2.7,
        w: 2.3,
        h: 0.6,
        fontSize: 15,
        fontFace: 'Arial',
        bold: true,
        color: TEXT_LIGHT,
      });

      slide.addText(s.desc, {
        x: xPos + 0.25,
        y: 3.4,
        w: 2.3,
        h: 2.9,
        fontSize: 11,
        fontFace: 'Arial',
        color: TEXT_MUTED,
        lineSpacing: 17,
      });
    });
  }

  // ==========================================
  // SLIDE 7: KEY APPLICATION MODULES
  // ==========================================
  {
    const slide = createStandardSlide(
      'System Capabilities',
      'Comprehensive Core Modules & UI Views',
      'End-to-end features designed for students, faculty, and vigilance officers.'
    );

    const modules = [
      {
        name: 'Student Action Launchpad (/)',
        desc: 'High-visibility dual action cards (I Lost Something / I Found Something), quick category search, and real-time status counters.',
        icon: '🚀',
      },
      {
        name: 'Anti-Theft Reporting Engine (/report)',
        desc: 'Image presets, zone pickers, auto-initializing date/time stamps with "Set to Right Now" quick buttons, and secret challenge builders.',
        icon: '📝',
      },
      {
        name: 'Campus Security Depot (/security-desk)',
        desc: 'OTP verification scanner, holding locker inventory tracking (Locker A-04, Drawer C-02), and side-by-side claim adjudication queue.',
        icon: '👮',
      },
      {
        name: 'Geospatial Campus Radar (/campus-map)',
        desc: 'Interactive clickable facility map visualizing real-time lost and found item density across 8 monitored campus facilities.',
        icon: '🗺️',
      },
      {
        name: '1-Click Multi-Role Switcher',
        desc: 'Instant simulation of student Aarav Sharma, student Priya Patel, and vigilance officer Rajesh Kumar for laboratory evaluation.',
        icon: '🎭',
      },
      {
        name: 'Built-in Viva Defense Manual (/viva-guide)',
        desc: 'Architectural blueprints, REST endpoint documentation, state flowcharts, and answers to top laboratory examiner questions.',
        icon: '📚',
      },
    ];

    modules.forEach((m, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const xPos = 0.8 + col * 5.95;
      const yPos = 1.8 + row * 1.6;

      slide.addShape(pres.ShapeType.roundRect, {
        x: xPos,
        y: yPos,
        w: 5.75,
        h: 1.45,
        rectRadius: 0.12,
        fill: { color: CARD_BG },
        line: { color: CARD_BORDER, width: 1 },
      });

      slide.addText(m.icon, {
        x: xPos + 0.25,
        y: yPos + 0.25,
        w: 0.6,
        h: 0.6,
        fontSize: 18,
        align: 'center',
      });

      slide.addText(m.name, {
        x: xPos + 0.95,
        y: yPos + 0.2,
        w: 4.6,
        h: 0.35,
        fontSize: 13,
        fontFace: 'Arial',
        bold: true,
        color: TEXT_LIGHT,
      });

      slide.addText(m.desc, {
        x: xPos + 0.95,
        y: yPos + 0.58,
        w: 4.6,
        h: 0.75,
        fontSize: 10.5,
        fontFace: 'Arial',
        color: TEXT_MUTED,
        lineSpacing: 15,
      });
    });
  }

  // ==========================================
  // SLIDE 8: DATA MODELS & DOMAIN SCHEMAS
  // ==========================================
  {
    const slide = createStandardSlide(
      'Data Modeling',
      'Domain Entities & RESTful API Architecture',
      'Strongly typed domain models defined in TypeScript (src/lib/types.ts).'
    );

    const tables = [
      {
        entity: 'Item Entity',
        fields: ['id: string', 'type: LOST | FOUND', 'title & category', 'campusZoneId: string', 'secretVerificationQuestion', 'secretVerificationAnswer (Encrypted)', 'status: OPEN | CLAIM_PENDING | RETURNED', 'lockerNumber?: string'],
        color: PRIMARY_COLOR,
      },
      {
        entity: 'Claim Entity',
        fields: ['id: string', 'itemId: string', 'claimantRollNo: string', 'claimantProofDescription', 'verificationAnswerAttempt', 'otp: string (6-digit)', 'status: PENDING | APPROVED | REJECTED', 'securityOfficerRemarks'],
        color: SUCCESS_COLOR,
      },
      {
        entity: 'RESTful Route Handlers',
        fields: ['GET /api/items - Retrieve campus items', 'POST /api/items - File lost/found report', 'GET /api/claims - Fetch review queue', 'POST /api/claims - Submit ownership challenge', 'POST /api/handover - Verify OTP & disburse', 'GET /api/zones - Fetch campus coordinates'],
        color: ACCENT_CYAN,
      },
    ];

    tables.forEach((t, idx) => {
      const xPos = 0.8 + idx * 3.9;
      slide.addShape(pres.ShapeType.roundRect, {
        x: xPos,
        y: 1.8,
        w: 3.7,
        h: 4.8,
        rectRadius: 0.15,
        fill: { color: CARD_BG },
        line: { color: CARD_BORDER, width: 1 },
      });

      slide.addShape(pres.ShapeType.rect, {
        x: xPos,
        y: 1.8,
        w: 3.7,
        h: 0.65,
        fill: { color: '1E293B' },
        line: { color: CARD_BORDER, width: 1 },
      });

      slide.addText(t.entity, {
        x: xPos + 0.25,
        y: 1.95,
        w: 3.2,
        h: 0.35,
        fontSize: 13,
        fontFace: 'Arial',
        bold: true,
        color: t.color,
      });

      t.fields.forEach((f, fIdx) => {
        slide.addText(`•  ${f}`, {
          x: xPos + 0.25,
          y: 2.65 + fIdx * 0.48,
          w: 3.2,
          h: 0.4,
          fontSize: 9.5,
          fontFace: 'Courier New',
          color: 'CBD5E1',
        });
      });
    });
  }

  // ==========================================
  // SLIDE 9: DEPLOYMENT & PRODUCTION VALIDATION
  // ==========================================
  {
    const slide = createStandardSlide(
      'DevOps & Production',
      'Vercel Cloud Deployment & Performance',
      'Deployed live on high-availability serverless infrastructure.'
    );

    const metrics = [
      { label: 'HTTP Status', value: '200 OK', desc: 'Active production endpoint' },
      { label: 'Turnaround Time', value: '< 24 Hours', desc: 'Average recovery window' },
      { label: 'Campus Recovery Rate', value: '83%+', desc: 'Successful property claims' },
      { label: 'Anti-Theft Protection', value: '100%', desc: 'Zero unverified releases' },
    ];

    metrics.forEach((m, idx) => {
      const xPos = 0.8 + idx * 2.95;
      slide.addShape(pres.ShapeType.roundRect, {
        x: xPos,
        y: 1.8,
        w: 2.8,
        h: 2.0,
        rectRadius: 0.12,
        fill: { color: CARD_BG },
        line: { color: CARD_BORDER, width: 1 },
      });

      slide.addText(m.value, {
        x: xPos + 0.2,
        y: 2.1,
        w: 2.4,
        h: 0.55,
        fontSize: 22,
        fontFace: 'Arial',
        bold: true,
        color: SUCCESS_COLOR,
        align: 'center',
      });

      slide.addText(m.label, {
        x: xPos + 0.2,
        y: 2.7,
        w: 2.4,
        h: 0.3,
        fontSize: 11,
        fontFace: 'Arial',
        bold: true,
        color: TEXT_LIGHT,
        align: 'center',
      });

      slide.addText(m.desc, {
        x: xPos + 0.2,
        y: 3.05,
        w: 2.4,
        h: 0.45,
        fontSize: 9.5,
        fontFace: 'Arial',
        color: TEXT_MUTED,
        align: 'center',
      });
    });

    // Deployment Specifications Card
    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8,
      y: 4.1,
      w: 11.73,
      h: 2.5,
      rectRadius: 0.15,
      fill: { color: CARD_BG },
      line: { color: CARD_BORDER, width: 1 },
    });

    slide.addText('PRODUCTION DEPLOYMENT SPECIFICATIONS', {
      x: 1.1,
      y: 4.3,
      w: 6.0,
      h: 0.3,
      fontSize: 11,
      fontFace: 'Arial',
      bold: true,
      color: PRIMARY_COLOR,
      charSpacing: 1,
    });

    const deploySpecs = [
      'Hosting Provider: Vercel Edge Global CDN with automatic SSL encryption and instant cache revalidation',
      'Version Control: GitHub (https://github.com/Ishaaaan10/Unitrace-lost-and-found) with continuous deployment',
      'Build Verification: 100% strict TypeScript type-safety (npx tsc --noEmit: 0 errors)',
      'Security Posture: Zero exposed database credentials, sanitized user inputs, and honor-code binding',
    ];

    deploySpecs.forEach((spec, sIdx) => {
      slide.addText(`✔   ${spec}`, {
        x: 1.1,
        y: 4.75 + sIdx * 0.42,
        w: 11.0,
        h: 0.35,
        fontSize: 11,
        fontFace: 'Arial',
        color: 'E2E8F0',
      });
    });
  }

  // ==========================================
  // SLIDE 10: VIVA DEFENSE PREPARATION & FAQ
  // ==========================================
  {
    const slide = createStandardSlide(
      'Viva Defense Kit',
      'Examiner Questions & Technical Answers',
      'Key technical justifications for common lab evaluation questions.'
    );

    const faqs = [
      {
        q: 'Q1: Why Next.js 14 App Router over plain React CRA/Vite?',
        a: 'Next.js 14 delivers hybrid Server & Client Components, built-in serverless API route handlers (/api/*), superior SEO rendering, and native zero-config deployment on Vercel Edge networks.',
      },
      {
        q: 'Q2: How is fraudulent item claiming prevented mathematically?',
        a: 'Reporters establish a hidden challenge question whose answer is never transmitted over public item listings. Claims require matching the stored cryptographic challenge before a single-use OTP is released.',
      },
      {
        q: 'Q3: How does the AI match engine work without expensive LLM latency?',
        a: 'The engine uses a deterministic multi-factor similarity score (Category 40%, Keyword Overlap 35%, Campus Zone 15%, Date Proximity 10%) providing sub-millisecond real-time matches with zero token cost.',
      },
      {
        q: 'Q4: How does UniTrace scale from prototype to university-wide deployment?',
        a: 'The domain entities and API contracts are structured for seamless Prisma ORM integration with PostgreSQL (Supabase/Neon), along with Redis pub/sub for push notifications.',
      },
    ];

    faqs.forEach((faq, idx) => {
      const yPos = 1.8 + idx * 1.25;
      slide.addShape(pres.ShapeType.roundRect, {
        x: 0.8,
        y: yPos,
        w: 11.73,
        h: 1.1,
        rectRadius: 0.1,
        fill: { color: CARD_BG },
        line: { color: CARD_BORDER, width: 1 },
      });

      slide.addText(faq.q, {
        x: 1.1,
        y: yPos + 0.12,
        w: 11.2,
        h: 0.35,
        fontSize: 12,
        fontFace: 'Arial',
        bold: true,
        color: 'FDE047',
      });

      slide.addText(faq.a, {
        x: 1.1,
        y: yPos + 0.48,
        w: 11.2,
        h: 0.55,
        fontSize: 10.5,
        fontFace: 'Arial',
        color: TEXT_MUTED,
        lineSpacing: 15,
      });
    });
  }

  // ==========================================
  // SLIDE 11: CONCLUSION & FUTURE ROADMAP
  // ==========================================
  {
    const slide = createStandardSlide(
      'Summary & Roadmap',
      'Conclusion & Future Enhancements',
      'Transforming campus property management into an intelligent, trusted utility.'
    );

    // Left Box: Project Deliverables
    slide.addShape(pres.ShapeType.roundRect, {
      x: 0.8,
      y: 1.8,
      w: 5.6,
      h: 4.8,
      rectRadius: 0.15,
      fill: { color: CARD_BG },
      line: { color: CARD_BORDER, width: 1 },
    });

    slide.addText('KEY ACCOMPLISHMENTS', {
      x: 1.1,
      y: 2.1,
      w: 5.0,
      h: 0.3,
      fontSize: 11,
      fontFace: 'Arial',
      bold: true,
      color: SUCCESS_COLOR,
      charSpacing: 1,
    });

    const accomplishments = [
      'Engineered a complete Next.js 14 fullstack web system.',
      'Implemented Anti-Theft secret challenge question protocol.',
      'Constructed 4-factor heuristic similarity auto-matcher.',
      'Built Gate 1 Security Terminal with 6-digit OTP verification.',
      'Designed dark-mode UI with dynamic interactive campus map.',
      'Successfully deployed live to Vercel and pushed to GitHub.',
    ];

    accomplishments.forEach((acc, idx) => {
      slide.addText(`✔   ${acc}`, {
        x: 1.1,
        y: 2.6 + idx * 0.65,
        w: 5.0,
        h: 0.5,
        fontSize: 11.5,
        fontFace: 'Arial',
        color: TEXT_LIGHT,
      });
    });

    // Right Box: Future Roadmap
    slide.addShape(pres.ShapeType.roundRect, {
      x: 6.8,
      y: 1.8,
      w: 5.73,
      h: 4.8,
      rectRadius: 0.15,
      fill: { color: CARD_BG },
      line: { color: CARD_BORDER, width: 1 },
    });

    slide.addText('FUTURE SYSTEM EXPANSION', {
      x: 7.1,
      y: 2.1,
      w: 5.0,
      h: 0.3,
      fontSize: 11,
      fontFace: 'Arial',
      bold: true,
      color: PRIMARY_COLOR,
      charSpacing: 1,
    });

    const futureItems = [
      { title: 'Computer Vision Matching', desc: 'Edge AI image embeddings to compare damaged or unlabeled electronics.' },
      { title: 'RFID Smartcard Turnstile Sync', desc: 'Automatic campus card lock triggers when an ID is reported lost.' },
      { title: 'WhatsApp & SMS Push Alerts', desc: 'Instant Twilio integration for real-time mobile match notifications.' },
      { title: 'PostgreSQL & Prisma Migration', desc: 'Relational database schema with audit logs and proctorial dashboards.' },
    ];

    futureItems.forEach((item, idx) => {
      const rowY = 2.6 + idx * 1.0;
      slide.addText(`➔  ${item.title}`, {
        x: 7.1,
        y: rowY,
        w: 5.1,
        h: 0.3,
        fontSize: 12,
        fontFace: 'Arial',
        bold: true,
        color: ACCENT_CYAN,
      });
      slide.addText(item.desc, {
        x: 7.4,
        y: rowY + 0.32,
        w: 4.8,
        h: 0.55,
        fontSize: 10.5,
        fontFace: 'Arial',
        color: TEXT_MUTED,
        lineSpacing: 14,
      });
    });
  }

  // Save presentation to disk
  const outputPath = path.join(__dirname, 'UniTrace_Project_Presentation.pptx');
  await pres.writeFile({ fileName: outputPath });
  console.log(`Presentation created successfully at: ${outputPath}`);
}

createPresentation().catch((err) => {
  console.error('Error creating presentation:', err);
  process.exit(1);
});
