/**
 * Sri Venkateswara Company (SVC) — Intelligent Engineering Assistant Frontend
 * Dual-Engine RAG Controller + Interactive Product Discovery + RFQ Pre-populator
 * 
 * Clearance: Elevated cleanly above the Netlify badge (bottom: 90px on desktop)
 */

(function () {
  'use strict';

  // State Management
  const state = {
    isOpen: false,
    mode: 'technical', // 'simple' | 'technical'
    history: [],
    pageContext: detectPageContext(),
    isTyping: false,
    activeFlow: null, // null | 'finder' | 'rfq'
    flowStep: 0,
    flowData: {}
  };

  function detectPageContext() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('product')) return 'products';
    if (path.includes('service')) return 'services';
    if (path.includes('quality')) return 'quality';
    if (path.includes('rfq')) return 'rfq';
    if (path.includes('about')) return 'about';
    if (path.includes('contact')) return 'contact';
    if (path.includes('gallery')) return 'gallery';
    return 'home';
  }

  document.addEventListener('DOMContentLoaded', () => {
    buildAssistantDOM();
    bindEvents();
    checkInitialGreeting();
  });

  /**
   * 1. Build and Inject Assistant DOM
   */
  function buildAssistantDOM() {
    // Avoid double injection
    if (document.getElementById('svc-assistant-launcher')) return;

    // A. Floating Launcher
    const launcher = document.createElement('div');
    launcher.id = 'svc-assistant-launcher';
    launcher.setAttribute('role', 'button');
    launcher.setAttribute('tabindex', '0');
    launcher.setAttribute('aria-label', 'Open SVC Intelligent Engineering Assistant');
    launcher.innerHTML = `
      <div class="svc-launcher-icon-wrap">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2v4"></path>
          <path d="m4.93 10.93 2.83-2.83"></path>
          <path d="M2 18h4"></path>
          <path d="M20 18h2"></path>
          <path d="m19.07 10.93-2.83-2.83"></path>
          <rect width="14" height="12" x="5" y="10" rx="3"></rect>
          <circle cx="9.5" cy="15.5" r="1.5" fill="currentColor"></circle>
          <circle cx="14.5" cy="15.5" r="1.5" fill="currentColor"></circle>
        </svg>
        <span class="svc-beacon-pulse"></span>
        <span class="svc-beacon-dot"></span>
      </div>
      <div class="svc-launcher-labels">
        <span class="svc-launcher-title">SVC Engineering AI</span>
        <span class="svc-launcher-sub">Knowledge & Discovery</span>
      </div>
      <div id="svc-launcher-greeting" class="hidden">
        <strong>👋 Need fastener guidance?</strong>
        <p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">Ask our engineering assistant about 18 rivet models, cold forging, or calculate a live quote.</p>
      </div>
    `;
    document.body.appendChild(launcher);

    // B. Assistant Chat Window
    const chatWin = document.createElement('div');
    chatWin.id = 'svc-assistant-window';
    chatWin.setAttribute('role', 'dialog');
    chatWin.setAttribute('aria-modal', 'true');
    chatWin.setAttribute('aria-label', 'SVC Intelligent Engineering Assistant Dialog');
    chatWin.innerHTML = `
      <!-- Header -->
      <header class="svc-chat-header">
        <div class="svc-header-left">
          <div class="svc-header-avatar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2v4"></path>
              <rect width="14" height="12" x="5" y="10" rx="3"></rect>
              <circle cx="9.5" cy="15.5" r="1.5" fill="currentColor"></circle>
              <circle cx="14.5" cy="15.5" r="1.5" fill="currentColor"></circle>
            </svg>
          </div>
          <div class="svc-header-meta">
            <h3>SVC ENGINEERING ASSISTANT</h3>
            <div class="svc-header-status">
              <span class="svc-status-indicator"></span>
              <span id="svc-backend-badge">RAG ACTIVE // VERIFIED 1964</span>
            </div>
          </div>
        </div>
        <div class="svc-header-actions">
          <button id="svc-mode-toggle" class="svc-mode-btn active" title="Toggle Beginner / Technical Mode" aria-label="Toggle Explanation Mode">
            TECH MODE
          </button>
          <button id="svc-clear-chat" class="svc-icon-btn" title="Clear Conversation" aria-label="Clear Conversation">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
          </button>
          <button id="svc-close-assistant" class="svc-icon-btn" title="Close Assistant (Esc)" aria-label="Close Assistant">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
          </button>
        </div>
      </header>

      <!-- Message History Container -->
      <div id="svc-messages-container" class="svc-messages-container" aria-live="polite">
        <!-- Welcome Card -->
        <div class="svc-welcome-card">
          <h4>Sri Venkateswara Company • Engineering Desk</h4>
          <p>
            Welcome to SVC Intelligence. I am grounded in our 60-year precision manufacturing knowledge base. Explore our 18 cold-forged rivet models, manufacturing capabilities, or prepare a formal quotation.
          </p>
          <div class="svc-quick-actions-grid">
            <button class="svc-quick-chip" data-query="What is the difference between solid, semi-tubular, and tubular rivets?">⚡ Solid vs Tubular</button>
            <button class="svc-quick-chip" data-flow="finder">🎯 Find the Right Rivet</button>
            <button class="svc-quick-chip" data-query="What are your manufacturing capabilities?">🏭 Cold Heading & Plating</button>
            <button class="svc-quick-chip" data-query="Explain your annealing heat treatment process">🔥 Annealing Process</button>
            <button class="svc-quick-chip" data-query="What quality certifications does SVC possess?">🛡️ IATF 16949 & Quality</button>
            <button class="svc-quick-chip" data-flow="rfq">📐 Request a Quote</button>
            <button class="svc-quick-chip" data-query="Where is your Coimbatore plant located and how do I contact you?">📞 Contact & Address</button>
          </div>
        </div>
      </div>

      <!-- Input Footer -->
      <footer class="svc-chat-input-bar">
        <div class="svc-input-wrapper">
          <textarea id="svc-chat-input" rows="1" maxlength="500" placeholder="Ask about rivets, cold forging, plating, or quotes..." aria-label="Type your message"></textarea>
          <div class="svc-input-actions">
            <button id="svc-send-btn" class="svc-send-btn" title="Send message" aria-label="Send message">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>
            </button>
          </div>
        </div>
        <div class="svc-char-counter"><span id="svc-char-count">0</span>/500 • Enter to send</div>
      </footer>
    `;
    document.body.appendChild(chatWin);
  }

  /**
   * 2. Event Listeners
   */
  function bindEvents() {
    const launcher = document.getElementById('svc-assistant-launcher');
    const win = document.getElementById('svc-assistant-window');
    const closeBtn = document.getElementById('svc-close-assistant');
    const clearBtn = document.getElementById('svc-clear-chat');
    const modeBtn = document.getElementById('svc-mode-toggle');
    const input = document.getElementById('svc-chat-input');
    const sendBtn = document.getElementById('svc-send-btn');
    const container = document.getElementById('svc-messages-container');

    // Toggle Open / Close
    launcher.addEventListener('click', () => toggleAssistant(true));
    launcher.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleAssistant(true);
      }
    });

    closeBtn.addEventListener('click', () => toggleAssistant(false));

    // Keyboard Escape to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && state.isOpen) {
        toggleAssistant(false);
      }
    });

    // Clear Conversation
    clearBtn.addEventListener('click', () => {
      state.history = [];
      state.activeFlow = null;
      state.flowStep = 0;
      state.flowData = {};
      const welcome = container.querySelector('.svc-welcome-card');
      container.innerHTML = '';
      if (welcome) container.appendChild(welcome);
      addAssistantMessage('Conversation cleared. How can I assist your engineering inquiry?');
    });

    // Mode Toggle (Simple vs Technical)
    modeBtn.addEventListener('click', () => {
      state.mode = state.mode === 'technical' ? 'simple' : 'technical';
      modeBtn.textContent = state.mode === 'technical' ? 'TECH MODE' : 'SIMPLE MODE';
      modeBtn.classList.toggle('active', state.mode === 'technical');
      if (window.showIndustrialToast) {
        window.showIndustrialToast(`Assistant Mode: ${state.mode.toUpperCase()}`);
      }
    });

    // Input Handling & Auto-Grow
    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = `${Math.min(input.scrollHeight, 90)}px`;
      document.getElementById('svc-char-count').textContent = input.value.length;
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        submitUserMessage();
      }
    });

    sendBtn.addEventListener('click', submitUserMessage);

    // Quick Action Chips in Welcome Screen
    container.addEventListener('click', (e) => {
      const chip = e.target.closest('.svc-quick-chip, .svc-followup-pill');
      if (!chip) return;

      const query = chip.getAttribute('data-query');
      const flow = chip.getAttribute('data-flow');

      if (flow === 'finder') {
        startProductFinderFlow();
      } else if (flow === 'rfq') {
        startRFQGuidedFlow();
      } else if (query) {
        handleUserQuery(query);
      }
    });
  }

  function toggleAssistant(open) {
    const win = document.getElementById('svc-assistant-window');
    const greeting = document.getElementById('svc-launcher-greeting');
    const input = document.getElementById('svc-chat-input');

    state.isOpen = open;
    win.classList.toggle('svc-open', open);

    if (greeting) greeting.classList.add('hidden');

    if (open) {
      setTimeout(() => input.focus(), 150);
      scrollMessagesToBottom();
      // Announce for screen reader
      const announce = document.getElementById('svc-messages-container');
      if (announce) announce.setAttribute('aria-live', 'polite');
    } else {
      document.getElementById('svc-assistant-launcher').focus();
    }
  }

  function checkInitialGreeting() {
    const greeting = document.getElementById('svc-launcher-greeting');
    if (!greeting) return;
    const hasSeen = sessionStorage.getItem('svc_assistant_seen');
    if (!hasSeen) {
      setTimeout(() => {
        greeting.classList.remove('hidden');
        sessionStorage.setItem('svc_assistant_seen', 'true');
        setTimeout(() => greeting.classList.add('hidden'), 8000);
      }, 2500);
    }
  }

  /**
   * 3. Message Submission & Routing
   */
  function submitUserMessage() {
    const input = document.getElementById('svc-chat-input');
    const message = input.value.trim();
    if (!message || state.isTyping) return;

    input.value = '';
    input.style.height = 'auto';
    document.getElementById('svc-char-count').textContent = '0';

    handleUserQuery(message);
  }

  function handleUserQuery(text) {
    addUserMessage(text);
    state.history.push({ role: 'user', content: text });

    // Handle Active Interactive Flow (Finder / RFQ)
    if (state.activeFlow === 'finder') {
      advanceProductFinder(text);
      return;
    }

    if (state.activeFlow === 'rfq') {
      advanceRFQFlow(text);
      return;
    }

    // Check for trigger intents for flows
    const lower = text.toLowerCase();
    if (/find|recommend|which rivet|what rivet|help me choose|select rivet/i.test(lower)) {
      startProductFinderFlow();
      return;
    }

    if (/guided quote|interactive rfq|quote builder/i.test(lower)) {
      startRFQGuidedFlow();
      return;
    }

    // Normal Q&A Dispatch
    dispatchQuery(text);
  }

  /**
   * 4. Dual-Engine RAG Dispatch
   */
  async function dispatchQuery(query) {
    showTypingIndicator();

    const payload = {
      message: query,
      mode: state.mode,
      pageContext: state.pageContext,
      history: state.history
    };

    let replyData = null;

    // 1. First attempt: Netlify Function endpoint
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4500);

      const res = await fetch('/.netlify/functions/svc-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        replyData = await res.json();
      }
    } catch (err) {
      // Fallback silently to client-side RAG
    }

    // 2. Client-side deterministic fallback engine
    if (!replyData || !replyData.reply) {
      replyData = resolveClientSideRAG(query, state.mode);
    }

    removeTypingIndicator();
    addAssistantMessage(replyData.reply, replyData.citations, replyData.followUps, replyData.action);
    state.history.push({ role: 'assistant', content: replyData.reply });
  }

  function resolveClientSideRAG(query, mode) {
    if (window.SVC_KB) {
      const intentObj = window.SVC_KB.classifyIntent(query);
      const kb = window.SVC_KB.data;

      // Handle specific intent routes locally
      if (intentObj.intent === 'QUOTATION') {
        return {
          reply: `### Formal Quotation & Pricing Procedure\n\nBecause cold-forged fasteners are engineered to exact component tolerances, volume requirements, material grades, and plating finishes, **custom pricing requires formal review by our Coimbatore engineering desk**.\n\n**To receive an official commercial quote within 24 business hours:**\n1. Specify your shank diameter, length, and head dimensions in mm.\n2. Select your raw material (Mild Steel, Brass, Copper, Stainless Steel, Aluminum).\n3. State whether thermal annealing or special plating is required.\n\nClick below to open our interactive **Request a Quote Workbench** with live parametric CAD blueprint redrawing.`,
          citations: [{ title: 'CAD RFQ Workbench', url: 'rfq.html' }],
          followUps: ['Start Guided Quote in Chat', 'Which material is best?', 'Explain Annealing'],
          action: { type: 'NAVIGATE', url: 'rfq.html', label: 'Open RFQ Workbench' }
        };
      }

      if (intentObj.intent === 'EDUCATION_RIVET') {
        return {
          reply: `### What is a Rivet?\n\n${mode === 'simple' ? kb.education.rivetBasics.beginner : kb.education.rivetBasics.technical}`,
          citations: [{ title: 'Product Catalog', url: 'products.html' }],
          followUps: ['Solid vs Tubular Rivets', 'Why is Annealing Performed?', 'Explore Products']
        };
      }

      if (intentObj.intent === 'PRODUCT_COMPARISON') {
        return {
          reply: `### Rivet Category Engineering Comparison\n\n| Parameter | Solid Rivets (DIN 660) | Semi-Tubular Rivets (DIN 7338) | Tubular Rivets (DIN 7340) |\n| :--- | :--- | :--- | :--- |\n| **Core Structure** | 100% Solid Metal Core | Partial Cavity at Tip (≤ Shank Dia) | Deep Continuous Hollow Core |\n| **Shear Strength** | **Maximum** (Structural) | **High** | Moderate / Joint Clamp |\n| **Clinching Force** | 100% (High Impact Hammer) | **~50% Lower** than Solid | **Lowest** (Gentle Roll Form) |\n| **Substrate Risk** | Risk of crushing soft materials | Safe for leather, luggage, composites | Ideal for plastics, fragile laminates, conduit |\n| **Typical Use** | Heavy machinery, structural joints | Brake linings, clutch facings, brackets | Electrical wire eyelets, hinges, friction pads |\n\n*Would you like a recommendation based on your specific application?*`,
          citations: [{ title: 'Interactive 3D Product Catalog', url: 'products.html' }],
          followUps: ['Show Solid Rivets', 'Show Semi-Tubular Rivets', 'Find the Right Rivet']
        };
      }

      if (intentObj.intent === 'EDUCATION_ANNEALING') {
        return {
          reply: `### In-House Thermal Annealing Process\n\n${mode === 'simple' ? kb.education.whyAnnealing.beginner : kb.education.whyAnnealing.technical}\n\n• **Benefit:** Restores metal ductility up to 35% elongation for crack-free clinching.\n• **Facility:** Regulated atmosphere furnace at our Coimbatore plant.`,
          citations: [{ title: 'Thermal Normalization', url: 'services.html#annealing' }],
          followUps: ['Ultrasonic Cleaning Process', '80T Electroplating Plant', 'Request a Quote']
        };
      }

      if (intentObj.intent === 'EDUCATION_ULTRASONIC') {
        return {
          reply: `### Ultra-Sonic Agitation Cleaning (3–6 Min Cycle)\n\n${mode === 'simple' ? kb.education.whyUltrasonic.beginner : kb.education.whyUltrasonic.technical}\n\n• **Duration:** 3 to 6 minutes continuous acoustic cavitation.\n• **Result:** 100% blind-hole lubricant removal for superior electroplating bond.`,
          citations: [{ title: 'Ultrasonic Bath', url: 'services.html#ultrasonic' }],
          followUps: ['Electroplating Capabilities', 'Quality Standards', 'Explore Products']
        };
      }

      if (intentObj.intent === 'QUALITY_CERTIFICATIONS') {
        return {
          reply: `### Certified Quality Standards (SVC Coimbatore)\n\n• **IATF 16949:2016:** Automotive Quality Management System (Accredited Jan 2018 for *Manufacture of Cold Forged Rivets*).\n• **ISO 14001:2015:** Environmental compliance for plating effluent & solvent recovery.\n• **ISO 45001:2018:** Occupational health and safety for our 100+ workforce.\n\n**Metrology Lab:** Optical Profile Projector (shadowgraph), Vickers/Rockwell hardness testers, ASTM B117 salt spray chamber (up to 720+ hrs rust resistance).`,
          citations: [{ title: 'Quality Framework & Certificates', url: 'quality.html' }],
          followUps: ['Inspect Certificate Scans', 'Six-Stage Quality Gates', 'Explore Products']
        };
      }

      if (intentObj.intent === 'COMPANY_HERITAGE') {
        return {
          reply: `### Sri Venkateswara Company (SVC) — Founded 1964\n\n• **Founding Heritage:** Founded in **1964** by visionary industrialist **Rm. M.V. Muthiah Chettiar** in Karakudi as a specialized ancillary unit producing precision cycle rivets for **TI Cycles of India**.\n• **Relocation to Coimbatore:** Subsequently, **MVM Muthu** acquired the partnership shares and relocated operations to Coimbatore, establishing our modern Periyanaickenpalayam manufacturing hub.\n• **Current Leadership:** Led by CEO **Jawahar Muthu**, who possesses over **35+ years** of hands-on expertise in cold-forged rivet manufacturing and tooling design.\n• **Global Reach:** Documented export destinations include **Germany** and **Thailand**.\n• **Quality:** Audited to **IATF 16949:2016** automotive standard.`,
          citations: [{ title: 'Company Heritage', url: 'about.html' }],
          followUps: ['Explore 18 Product Models', 'View Manufacturing Capabilities', 'Request a Quote']
        };
      }

      if (intentObj.intent === 'CONTACT_INFO') {
        return {
          reply: `### Official SVC Plant Coordinates & Contact Desk\n\n• **Manufacturing Facility:**\n  Sri Venkateswara Company\n  S.F No: 626/1-2, Idikarai Road,\n  Periyanaickenpalayam,\n  Coimbatore, Tamil Nadu, 641022, India\n\n• **Direct Telephone:** [+91 (904) 707-7874](tel:+919047077874)\n• **Commercial Email:** [marketing@srivenkateswaracompany.in](mailto:marketing@srivenkateswaracompany.in)\n• **Operating Shifts:**\n  - Monday – Friday: 08:30 AM – 06:30 PM IST\n  - Saturday: 08:30 AM – 04:30 PM IST\n  - Sunday: Plant Maintenance`,
          citations: [{ title: 'Contact Desk & Map', url: 'contact.html' }],
          followUps: ['Request a Quote', 'Plan a Factory Visit', 'Explore Products']
        };
      }
    }

    // Default Fallback
    return {
      reply: `I understand your inquiry regarding cold-forged fasteners. Sri Venkateswara Company has manufactured precision rivets in Coimbatore since 1964.\n\nHow can I best assist you:\n• **Explore 18 Models:** Solid, semi-tubular, and tubular rivets.\n• **Interactive Finder:** Select materials and get tailored recommendations.\n• **Quotation (RFQ):** Enter custom dimensions for a formal 24-hr quote.`,
      citations: [{ title: 'Products Catalog', url: 'products.html' }],
      followUps: ['Explore Products', 'Find Right Rivet', 'Request a Quote', 'Contact Engineering']
    };
  }

  /**
   * 5. Interactive Product Finder Flow
   */
  function startProductFinderFlow() {
    state.activeFlow = 'finder';
    state.flowStep = 1;
    state.flowData = {};

    addAssistantMessage(
      `### 🎯 Interactive Rivet Selection Guide (Step 1 of 3)\n\nWhat type of **material or component** are you primarily joining?`,
      null,
      ['1. Sheet Metal / Heavy Steel', '2. Electrical Busbar / Terminal', '3. Plastics / Leather / Luggage', '4. Brake Friction Lining', '5. Rotating Pivot / Hinge']
    );
  }

  function advanceProductFinder(answer) {
    const a = answer.toLowerCase();

    if (state.flowStep === 1) {
      state.flowData.substrate = answer;
      state.flowStep = 2;

      addAssistantMessage(
        `Got it: joining **${answer}**.\n\n### Step 2 of 3: Primary Engineering Priority\nWhat is your main mechanical or functional requirement?`,
        null,
        ['A. Maximum Shear & Vibration Lock', 'B. Low Clinching Force (No substrate cracking)', 'C. High Electrical Conductivity', 'D. Anti-Rotation Torque Lock', 'E. Flush Flat Surface']
      );
      return;
    }

    if (state.flowStep === 2) {
      state.flowData.priority = answer;
      state.flowStep = 3;

      addAssistantMessage(
        `Priority noted: **${answer}**.\n\n### Step 3 of 3: Operating Environment & Coating\nWhat atmospheric or environmental conditions will the assembly face?`,
        null,
        ['Indoor / Dry Machine Assembly', 'Outdoor / High Salt Humidity (ASTM B117)', 'Food Hygiene / Culinary / Medical', 'High Heat / Dynamic Electrical Contact']
      );
      return;
    }

    if (state.flowStep === 3) {
      state.flowData.environment = answer;
      state.activeFlow = null; // Complete!

      // Compute Recommendation
      const sub = (state.flowData.substrate || '').toLowerCase();
      const pri = (state.flowData.priority || '').toLowerCase();
      const env = answer.toLowerCase();

      let rec = {
        name: 'MS Flat Head Semi-Tubular Rivet',
        din: 'DIN 7338 Form B',
        family: 'Semi-Tubular Rivet',
        mat: 'Mild Steel C1010',
        coating: 'Zinc Clear (RoHS) or Yellow Zinc',
        rationale: 'Balanced high shear strength with 50% lower clinching force to protect components.',
        rfqUrl: 'rfq.html?type=Semi-Tubular&head=flat&mat=mild%20steel'
      };

      if (sub.includes('electrical') || pri.includes('conductivity')) {
        rec = {
          name: 'Copper Mushroom Head Solid Rivet',
          din: 'DIN 660 Modified',
          family: 'Solid Rivet',
          mat: 'Electrolytic Copper C110',
          coating: 'Self Color or Copper Flash',
          rationale: 'Ultra-high electrical & thermal conductivity with broad mushroom dome bearing surface.',
          rfqUrl: 'rfq.html?type=Solid%20Rivet&head=mushroom&mat=copper'
        };
      } else if (sub.includes('plastic') || sub.includes('leather') || pri.includes('low')) {
        rec = {
          name: 'Brass Mushroom Head Semi-Tubular',
          din: 'DIN 7338 Form B',
          family: 'Semi-Tubular Rivet',
          mat: 'Brass IS 319 / C360',
          coating: 'Brass Flash or Self Color',
          rationale: 'Low roll-clinch force prevents cracking or tearing in delicate leather, plastics, or fabrics.',
          rfqUrl: 'rfq.html?type=Semi-Tubular&head=mushroom&mat=brass'
        };
      } else if (env.includes('food') || env.includes('medical') || env.includes('outdoor')) {
        rec = {
          name: 'SS Flat Head Semi-Tubular Rivet',
          din: 'DIN 7338 B / SS',
          family: 'Semi-Tubular Rivet',
          mat: 'Stainless Steel AISI 304',
          coating: 'Passivated Natural Stainless',
          rationale: 'AISI 304 provides supreme corrosion resistance against salts, detergents, and oxidation.',
          rfqUrl: 'rfq.html?type=Semi-Tubular&head=flat&mat=stainless%20steel'
        };
      } else if (sub.includes('pivot') || sub.includes('hinge')) {
        rec = {
          name: 'MS Step Shank Solid Rivet',
          din: 'Pivot Spindle Spec',
          family: 'Solid Rivet',
          mat: 'Cold Heading Forging Steel',
          coating: 'Bright Nickel or Zinc Clear',
          rationale: 'Dual ground diameters allow free scissor hinge rotation while terminal tip clinches tight.',
          rfqUrl: 'rfq.html?type=Solid%20Rivet&head=round&mat=mild%20steel'
        };
      }

      addAssistantMessage(
        `### 🏆 Preliminary Engineering Recommendation\n\n**Recommended Model:** **${rec.name}**\n• **Family:** ${rec.family} (${rec.din})\n• **Material:** ${rec.mat}\n• **Recommended Coating:** ${rec.coating}\n• **Engineering Rationale:** ${rec.rationale}\n\n*Note: This is a preliminary application match. Final selection requires dimensional and clamp-force confirmation by our engineering desk.*`,
        [{ title: 'View in 3D Catalog', url: 'products.html' }, { title: 'Open Pre-filled RFQ', url: rec.rfqUrl }],
        ['Pre-Fill This Model into RFQ Workbench', 'Compare with other options', 'Speak to an Engineer'],
        { type: 'NAVIGATE', url: rec.rfqUrl, label: 'Pre-Fill Technical RFQ Workbench' }
      );
    }
  }

  /**
   * 6. Interactive RFQ Guided Builder
   */
  function startRFQGuidedFlow() {
    state.activeFlow = 'rfq';
    state.flowStep = 1;
    state.flowData = {
      type: 'Solid Rivet',
      head: 'round',
      shank_dia: 8.0,
      shank_len: 25.0,
      head_dia: 16.0,
      mat: 'Mild Steel'
    };

    addAssistantMessage(
      `### 📐 Technical RFQ Specification Builder (Step 1 of 4)\n\nWhich **rivet family** do you require?\n• Solid Rivet (Max shear, solid core)\n• Semi-Tubular Rivet (Hollow tip, 50% lower clinch force)\n• Tubular Rivet (Full hollow body)`,
      null,
      ['Solid Rivet', 'Semi-Tubular', 'Tubular']
    );
  }

  function advanceRFQFlow(answer) {
    if (state.flowStep === 1) {
      state.flowData.type = answer;
      state.flowStep = 2;
      addAssistantMessage(
        `Selected family: **${answer}**.\n\n### Step 2 of 4: Primary Material\nWhich alloy do you need?\n• Mild Steel (Economy & Strength)\n• Stainless Steel AISI 304 (Corrosion Proof)\n• Brass IS 319 (Decorative & Electrical)\n• Electrolytic Copper C110 (Conductive)\n• Aluminum (Lightweight)`,
        null,
        ['Mild Steel', 'Stainless Steel', 'Brass', 'Copper', 'Aluminum']
      );
      return;
    }

    if (state.flowStep === 2) {
      state.flowData.mat = answer;
      state.flowStep = 3;
      addAssistantMessage(
        `Selected material: **${answer}**.\n\n### Step 3 of 4: Head Geometry\nWhich head profile style fits your assembly?\n• Round Head (High Dome)\n• Flat Head (Flush Surface)\n• Mushroom Head (Low Profile Broad Bearing)\n• Dimple Head (Punch Center Alignment)`,
        null,
        ['Round Head', 'Flat Head', 'Mushroom Head', 'Dimple Head']
      );
      return;
    }

    if (state.flowStep === 3) {
      state.flowData.head = answer.toLowerCase().replace(' head', '');
      state.flowStep = 4;
      addAssistantMessage(
        `Head selected: **${answer}**.\n\n### Step 4 of 4: Dimensions in Millimeters (mm)\nPlease enter your target **Shank Diameter (mm)** and **Shank Length (mm)** (e.g. "6mm dia, 20mm length"):`,
        null,
        ['4.0mm dia, 15mm length', '6.0mm dia, 20mm length', '8.0mm dia, 25mm length', '10.0mm dia, 30mm length']
      );
      return;
    }

    if (state.flowStep === 4) {
      // Parse dimensions from input
      const nums = answer.match(/\d+(\.\d+)?/g);
      if (nums && nums.length >= 2) {
        state.flowData.shank_dia = parseFloat(nums[0]);
        state.flowData.shank_len = parseFloat(nums[1]);
        state.flowData.head_dia = +(state.flowData.shank_dia * 1.8).toFixed(1);
      }
      state.activeFlow = null; // Completed

      const d = state.flowData;
      const url = `rfq.html?type=${encodeURIComponent(d.type)}&head=${encodeURIComponent(d.head)}&mat=${encodeURIComponent(d.mat)}&dia=${d.shank_dia}&len=${d.shank_len}&headdia=${d.head_dia}`;

      addAssistantMessage(
        `### ✅ Technical Specification Summary\n\n• **Family:** ${d.type}\n• **Material:** ${d.mat}\n• **Head Profile:** ${d.head.toUpperCase()}\n• **Shank Diameter (d_s):** Ø ${d.shank_dia} mm\n• **Shank Length (L):** ${d.shank_len} mm\n• **Head Diameter (d_k):** Ø ${d.head_dia} mm\n• **Tolerance Standard:** ± 0.02 mm\n\nClick the button below to **transfer your parameters directly into our Live CAD Parametric Blueprint Workbench** on the RFQ page!`,
        [{ title: 'Open Live CAD Blueprint', url: url }],
        ['Submit Formal Quote', 'Explore 3D Model', 'Start Over'],
        { type: 'NAVIGATE', url: url, label: 'Transfer to Live CAD Workbench ↗' }
      );
    }
  }

  /**
   * 7. Rendering Helpers (User / Assistant Bubbles)
   */
  function addUserMessage(text) {
    const container = document.getElementById('svc-messages-container');
    const row = document.createElement('div');
    row.className = 'svc-msg-row user';
    row.innerHTML = `<div class="svc-msg-bubble">${escapeHtml(text)}</div>`;
    container.appendChild(row);
    scrollMessagesToBottom();
  }

  function addAssistantMessage(markdownText, citations, followUps, action) {
    const container = document.getElementById('svc-messages-container');
    const row = document.createElement('div');
    row.className = 'svc-msg-row assistant';

    const formattedHtml = parseMarkdown(markdownText);

    let citationsHtml = '';
    if (citations && citations.length > 0) {
      citationsHtml = `
        <div class="svc-citations-wrap">
          ${citations.map(c => `
            <a href="${c.url}" class="svc-cite-badge" title="Inspect source">
              <span>↗</span> ${escapeHtml(c.title)}
            </a>
          `).join('')}
        </div>
      `;
    }

    let actionBtnHtml = '';
    if (action && action.url) {
      actionBtnHtml = `
        <div style="margin-top:10px;">
          <a href="${action.url}" class="btn-industrial text-xs chamfer-sm" style="display:inline-flex;padding:6px 14px;">
            <span>${escapeHtml(action.label || 'View Details')}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </a>
        </div>
      `;
    }

    let followUpsHtml = '';
    if (followUps && followUps.length > 0) {
      followUpsHtml = `
        <div class="svc-followup-chips">
          ${followUps.map(fu => `<button class="svc-followup-pill" data-query="${escapeHtml(fu)}">${escapeHtml(fu)}</button>`).join('')}
        </div>
      `;
    }

    row.innerHTML = `
      <div class="svc-msg-bubble">
        ${formattedHtml}
        ${actionBtnHtml}
      </div>
      <div class="svc-msg-footer">
        ${citationsHtml}
        <div class="svc-feedback-actions">
          <button class="svc-feedback-btn" title="Helpful" aria-label="Mark answer as helpful">👍</button>
          <button class="svc-feedback-btn" title="Not helpful" aria-label="Mark answer as unhelpful">👎</button>
        </div>
      </div>
      ${followUpsHtml}
    `;

    // Bind feedback clicks
    row.querySelectorAll('.svc-feedback-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const parent = e.currentTarget.parentElement;
        parent.querySelectorAll('.svc-feedback-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        if (window.showIndustrialToast) {
          window.showIndustrialToast('Thank you for your engineering feedback!');
        }
      });
    });

    container.appendChild(row);
    scrollMessagesToBottom();
  }

  function showTypingIndicator() {
    const container = document.getElementById('svc-messages-container');
    state.isTyping = true;
    const typing = document.createElement('div');
    typing.id = 'svc-typing-indicator';
    typing.className = 'svc-msg-row assistant';
    typing.innerHTML = `
      <div class="svc-typing-indicator">
        <span class="svc-typing-dot"></span>
        <span class="svc-typing-dot"></span>
        <span class="svc-typing-dot"></span>
      </div>
    `;
    container.appendChild(typing);
    scrollMessagesToBottom();
  }

  function removeTypingIndicator() {
    state.isTyping = false;
    const typing = document.getElementById('svc-typing-indicator');
    if (typing) typing.remove();
  }

  function scrollMessagesToBottom() {
    const container = document.getElementById('svc-messages-container');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  /**
   * 8. Safe Markdown Parser for Assistant Bubbles
   */
  function parseMarkdown(md) {
    if (!md) return '';
    let html = escapeHtml(md);

    // Markdown tables
    html = html.replace(/\|(.+)\|[\r\n]+\|([-:|\s]+)\|[\r\n]+((?:\|.+[\r\n]+)+)/g, (match, headerRow, separatorRow, bodyRows) => {
      const headers = headerRow.split('|').filter(h => h.trim()).map(h => `<th>${h.trim()}</th>`).join('');
      const rows = bodyRows.trim().split('\n').map(row => {
        const cells = row.split('|').filter(c => c.trim()).map(c => `<td>${c.trim()}</td>`).join('');
        return `<tr>${cells}</tr>`;
      }).join('');
      return `<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
    });

    // Headings
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h3>$1</h3>');

    // Bold & Italics
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Links [Text](url)
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-amber-400 hover:underline" target="_self">$1</a>');

    // Bullet lists
    html = html.replace(/^\• (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    // Line breaks
    html = html.replace(/\n\n/g, '<p></p>');

    return html;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

})();

