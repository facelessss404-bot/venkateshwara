/**
 * Sri Venkateswara Company (SVC) — Authoritative Engineering Knowledge Base & Intent Classifier
 * Precision Cold-Forged Rivets & Fasteners — Coimbatore, India (Est. 1964)
 * 
 * Strict Grounding Rules:
 * 1. Do not invent dimensions, load ratings, or unverified customer lists.
 * 2. Inconsistency flags (e.g., 50+ vs 200+ clients) are disclosed transparently.
 * 3. Commercial pricing requires formal engineering review.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.SVC_KB = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const KNOWLEDGE_BASE = {
    metadata: {
      companyName: 'Sri Venkateswara Company',
      shortName: 'SVC',
      tagline: 'Precision Cold-Forged Rivets & Fasteners',
      foundingYear: 1964,
      yearsInBusiness: '60+ Years',
      headquarters: 'Coimbatore, Tamil Nadu, India',
      plantAddress: 'S.F No: 626/1-2, Idikarai Road, Periyanaickenpalayam, Coimbatore, Tamil Nadu, 641022, India',
      officialPhone: '+91 (904) 707-7874',
      officialEmail: 'marketing@srivenkateswaracompany.in',
      hours: {
        weekday: '08:30 AM – 06:30 PM IST (Mon – Fri)',
        saturday: '08:30 AM – 04:30 PM IST',
        sunday: 'Closed (Plant Maintenance)'
      },
      workforce: '~100+ Skilled Technicians & Engineers',
      exportMarkets: ['Germany', 'Thailand'],
      legacyCustomerDiscrepancy: 'Legacy records list 50+ customers on homepage and 200+ on historical About pages; SVC maintains strict transparency pending final client audit sign-off.',
      lastVerifiedDate: '2026-11-12'
    },

    categories: [
      {
        id: 'solid',
        name: 'Solid Rivets',
        route: 'products.html#solid',
        familyBadge: 'HIGH SHEAR // PERMANENT JOINT',
        summary: 'Solid core rivets engineered for maximum shear resistance, structural integrity, and vibration resistance. Assembled by solid impact cold-heading or swaging.',
        applications: ['Heavy structural joints', 'Automotive brake & chassis brackets', 'Electrical switchgear busbars', 'Aircraft & rail framework', 'Architectural hardware'],
        clinchForce: 'High (requires heavy mechanical or pneumatic impact header)',
        holeRequirement: 'Pre-drilled / punched through-hole through all joined layers',
        products: [
          {
            id: 'solid-brass-round',
            name: 'Brass Round Head',
            material: 'Brass IS 319 / C360',
            din: 'DIN 660 / ISO 1051',
            headStyle: 'Round Dome Head',
            shankStyle: 'Full Solid Cylindrical',
            tolerance: '± 0.02 mm Standard',
            features: 'High decorative luster, atmospheric corrosion resistance, non-magnetic.',
            applications: 'Electrical switchgear, architectural hardware, decorative consumer goods, marine fittings.',
            image: 'https://srivenkateswaracompany.com/images/solid/Brass%20Round%20head.jpg'
          },
          {
            id: 'solid-copper-mushroom',
            name: 'Copper Mushroom Head',
            material: 'Electrolytic Copper C110',
            din: 'DIN 660 Modified',
            headStyle: 'Low-Profile Mushroom Dome',
            shankStyle: 'Full Solid Core',
            tolerance: '± 0.02 mm Standard',
            features: 'Maximum contact surface area, ultra-high electrical and thermal conductivity.',
            applications: 'Heavy electrical busbars, transformer connections, automotive battery terminals, grounding studs.',
            image: 'https://srivenkateswaracompany.com/images/solid/Copper%20Mushroom%20Head.jpg'
          },
          {
            id: 'solid-ms-dimple',
            name: 'MS Dimple Head',
            material: 'Mild Steel C1008 / C1010',
            din: 'Custom OEM Alignment Spec',
            headStyle: 'Concave Alignment Dimple',
            shankStyle: 'Straight Solid Shank',
            tolerance: '± 0.02 mm Standard',
            features: 'Optical & mechanical punch centering cup prevents tool slippage during high-speed robotic riveting.',
            applications: 'Automated assembly lines, automotive seating mechanisms, appliance frames.',
            image: 'https://srivenkateswaracompany.com/images/solid/MS%20Dimple%20head.jpg'
          },
          {
            id: 'solid-ms-knurled',
            name: 'MS Knurled Shank',
            material: 'High-Carbon Mild Steel',
            din: 'Interference Press Spec',
            headStyle: 'Flat Seating Head',
            shankStyle: 'Diamond / Straight Knurled',
            tolerance: '± 0.015 mm High Precision',
            features: 'Helical or diamond knurl bites into zinc die-casts, aluminum or plastics, preventing torsional spin.',
            applications: 'Die-cast engine blocks, electric motor housings, composite panel inserts.',
            image: 'https://srivenkateswaracompany.com/images/solid/MS%20Knurled%20Shank.jpg'
          },
          {
            id: 'solid-ms-step-head',
            name: 'MS Step Head',
            material: 'Cold Forged Mild Steel',
            din: 'Stepped Collar Spec',
            headStyle: 'Dual-Tier Shoulder Step',
            shankStyle: 'Solid Core',
            tolerance: '± 0.02 mm Standard',
            features: 'Dual-tiered head acts as an integral spacer collar, establishing fixed axial stand-off distance.',
            applications: 'Rotating linkages, pivot brackets, sheet metal standoff enclosures.',
            image: 'https://srivenkateswaracompany.com/images/solid/MS%20Step%20Head.jpg'
          },
          {
            id: 'solid-ms-step-shank',
            name: 'MS Step Shank',
            material: 'Cold Heading Forging Steel',
            din: 'Pivot Spindle Spec',
            headStyle: 'Standard Round Head',
            shankStyle: 'Stepped Dual-Diameter Shank',
            tolerance: '± 0.015 mm High Precision',
            features: 'Wider precision ground axle body for hinge movement with smaller terminal tip for tight clinching.',
            applications: 'Scissor arms, brake linkages, folding hinges, mechanical pivots.',
            image: 'https://srivenkateswaracompany.com/images/solid/MS%20Step%20Shank.jpg'
          }
        ]
      },
      {
        id: 'semi-tubular',
        name: 'Semi-Tubular Rivets',
        route: 'products.html#semi-tubular',
        familyBadge: '50% LOWER LOAD // ROLL CLINCH',
        summary: 'Features a shallow hollow cavity at the shank tip (depth does not exceed shank diameter). Requires ~50% less clinching force than a solid rivet, minimizing assembly stress on delicate substrates.',
        applications: ['Brake linings & clutch facings', 'Luggage & leather goods', 'Electronics brackets & PCB standoffs', 'Lighting fixtures', 'Automotive door latches'],
        clinchForce: 'Medium (approx. 50% lower than solid rivets)',
        holeRequirement: 'Pre-punched hole; shank expands slightly while tubular tip roll-forms over',
        products: [
          {
            id: 'semi-brass-mushroom',
            name: 'Brass Mushroom Head',
            material: 'Brass IS 319 / C360',
            din: 'DIN 7338 Form B',
            headStyle: 'Mushroom Dome Head',
            shankStyle: 'Partial Tubular Tip Cavity',
            tolerance: '± 0.02 mm Standard',
            features: 'Low roll-clinch force prevents cracking in decorative hardware, leather goods, and instrument panels.',
            applications: 'Luggage hardware, musical instrument cases, vintage automotive trim.',
            image: 'https://srivenkateswaracompany.com/images/semi-tubular/Brass%20Mushroom%20Head.jpg'
          },
          {
            id: 'semi-copper-flat',
            name: 'Copper Flat Head',
            material: 'Electrolytic Copper C110',
            din: 'DIN 7338 B Flat',
            headStyle: 'Flush Seated Flat Head',
            shankStyle: 'Partial Tubular Clinch Cavity',
            tolerance: '± 0.02 mm Standard',
            features: 'Flush seating surface combined with hollow tip for rapid assembly on electrical relays and breaker bars.',
            applications: 'Electrical switchgear, grounding terminals, relay contacts.',
            image: 'https://srivenkateswaracompany.com/images/semi-tubular/Copper%20Flat%20Head.jpg'
          },
          {
            id: 'semi-ms-double-shank',
            name: 'MS Double Shank',
            material: 'Cold Forging Mild Steel',
            din: 'Dual Diameter Spec',
            headStyle: 'Flat Bearing Surface',
            shankStyle: 'Double Stepped Tubular',
            tolerance: '± 0.02 mm Standard',
            features: 'Dual-diameter stepped shank for multi-tier sheet metal joining with precise clamp stand-off.',
            applications: 'Multi-layer sheet metal assemblies, automotive brackets, HVAC dampers.',
            image: 'https://srivenkateswaracompany.com/images/semi-tubular/MS%20Double%20Shank.jpg'
          },
          {
            id: 'semi-ms-flat',
            name: 'MS Flat Head',
            material: 'Mild Steel C1010',
            din: 'DIN 7338 Form B',
            headStyle: 'Flat Seated Head',
            shankStyle: 'Semi-Tubular Cavity',
            tolerance: '± 0.02 mm Standard',
            features: 'Workhorse industrial fastener. Large bearing area under head resists pull-through under tension.',
            applications: 'Automotive brake shoes, commercial clutch facings, sheet steel brackets.',
            image: 'https://srivenkateswaracompany.com/images/semi-tubular/MS%20Flat%20Head.jpg'
          },
          {
            id: 'semi-ms-hex',
            name: 'MS Hexagonal Head',
            material: 'High-Tensile Mild Steel',
            din: 'Hex Head Lock Spec',
            headStyle: 'Precision Hexagonal Head',
            shankStyle: 'Semi-Tubular Tip',
            tolerance: '± 0.02 mm Standard',
            features: 'Hex head fits into pre-formed hex counterbores to lock fastener against rotation during spin-clinching.',
            applications: 'High-vibration machinery, power tool assemblies, chassis assemblies.',
            image: 'https://srivenkateswaracompany.com/images/semi-tubular/MS%20Hexgonal%20Head.jpg'
          },
          {
            id: 'semi-ss-flat',
            name: 'SS Flat Head',
            material: 'Stainless Steel AISI 304',
            din: 'DIN 7338 B / SS',
            headStyle: 'Flat Polished Head',
            shankStyle: 'Semi-Tubular Cavity',
            tolerance: '± 0.015 mm High Precision',
            features: 'Manufactured from 304 SS for exceptional resistance against atmospheric oxidation and marine salt.',
            applications: 'Commercial kitchen appliances, food processing equipment, marine fixtures, medical carts.',
            image: 'https://srivenkateswaracompany.com/images/semi-tubular/SS%20Flat%20Head.jpg'
          }
        ]
      },
      {
        id: 'tubular',
        name: 'Tubular Rivets',
        route: 'products.html#tubular',
        familyBadge: 'FULL TUBULAR // CURL ROLL FORM',
        summary: 'Deep hollow cavity through the major portion or entirety of the shank. Requires the lowest clinching load; can also double as a hollow through-hole conduit for electrical wiring or pivot pins.',
        applications: ['Brake shoe friction linings', 'Electrical wire routing eyelets', 'Thin fragile plastics & cardboard packaging', 'Aerodynamic sliding tracks', 'Hinges & pivot joints'],
        clinchForce: 'Lowest (ideal for thin sheet metal, plastics, leather, and automated spin clinching)',
        holeRequirement: 'Pre-punched hole or self-piercing in soft materials',
        products: [
          {
            id: 'tubular-brass-flat',
            name: 'Brass Flat Head Tubular',
            material: 'Brass IS 319 / C360',
            din: 'DIN 7340 Flat',
            headStyle: 'Flush Seated Flat Head',
            shankStyle: 'Deep Tubular Core',
            tolerance: '± 0.02 mm Standard',
            features: 'Full-depth hollow shank curls into a symmetrical toroidal ring on the blind side.',
            applications: 'Thin non-ferrous sheet metal, electrical grounding studs, switchboards.',
            image: 'https://srivenkateswaracompany.com/images/tubular/Brass%20Flat%20Head.jpg'
          },
          {
            id: 'tubular-brass-eyelet',
            name: 'Brass Tubular Eyelet',
            material: 'High Ductility Brass C360',
            din: 'DIN 7340 Hollow',
            headStyle: 'Rolled Rim Flange',
            shankStyle: 'Continuous Hollow Tube',
            tolerance: '± 0.02 mm Standard',
            features: 'Deep hollow sleeve serves as an open conduit for wire harness routing and reinforced eyelets.',
            applications: 'PCB eyelets, wire harness passthroughs, structural webbing, industrial canvas.',
            image: 'https://srivenkateswaracompany.com/images/tubular/Brass%20Tubular.jpg'
          },
          {
            id: 'tubular-ms-button',
            name: 'MS Button Rivet',
            material: 'Low Carbon Mild Steel',
            din: 'Automotive Friction Spec',
            headStyle: 'Low Profile Button Head',
            shankStyle: 'Full Tubular Body',
            tolerance: '± 0.02 mm Standard',
            features: 'Gently rounded crown and tubular tail designed for automotive brake shoe relining without drum scoring.',
            applications: 'Heavy commercial vehicle brake shoes, friction plates, agricultural machinery.',
            image: 'https://srivenkateswaracompany.com/images/tubular/MS%20Button%20Rivet.jpg'
          },
          {
            id: 'tubular-ms-countersink',
            name: 'MS Countersink Rivet',
            material: 'Cold Heading Mild Steel',
            din: 'DIN 7340 Countersunk',
            headStyle: '90° / 120° Beveled Head',
            shankStyle: 'Deep Hollow Cavity',
            tolerance: '± 0.02 mm Standard',
            features: 'Beveled head fits completely flush inside countersunk holes for zero-protrusion sliding tracks.',
            applications: 'Aerodynamic ducting, conveyor sliding tracks, precision machine tool covers.',
            image: 'https://srivenkateswaracompany.com/images/tubular/MS%20Counter%20Sink.jpg'
          },
          {
            id: 'tubular-ms-head-knurled',
            name: 'MS Head Knurled',
            material: 'High-Strength Mild Steel',
            din: 'Gasket Clamping Spec',
            headStyle: 'Underside Knurled Head',
            shankStyle: 'Tubular Clinch Shank',
            tolerance: '± 0.02 mm Standard',
            features: 'Serrated knurling underneath head bites into soft gaskets, clutch facings, or fibrous boards.',
            applications: 'High-vibration gasket clamps, clutch friction linings, composite assemblies.',
            image: 'https://srivenkateswaracompany.com/images/tubular/MS%20Head%20Knurled%20.jpg'
          },
          {
            id: 'tubular-ms-step',
            name: 'MS Step Tubular',
            material: 'Special Forging MS',
            din: 'Stepped Hinge Spec',
            headStyle: 'Round Retaining Head',
            shankStyle: 'Stepped Tubular Body',
            tolerance: '± 0.015 mm High Precision',
            features: 'Acts as both an axle spindle and a roll-formed fastener without clamping moving parts.',
            applications: 'Scissors, folding mechanisms, automotive glove box hinges, throttle linkages.',
            image: 'https://srivenkateswaracompany.com/images/tubular/MS%20Step%20Tubular.jpg'
          }
        ]
      }
    ],

    services: [
      {
        id: 'cold-forging',
        name: 'Precision Cold Heading (Cold Forging)',
        route: 'services.html#cold-forging',
        badge: 'CAPABILITY 01 // HIGH SPEED',
        summary: 'High-speed cold plastic deformation where coiled wire rod is straightened, sheared into measured slugs, and forged inside carbide dies under multi-station punches at ambient temperatures.',
        keyBenefits: [
          'Zero Chip Waste: Metal is plastically formed, not cut away, saving raw material costs.',
          'Continuous Grain Flow: Metallurgical crystal structure follows part contours for 30-40% greater fatigue strength.',
          'High Cadence: Cycle speeds reach up to 300 parts per minute.',
          'High Accuracy: Standard dimensional tolerances down to ±0.02 mm.'
        ],
        stages: [
          'Stage 1 (Cutoff): Carbide rollers straighten wire coil; high-speed shear blade cuts slug to ±0.03 mm.',
          'Stage 2 (Cone Upset): First punch strikes slug, gathering material into a symmetrical 60° cone preform.',
          'Stage 3 (Die Cavity): Finishing punch compresses head geometry and backward-extrudes tubular tip cavity under 80+ tons/cm².',
          'Stage 4 (Ejection): Positive knockout pin ejects fastener onto conveyor.'
        ]
      },
      {
        id: 'annealing',
        name: 'Annealing (Thermal Normalization)',
        route: 'services.html#annealing',
        badge: 'CAPABILITY 02 // IN-HOUSE FURNACE',
        summary: 'Specialized thermal treatment that normalizes the interatomic crystalline space after severe cold-heading deformation, restoring elongation up to 35% for effortless, crack-free clinching.',
        keyBenefits: [
          'Eliminates internal work-hardening stresses from high-speed forging.',
          'Restores metal ductility up to 35% elongation.',
          'Prevents shank cracking and head splitting during automated assembly roll-clinching.',
          'Controlled atmosphere reduces surface scale and preserves dimensional accuracy.'
        ],
        temperatureRange: 'Critical recrystallization soak cycles regulated according to specific wire alloy metallurgy.'
      },
      {
        id: 'ultrasonic-cleaning',
        name: 'Ultra-Sonic Agitation Cleaning',
        route: 'services.html#ultrasonic',
        badge: 'CAPABILITY 03 // 3-6 MINUTE CYCLE',
        summary: 'Proprietary solvent bath agitated by high-frequency ultrasound waves (20-40 kHz). Produces millions of microscopic cavitation bubbles that violently implode, stripping forging lubricants and microscopic chips from blind holes.',
        keyBenefits: [
          'Cycle duration: 3 to 6 minutes continuous agitation.',
          '100% blind-hole and tubular cavity penetration.',
          'Ensures immaculate surface cleanliness required for electroplating adhesion.',
          'Eliminates oily residue before packaging and automated feeder bowls.'
        ]
      },
      {
        id: 'plating',
        name: '80-Tonne Automated In-House Electroplating Plant',
        route: 'services.html#plating',
        badge: 'CAPABILITY 04 // 80 TONNES/MONTH',
        summary: 'Fully automated PLC-controlled barrel electroplating facility with heavy industrial throughput of 80 tonnes per month right on-site in Coimbatore. Eliminates transit delays and ensures consistent coating quality.',
        coatingsOffered: [
          { name: 'Zinc Clear (RoHS)', desc: 'Trivalent passivation, silver metallic look, environmentally compliant.' },
          { name: 'Yellow Zinc', desc: 'Enhanced corrosion resistance with iridescent yellow chromate.' },
          { name: 'Bright Nickel', desc: 'Automotive and decorative finish with high wear resistance.' },
          { name: 'Copper Flash', desc: 'Promotes electrical conductivity and serves as under-strike for brass.' },
          { name: 'Brass Flash', desc: 'Decorative hardware finish with natural warm golden luster.' },
          { name: 'Tin Coating', desc: 'Ideal for electronic terminals requiring superior solderability.' }
        ],
        qualitySafeguards: 'In-house salt spray testing up to 720+ hours (ASTM B117) and de-embrittlement baking ovens.'
      }
    ],

    quality: {
      route: 'quality.html',
      headline: 'Certified Excellence & Zero-Defect Metallurgy',
      certifications: [
        {
          id: 'iatf-16949',
          name: 'IATF 16949:2016',
          title: 'Automotive Quality Management System',
          issuingBody: 'Automotive Task Force (Jan 2018 accredited)',
          scope: 'Manufacture of Cold Forged Rivets (Coimbatore Plant)',
          importance: 'Required standard for Tier-1 and Tier-2 automotive component suppliers. Enforces defect prevention and reduction of variation in the supply chain.',
          documentScan: 'https://srivenkateswaracompany.com/images/SVC_IATF%201.jpg',
          status: 'Active verified documentation on file'
        },
        {
          id: 'iso-14001',
          name: 'ISO 14001:2015',
          title: 'Environmental Management System',
          scope: 'Wastewater treatment, solvent recovery & plating plant environmental stewardship',
          importance: 'Governs safe handling of electroplating chemistry, zero untreated discharge, and energy conservation.',
          documentScan: 'https://srivenkateswaracompany.com/images/SVC_IATF%202.jpg',
          status: 'Verified plant eco-compliance'
        },
        {
          id: 'iso-45001',
          name: 'ISO 45001:2018',
          title: 'Occupational Health and Safety Management System',
          scope: 'Workforce safety, ergonomic machine guarding & air ventilation across 100+ personnel',
          importance: 'Ensures zero-harm operating environment for cold-heading and high-tonnage plating operators.',
          documentScan: 'https://srivenkateswaracompany.com/images/SVC_IATF%203.jpg',
          status: 'Verified workforce safety framework'
        }
      ],
      metrologyLab: [
        { name: 'Optical Profile Projector', desc: 'Shadowgraph magnification to verify head radius, chamfer angles, and wall uniformity.' },
        { name: 'Vickers & Rockwell Micro-Hardness Testers', desc: 'Verifies metallurgical grain recrystallization before and after annealing.' },
        { name: 'ASTM B117 Salt Spray Chamber', desc: 'Accelerated corrosion tests validating plating coatings up to 720+ hours without red rust.' },
        { name: 'Mitutoyo Calibrated Micrometers & Plug Gauges', desc: 'Ensures tolerances down to ±0.01 mm across every lot.' }
      ],
      sixStageGates: [
        'Gate 01: Raw Wire Coil chemical composition and tensile inspection.',
        'Gate 02: Cold Heading first-off dimensional approval under profile projector.',
        'Gate 03: Annealing furnace hardness and ductility verification.',
        'Gate 04: Ultrasonic bath cleanliness inspection.',
        'Gate 05: Plating thickness (microns) and salt spray corrosion test.',
        'Gate 06: Pre-dispatch AQL sample lot audit and dispatch release.'
      ]
    },

    education: {
      rivetBasics: {
        beginner: "A rivet is a permanent mechanical fastener. Unlike a screw or bolt that has threads, a rivet consists of a smooth metal shank with a head on one end. After it is inserted through aligned holes in the materials you want to join, the other end (the 'tail') is pressed or hammered flat. This creates a second head, permanently locking the pieces together so they cannot vibrate loose.",
        technical: "A rivet is a permanent mechanical fastener providing high shear and tensile interlock through plastic deformation of its cylindrical shank. Because it contains no threads, it does not loosen under severe cyclical vibration, dynamic impact, or thermal expansion. Fastening relies on axial compression (heading/bucking) or radial curling (roll clinching) of the tail section."
      },
      solidVsTubular: {
        beginner: "• Solid Rivet: Made of solid metal from end to end. It is the strongest type, but needs heavy force to install.\n• Semi-Tubular Rivet: Has a small hole drilled into the tip. It takes half as much force to fasten, making it safer for materials that might crack.\n• Tubular Rivet: Has a deep hollow hole down the shank. It takes the least force to roll flat and can even serve as an open tube for wires.",
        technical: "• Solid Rivets (DIN 660): 100% solid cross-section offering maximum shear strength. Installed via high-impact hammer or heavy pneumatic squeezer.\n• Semi-Tubular Rivets (DIN 7338): Hollow cavity depth does not exceed shank diameter (typically 30-50% length). Clinching rolls over the hollow lip, reducing required upset force by ~50% compared to solid rivets.\n• Tubular Rivets (DIN 7340): Deep tubular core with thin wall thickness. Requires minimal roll-forming force and creates a smooth toroidal curl on the blind side."
      },
      whyAnnealing: {
        beginner: "When metal is squeezed cold at high speeds to form a rivet head, it becomes stiff and brittle (like bending a paperclip repeatedly). Annealing is like giving the metal a hot bath: we heat it up in a furnace and cool it slowly. This softens the metal just enough so that when you fasten it into your product, the rivet bends smoothly without snapping or cracking.",
        technical: "Cold heading induces severe plastic strain and lattice distortion in the metallic crystal structure, elevating hardness and yield strength while degrading ductility (work-hardening). Annealing heats components to critical recrystallization temperature, relieving internal residual stresses and restoring elongation up to 35% to allow fracture-free roll clinching."
      },
      whyUltrasonic: {
        beginner: "During manufacturing, heavy oils and tiny metal shavings stick to the rivets. Ultrasonic cleaning uses high-frequency sound waves in a liquid bath. The sound waves create millions of microscopic bubbles that rapidly pop against the metal, blasting away grease from inside tiny holes that a normal wash could never reach.",
        technical: "High-frequency acoustic energy (20-40 kHz) propagated through chemical solvent tanks induces rapid localized pressure fluctuations, creating microscopic vacuum cavities (cavitation). The violent implosion of these bubbles generates shock waves and microjets that scour surface contaminants, oils, and microscopic machining debris from blind holes within 3 to 6 minutes."
      }
    },

    quotationGuide: {
      requiredDimensions: [
        { key: 'shank_dia', label: 'Shank Diameter (d_s)', unit: 'mm', min: 1.0, max: 25.0, default: 8.0, desc: 'Outer diameter of the main cylinder.' },
        { key: 'shank_len', label: 'Shank Length (L)', unit: 'mm', min: 3.0, max: 150.0, default: 25.0, desc: 'Length from underside of head to rivet tip.' },
        { key: 'head_dia', label: 'Head Diameter (d_k)', unit: 'mm', min: 2.0, max: 40.0, default: 16.0, desc: 'Maximum diameter of the formed head.' },
        { key: 'wall_thick', label: 'Wall Thickness (t)', unit: 'mm', min: 0.2, max: 5.0, default: 1.2, desc: 'Wall thickness of tubular cavity (tubular / semi-tubular only).' }
      ],
      materials: ['Mild Steel (C1008/C1010)', 'Stainless Steel (AISI 304)', 'Brass (IS 319 / C360)', 'Electrolytic Copper (C110)', 'Aluminum', 'Specialized Alloy'],
      coatings: ['Self Color / Plain', 'Zinc Clear (Trivalent RoHS)', 'Yellow Passivation Zinc', 'Bright Nickel', 'Copper Flash', 'Brass Flash', 'Tin Plating'],
      leadTimeStatement: 'Standard production tooling and commercial response is provided within 24 business hours. Production lead times depend on raw wire availability and batch tonnage.'
    }
  };

  /**
   * Fast Intent Classifier & Entity Extractor
   */
  function classifyIntent(query) {
    const q = query.toLowerCase().trim();

    // 1. Quotation / Pricing
    if (/quote|rfq|pricing|price|cost|how much|inquiry|order|commercial/i.test(q)) {
      return { intent: 'QUOTATION', confidence: 0.95 };
    }

    // 2. Product Finder / Recommender
    if (/find|recommend|which rivet|what rivet|help me choose|select rivet|what should i use/i.test(q)) {
      return { intent: 'PRODUCT_FINDER', confidence: 0.92 };
    }

    // 3. Product Comparison
    if (/difference between|compare|versus|vs|solid or tubular|semi-tubular vs/i.test(q)) {
      return { intent: 'PRODUCT_COMPARISON', confidence: 0.94 };
    }

    // 4. Rivet Education / Beginner
    if (/what is a rivet|how do rivets work|why use rivets|what does a rivet do|explain rivet|rivet basics/i.test(q)) {
      return { intent: 'EDUCATION_RIVET', confidence: 0.95 };
    }
    if (/why anneal|what is annealing|heat treat|hardness|ductility/i.test(q)) {
      return { intent: 'EDUCATION_ANNEALING', confidence: 0.95 };
    }
    if (/ultrasonic|cleaning|cavitation|solvent bath/i.test(q)) {
      return { intent: 'EDUCATION_ULTRASONIC', confidence: 0.95 };
    }
    if (/plating|coating|zinc|nickel|galvaniz|salt spray|corrosion/i.test(q)) {
      return { intent: 'EDUCATION_PLATING', confidence: 0.93 };
    }

    // 5. Specific Product Families
    if (/semi[- ]?tubular/i.test(q)) {
      return { intent: 'PRODUCT_SEMI_TUBULAR', confidence: 0.96 };
    }
    if (/tubular/i.test(q)) {
      return { intent: 'PRODUCT_TUBULAR', confidence: 0.96 };
    }
    if (/solid rivet|solid/i.test(q)) {
      return { intent: 'PRODUCT_SOLID', confidence: 0.92 };
    }

    // 6. Quality & Certifications
    if (/iatf|iso|16949|14001|45001|certif|quality|audit|metrology|tolerance|standard/i.test(q)) {
      return { intent: 'QUALITY_CERTIFICATIONS', confidence: 0.95 };
    }

    // 7. Manufacturing Capabilities & Plant
    if (/manufacturing|cold heading|cold forg|plant|machinery|coimbatore facility|capacity|tons/i.test(q)) {
      return { intent: 'MANUFACTURING_PROCESSES', confidence: 0.93 };
    }

    // 8. Contact & Location
    if (/contact|phone|call|email|address|location|where is|factory address|directions|hours/i.test(q)) {
      return { intent: 'CONTACT_INFO', confidence: 0.96 };
    }

    // 9. Company History & Heritage
    if (/who is|about svc|established|found|history|muthiah|jawahar muthu|years in business|ti cycles/i.test(q)) {
      return { intent: 'COMPANY_HERITAGE', confidence: 0.94 };
    }

    // 10. General Search / Keyword match
    return { intent: 'GENERAL_SEARCH', confidence: 0.6 };
  }

  /**
   * Search knowledge base for relevant items
   */
  function searchKnowledgeBase(query) {
    const q = query.toLowerCase().trim();
    const tokens = q.split(/\s+/).filter(t => t.length > 2);
    const results = [];

    // Search in all 18 products
    KNOWLEDGE_BASE.categories.forEach(cat => {
      cat.products.forEach(prod => {
        let score = 0;
        const haystack = `${prod.name} ${prod.material} ${prod.din} ${prod.features} ${prod.applications} ${cat.name}`.toLowerCase();
        
        if (haystack.includes(q)) score += 10;
        tokens.forEach(t => {
          if (haystack.includes(t)) score += 2;
        });

        if (score > 0) {
          results.push({
            type: 'product',
            title: prod.name,
            category: cat.name,
            subtitle: `${prod.material} • ${prod.din}`,
            description: prod.features,
            route: cat.route,
            image: prod.image,
            score: score
          });
        }
      });
    });

    // Search in services
    KNOWLEDGE_BASE.services.forEach(srv => {
      let score = 0;
      const haystack = `${srv.name} ${srv.summary} ${srv.keyBenefits.join(' ')}`.toLowerCase();
      if (haystack.includes(q)) score += 8;
      tokens.forEach(t => {
        if (haystack.includes(t)) score += 2;
      });
      if (score > 0) {
        results.push({
          type: 'service',
          title: srv.name,
          category: 'Manufacturing Service',
          subtitle: srv.badge,
          description: srv.summary,
          route: srv.route,
          score: score
        });
      }
    });

    // Sort by score descending
    return results.sort((a, b) => b.score - a.score).slice(0, 5);
  }

  return {
    data: KNOWLEDGE_BASE,
    classifyIntent: classifyIntent,
    search: searchKnowledgeBase
  };
});

