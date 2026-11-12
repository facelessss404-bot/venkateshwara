/**
 * Sri Venkateswara Company (SVC) — Technical RFQ & Parametric CAD Blueprint Generator
 */

document.addEventListener('DOMContentLoaded', () => {
  initRFQCalculator();
});

function initRFQCalculator() {
  const form = document.getElementById('svc-rfq-form');
  const blueprintSvg = document.getElementById('blueprint-preview-svg');
  if (!form || !blueprintSvg) return;

  // Input elements
  const rivetTypeSelect = document.getElementById('rfq-rivet-type');
  const headTypeSelect = document.getElementById('rfq-head-type');
  const shankDiaInput = document.getElementById('rfq-shank-dia');
  const shankLenInput = document.getElementById('rfq-shank-len');
  const headDiaInput = document.getElementById('rfq-head-dia');
  const wallThickContainer = document.getElementById('rfq-wall-thickness-container');
  const wallThickInput = document.getElementById('rfq-wall-thickness');
  const materialSelect = document.getElementById('rfq-material');
  const materialGradeInput = document.getElementById('rfq-material-grade');

  // Blueprint dynamic text elements
  const textHeadDia = document.getElementById('bp-label-head-dia');
  const textShankDia = document.getElementById('bp-label-shank-dia');
  const textShankLen = document.getElementById('bp-label-shank-len');
  const textRivetType = document.getElementById('bp-label-type');
  const textMaterial = document.getElementById('bp-label-material');

  // Dynamic conditional field toggle: Wall thickness only needed for tubular/semi-tubular
  function updateConditionalFields() {
    const selectedType = rivetTypeSelect.value.toLowerCase();
    if (selectedType.includes('tubular')) {
      if (wallThickContainer) wallThickContainer.classList.remove('hidden');
      if (wallThickInput) wallThickInput.setAttribute('required', 'true');
    } else {
      if (wallThickContainer) wallThickContainer.classList.add('hidden');
      if (wallThickInput) wallThickInput.removeAttribute('required');
    }
  }

  // Live SVG Blueprint redrawing
  function redrawBlueprint() {
    const shankDia = parseFloat(shankDiaInput.value) || 8.0;
    const shankLen = parseFloat(shankLenInput.value) || 25.0;
    const headDia = parseFloat(headDiaInput.value) || 16.0;
    const rivetType = rivetTypeSelect.value || 'Solid Rivet';
    const headType = headTypeSelect ? headTypeSelect.value : 'round';
    const material = materialSelect.value || 'Brass';
    const wallThick = parseFloat(wallThickInput ? wallThickInput.value : 1.2) || 1.2;

    if (textHeadDia) textHeadDia.textContent = `Ø ${headDia.toFixed(1)} mm`;
    if (textShankDia) textShankDia.textContent = `Ø ${shankDia.toFixed(1)} mm`;
    if (textShankLen) textShankLen.textContent = `L: ${shankLen.toFixed(1)} mm`;
    if (textRivetType) textRivetType.textContent = rivetType.toUpperCase();
    if (textMaterial) textMaterial.textContent = material.toUpperCase();

    // Fastener Engineering Volumetric & Weight Estimation (g/pc & kg/1,000 pcs)
    const densities = {
      'mild steel': 7.85,
      'stainless steel': 7.93,
      'brass': 8.50,
      'copper': 8.96,
      'aluminum': 2.70
    };
    const matKey = material.toLowerCase().trim();
    let density = 7.85;
    for (const [k, d] of Object.entries(densities)) {
      if (matKey.includes(k)) {
        density = d;
        break;
      }
    }

    const rShank = shankDia / 2;
    const vShank = Math.PI * rShank * rShank * shankLen;
    const rHead = headDia / 2;
    const hHead = headDia * 0.35;
    const vHead = Math.PI * rHead * rHead * hHead * 0.55;

    let vHole = 0;
    if (rivetType.toLowerCase().includes('tubular')) {
      const isSemi = rivetType.toLowerCase().includes('semi');
      const holeDepth = isSemi ? shankLen * 0.35 : shankLen * 0.82;
      const rInner = Math.max(rShank - wallThick, 0.5);
      vHole = Math.PI * rInner * rInner * holeDepth;
    }

    const vTotalMm3 = Math.max(vShank + vHead - vHole, 10);
    const vTotalCm3 = vTotalMm3 / 1000;
    const weightGrams = vTotalCm3 * density;
    const weightPerThousandKg = weightGrams; // grams/pc == kg/1,000 pcs

    const weightPcEl = document.getElementById('rfq-weight-pc');
    const weightThousandEl = document.getElementById('rfq-weight-thousand');
    if (weightPcEl) weightPcEl.textContent = `${weightGrams.toFixed(2)} g / pc`;
    if (weightThousandEl) weightThousandEl.textContent = `${weightPerThousandKg.toFixed(2)} kg`;

    // Scale coordinates for 400x300 SVG viewbox
    const cx = 200;
    const topY = 70;
    const scaleFactor = Math.min(180 / shankLen, 250 / headDia);
    
    const svgHeadWidth = Math.min(Math.max(headDia * scaleFactor, 60), 220);
    const svgShankWidth = Math.min(Math.max(shankDia * scaleFactor, 24), svgHeadWidth * 0.7);
    const svgShankHeight = Math.min(Math.max(shankLen * scaleFactor, 70), 160);
    const headHeight = svgHeadWidth * (headType === 'mushroom' ? 0.28 : 0.42);

    const headPath = document.getElementById('bp-svg-head');
    const shankPath = document.getElementById('bp-svg-shank');
    const holePath = document.getElementById('bp-svg-hole');

    if (headPath) {
      if (headType === 'flat') {
        headPath.setAttribute('d', `
          M ${cx - svgHeadWidth/2} ${topY + headHeight}
          L ${cx - svgHeadWidth/2} ${topY}
          L ${cx + svgHeadWidth/2} ${topY}
          L ${cx + svgHeadWidth/2} ${topY + headHeight}
          Z
        `);
      } else {
        // Dome / Mushroom head
        headPath.setAttribute('d', `
          M ${cx - svgHeadWidth/2} ${topY + headHeight}
          C ${cx - svgHeadWidth/2} ${topY - headHeight*0.2},
            ${cx + svgHeadWidth/2} ${topY - headHeight*0.2},
            ${cx + svgHeadWidth/2} ${topY + headHeight}
          Z
        `);
      }
    }

    if (shankPath) {
      const shankStartY = topY + headHeight;
      const shankEndY = shankStartY + svgShankHeight;
      shankPath.setAttribute('d', `
        M ${cx - svgShankWidth/2} ${shankStartY}
        L ${cx + svgShankWidth/2} ${shankStartY}
        L ${cx + svgShankWidth/2} ${shankEndY - 8}
        L ${cx + svgShankWidth/2 - 4} ${shankEndY}
        L ${cx - svgShankWidth/2 + 4} ${shankEndY}
        L ${cx - svgShankWidth/2} ${shankEndY - 8}
        Z
      `);
    }

    if (holePath) {
      if (rivetType.toLowerCase().includes('tubular')) {
        holePath.classList.remove('hidden');
        const isSemi = rivetType.toLowerCase().includes('semi');
        const holeDepth = isSemi ? svgShankHeight * 0.35 : svgShankHeight * 0.82;
        const innerWidth = svgShankWidth * 0.65;
        const shankEndY = topY + headHeight + svgShankHeight;
        holePath.setAttribute('d', `
          M ${cx - innerWidth/2} ${shankEndY}
          L ${cx - innerWidth/2} ${shankEndY - holeDepth}
          L ${cx + innerWidth/2} ${shankEndY - holeDepth}
          L ${cx + innerWidth/2} ${shankEndY}
          Z
        `);
      } else {
        holePath.classList.add('hidden');
      }
    }
  }

  // Listeners
  [rivetTypeSelect, headTypeSelect, shankDiaInput, shankLenInput, headDiaInput, wallThickInput, materialSelect].forEach(el => {
    if (el) {
      el.addEventListener('input', () => {
        updateConditionalFields();
        redrawBlueprint();
      });
      el.addEventListener('change', () => {
        updateConditionalFields();
        redrawBlueprint();
      });
    }
  });

  updateConditionalFields();
  redrawBlueprint();

  // Form submission handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Verification check
    const name = document.getElementById('rfq-name').value.trim();
    const email = document.getElementById('rfq-email').value.trim();
    const phone = document.getElementById('rfq-phone').value.trim();
    const company = document.getElementById('rfq-company').value.trim();

    if (!name || !email || !phone) {
      if (window.showIndustrialToast) {
        window.showIndustrialToast('Please complete all required customer details.', 'warning');
      }
      return;
    }

    const quoteId = `SVC-RFQ-${Date.now().toString().slice(-6)}`;
    const submissionData = {
      quoteId,
      timestamp: new Date().toISOString(),
      customer: { name, email, phone, company },
      specifications: {
        rivetType: rivetTypeSelect.value,
        headType: headTypeSelect ? headTypeSelect.value : 'round',
        shankDiameter: shankDiaInput.value + ' mm',
        shankLength: shankLenInput.value + ' mm',
        headDiameter: headDiaInput.value + ' mm',
        tolerance: document.getElementById('rfq-tolerance') ? document.getElementById('rfq-tolerance').value : '±0.05 mm',
        wallThickness: wallThickInput ? wallThickInput.value + ' mm' : 'N/A',
        material: materialSelect.value,
        materialGrade: materialGradeInput ? materialGradeInput.value : 'Standard Commercial',
        heatTreatment: document.querySelector('input[name="heat_treatment"]:checked') ? document.querySelector('input[name="heat_treatment"]:checked').value : 'No',
        coating: document.getElementById('rfq-coating') ? document.getElementById('rfq-coating').value : 'None / Self Color',
        specialProcess: document.getElementById('rfq-special-process') ? document.getElementById('rfq-special-process').value : 'None',
        packing: document.getElementById('rfq-packing') ? document.getElementById('rfq-packing').value : 'Standard Box'
      }
    };

    // Save to localStorage with safety guard for restricted storage contexts
    try {
      if (typeof localStorage !== 'undefined') {
        const saved = JSON.parse(localStorage.getItem('svc_quote_submissions') || '[]');
        saved.push(submissionData);
        localStorage.setItem('svc_quote_submissions', JSON.stringify(saved));
      }
    } catch (storageErr) {
      console.warn('Storage unavailable in current context (e.g. private/data URL):', storageErr);
    }

    // Show Confirmation Modal
    showQuoteSuccessModal(submissionData);
  });
}

