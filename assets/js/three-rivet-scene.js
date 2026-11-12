/**
 * Sri Venkateswara Company (SVC) — Interactive 3D WebGL Rivet Engine
 * Built upon img2threejs procedural reconstruction principles.
 * Supports Solid, Semi-Tubular, and Tubular rivets with PBR materials,
 * wireframe mode, cutaway cross-section inspection, and dynamic HUD measurements.
 */

class SVCRivetViewer {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.options = Object.assign({
      rivetType: 'solid',      // 'solid' | 'semi-tubular' | 'tubular'
      headType: 'round',       // 'round' | 'mushroom' | 'flat' | 'dimple'
      materialKey: 'brass',    // 'brass' | 'copper' | 'stainless' | 'mild_steel' | 'zinc' | 'aluminum'
      autoRotate: true,
      wireframe: false,
      cutaway: false,
      showHUD: true,
      cameraDistance: 65,
      shankDiameter: 8,        // mm
      shankLength: 28,         // mm
      headDiameter: 15,        // mm
      wallThickness: 1.2       // mm (for tubular)
    }, options);

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.rivetMeshGroup = null;
    this.materials = {};
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.rotationVelocity = { x: 0.003, y: 0.005 };
    this.targetRotation = { x: 0.2, y: 0.4 };
    this.currentRotation = { x: 0.2, y: 0.4 };
    this.animId = null;
    this.isVisible = true;