function showQuoteSuccessModal(data) {
  let modal = document.getElementById('rfq-success-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'rfq-success-modal';
    modal.className = 'fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="bg-slate-900 border border-amber-500/40 rounded-lg max-w-lg w-full p-6 shadow-2xl text-white relative">
      <div class="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <span class="hud-tag green mb-1">TRANSMISSION CONFIRMED</span>
          <h3 class="text-xl font-bold font-display text-white">Quotation Request Dispatched</h3>
        </div>
        <button id="close-success-modal-btn" class="w-8 h-8 rounded bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300">✕</button>
      </div>

      <div class="py-4 space-y-3 font-mono text-xs text-slate-300">
        <div class="bg-slate-950 p-3 rounded border border-slate-800/80">
          <p class="text-amber-400 font-bold">REFERENCE ID: ${data.quoteId}</p>
          <p class="mt-1">CLIENT: ${data.customer.name} (${data.customer.company || 'Direct'})</p>
          <p>PRODUCT: ${data.specifications.rivetType} | ${data.specifications.material}</p>
          <p>DIMENSIONS: Ø${data.specifications.shankDiameter} x ${data.specifications.shankLength} (Head: ${data.specifications.headDiameter})</p>
          <p>PLATING / COATING: ${data.specifications.coating}</p>
        </div>
        <p class="text-slate-400 leading-relaxed font-sans text-sm">
          Your technical specification has been recorded. Our engineering sales desk in Coimbatore will review your dimensional tolerances and return formal commercial terms within 24 business hours.
        </p>
      </div>

      <div class="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3 justify-end">
        <button id="download-rfq-spec-btn" class="btn-secondary text-xs">
          ↓ Export Spec (JSON)
        </button>
        <button id="ok-success-btn" class="btn-industrial text-xs">
          Acknowledge & Close
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');

  document.getElementById('close-success-modal-btn').addEventListener('click', () => modal.classList.add('hidden'));
  document.getElementById('ok-success-btn').addEventListener('click', () => modal.classList.add('hidden'));

  document.getElementById('download-rfq-spec-btn').addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${data.quoteId}_Specification.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    if (window.showIndustrialToast) {
      window.showIndustrialToast('Specification file downloaded.', 'success');
    }
  });
}