    this.init();
  }

  init() {
    if (typeof THREE === 'undefined') {
      console.warn('Three.js not loaded. Falling back to SVG blueprint illustration.');
      this.renderFallback();
      return;
    }

    try {
      this.setupRenderer();
      this.setupScene();
      this.setupCamera();
      this.setupLighting();
      this.setupMaterials();
      this.buildRivetModel();
      this.setupEventListeners();
      this.setupIntersectionObserver();
      this.animate();
    } catch (e) {
      console.error('WebGL initialization error:', e);
      this.renderFallback();
    }
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Clear previous children
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
    this.container.appendChild(this.renderer.domElement);
  }

  setupScene() {
    this.scene = new THREE.Scene();
  }

  setupCamera() {
    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 1000);
    this.camera.position.set(0, 5, this.options.cameraDistance);
    this.camera.lookAt(0, 0, 0);
  }

  setupLighting() {
    // Ambient fill
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    this.scene.add(ambientLight);

    // Key Light (Warm Engineering Studio Light)
    const keyLight = new THREE.DirectionalLight(0xffeedd, 1.7);
    keyLight.position.set(25, 35, 30);
    keyLight.castShadow = true;
    this.scene.add(keyLight);

    // Cold Rim Light (Industrial Edge Separation)
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.3);
    rimLight.position.set(-30, -15, -25);
    this.scene.add(rimLight);

    // Top Specular Accent
    const topLight = new THREE.DirectionalLight(0xffffff, 0.95);
    topLight.position.set(0, 40, 5);
    this.scene.add(topLight);

    // Generate Studio Environment Map for PBR metal reflections
    this.setupStudioEnvironment();
  }

  setupStudioEnvironment() {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createLinearGradient(0, 0, 512, 256);
      grad.addColorStop(0.0, '#0a0d14');
      grad.addColorStop(0.2, '#182434');
      grad.addColorStop(0.38, '#ffffff'); // bright studio softbox reflection
      grad.addColorStop(0.5, '#7890a8');
      grad.addColorStop(0.7, '#151c28');
      grad.addColorStop(0.85, '#d97706'); // warm forged bronze accent reflection
      grad.addColorStop(1.0, '#07090e');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 256);

      const envTex = new THREE.CanvasTexture(canvas);
      envTex.mapping = THREE.EquirectangularReflectionMapping;
      this.scene.environment = envTex;
    } catch (e) {
      console.warn('Studio environment map generation skipped:', e);
    }
  }

  createBrushedMetalBumpTexture() {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#808080';
      ctx.fillRect(0, 0, 256, 256);
      for (let i = 0; i < 3500; i++) {
        const y = Math.random() * 256;
        const alpha = 0.03 + Math.random() * 0.10;
        ctx.strokeStyle = Math.random() > 0.5 ? `rgba(255,255,255,${alpha})` : `rgba(0,0,0,${alpha})`;
        ctx.lineWidth = 0.5 + Math.random() * 1.5;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(256, y);
        ctx.stroke();
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(2, 6);
      return tex;
    } catch (e) {
      return null;
    }
  }

  setupMaterials() {
    this.brushedBumpMap = this.createBrushedMetalBumpTexture();

    // Metallic PBR Material definitions
    this.materialDefs = {
      brass: {
        color: 0xe5b85a,
        metalness: 0.90,
        roughness: 0.26,
        clearcoat: 0.25,
        name: 'Brass C360'
      },
      copper: {
        color: 0xc9653b,
        metalness: 0.92,
        roughness: 0.28,
        clearcoat: 0.2,
        name: 'Electrolytic Copper C110'
      },
      stainless: {
        color: 0xe2e8f0,
        metalness: 0.96,
        roughness: 0.20,
        clearcoat: 0.4,
        name: 'Stainless Steel 304'
      },
      mild_steel: {
        color: 0x788699,
        metalness: 0.86,
        roughness: 0.38,
        clearcoat: 0.15,
        name: 'Mild Steel (Cold Forged)'
      },
      zinc: {
        color: 0x9bb1c4,
        metalness: 0.82,
        roughness: 0.32,
        clearcoat: 0.25,
        name: 'Zinc Electroplated (80T)'
      },
      aluminum: {
        color: 0xdbe2e8,
        metalness: 0.76,
        roughness: 0.24,
        clearcoat: 0.2,
        name: 'Aerospace Aluminum 6061'
      }
    };

    Object.keys(this.materialDefs).forEach(key => {
      const def = this.materialDefs[key];
      this.materials[key] = new THREE.MeshStandardMaterial({
        color: def.color,
        metalness: def.metalness,
        roughness: def.roughness,
        bumpMap: this.brushedBumpMap,
        bumpScale: 0.018,
        wireframe: this.options.wireframe,
        side: THREE.DoubleSide
      });
    });
  }

  getCurrentMaterial() {
    return this.materials[this.options.materialKey] || this.materials.brass;
  }

  buildRivetModel() {
    if (this.rivetMeshGroup) {
      this.scene.remove(this.rivetMeshGroup);
    }

    this.rivetMeshGroup = new THREE.Group();
    const mat = this.getCurrentMaterial();
    mat.wireframe = this.options.wireframe;

    // Dimensions (normalized scale)
    const headRadius = this.options.headDiameter / 2;
    const shankRadius = this.options.shankDiameter / 2;
    const shankLen = this.options.shankLength;
    const wallThick = this.options.wallThickness;
    const cutAngle = this.options.cutaway ? Math.PI : Math.PI * 2;

    // Procedural Lathe Profile Generator
    const points = [];
    const segments = 48;

    // 1. Head Profile
    if (this.options.headType === 'round') {
      const headHeight = headRadius * 0.75;
      for (let i = 0; i <= 16; i++) {
        const theta = (i / 16) * (Math.PI / 2);
        const x = headRadius * Math.cos(theta);
        const y = headHeight * Math.sin(theta);
        points.push(new THREE.Vector2(x, y));
      }
    } else if (this.options.headType === 'mushroom') {
      const headHeight = headRadius * 0.5;
      for (let i = 0; i <= 16; i++) {
        const theta = (i / 16) * (Math.PI / 2);
        const x = headRadius * Math.cos(theta);
        const y = headHeight * Math.sin(theta);
        points.push(new THREE.Vector2(x, y));
      }
    } else if (this.options.headType === 'dimple') {
      const headHeight = headRadius * 0.7;
      points.push(new THREE.Vector2(0, headHeight * 0.7)); // dimple indent center
      points.push(new THREE.Vector2(headRadius * 0.25, headHeight * 0.75));
      for (let i = 4; i <= 16; i++) {
        const theta = (i / 16) * (Math.PI / 2);
        const x = headRadius * Math.cos(theta);
        const y = headHeight * Math.sin(theta);
        points.push(new THREE.Vector2(x, y));
      }
    } else { // Flat Head
      const headHeight = headRadius * 0.45;
      points.push(new THREE.Vector2(0, headHeight));
      points.push(new THREE.Vector2(headRadius * 0.85, headHeight));
      points.push(new THREE.Vector2(headRadius, headHeight * 0.7));
      points.push(new THREE.Vector2(headRadius, 0));
    }

    // Underside transition to shank
    points.push(new THREE.Vector2(shankRadius, 0));

    // 2. Shank Body
    if (this.options.rivetType === 'solid') {
      // Solid shank down to chamfered tip
      points.push(new THREE.Vector2(shankRadius, -shankLen + 1.2));
      points.push(new THREE.Vector2(shankRadius - 1.0, -shankLen));
      points.push(new THREE.Vector2(0, -shankLen)); // solid center base
    } else if (this.options.rivetType === 'semi-tubular') {
      // Semi-tubular: outer wall goes to bottom, then turns inside into a blind hole (~30% deep)
      const holeDepth = Math.min(shankLen * 0.35, 10);
      const innerRadius = shankRadius - wallThick;

      points.push(new THREE.Vector2(shankRadius, -shankLen + 0.8));
      points.push(new THREE.Vector2(shankRadius - 0.4, -shankLen));
      points.push(new THREE.Vector2(innerRadius + 0.4, -shankLen));
      points.push(new THREE.Vector2(innerRadius, -shankLen + 0.6));
      points.push(new THREE.Vector2(innerRadius, -shankLen + holeDepth));
      points.push(new THREE.Vector2(0, -shankLen + holeDepth)); // base of blind hole
    } else if (this.options.rivetType === 'tubular') {
      // Tubular: deep hollow cavity running ~80% of length
      const holeDepth = shankLen * 0.82;
      const innerRadius = Math.max(shankRadius - wallThick, 1.0);

      points.push(new THREE.Vector2(shankRadius, -shankLen + 0.8));
      points.push(new THREE.Vector2(shankRadius - 0.4, -shankLen));
      points.push(new THREE.Vector2(innerRadius + 0.4, -shankLen));
      points.push(new THREE.Vector2(innerRadius, -shankLen + 0.6));
      points.push(new THREE.Vector2(innerRadius, -shankLen + holeDepth));
      points.push(new THREE.Vector2(0, -shankLen + holeDepth));
    }

    // Build geometry using Lathe
    const latheGeo = new THREE.LatheGeometry(points, segments, 0, cutAngle);
    latheGeo.computeVertexNormals();

    const rivetMesh = new THREE.Mesh(latheGeo, mat);
    rivetMesh.castShadow = true;
    rivetMesh.receiveShadow = true;

    // Center mesh pivot
    rivetMesh.position.y = shankLen / 2;

    this.rivetMeshGroup.add(rivetMesh);

    // If cutaway mode is active, add cross-section face capping lines
    if (this.options.cutaway) {
      const edges = new THREE.EdgesGeometry(latheGeo, 24);
      const lineMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2 });
      const cutawayLines = new THREE.LineSegments(edges, lineMat);
      cutawayLines.position.y = shankLen / 2;
      this.rivetMeshGroup.add(cutawayLines);
    }

    this.scene.add(this.rivetMeshGroup);

    // Apply rotation
    this.rivetMeshGroup.rotation.x = this.currentRotation.x;
    this.rivetMeshGroup.rotation.y = this.currentRotation.y;
  }

  setRivetType(type) {
    this.options.rivetType = type;
    this.buildRivetModel();
  }

  setHeadType(head) {
    this.options.headType = head;
    this.buildRivetModel();
  }

  setMaterial(materialKey) {
    if (this.materialDefs[materialKey]) {
      this.options.materialKey = materialKey;
      const mat = this.getCurrentMaterial();
      mat.wireframe = this.options.wireframe;
      if (this.rivetMeshGroup && this.rivetMeshGroup.children[0]) {
        this.rivetMeshGroup.children[0].material = mat;
      }
    }
  }

  toggleWireframe() {
    this.options.wireframe = !this.options.wireframe;
    const mat = this.getCurrentMaterial();
    mat.wireframe = this.options.wireframe;
    return this.options.wireframe;
  }

  toggleCutaway() {
    this.options.cutaway = !this.options.cutaway;
    this.buildRivetModel();
    return this.options.cutaway;
  }

  setupEventListeners() {
    const el = this.renderer.domElement;

    el.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const deltaX = e.clientX - this.previousMousePosition.x;
      const deltaY = e.clientY - this.previousMousePosition.y;

      this.targetRotation.y += deltaX * 0.008;
      this.targetRotation.x += deltaY * 0.008;

      // Clamp X rotation to prevent flipping
      this.targetRotation.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, this.targetRotation.x));

      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    // Touch support for mobile/tablet
    el.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!this.isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
      const deltaY = e.touches[0].clientY - this.previousMousePosition.y;

      this.targetRotation.y += deltaX * 0.008;
      this.targetRotation.x += deltaY * 0.008;
      this.targetRotation.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, this.targetRotation.x));

      this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: true });

    window.addEventListener('touchend', () => {
      this.isDragging = false;
    });

    // Window Resize Handler
    window.addEventListener('resize', () => {
      if (!this.container || !this.renderer || !this.camera) return;
      const width = this.container.clientWidth;
      const height = this.container.clientHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    });
  }

  setupIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.isVisible = entry.isIntersecting;
        });
      }, { threshold: 0.1 });
      observer.observe(this.container);
    }
  }

  animate() {
    this.animId = requestAnimationFrame(() => this.animate());

    if (!this.isVisible) return;

    if (this.options.autoRotate && !this.isDragging) {
      this.targetRotation.y += 0.005;
    }

    // Smooth inertia interpolation
    this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.08;
    this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.08;

    if (this.rivetMeshGroup) {
      this.rivetMeshGroup.rotation.x = this.currentRotation.x;
      this.rivetMeshGroup.rotation.y = this.currentRotation.y;
    }

    this.renderer.render(this.scene, this.camera);
  }

  renderFallback() {
    this.container.innerHTML = `
      <div class="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-950 border border-slate-800 rounded">
        <svg class="w-24 h-24 text-amber-500 mb-4" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
          <!-- Rivet CAD Silhouette Blueprint Fallback -->
          <path d="M 25,30 C 25,18 75,18 75,30 L 70,36 L 58,36 L 58,82 C 58,85 54,88 50,88 C 46,88 42,85 42,82 L 42,36 L 30,36 Z" fill="rgba(217, 119, 6, 0.15)"/>
          <line x1="15" y1="30" x2="85" y2="30" stroke="#38bdf8" stroke-dasharray="2,2"/>
          <line x1="50" y1="10" x2="50" y2="92" stroke="#38bdf8" stroke-dasharray="2,2"/>
          <text x="50" y="96" fill="#94a3b8" font-size="6" text-anchor="middle" font-family="monospace">DIN 7337 / ISO 15977 SPEC</text>
        </svg>
        <span class="hud-tag mb-1">PRECISION CAD SCHEMATIC</span>
        <h4 class="text-white font-semibold text-sm">Cold-Forged Fastener</h4>
        <p class="text-xs text-slate-400 mt-1 max-w-xs">High-accuracy lathe dimensional specification. WebGL acceleration loaded.</p>
      </div>
    `;
  }

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
    if (this.renderer && this.renderer.domElement) {
      this.renderer.dispose();
      this.container.removeChild(this.renderer.domElement);
    }
  }
}

// Global exposure for modular consumption across pages
window.SVCRivetViewer = SVCRivetViewer;

