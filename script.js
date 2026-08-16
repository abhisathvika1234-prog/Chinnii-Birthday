/* ==========================================================================
   HAPPY BIRTHDAY CHINNIII
   CINEMATIC REVEAL + DEEP SPACE UNIVERSE + RUN GAME + ARCHIVES + CLOCKS
   FINAL ENDING = PERSONAL LETTER
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================================
     DOM ELEMENTS
     ========================================================================= */

  const musicToggleBtn = document.getElementById("music-toggle-btn");
  const musicIcon = document.getElementById("music-icon");
  const musicLabel = document.getElementById("music-label");

  const mainAudio = document.getElementById("main-audio-player");
  const universeAudio = document.getElementById("universe-audio-player");
  const runAudio = document.getElementById("run-audio-player");
  const letterAudio = document.getElementById("letter-audio-player");

  const cinematicTextIntro = document.getElementById("cinematic-text-intro");
  const introCurtain = document.getElementById("intro-curtain");
  const startRevealBtn = document.getElementById("start-reveal-btn");
  const blackCurtain = document.getElementById("black-curtain");

  /* Universe */
  const cosmicUniverseSection =
    document.getElementById("cosmic-universe");

  const universeWebglCanvas =
    document.getElementById("universe-webgl-canvas");

  const hintMoon = document.getElementById("hint-moon");
  const hintVenus = document.getElementById("hint-venus");
  const hintSaturn = document.getElementById("hint-saturn");
  const hintSun = document.getElementById("hint-sun");

  const universeMessageModal =
    document.getElementById("universe-message-modal");

  const universeActionBtn =
    document.getElementById("universe-action-btn");

  const univBtnText =
    document.getElementById("univ-btn-text");

  /* History */
  const historySection =
    document.getElementById("history-changed-section");

  const historySpotlightBeam =
    document.getElementById("history-spotlight-beam");

  const historyContinueBtn =
    document.getElementById("history-continue-btn");

  /* Birthday */
  const birthdayReveal =
    document.getElementById("birthday-reveal");

  const birthdayFireworksVideo =
    document.getElementById("birthday-fireworks-video");

  const spotlightBeam =
    document.getElementById("spotlight-beam");

  const lensFlareSweep =
    document.getElementById("lens-flare-sweep");

  const roastCtaWrapper =
    document.getElementById("roast-cta-wrapper");

  const roastTransitionBtn =
    document.getElementById("roast-transition-btn");

  const birthdayNextBtn =
    document.getElementById("birthday-next-btn");

  /* Archives */
  const roastZone =
    document.getElementById("roast-zone");

  const openLetterBtn =
    document.getElementById("open-letter-btn");

  /* Clocks */
  const chinniiiWorldSection =
    document.getElementById("chinniii-world-section");

  /* Letter */
  const letterSection =
    document.getElementById("letter-section");

  const letterHeading =
    document.getElementById("letter-heading");

  const finishCtaWrapper =
    document.getElementById("finish-cta-wrapper");

  /* Finale */
  const grandCelebration =
    document.getElementById("grand-celebration");

  const finalReplayBtn =
    document.getElementById("final-replay-btn");

  const confettiCanvas =
    document.getElementById("confetti-canvas");

  const confettiCtx =
    confettiCanvas
      ? confettiCanvas.getContext("2d")
      : null;

  /* Birthday text */
  const textStep1 = document.getElementById("text-step-1");
  const textStep2 = document.getElementById("text-step-2");
  const textStep3 = document.getElementById("text-step-3");
  const textStep4 = document.getElementById("text-step-4");


  /* =========================================================================
     HELPERS
     ========================================================================= */

  const delay = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));


  /* =========================================================================
     STAGE MANAGER
     ========================================================================= */

  let currentStage = "INTRO";
  let isTransitioning = false;

  const STAGE_KEYS = {
    INTRO: "cinematic-text-intro",
    FRONT: "intro-curtain",
    UNIVERSE: "cosmic-universe",
    RUN: "chinniii-run-section",
    ORIGIN: "history-changed-section",
    BIRTHDAY: "birthday-reveal",
    ARCHIVES: "roast-zone",
    CLOCKS: "chinniii-world-section",
    LETTER: "letter-section",
    FINALE: "grand-celebration"
  };

  function hideAllStages() {

    Object.values(STAGE_KEYS).forEach(id => {

      const el = document.getElementById(id);

      if (!el) return;

      el.classList.add("hidden");

      el.classList.remove(
        "visible",
        "active",
        "active-curtain"
      );

      el.style.display = "none";
      el.style.opacity = "0";
      el.style.visibility = "hidden";
      el.style.pointerEvents = "none";
    });

    if (birthdayFireworksVideo) {
      birthdayFireworksVideo.pause();
    }
  }

  function enableCinematicMode() {

    document.documentElement.classList.add(
      "cinematic-lock"
    );

    document.body.classList.add(
      "cinematic-lock"
    );

    document.documentElement.classList.remove(
      "scroll-mode"
    );

    document.body.classList.remove(
      "scroll-mode"
    );

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }

  function enableScrollMode() {

    document.documentElement.classList.remove(
      "cinematic-lock"
    );

    document.body.classList.remove(
      "cinematic-lock"
    );

    document.documentElement.classList.add(
      "scroll-mode"
    );

    document.body.classList.add(
      "scroll-mode"
    );

    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }

  function showStage(stageKey) {

    const sectionId = STAGE_KEYS[stageKey];

    const targetEl =
      document.getElementById(sectionId);

    if (!targetEl) {
      console.error(
        "Stage not found:",
        stageKey,
        sectionId
      );
      return;
    }

    hideAllStages();

    currentStage = stageKey;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });

    const cinematicStages = [
      "INTRO",
      "FRONT",
      "UNIVERSE",
      "RUN",
      "ORIGIN",
      "BIRTHDAY"
    ];

    if (cinematicStages.includes(stageKey)) {
      enableCinematicMode();
    } else {
      enableScrollMode();
    }

    targetEl.classList.remove("hidden");

    targetEl.style.display =
      stageKey === "ARCHIVES" ||
      stageKey === "INTRO" ||
      stageKey === "FRONT" ||
      stageKey === "LETTER"
        ? "flex"
        : "block";

    targetEl.style.opacity = "1";
    targetEl.style.visibility = "visible";
    targetEl.style.pointerEvents = "auto";

    void targetEl.offsetWidth;

    targetEl.classList.add("visible");
  }


  /* =========================================================================
     AUDIO SYSTEM
     ========================================================================= */

  let isMuted =
    localStorage.getItem("chinni_music_muted") === "true";

  let activeThemeTrack = "main";

  function updateMusicBtnUI() {

    if (!musicToggleBtn) return;

    if (isMuted) {

      musicToggleBtn.classList.add("muted");

      if (musicIcon) {
        musicIcon.textContent = "🔇";
      }

      if (musicLabel) {
        musicLabel.textContent = "Music OFF";
      }

    } else {

      musicToggleBtn.classList.remove("muted");

      if (musicIcon) {
        musicIcon.textContent = "🎵";
      }

      if (musicLabel) {
        musicLabel.textContent = "Music ON";
      }
    }
  }

  function getTrackElement(trackName) {

    switch (trackName) {

      case "main":
        return mainAudio;

      case "universe":
        return universeAudio;

      case "run":
        return runAudio;

      case "letter":
        return letterAudio;

      default:
        return null;
    }
  }

  function stopAudioElement(audio) {

    if (!audio) return;

    audio.pause();

    try {
      audio.currentTime = 0;
    } catch (_) {}

    audio.volume = 0;
  }

  function stopAllThemeMusic() {

    [
      mainAudio,
      universeAudio,
      runAudio,
      letterAudio
    ].forEach(stopAudioElement);
  }

  function getThemeVolume(trackName) {

    if (trackName === "run") {
      return 0.8;
    }

    if (trackName === "letter") {
      return 0.75;
    }

    return 0.7;
  }

  function startThemeMusic(trackName) {

    stopAllThemeMusic();

    activeThemeTrack = trackName;

    if (
      trackName === "none" ||
      isMuted
    ) {
      return;
    }

    const audio =
      getTrackElement(trackName);

    if (!audio) {

      console.warn(
        `Audio element not found for "${trackName}".`
      );

      return;
    }

    audio.currentTime = 0;
    audio.volume =
      getThemeVolume(trackName);

    audio.play().catch(error => {

      console.log(
        `Audio waiting for user interaction: ${trackName}`,
        error
      );

    });
  }

  function resumeCurrentThemeMusic() {

    if (
      isMuted ||
      activeThemeTrack === "none"
    ) {
      return;
    }

    const audio =
      getTrackElement(activeThemeTrack);

    if (!audio) return;

    audio.volume =
      getThemeVolume(activeThemeTrack);

    audio.play().catch(() => {});
  }

  function playMainSong() {
    startThemeMusic("main");
  }

  function crossfadeToLetterSong() {
    startThemeMusic("letter");
  }

  function switchAudioTrack(trackName) {
    startThemeMusic(trackName);
  }

  function toggleMusic() {

    isMuted = !isMuted;

    localStorage.setItem(
      "chinni_music_muted",
      isMuted
    );

    updateMusicBtnUI();

    if (isMuted) {

      const audio =
        getTrackElement(activeThemeTrack);

      if (audio) {
        audio.pause();
        audio.volume = 0;
      }

    } else {

      resumeCurrentThemeMusic();
    }
  }

  updateMusicBtnUI();

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener(
      "click",
      toggleMusic
    );
  }


  /* =========================================================================
     THREE.JS — UNIVERSE
     ========================================================================= */

  let universeInitialized = false;

  let scene;
  let camera;
  let renderer;
  let composer;
  let bloomPass;

  let moonMesh;
  let venusMesh;
  let saturnMesh;
  let saturnRingsMesh;
  let sunMesh;
  let sunCoronaMesh;

  let sunDirectional;
  let sunPoint;

  let starField;
  let nebulaSprites = [];

  let signalMesh;
  let signalLight;

  let currentStep = "WIDE";

  let raycaster;
  let mouse;

  let targetCamPos =
    new THREE.Vector3(0, 0, 48);

  let targetLookAt =
    new THREE.Vector3(0, 0, -10);

  let currentCamLookAt =
    new THREE.Vector3(0, 0, -10);

  const planetPositionsDesktop = {
    MOON: new THREE.Vector3(-14, -3, 15),
    VENUS: new THREE.Vector3(-6, 4, 2),
    SATURN: new THREE.Vector3(16, 5, -25),
    SUN: new THREE.Vector3(22, -8, -65)
  };

  const planetPositionsMobile = {
    MOON: new THREE.Vector3(-2.5, 9, 15),
    VENUS: new THREE.Vector3(-3, 5, 2),
    SATURN: new THREE.Vector3(4, 2, -25),
    SUN: new THREE.Vector3(5, -14, -65)
  };

  const planetPositions = {
    MOON: new THREE.Vector3(-14, -3, 15),
    VENUS: new THREE.Vector3(-6, 4, 2),
    SATURN: new THREE.Vector3(16, 5, -25),
    SUN: new THREE.Vector3(22, -8, -65)
  };

  const cameraPosMapDesktop = {
    WIDE: new THREE.Vector3(0, 0, 48),
    MOON: new THREE.Vector3(-11, -2, 22),
    VENUS: new THREE.Vector3(-3, 4, 10),
    SATURN: new THREE.Vector3(11, 5, -14),
    SUN: new THREE.Vector3(16, -6, -42),
    FINAL: new THREE.Vector3(0, 0, 95)
  };

  const cameraPosMapMobile = {
    WIDE: new THREE.Vector3(0, 0, 52),
    MOON: new THREE.Vector3(-2.5, 9, 23),
    VENUS: new THREE.Vector3(-3, 5, 10),
    SATURN: new THREE.Vector3(4, 2, -14),
    SUN: new THREE.Vector3(5, -14, -42),
    FINAL: new THREE.Vector3(0, 0, 105)
  };

  const cameraPosMap = {
    WIDE: new THREE.Vector3(0, 0, 48),
    MOON: new THREE.Vector3(-11, -2, 22),
    VENUS: new THREE.Vector3(-3, 4, 10),
    SATURN: new THREE.Vector3(11, 5, -14),
    SUN: new THREE.Vector3(16, -6, -42),
    FINAL: new THREE.Vector3(0, 0, 95)
  };

  function updateResponsiveUniverse() {
    if (!renderer || !camera) return;

    const isMobile = window.innerWidth <= 768;

    camera.fov = isMobile ? 60 : 52;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.75 : 2));

    if (composer) {
      composer.setSize(window.innerWidth, window.innerHeight);
    }
    if (bloomPass && bloomPass.resolution) {
      bloomPass.resolution.set(window.innerWidth, window.innerHeight);
    }

    const posConfig = isMobile ? planetPositionsMobile : planetPositionsDesktop;
    const camConfig = isMobile ? cameraPosMapMobile : cameraPosMapDesktop;

    planetPositions.MOON.copy(posConfig.MOON);
    planetPositions.VENUS.copy(posConfig.VENUS);
    planetPositions.SATURN.copy(posConfig.SATURN);
    planetPositions.SUN.copy(posConfig.SUN);

    cameraPosMap.WIDE.copy(camConfig.WIDE);
    cameraPosMap.MOON.copy(camConfig.MOON);
    cameraPosMap.VENUS.copy(camConfig.VENUS);
    cameraPosMap.SATURN.copy(camConfig.SATURN);
    cameraPosMap.SUN.copy(camConfig.SUN);
    cameraPosMap.FINAL.copy(camConfig.FINAL);

    if (sunMesh) sunMesh.position.copy(planetPositions.SUN);
    if (saturnMesh) saturnMesh.position.copy(planetPositions.SATURN);
    if (venusMesh) venusMesh.position.copy(planetPositions.VENUS);
    if (moonMesh) moonMesh.position.copy(planetPositions.MOON);

    if (sunDirectional) sunDirectional.position.copy(planetPositions.SUN);
    if (sunPoint) sunPoint.position.copy(planetPositions.SUN);

    if (currentStep && cameraPosMap[currentStep]) {
      targetCamPos.copy(cameraPosMap[currentStep]);
      if (currentStep === "WIDE") {
        targetLookAt.set(0, 0, -10);
      } else if (currentStep === "FINAL") {
        targetLookAt.set(0, 0, 0);
      } else if (planetPositions[currentStep]) {
        targetLookAt.copy(planetPositions[currentStep]);
      }
    }

    updateHintBadgePositions();
  }


  /* =========================================================================
     UNIVERSE TEXTURES
     ========================================================================= */

  function createMoonTexture() {

    const canvas =
      document.createElement("canvas");

    canvas.width = 2048;
    canvas.height = 1024;

    const ctx =
      canvas.getContext("2d");

    ctx.fillStyle = "#a2a7b0";
    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    const mariaRegions = [
      { x: 500, y: 350, rx: 250, ry: 200 },
      { x: 800, y: 300, rx: 180, ry: 150 },
      { x: 1200, y: 400, rx: 300, ry: 220 },
      { x: 300, y: 450, rx: 200, ry: 160 },
      { x: 1500, y: 320, rx: 220, ry: 180 }
    ];

    mariaRegions.forEach(m => {

      const gradient =
        ctx.createRadialGradient(
          m.x,
          m.y,
          10,
          m.x,
          m.y,
          Math.max(m.rx, m.ry)
        );

      gradient.addColorStop(
        0,
        "rgba(42,45,52,.85)"
      );

      gradient.addColorStop(
        0.5,
        "rgba(55,60,70,.65)"
      );

      gradient.addColorStop(
        1,
        "rgba(162,167,176,0)"
      );

      ctx.fillStyle = gradient;

      ctx.beginPath();

      ctx.ellipse(
        m.x,
        m.y,
        m.rx,
        m.ry,
        Math.random() * Math.PI,
        0,
        Math.PI * 2
      );

      ctx.fill();
    });

    for (let i = 0; i < 1800; i++) {

      const x =
        Math.random() * canvas.width;

      const y =
        Math.random() * canvas.height;

      const radius =
        Math.random() * 35 + 2;

      const gradient =
        ctx.createRadialGradient(
          x,
          y,
          radius * 0.1,
          x,
          y,
          radius
        );

      gradient.addColorStop(
        0,
        "rgba(30,32,38,.8)"
      );

      gradient.addColorStop(
        0.7,
        "rgba(90,95,105,.5)"
      );

      gradient.addColorStop(
        0.9,
        "rgba(215,220,230,.7)"
      );

      gradient.addColorStop(
        1,
        "rgba(162,167,176,0)"
      );

      ctx.fillStyle = gradient;

      ctx.beginPath();

      ctx.arc(
        x,
        y,
        radius,
        0,
        Math.PI * 2
      );

      ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
  }

  function createMoonBumpMap() {

    const canvas =
      document.createElement("canvas");

    canvas.width = 1024;
    canvas.height = 512;

    const ctx =
      canvas.getContext("2d");

    ctx.fillStyle = "#808080";

    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    for (let i = 0; i < 1200; i++) {

      const x =
        Math.random() * canvas.width;

      const y =
        Math.random() * canvas.height;

      const r =
        Math.random() * 25 + 3;

      const gradient =
        ctx.createRadialGradient(
          x,
          y,
          0,
          x,
          y,
          r
        );

      gradient.addColorStop(
        0,
        "#000000"
      );

      gradient.addColorStop(
        0.75,
        "#606060"
      );

      gradient.addColorStop(
        0.9,
        "#ffffff"
      );

      gradient.addColorStop(
        1,
        "#808080"
      );

      ctx.fillStyle = gradient;

      ctx.beginPath();
      ctx.arc(
        x,
        y,
        r,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
  }

  function createVenusTexture() {

    const canvas =
      document.createElement("canvas");

    canvas.width = 1024;
    canvas.height = 512;

    const ctx =
      canvas.getContext("2d");

    const gradient =
      ctx.createLinearGradient(
        0,
        0,
        0,
        canvas.height
      );

    gradient.addColorStop(
      0,
      "#e6aa55"
    );

    gradient.addColorStop(
      0.3,
      "#f5c563"
    );

    gradient.addColorStop(
      0.6,
      "#d48d3b"
    );

    gradient.addColorStop(
      1,
      "#c27627"
    );

    ctx.fillStyle = gradient;

    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    for (let i = 0; i < 40; i++) {

      ctx.fillStyle =
        "rgba(255,235,190,.22)";

      ctx.beginPath();

      const y =
        Math.random() * canvas.height;

      ctx.ellipse(
        canvas.width / 2,
        y,
        canvas.width / 2,
        Math.random() * 30 + 10,
        0,
        0,
        Math.PI * 2
      );

      ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
  }

  function createSaturnTexture() {

    const canvas =
      document.createElement("canvas");

    canvas.width = 2048;
    canvas.height = 1024;

    const ctx =
      canvas.getContext("2d");

    const gradient =
      ctx.createLinearGradient(
        0,
        0,
        0,
        canvas.height
      );

    gradient.addColorStop(
      0,
      "#5e4e3b"
    );

    gradient.addColorStop(
      0.15,
      "#8c775d"
    );

    gradient.addColorStop(
      0.3,
      "#d4c09d"
    );

    gradient.addColorStop(
      0.45,
      "#eee0c4"
    );

    gradient.addColorStop(
      0.55,
      "#c0ae8c"
    );

    gradient.addColorStop(
      0.7,
      "#e6d6b5"
    );

    gradient.addColorStop(
      0.85,
      "#9e8a70"
    );

    gradient.addColorStop(
      1,
      "#4e3e2b"
    );

    ctx.fillStyle = gradient;

    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    for (let i = 0; i < 60; i++) {

      ctx.fillStyle =
        "rgba(255,240,210,.12)";

      ctx.beginPath();

      const y =
        Math.random() * canvas.height;

      ctx.ellipse(
        canvas.width / 2,
        y,
        canvas.width / 2,
        Math.random() * 20 + 5,
        0,
        0,
        Math.PI * 2
      );

      ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
  }

  function createSaturnRingsTexture() {

    const canvas =
      document.createElement("canvas");

    canvas.width = 512;
    canvas.height = 512;

    const ctx =
      canvas.getContext("2d");

    const center = 256;

    for (
      let radius = 50;
      radius < 240;
      radius++
    ) {

      const alpha =
        radius > 150 &&
        radius < 165
          ? 0.08
          : Math.random() * 0.55 + 0.35;

      ctx.strokeStyle =
        `rgba(235,215,175,${alpha})`;

      ctx.lineWidth = 1.8;

      ctx.beginPath();

      ctx.arc(
        center,
        center,
        radius,
        0,
        Math.PI * 2
      );

      ctx.stroke();
    }

    return new THREE.CanvasTexture(canvas);
  }

  function createSunTexture() {

    const canvas =
      document.createElement("canvas");

    canvas.width = 2048;
    canvas.height = 1024;

    const ctx =
      canvas.getContext("2d");

    ctx.fillStyle = "#ff8800";

    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    for (let i = 0; i < 600; i++) {

      const x =
        Math.random() * canvas.width;

      const y =
        Math.random() * canvas.height;

      const r =
        Math.random() * 45 + 10;

      const gradient =
        ctx.createRadialGradient(
          x,
          y,
          0,
          x,
          y,
          r
        );

      gradient.addColorStop(
        0,
        "#ffffff"
      );

      gradient.addColorStop(
        0.3,
        "#ffea70"
      );

      gradient.addColorStop(
        0.7,
        "#ff8800"
      );

      gradient.addColorStop(
        1,
        "rgba(255,60,0,0)"
      );

      ctx.fillStyle = gradient;

      ctx.beginPath();

      ctx.arc(
        x,
        y,
        r,
        0,
        Math.PI * 2
      );

      ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
  }

  function createSunCoronaTexture() {

    const canvas =
      document.createElement("canvas");

    canvas.width = 512;
    canvas.height = 512;

    const ctx =
      canvas.getContext("2d");

    const gradient =
      ctx.createRadialGradient(
        256,
        256,
        40,
        256,
        256,
        250
      );

    gradient.addColorStop(
      0,
      "rgba(255,255,255,1)"
    );

    gradient.addColorStop(
      0.2,
      "rgba(255,220,130,.85)"
    );

    gradient.addColorStop(
      0.5,
      "rgba(255,140,40,.4)"
    );

    gradient.addColorStop(
      0.8,
      "rgba(255,80,0,.15)"
    );

    gradient.addColorStop(
      1,
      "rgba(0,0,0,0)"
    );

    ctx.fillStyle = gradient;

    ctx.fillRect(
      0,
      0,
      512,
      512
    );

    return new THREE.CanvasTexture(canvas);
  }

  function createNebulaTexture(colorOne, colorTwo) {

    const canvas =
      document.createElement("canvas");

    canvas.width = 512;
    canvas.height = 512;

    const ctx =
      canvas.getContext("2d");

    for (let i = 0; i < 25; i++) {

      const x =
        256 +
        (Math.random() - 0.5) * 180;

      const y =
        256 +
        (Math.random() - 0.5) * 180;

      const r =
        Math.random() * 140 + 60;

      const gradient =
        ctx.createRadialGradient(
          x,
          y,
          0,
          x,
          y,
          r
        );

      gradient.addColorStop(
        0,
        colorOne
      );

      gradient.addColorStop(
        0.5,
        colorTwo
      );

      gradient.addColorStop(
        1,
        "rgba(0,0,0,0)"
      );

      ctx.fillStyle = gradient;

      ctx.beginPath();

      ctx.arc(
        x,
        y,
        r,
        0,
        Math.PI * 2
      );

      ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
  }


  /* =========================================================================
     INIT UNIVERSE
     ========================================================================= */

  function initThreeUniverse() {

    if (
      universeInitialized ||
      typeof THREE === "undefined" ||
      !universeWebglCanvas
    ) {
      return;
    }

    universeInitialized = true;

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      52,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.copy(
      cameraPosMap.WIDE
    );

    currentCamLookAt.set(
      0,
      0,
      -10
    );

    camera.lookAt(
      currentCamLookAt
    );

    renderer =
      new THREE.WebGLRenderer({
        canvas: universeWebglCanvas,
        antialias: true,
        alpha: false,
        powerPreference: "high-performance"
      });

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio,
        2
      )
    );

    if (
      typeof THREE.EffectComposer !== "undefined" &&
      typeof THREE.UnrealBloomPass !== "undefined"
    ) {

      composer =
        new THREE.EffectComposer(renderer);

      const renderPass =
        new THREE.RenderPass(
          scene,
          camera
        );

      composer.addPass(
        renderPass
      );

      bloomPass =
        new THREE.UnrealBloomPass(
          new THREE.Vector2(
            window.innerWidth,
            window.innerHeight
          ),
          0.7,
          0.4,
          0.85
        );

      composer.addPass(
        bloomPass
      );
    }

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();


    /* Lighting */

    sunDirectional =
      new THREE.DirectionalLight(
        0xfffaea,
        2.2
      );

    sunDirectional.position.copy(
      planetPositions.SUN
    );

    sunDirectional.target.position.set(
      0,
      0,
      0
    );

    scene.add(
      sunDirectional,
      sunDirectional.target
    );

    sunPoint =
      new THREE.PointLight(
        0xfff0cc,
        3.5,
        300
      );

    sunPoint.position.copy(
      planetPositions.SUN
    );

    scene.add(sunPoint);

    const fillLight =
      new THREE.DirectionalLight(
        0x404860,
        0.45
      );

    fillLight.position.set(
      0,
      10,
      40
    );

    scene.add(fillLight);

    const ambientLight =
      new THREE.AmbientLight(
        0x1a1d28,
        0.4
      );

    scene.add(ambientLight);


    /* Moon */

    const loader =
      new THREE.TextureLoader();

    let moonTexture;

    try {
      moonTexture =
        loader.load(
          "moon_map.jpg"
        );
    } catch (_) {
      moonTexture =
        createMoonTexture();
    }

    if (!moonTexture) {
      moonTexture =
        createMoonTexture();
    }

    const moonGeometry =
      new THREE.SphereGeometry(
        1.8,
        64,
        64
      );

    const moonMaterial =
      new THREE.MeshStandardMaterial({
        map: moonTexture,
        bumpMap: createMoonBumpMap(),
        bumpScale: 0.15,
        roughness: 0.85,
        metalness: 0.05,
        emissive: 0x181a20
      });

    moonMesh =
      new THREE.Mesh(
        moonGeometry,
        moonMaterial
      );

    moonMesh.position.copy(
      planetPositions.MOON
    );

    moonMesh.name = "MOON";

    scene.add(moonMesh);


    /* Venus */

    let venusTexture;

    try {
      venusTexture =
        loader.load(
          "venus_map.jpg"
        );
    } catch (_) {
      venusTexture =
        createVenusTexture();
    }

    if (!venusTexture) {
      venusTexture =
        createVenusTexture();
    }

    const venusGeometry =
      new THREE.SphereGeometry(
        1.4,
        64,
        64
      );

    const venusMaterial =
      new THREE.MeshStandardMaterial({
        map: venusTexture,
        roughness: 0.45,
        metalness: 0.15
      });

    venusMesh =
      new THREE.Mesh(
        venusGeometry,
        venusMaterial
      );

    venusMesh.position.copy(
      planetPositions.VENUS
    );

    venusMesh.name = "VENUS";

    scene.add(venusMesh);


    /* Saturn */

    const saturnGeometry =
      new THREE.SphereGeometry(
        2.4,
        64,
        64
      );

    const saturnMaterial =
      new THREE.MeshStandardMaterial({
        map: createSaturnTexture(),
        roughness: 0.6
      });

    saturnMesh =
      new THREE.Mesh(
        saturnGeometry,
        saturnMaterial
      );

    saturnMesh.position.copy(
      planetPositions.SATURN
    );

    saturnMesh.name = "SATURN";

    scene.add(saturnMesh);


    /* Saturn rings */

    const ringGeometry =
      new THREE.RingGeometry(
        3.4,
        6.4,
        96
      );

    const ringMaterial =
      new THREE.MeshStandardMaterial({
        map: createSaturnRingsTexture(),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85
      });

    saturnRingsMesh =
      new THREE.Mesh(
        ringGeometry,
        ringMaterial
      );

    saturnRingsMesh.rotation.x =
      Math.PI / 3.2;

    saturnMesh.add(
      saturnRingsMesh
    );


    /* Sun */

    const sunGeometry =
      new THREE.SphereGeometry(
        6,
        64,
        64
      );

    const sunMaterial =
      new THREE.MeshBasicMaterial({
        map: createSunTexture(),
        color: 0xffffff
      });

    sunMesh =
      new THREE.Mesh(
        sunGeometry,
        sunMaterial
      );

    sunMesh.position.copy(
      planetPositions.SUN
    );

    sunMesh.name = "SUN";

    scene.add(sunMesh);


    /* Sun corona */

    const coronaMaterial =
      new THREE.SpriteMaterial({
        map: createSunCoronaTexture(),
        transparent: true,
        blending: THREE.AdditiveBlending,
        opacity: 0.95
      });

    sunCoronaMesh =
      new THREE.Sprite(
        coronaMaterial
      );

    sunCoronaMesh.scale.set(
      38,
      38,
      1
    );

    sunMesh.add(
      sunCoronaMesh
    );


    /* Nebula */

    const nebulaColors = [
      {
        c1: "rgba(12,24,65,.4)",
        c2: "rgba(5,10,30,0)"
      },
      {
        c1: "rgba(35,12,55,.35)",
        c2: "rgba(15,5,25,0)"
      },
      {
        c1: "rgba(50,20,40,.25)",
        c2: "rgba(20,8,18,0)"
      },
      {
        c1: "rgba(45,32,12,.2)",
        c2: "rgba(18,12,5,0)"
      }
    ];

    nebulaColors.forEach(
      (item, index) => {

        const texture =
          createNebulaTexture(
            item.c1,
            item.c2
          );

        const material =
          new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
            blending:
              THREE.AdditiveBlending,
            opacity: 0.75
          });

        const sprite =
          new THREE.Sprite(
            material
          );

        sprite.scale.set(
          160,
          160,
          1
        );

        sprite.position.set(
          (
            index % 2 === 0
              ? -1
              : 1
          ) *
          (
            35 +
            index * 25
          ),
          index < 2 ? 15 : -15,
          -100 - index * 25
        );

        scene.add(sprite);

        nebulaSprites.push(
          sprite
        );
      }
    );


    /* Stars */

    const starCount = 3500;

    const starPositions =
      new Float32Array(
        starCount * 3
      );

    const starColors =
      new Float32Array(
        starCount * 3
      );

    for (
      let i = 0;
      i < starCount;
      i++
    ) {

      starPositions[i * 3] =
        (Math.random() - 0.5) * 450;

      starPositions[i * 3 + 1] =
        (Math.random() - 0.5) * 450;

      starPositions[i * 3 + 2] =
        (Math.random() - 0.5) * 450 - 30;

      const random =
        Math.random();

      const color =
        random > 0.85
          ? new THREE.Color(0xf5c563)
          : random > 0.6
            ? new THREE.Color(0xd0e0ff)
            : new THREE.Color(0xffffff);

      starColors[i * 3] =
        color.r;

      starColors[i * 3 + 1] =
        color.g;

      starColors[i * 3 + 2] =
        color.b;
    }

    const starsGeometry =
      new THREE.BufferGeometry();

    starsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        starPositions,
        3
      )
    );

    starsGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(
        starColors,
        3
      )
    );

    const starsMaterial =
      new THREE.PointsMaterial({
        size: 0.8,
        vertexColors: true,
        transparent: true,
        opacity: 0.75
      });

    starField =
      new THREE.Points(
        starsGeometry,
        starsMaterial
      );

    scene.add(
      starField
    );


    /* Cosmic signal */

    const signalGeometry =
      new THREE.SphereGeometry(
        0.35,
        16,
        16
      );

    const signalMaterial =
      new THREE.MeshBasicMaterial({
        color: 0xfff8e7
      });

    signalMesh =
      new THREE.Mesh(
        signalGeometry,
        signalMaterial
      );

    signalLight =
      new THREE.PointLight(
        0xf5c563,
        3,
        20
      );

    signalMesh.add(
      signalLight
    );

    signalMesh.visible = false;

    scene.add(
      signalMesh
    );

    updateResponsiveUniverse();

    animate3DUniverse();
  }


  function animate3DUniverse() {

    requestAnimationFrame(
      animate3DUniverse
    );

    if (
      !renderer ||
      !scene ||
      !camera
    ) {
      return;
    }

    const time =
      Date.now() * 0.0005;


    if (moonMesh) {
      moonMesh.rotation.y += 0.002;

      moonMesh.position.y =
        planetPositions.MOON.y +
        Math.sin(time * 1.5) * 0.15;
    }

    if (venusMesh) {
      venusMesh.rotation.y += 0.0015;

      venusMesh.position.y =
        planetPositions.VENUS.y +
        Math.cos(time * 1.2) * 0.2;
    }

    if (saturnMesh) {
      saturnMesh.rotation.y += 0.0018;

      saturnMesh.position.y =
        planetPositions.SATURN.y +
        Math.sin(time) * 0.18;
    }

    if (sunMesh) {
      sunMesh.rotation.y += 0.001;
    }


    if (
      currentStep === "WIDE"
    ) {

      targetCamPos.x =
        Math.sin(time * 0.4) * 1.5;

      targetCamPos.y =
        Math.cos(time * 0.3) * 1.2;
    }


    camera.position.lerp(
      targetCamPos,
      0.035
    );

    currentCamLookAt.lerp(
      targetLookAt,
      0.035
    );

    camera.lookAt(
      currentCamLookAt
    );

    updateHintBadgePositions();


    if (composer) {
      composer.render();
    } else {
      renderer.render(
        scene,
        camera
      );
    }
  }


  function updateHintBadgePositions() {

    if (
      !camera ||
      !renderer
    ) {
      return;
    }

    const hints = [
      {
        badge: hintMoon,
        pos: planetPositions.MOON
      },
      {
        badge: hintVenus,
        pos: planetPositions.VENUS
      },
      {
        badge: hintSaturn,
        pos: planetPositions.SATURN
      },
      {
        badge: hintSun,
        pos: planetPositions.SUN
      }
    ];

    const isMobile = window.innerWidth <= 768;
    const padding = isMobile ? 12 : 20;

    hints.forEach(
      ({ badge, pos }) => {

        if (
          !badge ||
          badge.classList.contains("hidden")
        ) {
          return;
        }

        const projected =
          pos.clone();

        projected.project(
          camera
        );

        let x =
          (
            projected.x * 0.5 +
            0.5
          ) *
          window.innerWidth;

        let y =
          (
            -projected.y * 0.5 +
            0.5
          ) *
          window.innerHeight;

        if (isMobile) {
          const badgeWidth = badge.offsetWidth || 160;
          const halfWidth = badgeWidth / 2;
          x = Math.max(halfWidth + padding, Math.min(window.innerWidth - halfWidth - padding, x));
          y = Math.max(50, Math.min(window.innerHeight - 70, y));
        }

        badge.style.left =
          `${x}px`;

        badge.style.top =
          `${y - 50}px`;
      }
    );
  }


  async function launchCosmicSignal(
    startPos,
    endPos
  ) {

    if (!signalMesh) return;

    signalMesh.position.copy(
      startPos
    );

    signalMesh.visible = true;

    const duration = 2200;

    const startTime =
      Date.now();

    const midPoint =
      new THREE.Vector3()
        .addVectors(
          startPos,
          endPos
        )
        .multiplyScalar(0.5);

    midPoint.y += 4;

    while (
      Date.now() - startTime <
      duration
    ) {

      const progress =
        (
          Date.now() -
          startTime
        ) /
        duration;

      const t =
        Math.min(
          progress,
          1
        );

      const x =
        (1 - t) *
          (1 - t) *
          startPos.x +
        2 *
          (1 - t) *
          t *
          midPoint.x +
        t *
          t *
          endPos.x;

      const y =
        (1 - t) *
          (1 - t) *
          startPos.y +
        2 *
          (1 - t) *
          t *
          midPoint.y +
        t *
          t *
          endPos.y;

      const z =
        (1 - t) *
          (1 - t) *
          startPos.z +
        2 *
          (1 - t) *
          t *
          midPoint.z +
        t *
          t *
          endPos.z;

      signalMesh.position.set(
        x,
        y,
        z
      );

      targetLookAt.copy(
        signalMesh.position
      );

      await delay(16);
    }

    signalMesh.visible = false;
  }


  /* =========================================================================
     UNIVERSE STORY
     ========================================================================= */

  function startRealisticUniverse() {

    startThemeMusic(
      "universe"
    );

    initThreeUniverse();

    currentStep = "WIDE";

    targetCamPos.copy(
      cameraPosMap.WIDE
    );

    targetLookAt.set(
      0,
      0,
      -10
    );

    if (starField) {
      starField.material.opacity = 0.85;
    }

    nebulaSprites.forEach(
      sprite => {
        sprite.material.opacity = 0.75;
      }
    );

    if (sunMesh) {
      sunMesh.visible = true;
    }

    if (moonMesh) {
      moonMesh.visible = true;
    }

    if (venusMesh) {
      venusMesh.visible = true;
    }

    if (saturnMesh) {
      saturnMesh.visible = true;
    }

    showStepHint(
      "MOON"
    );
  }


  function showStepHint(step) {

    [
      hintMoon,
      hintVenus,
      hintSaturn,
      hintSun
    ].forEach(
      badge => {
        if (badge) {
          badge.classList.add("hidden");
        }
      }
    );

    if (
      step === "MOON" &&
      hintMoon
    ) {
      hintMoon.classList.remove(
        "hidden"
      );
    }

    if (
      step === "VENUS" &&
      hintVenus
    ) {
      hintVenus.classList.remove(
        "hidden"
      );
    }

    if (
      step === "SATURN" &&
      hintSaturn
    ) {
      hintSaturn.classList.remove(
        "hidden"
      );
    }

    if (
      step === "SUN" &&
      hintSun
    ) {
      hintSun.classList.remove(
        "hidden"
      );
    }
  }


  async function openPlanetModal(
    label,
    lines,
    buttonText,
    onButtonClick
  ) {

    if (!universeMessageModal) {
      return;
    }

    const labelElement =
      document.getElementById(
        "univ-label"
      );

    const lineElements = [
      document.getElementById(
        "univ-line-1"
      ),
      document.getElementById(
        "univ-line-2"
      ),
      document.getElementById(
        "univ-line-3"
      ),
      document.getElementById(
        "univ-line-4"
      )
    ];

    if (labelElement) {

      labelElement.textContent =
        label || "";

      labelElement.classList.remove(
        "visible"
      );
    }

    lineElements.forEach(
      line => {

        if (!line) return;

        line.textContent = "";

        line.classList.remove(
          "visible",
          "final-emphasis"
        );
      }
    );

    if (universeActionBtn) {

      universeActionBtn.classList.remove(
        "visible"
      );
    }

    universeMessageModal.classList.remove(
      "hidden",
      "exiting"
    );

    void universeMessageModal.offsetWidth;

    universeMessageModal.classList.add(
      "active"
    );

    await delay(300);

    if (
      labelElement &&
      label
    ) {

      labelElement.classList.add(
        "visible"
      );

      await delay(350);
    }

    for (
      let i = 0;
      i < lines.length;
      i++
    ) {

      const line =
        lineElements[i];

      if (
        line &&
        lines[i]
      ) {

        line.textContent =
          lines[i];

        if (
          i === lines.length - 1
        ) {

          line.classList.add(
            "final-emphasis"
          );
        }

        line.classList.add(
          "visible"
        );

        await delay(350);
      }
    }

    await delay(350);

    if (univBtnText) {
      univBtnText.textContent =
        buttonText;
    }

    if (universeActionBtn) {

      universeActionBtn.classList.add(
        "visible"
      );

      const handleAction =
        async () => {

          universeActionBtn.removeEventListener(
            "click",
            handleAction
          );

          universeActionBtn.classList.remove(
            "visible"
          );

          universeMessageModal.classList.remove(
            "active"
          );

          universeMessageModal.classList.add(
            "exiting"
          );

          await delay(850);

          universeMessageModal.classList.add(
            "hidden"
          );

          universeMessageModal.classList.remove(
            "exiting"
          );

          if (onButtonClick) {
            onButtonClick();
          }
        };

      universeActionBtn.addEventListener(
        "click",
        handleAction
      );
    }
  }


  async function triggerMoonSequence() {

    currentStep = "MOON";

    targetCamPos.copy(
      cameraPosMap.MOON
    );

    targetLookAt.copy(
      planetPositions.MOON
    );

    showStepHint(null);

    await openPlanetModal(
      "THE MOON",
      [
        "🌙 Moon: Nannu chusi andaru wow antaru 😌",
        "Abhii: Maa friend ni chusava?",
        "Moon: Sare bro… nenu vellostha 😭😂"
      ],
      "CONTINUE JOURNEY →",
      async () => {

        await launchCosmicSignal(
          planetPositions.MOON,
          planetPositions.VENUS
        );

        currentStep = "VENUS";

        targetCamPos.copy(
          cameraPosMap.VENUS
        );

        targetLookAt.copy(
          planetPositions.VENUS
        );

        showStepHint(
          "VENUS"
        );
      }
    );
  }


  async function triggerVenusSequence() {

    currentStep = "VENUS";

    targetCamPos.copy(
      cameraPosMap.VENUS
    );

    targetLookAt.copy(
      planetPositions.VENUS
    );

    showStepHint(null);

    await openPlanetModal(
      "VENUS",
      [
        "💗Venus: Nene beauty ki symbol 😌",
        "Abhii: Aaagu Aaagu… Maa Chinnii photo chupistha✨",
        "💗Venus: Oddu bro… na confidence pothundi 😭💀",
      ],
      "CONTINUE JOURNEY →",
      async () => {

        await launchCosmicSignal(
          planetPositions.VENUS,
          planetPositions.SATURN
        );

        currentStep = "SATURN";

        targetCamPos.copy(
          cameraPosMap.SATURN
        );

        targetLookAt.copy(
          planetPositions.SATURN
        );

        showStepHint(
          "SATURN"
        );
      }
    );
  }


  async function triggerSaturnSequence() {

    currentStep = "SATURN";

    targetCamPos.copy(
      cameraPosMap.SATURN
    );

    targetLookAt.copy(
      planetPositions.SATURN
    );

    showStepHint(null);

    await openPlanetModal(
      "SATURN",
      [
        "🪐 Saturn: Naa daggara 140+ moons unnayi 😎",
        "Abhii: Maa Chinnii ki 140+ moods swings unnayi💀",
        "Saturn: Fair enough 💀😂"
      ],
      "CONTINUE JOURNEY →",
      async () => {

        await launchCosmicSignal(
          planetPositions.SATURN,
          planetPositions.SUN
        );

        currentStep = "SUN";

        targetCamPos.copy(
          cameraPosMap.SUN
        );

        targetLookAt.copy(
          planetPositions.SUN
        );

        showStepHint(
          "SUN"
        );
      }
    );
  }


  async function triggerSunSequence() {

    currentStep = "SUN";

    targetCamPos.copy(
      cameraPosMap.SUN
    );

    targetLookAt.copy(
      planetPositions.SUN
    );

    showStepHint(null);

    await openPlanetModal(
      "THE SUN",
      [
        "Some people make everything around them feel a little brighter.",
        "Your energy does that.",
        "Your laughter, your craziness, and the way you make ordinary moments fun...",
        "You carry your own kind of sunshine. ☀️"
      ],
      "REVEAL FULL UNIVERSE →",
      async () => {

        currentStep = "FINAL";

        targetCamPos.copy(
          cameraPosMap.FINAL
        );

        targetLookAt.set(
          0,
          0,
          0
        );

        await delay(1200);

        triggerFinalUniverseSequence();
      }
    );
  }


  async function triggerFinalUniverseSequence() {

    await openPlanetModal(
      "THE UNIVERSE",
      [
        "Maybe you're not just a part of the universe...",
        "Maybe you have your own universe inside you.",
        "That's what makes you Chinniii. ❤️",
        "Ready to continue her story?"
      ],
      "CONTINUE →",
      () => {

        console.log(
          "UNIVERSE COMPLETE"
        );

        enterRunStage();
      }
    );
  }


  if (hintMoon) {
    hintMoon.addEventListener(
      "click",
      triggerMoonSequence
    );
  }

  if (hintVenus) {
    hintVenus.addEventListener(
      "click",
      triggerVenusSequence
    );
  }

  if (hintSaturn) {
    hintSaturn.addEventListener(
      "click",
      triggerSaturnSequence
    );
  }

  if (hintSun) {
    hintSun.addEventListener(
      "click",
      triggerSunSequence
    );
  }


  /* =========================================================================
     ORIGIN
     ========================================================================= */

  function startHistorySectionSequence() {

    startThemeMusic(
      "main"
    );

    showStage(
      "ORIGIN"
    );

    if (blackCurtain) {
      blackCurtain.classList.add(
        "active"
      );
    }

    setTimeout(() => {

      if (blackCurtain) {
        blackCurtain.classList.remove(
          "active"
        );
      }

      const chapterTag =
        document.getElementById(
          "hist-chapter-tag"
        );

      const ctaWrapper =
        document.getElementById(
          "hist-cta-wrapper"
        );

      const hist1 =
        document.getElementById(
          "hist-step-1"
        );

      const hist2 =
        document.getElementById(
          "hist-step-2"
        );

      const hist3 =
        document.getElementById(
          "hist-step-3"
        );

      const hist4 =
        document.getElementById(
          "hist-step-4"
        );

      const hist5 =
        document.getElementById(
          "hist-step-5"
        );

      const hist6 =
        document.getElementById(
          "hist-step-6"
        );


      setTimeout(() => {

        if (chapterTag) {
          chapterTag.classList.add(
            "text-visible"
          );
        }

        if (hist1) {
          hist1.classList.add(
            "text-visible"
          );
        }

      }, 300);


      setTimeout(() => {

        if (hist2) {
          hist2.classList.add(
            "text-visible"
          );
        }

      }, 1400);


      setTimeout(() => {

        if (hist3) {
          hist3.classList.add(
            "text-visible"
          );
        }

      }, 2600);


      setTimeout(() => {

        if (hist4) {
          hist4.classList.add(
            "text-visible"
          );
        }

      }, 3800);


      setTimeout(() => {

        if (historySpotlightBeam) {
          historySpotlightBeam.classList.add(
            "sweep-active"
          );
        }

        const s1 =
          document.getElementById(
            "hist-step-suspense-1"
          );

        const s2 =
          document.getElementById(
            "hist-step-suspense-2"
          );

        const s3 =
          document.getElementById(
            "hist-step-suspense-3"
          );

        if (s1) {
          s1.classList.add(
            "text-visible"
          );
        }

        setTimeout(() => {

          if (s2) {
            s2.classList.add(
              "text-visible"
            );
          }

        }, 1000);


        setTimeout(() => {

          if (s3) {
            s3.classList.add(
              "text-visible"
            );
          }

        }, 2200);

      }, 5000);


      setTimeout(() => {

        if (hist5) {
          hist5.classList.add(
            "text-visible"
          );
        }

      }, 8400);


      setTimeout(() => {

        if (hist6) {
          hist6.classList.add(
            "text-visible"
          );
        }

      }, 9600);


      setTimeout(() => {

        if (ctaWrapper) {
          ctaWrapper.classList.add(
            "visible"
          );
        }

      }, 10800);

    }, 700);
  }


  /* =========================================================================
     BIRTHDAY
     ========================================================================= */

  function startBirthdayTextSequence() {

    const elements = [
      textStep1,
      textStep2,
      textStep3,
      textStep4
    ];

    elements.forEach(
      element => {

        if (!element) return;

        element.classList.remove(
          "text-visible",
          "text-fade-out"
        );

        element.style.opacity = "0";
        element.style.visibility = "visible";
        element.style.transform =
          "translateY(25px)";

        element.style.filter =
          "blur(8px)";
      }
    );

    if (roastCtaWrapper) {

      roastCtaWrapper.classList.remove(
        "visible"
      );

      roastCtaWrapper.style.opacity =
        "0";

      roastCtaWrapper.style.visibility =
        "visible";
    }


    setTimeout(() => {

      if (textStep1) {
        textStep1.classList.add(
          "text-visible"
        );
      }

    }, 500);


    setTimeout(() => {

      if (textStep2) {
        textStep2.classList.add(
          "text-visible"
        );
      }

    }, 1500);


    setTimeout(() => {

      if (textStep3) {
        textStep3.classList.add(
          "text-visible"
        );
      }

    }, 2700);


    setTimeout(() => {

      if (textStep4) {
        textStep4.classList.add(
          "text-visible"
        );
      }

    }, 3900);


    setTimeout(() => {

      if (roastCtaWrapper) {
        roastCtaWrapper.classList.add(
          "visible"
        );
      }

    }, 5200);


    if (spotlightBeam) {
      spotlightBeam.classList.add(
        "sweep-active"
      );
    }

    if (lensFlareSweep) {
      lensFlareSweep.classList.add(
        "flare-active"
      );
    }
  }


  function transitionHistoryToBirthday() {

    if (blackCurtain) {
      blackCurtain.classList.add(
        "active"
      );
    }

    setTimeout(() => {

      showStage(
        "BIRTHDAY"
      );

      if (blackCurtain) {
        blackCurtain.classList.remove(
          "active"
        );
      }

      startThemeMusic(
        "main"
      );

      if (birthdayFireworksVideo) {

        birthdayFireworksVideo.currentTime =
          0;

        birthdayFireworksVideo.muted =
          true;

        birthdayFireworksVideo.play()
          .catch(() => {});
      }

      initCanvas();
      createParticles();
      animateParticles();

      startBirthdayTextSequence();

    }, 800);
  }


  /* =========================================================================
     RUN GAME
     ========================================================================= */

  const chinniiiRunSection =
    document.getElementById(
      "chinniii-run-section"
    );

  const runCountdownOverlay =
    document.getElementById(
      "run-countdown-overlay"
    );

  const countdownNumber =
    document.getElementById(
      "countdown-number"
    );

  const runGameViewport =
    document.getElementById(
      "run-game-viewport"
    );

  const runGameCanvas =
    document.getElementById(
      "run-game-canvas"
    );

  const hudDistance =
    document.getElementById(
      "hud-distance"
    );

  const hudCakes =
    document.getElementById(
      "hud-cakes"
    );

  const hudGifts =
    document.getElementById(
      "hud-gifts"
    );

  const hudHearts =
    document.getElementById(
      "hud-hearts"
    );

  const hudChaos =
    document.getElementById(
      "hud-chaos"
    );

  const runToastMsg =
    document.getElementById(
      "run-toast-msg"
    );

  const runDistanceBanner =
    document.getElementById(
      "run-distance-banner"
    );

  const runCompleteModal =
    document.getElementById(
      "run-complete-modal"
    );

  const runContinueBtn =
    document.getElementById(
      "run-continue-btn"
    );


  let runScene;
  let runCamera;
  let runRenderer;
  let runCharacter;
  let runRoad;
  let runMoon;

  let runObjects = [];

  let runAnimFrameId = null;

  let runInitialized = false;

  let laneIndex = 1;

  const LANE_X = [
    -3.2,
    0,
    3.2
  ];

  let targetCharacterX = 0;

  let runDistance = 0;
  let cakesCount = 0;
  let giftsCount = 0;
  let heartsCount = 0;
  let chaosLevel = 0;

  let isGameActive = false;
  let gameFinished = false;


  function enterRunStage() {

    startThemeMusic(
      "run"
    );

    hideAllStages();

    if (!chinniiiRunSection) {
      console.error(
        "Run section not found."
      );
      return;
    }

    chinniiiRunSection.classList.remove(
      "hidden"
    );

    chinniiiRunSection.classList.add(
      "visible"
    );

    chinniiiRunSection.style.display =
      "block";

    chinniiiRunSection.style.visibility =
      "visible";

    chinniiiRunSection.style.opacity =
      "1";

    chinniiiRunSection.style.pointerEvents =
      "auto";

    currentStage =
      "RUN";

    enableCinematicMode();

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });

    startRunOnly();
  }


  function startRunOnly() {

    if (!runGameViewport) return;

    runGameViewport.classList.remove(
      "hidden"
    );

    runGameViewport.style.display =
      "block";

    runGameViewport.style.visibility =
      "visible";

    runGameViewport.style.opacity =
      "1";

    if (runCompleteModal) {
      runCompleteModal.classList.add(
        "hidden"
      );
    }

    initThreeRunGame();

    startChinniiiRunCountdown();
  }


  function startChinniiiRunIntroSequence() {
    enterRunStage();
  }


  function startChinniiiRunCountdown() {

    if (!runCountdownOverlay) {
      startChinniiiRunGame();
      return;
    }

    runCountdownOverlay.classList.remove(
      "hidden"
    );

    let count = 3;

    if (countdownNumber) {
      countdownNumber.textContent =
        count;
    }

    const interval =
      setInterval(() => {

        count--;

        if (count === 2) {

          if (countdownNumber) {
            countdownNumber.textContent =
              "2";
          }

        } else if (count === 1) {

          if (countdownNumber) {
            countdownNumber.textContent =
              "1";
          }

        } else if (count === 0) {

          if (countdownNumber) {
            countdownNumber.textContent =
              "RUN! 🏃‍♀️";
          }

        } else {

          clearInterval(
            interval
          );

          runCountdownOverlay.classList.add(
            "hidden"
          );

          startChinniiiRunGame();
        }

      }, 850);
  }


  function showToast(message) {

    if (!runToastMsg) return;

    runToastMsg.textContent =
      message;

    runToastMsg.classList.remove(
      "hidden"
    );

    setTimeout(() => {

      runToastMsg.classList.add(
        "hidden"
      );

    }, 1800);
  }


  function showDistanceBanner(message) {

    if (!runDistanceBanner) return;

    runDistanceBanner.textContent =
      message;

    runDistanceBanner.classList.remove(
      "hidden"
    );

    setTimeout(() => {

      runDistanceBanner.classList.add(
        "hidden"
      );

    }, 2500);
  }


  function initThreeRunGame() {

    if (
      runInitialized ||
      typeof THREE === "undefined" ||
      !runGameCanvas
    ) {
      return;
    }

    runInitialized = true;

    runScene =
      new THREE.Scene();

    runScene.background =
      new THREE.Color(0x040408);

    runScene.fog =
      new THREE.FogExp2(
        0x040408,
        0.014
      );


    runCamera =
      new THREE.PerspectiveCamera(
        55,
        window.innerWidth /
          window.innerHeight,
        0.1,
        1000
      );

    runCamera.position.set(
      0,
      3.6,
      9.5
    );

    runCamera.lookAt(
      0,
      1.2,
      -15
    );


    runRenderer =
      new THREE.WebGLRenderer({
        canvas: runGameCanvas,
        antialias: true
      });

    runRenderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    runRenderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio,
        2
      )
    );


    const ambientLight =
      new THREE.AmbientLight(
        0x282c3c,
        0.7
      );

    runScene.add(
      ambientLight
    );


    const directionalLight =
      new THREE.DirectionalLight(
        0xfff5dd,
        1.8
      );

    directionalLight.position.set(
      10,
      20,
      10
    );

    runScene.add(
      directionalLight
    );


    const pinkLight =
      new THREE.PointLight(
        0xff758c,
        2.5,
        40
      );

    pinkLight.position.set(
      -6,
      5,
      -10
    );

    runScene.add(
      pinkLight
    );


    const goldLight =
      new THREE.PointLight(
        0xf5c563,
        2.5,
        40
      );

    goldLight.position.set(
      6,
      5,
      -10
    );

    runScene.add(
      goldLight
    );


    /* Road */

    const roadGeometry =
      new THREE.PlaneGeometry(
        12,
        300
      );

    const roadMaterial =
      new THREE.MeshStandardMaterial({
        color: 0x10121a,
        roughness: 0.4,
        metalness: 0.3
      });

    runRoad =
      new THREE.Mesh(
        roadGeometry,
        roadMaterial
      );

    runRoad.rotation.x =
      -Math.PI / 2;

    runRoad.position.set(
      0,
      0,
      -140
    );

    runScene.add(
      runRoad
    );


    /* Road details */

    for (
      let z = 10;
      z > -290;
      z -= 12
    ) {

      [-1.6, 1.6]
        .forEach(x => {

          const stripeGeometry =
            new THREE.PlaneGeometry(
              0.12,
              4
            );

          const stripeMaterial =
            new THREE.MeshBasicMaterial({
              color: 0xf5c563,
              transparent: true,
              opacity: 0.6
            });

          const stripe =
            new THREE.Mesh(
              stripeGeometry,
              stripeMaterial
            );

          stripe.rotation.x =
            -Math.PI / 2;

          stripe.position.set(
            x,
            0.02,
            z
          );

          runScene.add(
            stripe
          );
        });


      [-5.5, 5.5]
        .forEach(x => {

          const poleGeometry =
            new THREE.CylinderGeometry(
              0.08,
              0.08,
              6,
              8
            );

          const poleMaterial =
            new THREE.MeshStandardMaterial({
              color: 0x333848,
              roughness: 0.3
            });

          const pole =
            new THREE.Mesh(
              poleGeometry,
              poleMaterial
            );

          pole.position.set(
            x,
            3,
            z
          );

          runScene.add(
            pole
          );


          const lampGeometry =
            new THREE.SphereGeometry(
              0.35,
              16,
              16
            );

          const lampMaterial =
            new THREE.MeshBasicMaterial({
              color: 0xffea9f
            });

          const lamp =
            new THREE.Mesh(
              lampGeometry,
              lampMaterial
            );

          lamp.position.set(
            x +
              (
                x > 0
                  ? -0.4
                  : 0.4
              ),
            5.8,
            z
          );

          runScene.add(
            lamp
          );
        });
    }


    /* Moon */

    const moonGeometry =
      new THREE.SphereGeometry(
        6,
        32,
        32
      );

    const moonMaterial =
      new THREE.MeshBasicMaterial({
        color: 0xfffae8
      });

    runMoon =
      new THREE.Mesh(
        moonGeometry,
        moonMaterial
      );

    runMoon.position.set(
      -25,
      20,
      -180
    );

    runScene.add(
      runMoon
    );


    /* Runner */

    const characterGroup =
      new THREE.Group();

    const bodyGeometry =
      new THREE.CylinderGeometry(
        0.4,
        0.25,
        1.6,
        16
      );

    const bodyMaterial =
      new THREE.MeshStandardMaterial({
        color: 0xf5c563,
        roughness: 0.3,
        metalness: 0.2,
        emissive: 0x332200
      });

    const body =
      new THREE.Mesh(
        bodyGeometry,
        bodyMaterial
      );

    body.position.y =
      1.1;

    characterGroup.add(
      body
    );


    const headGeometry =
      new THREE.SphereGeometry(
        0.4,
        16,
        16
      );

    const headMaterial =
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.2,
        emissive: 0x222222
      });

    const head =
      new THREE.Mesh(
        headGeometry,
        headMaterial
      );

    head.position.y =
      2.1;

    characterGroup.add(
      head
    );


    const crownGeometry =
      new THREE.ConeGeometry(
        0.35,
        0.4,
        5
      );

    const crownMaterial =
      new THREE.MeshBasicMaterial({
        color: 0xf5c563
      });

    const crown =
      new THREE.Mesh(
        crownGeometry,
        crownMaterial
      );

    crown.rotation.x =
      Math.PI;

    crown.position.set(
      0,
      2.55,
      0
    );

    characterGroup.add(
      crown
    );


    runCharacter =
      characterGroup;

    runCharacter.position.set(
      0,
      0,
      4
    );

    runScene.add(
      runCharacter
    );


    /* Keyboard */

    window.addEventListener(
      "keydown",
      event => {

        if (!isGameActive) return;

        if (
          event.key === "ArrowLeft" ||
          event.key === "a" ||
          event.key === "A"
        ) {

          laneIndex =
            Math.max(
              0,
              laneIndex - 1
            );

        } else if (
          event.key === "ArrowRight" ||
          event.key === "d" ||
          event.key === "D"
        ) {

          laneIndex =
            Math.min(
              2,
              laneIndex + 1
            );
        }
      }
    );


    /* Touch */

    let touchStartX = 0;

    window.addEventListener(
      "touchstart",
      event => {

        if (!isGameActive) return;

        touchStartX =
          event.touches[0].clientX;
      },
      { passive: true }
    );

    window.addEventListener(
      "touchend",
      event => {

        if (!isGameActive) return;

        const touchEndX =
          event.changedTouches[0].clientX;

        const diff =
          touchEndX -
          touchStartX;

        if (
          Math.abs(diff) > 30
        ) {

          if (diff < 0) {

            laneIndex =
              Math.max(
                0,
                laneIndex - 1
              );

          } else {

            laneIndex =
              Math.min(
                2,
                laneIndex + 1
              );
          }
        }
      },
      { passive: true }
    );
  }


  function createRunItem(
    type,
    lane,
    zPosition
  ) {

    if (!runScene) return;

    const group =
      new THREE.Group();

    group.userData = {
      type,
      lane
    };

    group.position.set(
      LANE_X[lane],
      0,
      zPosition
    );


    if (type === "CAKE") {

      const cakeGeometry =
        new THREE.CylinderGeometry(
          0.55,
          0.55,
          0.6,
          16
        );

      const cakeMaterial =
        new THREE.MeshStandardMaterial({
          color: 0xff758c,
          roughness: 0.3
        });

      const cake =
        new THREE.Mesh(
          cakeGeometry,
          cakeMaterial
        );

      cake.position.y =
        0.6;

      group.add(
        cake
      );


      const candleGeometry =
        new THREE.CylinderGeometry(
          0.06,
          0.06,
          0.4,
          8
        );

      const candleMaterial =
        new THREE.MeshBasicMaterial({
          color: 0xffffaa
        });

      const candle =
        new THREE.Mesh(
          candleGeometry,
          candleMaterial
        );

      candle.position.set(
        0,
        1.05,
        0
      );

      group.add(
        candle
      );

    } else if (type === "GIFT") {

      const boxGeometry =
        new THREE.BoxGeometry(
          0.8,
          0.8,
          0.8
        );

      const boxMaterial =
        new THREE.MeshStandardMaterial({
          color: 0xf5c563,
          roughness: 0.3
        });

      const box =
        new THREE.Mesh(
          boxGeometry,
          boxMaterial
        );

      box.position.y =
        0.6;

      group.add(
        box
      );

    } else if (type === "HEART") {

      const heartGeometry =
        new THREE.SphereGeometry(
          0.45,
          16,
          16
        );

      const heartMaterial =
        new THREE.MeshBasicMaterial({
          color: 0xff3366
        });

      const heart =
        new THREE.Mesh(
          heartGeometry,
          heartMaterial
        );

      heart.position.y =
        1;

      group.add(
        heart
      );

    } else if (type === "CROWN") {

      const crownGeometry =
        new THREE.ConeGeometry(
          0.6,
          0.6,
          5
        );

      const crownMaterial =
        new THREE.MeshBasicMaterial({
          color: 0xffd700
        });

      const crown =
        new THREE.Mesh(
          crownGeometry,
          crownMaterial
        );

      crown.rotation.x =
        Math.PI;

      crown.position.y =
        1.2;

      group.add(
        crown
      );

    } else if (type === "OBSTACLE_PHONE") {

      const phoneGeometry =
        new THREE.BoxGeometry(
          0.6,
          1.2,
          0.15
        );

      const phoneMaterial =
        new THREE.MeshStandardMaterial({
          color: 0x222233
        });

      const phone =
        new THREE.Mesh(
          phoneGeometry,
          phoneMaterial
        );

      phone.position.y =
        0.8;

      group.add(
        phone
      );

    } else if (type === "OBSTACLE_BRAIN") {

      const brainGeometry =
        new THREE.SphereGeometry(
          0.6,
          16,
          16
        );

      const brainMaterial =
        new THREE.MeshStandardMaterial({
          color: 0xffb3c1
        });

      const brain =
        new THREE.Mesh(
          brainGeometry,
          brainMaterial
        );

      brain.position.y =
        0.8;

      group.add(
        brain
      );
    }

    runScene.add(
      group
    );

    runObjects.push(
      group
    );
  }


  function spawnRunObjectsAhead() {

    const types = [
      "CAKE",
      "GIFT",
      "HEART",
      "OBSTACLE_PHONE",
      "OBSTACLE_BRAIN",
      "CROWN"
    ];

    const lane =
      Math.floor(
        Math.random() * 3
      );

    const type =
      types[
        Math.floor(
          Math.random() *
          types.length
        )
      ];

    const zPosition =
      -120 -
      Math.random() * 30;

    createRunItem(
      type,
      lane,
      zPosition
    );
  }


  function startChinniiiRunGame() {

    runDistance = 0;
    cakesCount = 0;
    giftsCount = 0;
    heartsCount = 0;
    chaosLevel = 0;
    laneIndex = 1;
    isGameActive = true;
    gameFinished = false;

    runObjects.forEach(
      object => {

        if (runScene) {
          runScene.remove(
            object
          );
        }
      }
    );

    runObjects = [];


    for (
      let i = 0;
      i < 12;
      i++
    ) {

      spawnRunObjectsAhead();
    }

    animateRunGame();
  }


  function animateRunGame() {

    if (
      !isGameActive &&
      !gameFinished
    ) {
      return;
    }


    if (
      isGameActive &&
      runDistance < 2026
    ) {

      runDistance += 2.2;

      if (hudDistance) {
        hudDistance.textContent =
          `${Math.floor(runDistance)} m`;
      }

      if (hudCakes) {
        hudCakes.textContent =
          cakesCount;
      }

      if (hudGifts) {
        hudGifts.textContent =
          giftsCount;
      }

      if (hudHearts) {
        hudHearts.textContent =
          heartsCount;
      }

      if (hudChaos) {
        hudChaos.textContent =
          chaosLevel;
      }

      const roundedDistance =
        Math.floor(runDistance);

      if (
        roundedDistance === 500
      ) {
        showDistanceBanner(
          "Something feels different..."
        );
      }

      if (
        roundedDistance === 1000
      ) {
        showDistanceBanner(
          "More surprises ahead..."
        );
      }

      if (
        roundedDistance === 1500
      ) {
        showDistanceBanner(
          "Almost there, Chinniii..."
        );
      }

      if (
        roundedDistance === 2000
      ) {
        showDistanceBanner(
          "Final destination in sight..."
        );
      }

    } else if (
      runDistance >= 2026 &&
      isGameActive
    ) {

      isGameActive = false;
      gameFinished = true;

      finishChinniiiRun();

      return;
    }


    targetCharacterX =
      LANE_X[laneIndex];

    if (runCharacter) {

      runCharacter.position.x +=
        (
          targetCharacterX -
          runCharacter.position.x
        ) *
        0.2;

      runCharacter.rotation.z =
        (
          runCharacter.position.x -
          targetCharacterX
        ) *
        0.1;

      runCharacter.position.y =
        Math.abs(
          Math.sin(
            Date.now() * 0.012
          )
        ) *
        0.2;
    }


    for (
      let i = runObjects.length - 1;
      i >= 0;
      i--
    ) {

      const object =
        runObjects[i];

      object.position.z +=
        isGameActive
          ? 0.75
          : 0.2;

      object.rotation.y +=
        0.03;


      if (
        isGameActive &&
        Math.abs(
          object.position.z - 4
        ) < 1.2 &&
        object.userData.lane ===
          laneIndex
      ) {

        const type =
          object.userData.type;


        if (type === "CAKE") {

          cakesCount++;

          showToast(
            "+1 BIRTHDAY CAKE 🎂"
          );

        } else if (
          type === "GIFT"
        ) {

          giftsCount++;

          showToast(
            "+1 SURPRISE 🎁"
          );

        } else if (
          type === "HEART"
        ) {

          heartsCount++;

          showToast(
            "+1 SPECIAL MEMORY ❤️"
          );

        } else if (
          type === "CROWN"
        ) {

          chaosLevel +=
            100;

          showToast(
            "+100 CHAOS POINTS 👑 THE QUEEN HAS ARRIVED"
          );

        } else if (
          type.startsWith(
            "OBSTACLE"
          )
        ) {

          chaosLevel++;

          showToast(
            "Chinniii.exe crashed 💀 Restarting chaos mode..."
          );
        }

        runScene.remove(
          object
        );

        runObjects.splice(
          i,
          1
        );

        spawnRunObjectsAhead();

        continue;
      }


      if (
        object.position.z > 15
      ) {

        runScene.remove(
          object
        );

        runObjects.splice(
          i,
          1
        );

        if (isGameActive) {
          spawnRunObjectsAhead();
        }
      }
    }


    if (
      runRenderer &&
      runScene &&
      runCamera
    ) {

      runRenderer.render(
        runScene,
        runCamera
      );
    }

    runAnimFrameId =
      requestAnimationFrame(
        animateRunGame
      );
  }


  function finishChinniiiRun() {

    if (runAnimFrameId) {

      cancelAnimationFrame(
        runAnimFrameId
      );

      runAnimFrameId = null;
    }

    const finalCakes =
      document.getElementById(
        "final-cakes"
      );

    const finalGifts =
      document.getElementById(
        "final-gifts"
      );

    const finalHearts =
      document.getElementById(
        "final-hearts"
      );

    if (finalCakes) {
      finalCakes.textContent =
        cakesCount;
    }

    if (finalGifts) {
      finalGifts.textContent =
        giftsCount;
    }

    if (finalHearts) {
      finalHearts.textContent =
        heartsCount;
    }

    setTimeout(() => {

      if (runCompleteModal) {
        runCompleteModal.classList.remove(
          "hidden"
        );
      }

    }, 900);
  }


  /* =========================================================================
     ARCHIVES
     ========================================================================= */

  function showGalleryStage() {

    console.log(
      "BIRTHDAY → ARCHIVES"
    );

    if (birthdayFireworksVideo) {
      birthdayFireworksVideo.pause();
    }

    stopAllThemeMusic();

    startThemeMusic(
      "main"
    );

    if (birthdayReveal) {

      birthdayReveal.classList.add(
        "hidden"
      );

      birthdayReveal.classList.remove(
        "visible"
      );

      birthdayReveal.style.display =
        "none";

      birthdayReveal.style.visibility =
        "hidden";

      birthdayReveal.style.opacity =
        "0";

      birthdayReveal.style.pointerEvents =
        "none";
    }


    if (roastZone) {

      roastZone.classList.remove(
        "hidden"
      );

      roastZone.classList.add(
        "visible"
      );

      roastZone.style.display =
        "flex";

      roastZone.style.visibility =
        "visible";

      roastZone.style.opacity =
        "1";

      roastZone.style.pointerEvents =
        "auto";
    }


    currentStage =
      "ARCHIVES";

    enableScrollMode();

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }


  /* =========================================================================
     CLOCK WORLD
     ========================================================================= */

  const cwAlarmModal =
    document.getElementById(
      "cw-alarm-modal"
    );

  const alarmModalClose =
    document.getElementById(
      "alarm-modal-close"
    );

  const alarmClockName =
    document.getElementById(
      "alarm-clock-name"
    );

  const alarmTitleText =
    document.getElementById(
      "alarm-title-text"
    );

  const pickerHourEl =
    document.getElementById(
      "picker-hour"
    );

  const pickerMinEl =
    document.getElementById(
      "picker-min"
    );

  const ampmAmBtn =
    document.getElementById(
      "ampm-am"
    );

  const ampmPmBtn =
    document.getElementById(
      "ampm-pm"
    );

  const hourUpBtn =
    document.getElementById(
      "hour-up"
    );

  const hourDownBtn =
    document.getElementById(
      "hour-down"
    );

  const minUpBtn =
    document.getElementById(
      "min-up"
    );

  const minDownBtn =
    document.getElementById(
      "min-down"
    );

  const setAlarmConfirmBtn =
    document.getElementById(
      "set-alarm-confirm-btn"
    );


  const cwFunnyModal =
    document.getElementById(
      "cw-funny-modal"
    );

  const editorialDialogueContainer =
    document.getElementById(
      "editorial-dialogue-container"
    );

  const alarmScheduledSummary =
    document.getElementById(
      "alarm-scheduled-summary"
    );

  const confirmedAlarmTime =
    document.getElementById(
      "confirmed-alarm-time"
    );

  const revealMusicPlayerBtn =
    document.getElementById(
      "reveal-music-player-btn"
    );


  const cwMusicModal =
    document.getElementById(
      "cw-music-modal"
    );

  const musicModalClose =
    document.getElementById(
      "music-modal-close"
    );

  const albumArtDisc =
    document.getElementById(
      "album-art-disc"
    );

  const cwTrackTitle =
    document.getElementById(
      "cw-track-title"
    );

  const cwTrackArtist =
    document.getElementById(
      "cw-track-artist"
    );

  const cwProgressFill =
    document.getElementById(
      "cw-progress-fill"
    );

  const trackTimeCurr =
    document.getElementById(
      "track-time-curr"
    );

  const trackTimeDur =
    document.getElementById(
      "track-time-dur"
    );

  const musicPlayBtn =
    document.getElementById(
      "music-play-btn"
    );

  const musicPrevBtn =
    document.getElementById(
      "music-prev-btn"
    );

  const musicNextBtn =
    document.getElementById(
      "music-next-btn"
    );

  const musicHeartBtn =
    document.getElementById(
      "music-heart-btn"
    );

  const musicChangeTrackBtn =
    document.getElementById(
      "music-change-track-btn"
    );

  const trackSelectorOverlay =
    document.getElementById(
      "track-selector-overlay"
    );

  const closeTrackSelectorBtn =
    document.getElementById(
      "close-track-selector-btn"
    );


  const cwMemoryModal =
    document.getElementById(
      "cw-memory-modal"
    );

  const memoryModalClose =
    document.getElementById(
      "memory-modal-close"
    );

  const finishClock2Btn =
    document.getElementById(
      "finish-clock-2-btn"
    );


  const cwShivaModal =
    document.getElementById(
      "cw-shiva-modal"
    );

  const shivaModalClose =
    document.getElementById(
      "shiva-modal-close"
    );

  const finishClock3Btn =
    document.getElementById(
      "finish-clock-3-btn"
    );


  const cwFinaleModal =
    document.getElementById(
      "cw-finale-modal"
    );

  const finaleModalClose =
    document.getElementById(
      "finale-modal-close"
    );

  const editorialCakeContainer =
    document.getElementById(
      "editorial-cake-container"
    );

  const finaleReplayMomentBtn =
    document.getElementById(
      "finale-replay-moment-btn"
    );

  const finaleReplayBtn =
    document.getElementById(
      "finale-replay-btn"
    );

  const finaleChronicleBtn =
    document.getElementById(
      "finale-chronicle-btn"
    );


  const cwReplayBtn =
    document.getElementById(
      "cw-replay-btn"
    );

  const cwContinueChronicleBtn =
    document.getElementById(
      "cw-continue-chronicle-btn"
    );


  let cwUnlockedLevel =
    parseInt(
      localStorage.getItem(
        "chinni_cw_unlocked"
      ) || "1",
      10
    );


  let cwAlarms;

  try {

    cwAlarms =
      JSON.parse(
        localStorage.getItem(
          "chinni_cw_alarms"
        ) ||
        '{"1":"07:30 PM","2":"08:00 PM","3":"09:15 PM","4":"11:59 PM"}'
      );

  } catch (_) {

    cwAlarms = {
      1: "07:30 PM",
      2: "08:00 PM",
      3: "09:15 PM",
      4: "11:59 PM"
    };
  }


  let cwProgress;

  try {

    cwProgress =
      JSON.parse(
        localStorage.getItem(
          "chinni_cw_progress"
        ) ||
        '{"1":false,"2":false,"3":false,"4":false}'
      );

  } catch (_) {

    cwProgress = {
      1: false,
      2: false,
      3: false,
      4: false
    };
  }


  let activeClockTarget = 1;

  let pickerHourVal = 7;
  let pickerMinVal = 30;
  let pickerAmpmVal = "PM";


  /* Clock 1 internal player */

  const cwAudioPlayer =
    new Audio();

  let cwCurrentTrackIndex = 0;

  const cwTracksList = [
    {
      title: "Chinniii Special",
      artist: "Birthday Edition",
      src: "music/chinni-special.mp3"
    },
    {
      title: "Birthday Mood",
      artist: "Good Vibes Only",
      src: "music/birthday-mood.mp3"
    },
    {
      title: "Good Vibes",
      artist: "Chinniii Chill",
      src: "music/good-vibes.mp3"
    },
    {
      title: "One More Song",
      artist: "Letter Soundtrack",
      src: "music/letter-song.mp3"
    }
  ];


  function showChinniiiWorldStage() {

    console.log(
      "STAGE → CLOCKS"
    );

    showStage(
      "CLOCKS"
    );

    startThemeMusic(
      "main"
    );

    updateClockCardsUI();

    startAnalogClockTicking();

    setupCard3DTilt();
  }


  function startChinniiiWorldSequence() {

    showChinniiiWorldStage();

    initCwDustCanvas();
  }


  let clockTickInterval =
    null;


  function startAnalogClockTicking() {

    if (clockTickInterval) {

      clearInterval(
        clockTickInterval
      );
    }

    function tick() {

      const now =
        new Date();

      const hours =
        now.getHours();

      const minutes =
        now.getMinutes();

      const seconds =
        now.getSeconds();


      for (
        let i = 1;
        i <= 4;
        i++
      ) {

        const hourHand =
          document.getElementById(
            `hand-hour-${i}`
          );

        const minuteHand =
          document.getElementById(
            `hand-minute-${i}`
          );

        const secondHand =
          document.getElementById(
            `hand-second-${i}`
          );


        if (hourHand) {

          hourHand.style.transform =
            `rotate(${
              (
                hours % 12 +
                minutes / 60
              ) * 30
            }deg)`;
        }


        if (minuteHand) {

          minuteHand.style.transform =
            `rotate(${
              (
                minutes +
                seconds / 60
              ) * 6
            }deg)`;
        }


        if (secondHand) {

          secondHand.style.transform =
            `rotate(${
              seconds * 6
            }deg)`;
        }
      }
    }


    tick();

    clockTickInterval =
      setInterval(
        tick,
        1000
      );
  }


  let cwDustAnimationId =
    null;


  function initCwDustCanvas() {

    const cwDustCanvas =
      document.getElementById(
        "cw-dust-canvas"
      );

    if (
      !cwDustCanvas ||
      !chinniiiWorldSection
    ) {
      return;
    }

    const ctx =
      cwDustCanvas.getContext(
        "2d"
      );

    cwDustCanvas.width =
      chinniiiWorldSection.clientWidth;

    cwDustCanvas.height =
      chinniiiWorldSection.clientHeight;

    const dust = [];

    for (
      let i = 0;
      i < 35;
      i++
    ) {

      dust.push({
        x:
          Math.random() *
          cwDustCanvas.width,

        y:
          Math.random() *
          cwDustCanvas.height,

        r:
          Math.random() * 2 +
          0.5,

        alpha:
          Math.random() * 0.5 +
          0.2,

        dx:
          (Math.random() - 0.5) *
          0.3,

        dy:
          (Math.random() - 0.5) *
          0.3
      });
    }


    function renderDust() {

      ctx.clearRect(
        0,
        0,
        cwDustCanvas.width,
        cwDustCanvas.height
      );

      dust.forEach(
        particle => {

          particle.x +=
            particle.dx;

          particle.y +=
            particle.dy;


          if (
            particle.x < 0
          ) {

            particle.x =
              cwDustCanvas.width;
          }

          if (
            particle.x >
            cwDustCanvas.width
          ) {

            particle.x = 0;
          }

          if (
            particle.y < 0
          ) {

            particle.y =
              cwDustCanvas.height;
          }

          if (
            particle.y >
            cwDustCanvas.height
          ) {

            particle.y = 0;
          }


          ctx.fillStyle =
            `rgba(212,175,55,${particle.alpha})`;

          ctx.beginPath();

          ctx.arc(
            particle.x,
            particle.y,
            particle.r,
            0,
            Math.PI * 2
          );

          ctx.fill();
        }
      );

      cwDustAnimationId =
        requestAnimationFrame(
          renderDust
        );
    }


    if (cwDustAnimationId) {

      cancelAnimationFrame(
        cwDustAnimationId
      );
    }

    renderDust();
  }


  function updateClockCardsUI() {

    for (
      let i = 1;
      i <= 4;
      i++
    ) {

      const card =
        document.getElementById(
          `clock-card-${i}`
        );

      const digitalTime =
        document.getElementById(
          `digital-time-${i}`
        );

      const alarmBadge =
        document.getElementById(
          `alarm-badge-${i}`
        );

      const statusPill =
        document.getElementById(
          `status-pill-${i}`
        );


      if (
        cwAlarms[i] &&
        digitalTime
      ) {

        digitalTime.textContent =
          cwAlarms[i];
      }


      if (
        cwAlarms[i] &&
        alarmBadge
      ) {

        alarmBadge.classList.remove(
          "hidden"
        );
      }


      if (card) {

        const unlocked =
          i <= cwUnlockedLevel;

        card.style.opacity =
          unlocked
            ? "1"
            : "0.45";

        card.style.pointerEvents =
          unlocked
            ? "auto"
            : "none";
      }


      if (
        statusPill &&
        cwProgress[i]
      ) {

        statusPill.textContent =
          "COMPLETED";

        statusPill.className =
          "clock-status-pill status-ready";
      }
    }
  }


  function setupCard3DTilt() {

    if (
      window.innerWidth <= 992
    ) {
      return;
    }

    const cards =
      document.querySelectorAll(
        ".cw-clock-card"
      );

    const rotations = {
      1: -2,
      2: 1.5,
      3: -1,
      4: 2
    };


    cards.forEach(
      card => {

        const clockNumber =
          card.getAttribute(
            "data-clock"
          );

        const baseRotation =
          rotations[clockNumber] ||
          0;


        card.onmousemove =
          event => {

            const rect =
              card.getBoundingClientRect();

            const x =
              event.clientX -
              rect.left -
              rect.width / 2;

            const y =
              event.clientY -
              rect.top -
              rect.height / 2;

            const tiltX =
              (-y / rect.height) *
              12;

            const tiltY =
              (x / rect.width) *
              12;


            card.style.transform =
              `perspective(1000px)
               rotateX(${tiltX}deg)
               rotateY(${tiltY}deg)
               rotate(${baseRotation}deg)
               scale(1.02)`;
          };


        card.onmouseleave =
          () => {

            card.style.transform =
              `perspective(1000px)
               rotateX(0deg)
               rotateY(0deg)
               rotate(${baseRotation}deg)
               scale(1)`;
          };
      }
    );
  }


  function openAlarmPickerModal(
    clockId
  ) {

    activeClockTarget =
      clockId;


    if (alarmClockName) {

      alarmClockName.textContent =
        `CLOCK 0${clockId}`;
    }


    if (alarmTitleText) {

      const titles = {

        1:
          "SET AN ALARM FOR CHINNIII",

        2:
          "WHEN SHOULD THE MEMORY WAKE UP?",

        3:
          "SET TIME FOR MAHADEV'S BLESSING",

        4:
          "SET TIME FOR THE FINAL SURPRISE"
      };

      alarmTitleText.textContent =
        titles[clockId] ||
        "SET AN ALARM FOR CHINNIII";
    }


    pickerHourVal = 7;
    pickerMinVal = 30;
    pickerAmpmVal = "PM";

    updateTimePickerDisplay();


    if (cwAlarmModal) {

      cwAlarmModal.classList.remove(
        "hidden"
      );
    }
  }


  function updateTimePickerDisplay() {

    if (pickerHourEl) {

      pickerHourEl.textContent =
        pickerHourVal < 10
          ? `0${pickerHourVal}`
          : `${pickerHourVal}`;
    }


    if (pickerMinEl) {

      pickerMinEl.textContent =
        pickerMinVal < 10
          ? `0${pickerMinVal}`
          : `${pickerMinVal}`;
    }


    if (
      ampmAmBtn &&
      ampmPmBtn
    ) {

      if (
        pickerAmpmVal === "AM"
      ) {

        ampmAmBtn.classList.add(
          "active"
        );

        ampmPmBtn.classList.remove(
          "active"
        );

      } else {

        ampmPmBtn.classList.add(
          "active"
        );

        ampmAmBtn.classList.remove(
          "active"
        );
      }
    }
  }


  document
    .querySelectorAll(
      ".cw-clock-card"
    )
    .forEach(
      card => {

        card.addEventListener(
          "click",
          () => {

            const clockId =
              parseInt(
                card.getAttribute(
                  "data-clock"
                ),
                10
              );

            if (
              clockId >
              cwUnlockedLevel
            ) {
              return;
            }

            openAlarmPickerModal(
              clockId
            );
          }
        );
      }
    );


  if (hourUpBtn) {

    hourUpBtn.addEventListener(
      "click",
      () => {

        pickerHourVal =
          pickerHourVal >= 12
            ? 1
            : pickerHourVal + 1;

        updateTimePickerDisplay();
      }
    );
  }


  if (hourDownBtn) {

    hourDownBtn.addEventListener(
      "click",
      () => {

        pickerHourVal =
          pickerHourVal <= 1
            ? 12
            : pickerHourVal - 1;

        updateTimePickerDisplay();
      }
    );
  }


  if (minUpBtn) {

    minUpBtn.addEventListener(
      "click",
      () => {

        pickerMinVal =
          (
            pickerMinVal +
            5
          ) %
          60;

        updateTimePickerDisplay();
      }
    );
  }


  if (minDownBtn) {

    minDownBtn.addEventListener(
      "click",
      () => {

        pickerMinVal =
          (
            pickerMinVal -
            5 +
            60
          ) %
          60;

        updateTimePickerDisplay();
      }
    );
  }


  if (ampmAmBtn) {

    ampmAmBtn.addEventListener(
      "click",
      () => {

        pickerAmpmVal =
          "AM";

        updateTimePickerDisplay();
      }
    );
  }


  if (ampmPmBtn) {

    ampmPmBtn.addEventListener(
      "click",
      () => {

        pickerAmpmVal =
          "PM";

        updateTimePickerDisplay();
      }
    );
  }


  if (alarmModalClose) {

    alarmModalClose.addEventListener(
      "click",
      () => {

        if (cwAlarmModal) {

          cwAlarmModal.classList.add(
            "hidden"
          );
        }
      }
    );
  }


  if (setAlarmConfirmBtn) {

    setAlarmConfirmBtn.addEventListener(
      "click",
      () => {

        const formattedTime =
          `${pickerHourVal < 10 ? "0" : ""}${pickerHourVal}:` +
          `${pickerMinVal < 10 ? "0" : ""}${pickerMinVal} ` +
          pickerAmpmVal;


        cwAlarms[
          activeClockTarget
        ] = formattedTime;


        localStorage.setItem(
          "chinni_cw_alarms",
          JSON.stringify(
            cwAlarms
          )
        );


        updateClockCardsUI();


        if (cwAlarmModal) {

          cwAlarmModal.classList.add(
            "hidden"
          );
        }


        setTimeout(
          () => {

            if (
              activeClockTarget === 1
            ) {
              triggerClock1Sequence(
                formattedTime
              );
            }

            if (
              activeClockTarget === 2
            ) {
              triggerClock2Sequence(
                formattedTime
              );
            }

            if (
              activeClockTarget === 3
            ) {
              triggerClock3Sequence(
                formattedTime
              );
            }

            if (
              activeClockTarget === 4
            ) {
              triggerClock4Sequence(
                formattedTime
              );
            }

          },
          400
        );
      }
    );
  }


  /* =========================================================================
     CLOCK 1
     ========================================================================= */

  async function triggerClock1Sequence(
    timeString
  ) {

    if (!cwFunnyModal) return;

    cwFunnyModal.classList.remove(
      "hidden"
    );

    if (editorialDialogueContainer) {

      editorialDialogueContainer.innerHTML =
        "";
    }

    if (alarmScheduledSummary) {

      alarmScheduledSummary.classList.add(
        "hidden"
      );
    }


    const lines = [

      {
        speaker: "CHINNIII",
        text:
          "Wait... why am I setting an alarm? 😂"
      },

      {
        speaker: "SYSTEM",
        text:
          "Because apparently birthday surprises need appointments."
      },

      {
        speaker: "CHINNIII",
        text:
          "Okay... but what happens when it rings?"
      },

      {
        speaker: "SYSTEM",
        text:
          "That's classified."
      },

      {
        speaker: "CHINNIII",
        text:
          "Bruh."
      },

      {
        speaker: "SYSTEM",
        text:
          "Alarm successfully scheduled. 😌"
      }
    ];


    for (
      let i = 0;
      i < lines.length;
      i++
    ) {

      const item =
        lines[i];

      const line =
        document.createElement(
          "div"
        );

      line.className =
        `editorial-dialogue-line speaker-${item.speaker.toLowerCase()}`;


      line.innerHTML = `
        <span class="speaker-label">
          ${item.speaker}
        </span>

        <span class="speech-text">
          "${item.text}"
        </span>
      `;


      if (editorialDialogueContainer) {

        editorialDialogueContainer.appendChild(
          line
        );
      }


      await delay(200);

      line.classList.add(
        "visible"
      );

      await delay(1000);
    }


    if (confirmedAlarmTime) {

      confirmedAlarmTime.textContent =
        timeString;
    }

    if (alarmScheduledSummary) {

      alarmScheduledSummary.classList.remove(
        "hidden"
      );
    }
  }


  /* =========================================================================
     CLOCK 1 MUSIC PLAYER
     ========================================================================= */

  function playCwTrack(index) {

    const track =
      cwTracksList[index];

    if (!track) return;

    cwCurrentTrackIndex =
      index;


    if (cwTrackTitle) {
      cwTrackTitle.textContent =
        track.title;
    }

    if (cwTrackArtist) {
      cwTrackArtist.textContent =
        track.artist;
    }


    const activeThemeAudio =
      getTrackElement(
        activeThemeTrack
      );

    if (activeThemeAudio) {
      activeThemeAudio.pause();
    }


    cwAudioPlayer.src =
      track.src;

    cwAudioPlayer.currentTime =
      0;

    cwAudioPlayer.loop =
      false;


    if (!isMuted) {

      cwAudioPlayer.play()
        .catch(() => {});

      if (albumArtDisc) {

        albumArtDisc.classList.add(
          "playing"
        );
      }

      if (musicPlayBtn) {

        musicPlayBtn.textContent =
          "⏸";
      }
    }
  }


  function formatAudioTime(
    seconds
  ) {

    if (!Number.isFinite(seconds)) {
      return "0:00";
    }

    const minutes =
      Math.floor(
        seconds / 60
      );

    const secs =
      Math.floor(
        seconds % 60
      );

    return (
      `${minutes}:` +
      `${secs < 10 ? "0" : ""}${secs}`
    );
  }


  cwAudioPlayer.addEventListener(
    "timeupdate",
    () => {

      if (!cwAudioPlayer.duration) {
        return;
      }

      const progress =
        (
          cwAudioPlayer.currentTime /
          cwAudioPlayer.duration
        ) *
        100;


      if (cwProgressFill) {

        cwProgressFill.style.width =
          `${progress}%`;
      }


      if (trackTimeCurr) {

        trackTimeCurr.textContent =
          formatAudioTime(
            cwAudioPlayer.currentTime
          );
      }


      if (trackTimeDur) {

        trackTimeDur.textContent =
          formatAudioTime(
            cwAudioPlayer.duration
          );
      }
    }
  );


  cwAudioPlayer.addEventListener(
    "ended",
    () => {

      if (albumArtDisc) {

        albumArtDisc.classList.remove(
          "playing"
        );
      }

      if (musicPlayBtn) {

        musicPlayBtn.textContent =
          "▶";
      }
    }
  );


  if (musicPlayBtn) {

    musicPlayBtn.addEventListener(
      "click",
      () => {

        if (
          cwAudioPlayer.paused
        ) {

          cwAudioPlayer.play()
            .catch(() => {});

          if (albumArtDisc) {

            albumArtDisc.classList.add(
              "playing"
            );
          }

          musicPlayBtn.textContent =
            "⏸";

        } else {

          cwAudioPlayer.pause();

          if (albumArtDisc) {

            albumArtDisc.classList.remove(
              "playing"
            );
          }

          musicPlayBtn.textContent =
            "▶";
        }
      }
    );
  }


  if (musicPrevBtn) {

    musicPrevBtn.addEventListener(
      "click",
      () => {

        playCwTrack(
          (
            cwCurrentTrackIndex -
            1 +
            cwTracksList.length
          ) %
          cwTracksList.length
        );
      }
    );
  }


  if (musicNextBtn) {

    musicNextBtn.addEventListener(
      "click",
      () => {

        playCwTrack(
          (
            cwCurrentTrackIndex +
            1
          ) %
          cwTracksList.length
        );
      }
    );
  }


  if (musicChangeTrackBtn) {

    musicChangeTrackBtn.addEventListener(
      "click",
      () => {

        if (trackSelectorOverlay) {

          trackSelectorOverlay.classList.remove(
            "hidden"
          );
        }
      }
    );
  }


  if (closeTrackSelectorBtn) {

    closeTrackSelectorBtn.addEventListener(
      "click",
      () => {

        if (trackSelectorOverlay) {

          trackSelectorOverlay.classList.add(
            "hidden"
          );
        }
      }
    );
  }


  document
    .querySelectorAll(
      ".track-option"
    )
    .forEach(
      option => {

        option.addEventListener(
          "click",
          () => {

            document
              .querySelectorAll(
                ".track-option"
              )
              .forEach(
                item => {
                  item.classList.remove(
                    "active"
                  );
                }
              );


            option.classList.add(
              "active"
            );


            const trackNumber =
              parseInt(
                option.getAttribute(
                  "data-track"
                ),
                10
              ) - 1;


            playCwTrack(
              trackNumber
            );


            if (
              trackSelectorOverlay
            ) {

              trackSelectorOverlay.classList.add(
                "hidden"
              );
            }
          }
        );
      }
    );


  if (musicModalClose) {

    musicModalClose.addEventListener(
      "click",
      () => {

        cwAudioPlayer.pause();

        if (albumArtDisc) {

          albumArtDisc.classList.remove(
            "playing"
          );
        }

        if (musicPlayBtn) {

          musicPlayBtn.textContent =
            "▶";
        }

        if (cwMusicModal) {

          cwMusicModal.classList.add(
            "hidden"
          );
        }

        resumeCurrentThemeMusic();
      }
    );
  }


  if (revealMusicPlayerBtn) {

    revealMusicPlayerBtn.addEventListener(
      "click",
      () => {

        if (cwFunnyModal) {

          cwFunnyModal.classList.add(
            "hidden"
          );
        }

        cwProgress[1] =
          true;

        cwUnlockedLevel =
          Math.max(
            cwUnlockedLevel,
            2
          );

        localStorage.setItem(
          "chinni_cw_progress",
          JSON.stringify(
            cwProgress
          )
        );

        localStorage.setItem(
          "chinni_cw_unlocked",
          String(
            cwUnlockedLevel
          )
        );

        updateClockCardsUI();


        if (cwMusicModal) {

          cwMusicModal.classList.remove(
            "hidden"
          );
        }

        playCwTrack(
          0
        );
      }
    );
  }


  /* =========================================================================
     CLOCK 2
     ========================================================================= */

  function triggerClock2Sequence() {

    if (cwMemoryModal) {

      cwMemoryModal.classList.remove(
        "hidden"
      );
    }
  }


  if (memoryModalClose) {

    memoryModalClose.addEventListener(
      "click",
      () => {

        if (cwMemoryModal) {

          cwMemoryModal.classList.add(
            "hidden"
          );
        }
      }
    );
  }


  if (finishClock2Btn) {

    finishClock2Btn.addEventListener(
      "click",
      () => {

        if (cwMemoryModal) {

          cwMemoryModal.classList.add(
            "hidden"
          );
        }

        cwProgress[2] =
          true;

        cwUnlockedLevel =
          Math.max(
            cwUnlockedLevel,
            3
          );

        localStorage.setItem(
          "chinni_cw_progress",
          JSON.stringify(
            cwProgress
          )
        );

        localStorage.setItem(
          "chinni_cw_unlocked",
          String(
            cwUnlockedLevel
          )
        );

        updateClockCardsUI();
      }
    );
  }


  /* =========================================================================
     CLOCK 3
     ========================================================================= */

  async function triggerClock3Sequence() {

    if (!cwShivaModal) {
      return;
    }

    cwShivaModal.classList.remove(
      "hidden"
    );


    const shivaLines = [
      document.getElementById(
        "shiva-line-1"
      ),
      document.getElementById(
        "shiva-line-2"
      ),
      document.getElementById(
        "shiva-line-3"
      ),
      document.getElementById(
        "shiva-line-4"
      ),
      document.getElementById(
        "shiva-line-5"
      )
    ];


    shivaLines.forEach(
      line => {

        if (line) {

          line.classList.remove(
            "visible"
          );
        }
      }
    );


    for (
      let i = 0;
      i < shivaLines.length;
      i++
    ) {

      const line =
        shivaLines[i];

      if (!line) continue;

      await delay(500);

      line.classList.add(
        "visible"
      );

      await delay(1200);
    }
  }


  if (shivaModalClose) {

    shivaModalClose.addEventListener(
      "click",
      () => {

        if (cwShivaModal) {

          cwShivaModal.classList.add(
            "hidden"
          );
        }
      }
    );
  }


  if (finishClock3Btn) {

    finishClock3Btn.addEventListener(
      "click",
      () => {

        if (cwShivaModal) {

          cwShivaModal.classList.add(
            "hidden"
          );
        }

        cwProgress[3] =
          true;

        cwUnlockedLevel =
          Math.max(
            cwUnlockedLevel,
            4
          );

        localStorage.setItem(
          "chinni_cw_progress",
          JSON.stringify(
            cwProgress
          )
        );

        localStorage.setItem(
          "chinni_cw_unlocked",
          String(
            cwUnlockedLevel
          )
        );

        updateClockCardsUI();
      }
    );
  }


  /* =========================================================================
     CLOCK 4
     ========================================================================= */

  let finaleFireworksInterval =
    null;

  let finaleFireworksAnimationId =
    null;


  function initFinaleFireworks() {

    const canvas =
      document.getElementById(
        "cw-fireworks-canvas"
      );

    if (!canvas) return;

    const ctx =
      canvas.getContext(
        "2d"
      );


    canvas.width =
      window.innerWidth;

    canvas.height =
      window.innerHeight;


    const particles = [];


    const colors = [
      "#D4AF37",
      "#E8A598",
      "#E8C5C8",
      "#FFFFFF",
      "#F5C563"
    ];


    function createBurst(
      x,
      y
    ) {

      const count = 40;

      for (
        let i = 0;
        i < count;
        i++
      ) {

        const angle =
          (
            Math.PI * 2 /
            count
          ) *
          i;

        const speed =
          Math.random() * 4 +
          2;

        particles.push({

          x,
          y,

          vx:
            Math.cos(angle) *
            speed,

          vy:
            Math.sin(angle) *
            speed,

          color:
            colors[
              Math.floor(
                Math.random() *
                colors.length
              )
            ],

          alpha: 1,

          decay:
            Math.random() *
            0.02 +
            0.01
        });
      }
    }


    if (
      finaleFireworksInterval
    ) {

      clearInterval(
        finaleFireworksInterval
      );
    }


    finaleFireworksInterval =
      setInterval(
        () => {

          createBurst(
            Math.random() *
              canvas.width,

            Math.random() *
              canvas.height *
              0.5
          );

        },
        1200
      );


    function animateFireworks() {

      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );


      for (
        let i = particles.length - 1;
        i >= 0;
        i--
      ) {

        const particle =
          particles[i];

        particle.x +=
          particle.vx;

        particle.y +=
          particle.vy;

        particle.vy +=
          0.05;

        particle.alpha -=
          particle.decay;


        if (
          particle.alpha <= 0
        ) {

          particles.splice(
            i,
            1
          );

          continue;
        }


        ctx.fillStyle =
          particle.color;

        ctx.globalAlpha =
          particle.alpha;

        ctx.beginPath();

        ctx.arc(
          particle.x,
          particle.y,
          2.5,
          0,
          Math.PI * 2
        );

        ctx.fill();

        ctx.globalAlpha =
          1;
      }


      finaleFireworksAnimationId =
        requestAnimationFrame(
          animateFireworks
        );
    }


    animateFireworks();
  }


  async function triggerClock4Sequence() {

    if (!cwFinaleModal) {
      return;
    }

    cwFinaleModal.classList.remove(
      "hidden"
    );

    initFinaleFireworks();


    const line1 =
      document.getElementById(
        "fin-line-1"
      );

    const line2 =
      document.getElementById(
        "fin-line-2"
      );

    const line3 =
      document.getElementById(
        "fin-line-3"
      );

    const line4 =
      document.getElementById(
        "fin-line-4"
      );

    const wishes =
      document.getElementById(
        "fin-wishes-group"
      );

    const line5 =
      document.getElementById(
        "fin-line-5"
      );


    [
      line1,
      line2,
      line3,
      line4,
      wishes,
      line5
    ].forEach(
      element => {

        if (element) {

          element.classList.remove(
            "visible"
          );
        }
      }
    );


    if (editorialCakeContainer) {

      editorialCakeContainer.classList.add(
        "hidden"
      );
    }


    await delay(600);

    if (line1) {
      line1.classList.add(
        "visible"
      );
    }

    await delay(1400);

    if (line2) {
      line2.classList.add(
        "visible"
      );
    }

    await delay(1400);

    if (line3) {
      line3.classList.add(
        "visible"
      );
    }

    await delay(1200);

    if (line4) {
      line4.classList.add(
        "visible"
      );
    }

    await delay(1600);

    if (wishes) {
      wishes.classList.add(
        "visible"
      );
    }

    await delay(1800);

    if (line5) {
      line5.classList.add(
        "visible"
      );
    }

    await delay(1200);

    if (editorialCakeContainer) {

      editorialCakeContainer.classList.remove(
        "hidden"
      );
    }


    cwProgress[4] =
      true;

    localStorage.setItem(
      "chinni_cw_progress",
      JSON.stringify(
        cwProgress
      )
    );

    updateClockCardsUI();
  }


  if (finaleModalClose) {

    finaleModalClose.addEventListener(
      "click",
      () => {

        if (cwFinaleModal) {

          cwFinaleModal.classList.add(
            "hidden"
          );
        }

        stopFinaleFireworks();
      }
    );
  }


  function stopFinaleFireworks() {

    if (
      finaleFireworksInterval
    ) {

      clearInterval(
        finaleFireworksInterval
      );

      finaleFireworksInterval =
        null;
    }

    if (
      finaleFireworksAnimationId
    ) {

      cancelAnimationFrame(
        finaleFireworksAnimationId
      );

      finaleFireworksAnimationId =
        null;
    }
  }


  /* =========================================================================
     CLOCK NAVIGATION / REPLAY
     ========================================================================= */

  if (cwReplayBtn) {

    cwReplayBtn.addEventListener(
      "click",
      () => {

        cwUnlockedLevel = 1;

        cwProgress = {
          1: false,
          2: false,
          3: false,
          4: false
        };

        localStorage.setItem(
          "chinni_cw_unlocked",
          "1"
        );

        localStorage.setItem(
          "chinni_cw_progress",
          JSON.stringify(
            cwProgress
          )
        );

        updateClockCardsUI();

        window.scrollTo({
          top:
            chinniiiWorldSection
              ? chinniiiWorldSection.offsetTop
              : 0,
          behavior: "smooth"
        });
      }
    );
  }


  if (finaleReplayBtn) {

    finaleReplayBtn.addEventListener(
      "click",
      () => {

        if (cwFinaleModal) {

          cwFinaleModal.classList.add(
            "hidden"
          );
        }

        stopFinaleFireworks();

        cwUnlockedLevel = 1;

        cwProgress = {
          1: false,
          2: false,
          3: false,
          4: false
        };

        localStorage.setItem(
          "chinni_cw_unlocked",
          "1"
        );

        localStorage.setItem(
          "chinni_cw_progress",
          JSON.stringify(
            cwProgress
          )
        );

        updateClockCardsUI();
      }
    );
  }


  /* =========================================================================
     CLOCK MODAL EXIT
     ========================================================================= */

  function closeAllCwModals() {

    [
      cwAlarmModal,
      cwFunnyModal,
      cwMusicModal,
      cwMemoryModal,
      cwShivaModal,
      cwFinaleModal
    ].forEach(
      modal => {

        if (modal) {

          modal.classList.add(
            "hidden"
          );
        }
      }
    );


    cwAudioPlayer.pause();


    if (albumArtDisc) {

      albumArtDisc.classList.remove(
        "playing"
      );
    }


    if (musicPlayBtn) {

      musicPlayBtn.textContent =
        "▶";
    }


    stopFinaleFireworks();

    resumeCurrentThemeMusic();

    updateClockCardsUI();
  }


  document
    .querySelectorAll(
      ".cw-exit-trigger"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          closeAllCwModals
        );
      }
    );


  const funnyModalClose =
    document.getElementById(
      "funny-modal-close"
    );

  if (funnyModalClose) {

    funnyModalClose.addEventListener(
      "click",
      closeAllCwModals
    );
  }


  if (finaleReplayMomentBtn) {

    finaleReplayMomentBtn.addEventListener(
      "click",
      () => {

        triggerClock4Sequence(
          cwAlarms[4] ||
          "11:59 PM"
        );
      }
    );
  }


  /* =========================================================================
     CLOCKS → LETTER
     ========================================================================= */

  function transitionClocksToLetter() {

    console.log(
      "STAGE → LETTER"
    );

    stopAllThemeMusic();

    startThemeMusic(
      "letter"
    );

    showStage(
      "LETTER"
    );

    if (letterHeading) {

      letterHeading.classList.add(
        "visible"
      );
    }

    if (finishCtaWrapper) {

      finishCtaWrapper.classList.remove(
        "visible"
      );
    }

    currentStage =
      "LETTER";

    enableScrollMode();

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }


  const showLetterStage =
    transitionClocksToLetter;


  const transitionToLetterSection =
    transitionClocksToLetter;


  if (cwContinueChronicleBtn) {

    cwContinueChronicleBtn.onclick =
      showLetterStage;
  }


  if (finaleChronicleBtn) {

    finaleChronicleBtn.onclick =
      () => {

        if (cwFinaleModal) {

          cwFinaleModal.classList.add(
            "hidden"
          );
        }

        stopFinaleFireworks();

        showLetterStage();
      };
  }


  /* =========================================================================
     IMPORTANT:
     LETTER IS FINAL PAGE.
     NO GRAND CELEBRATION AFTER LETTER.
     ========================================================================= */

  const finishSurpriseBtn =
    document.getElementById(
      "finish-surprise-btn"
    );

  if (finishSurpriseBtn) {

    /*
       Intentionally disabled.

       The website ends with the Personal Letter.
       Do NOT open #grand-celebration.
    */

    finishSurpriseBtn.onclick = null;

    finishSurpriseBtn.style.display =
      "none";
  }


  /* =========================================================================
     BIRTHDAY → ARCHIVES
     ========================================================================= */

  if (roastTransitionBtn) {

    roastTransitionBtn.onclick =
      showGalleryStage;
  }


  if (birthdayNextBtn) {

    birthdayNextBtn.onclick =
      showGalleryStage;
  }


  /* =========================================================================
     ARCHIVES → CLOCKS
     ========================================================================= */

  if (openLetterBtn) {

    openLetterBtn.onclick =
      showChinniiiWorldStage;
  }


  /* =========================================================================
     RUN → ORIGIN
     ========================================================================= */

  if (runContinueBtn) {

    runContinueBtn.onclick =
      () => {

        if (runCompleteModal) {

          runCompleteModal.classList.add(
            "hidden"
          );
        }

        isGameActive =
          false;

        gameFinished =
          true;

        if (runAnimFrameId) {

          cancelAnimationFrame(
            runAnimFrameId
          );

          runAnimFrameId =
            null;
        }

        stopAllThemeMusic();

        startHistorySectionSequence();
      };
  }


  /* =========================================================================
     ORIGIN → BIRTHDAY
     ========================================================================= */

  if (historyContinueBtn) {

    historyContinueBtn.onclick =
      transitionHistoryToBirthday;
  }


  /* =========================================================================
     FRONT PAGE → UNIVERSE
     ========================================================================= */

  if (startRevealBtn) {

    startRevealBtn.onclick =
      () => {

        if (isTransitioning) {
          return;
        }

        isTransitioning =
          true;

        startRevealBtn.disabled =
          true;


        if (introCurtain) {

          introCurtain.classList.add(
            "fade-out"
          );
        }


        stopAllThemeMusic();


        setTimeout(
          () => {

            if (introCurtain) {

              introCurtain.style.display =
                "none";

              introCurtain.style.visibility =
                "hidden";

              introCurtain.style.pointerEvents =
                "none";
            }


            showStage(
              "UNIVERSE"
            );

            startRealisticUniverse();

            isTransitioning =
              false;

          },
          900
        );
      };
  }


  /* =========================================================================
     PARTICLES — BIRTHDAY
     ========================================================================= */

  const particlesCanvas =
    document.getElementById(
      "particles-canvas"
    );

  const particlesCtx =
    particlesCanvas
      ? particlesCanvas.getContext("2d")
      : null;

  let particlesArray = [];

  let particleAnimationId =
    null;


  function initCanvas() {

    if (!particlesCanvas) return;

    particlesCanvas.width =
      window.innerWidth;

    particlesCanvas.height =
      window.innerHeight;
  }


  class Particle {

    constructor() {
      this.reset();
    }

    reset() {

      this.x =
        Math.random() *
        (
          particlesCanvas
            ? particlesCanvas.width
            : window.innerWidth
        );

      this.y =
        Math.random() *
        (
          particlesCanvas
            ? particlesCanvas.height
            : window.innerHeight
        );

      this.size =
        Math.random() * 2.2 +
        0.5;

      this.speedX =
        (
          Math.random() -
          0.5
        ) * 0.4;

      this.speedY =
        -Math.random() * 0.4 -
        0.15;

      this.opacity =
        Math.random() * 0.6 +
        0.2;

      this.fadeSpeed =
        Math.random() * 0.005 +
        0.002;

      const colors = [
        "#f5c563",
        "#ffffff",
        "#ff758c",
        "#ffe6a7"
      ];

      this.color =
        colors[
          Math.floor(
            Math.random() *
            colors.length
          )
        ];
    }

    update() {

      this.x +=
        this.speedX;

      this.y +=
        this.speedY;

      this.opacity -=
        this.fadeSpeed;


      if (
        this.opacity <= 0 ||
        this.y < -10 ||
        (
          particlesCanvas &&
          this.x <
            -10
        ) ||
        (
          particlesCanvas &&
          this.x >
            particlesCanvas.width +
            10
        )
      ) {

        this.reset();

        if (particlesCanvas) {

          this.y =
            particlesCanvas.height +
            10;
        }

        this.opacity =
          Math.random() *
            0.6 +
          0.2;
      }
    }

    draw() {

      if (!particlesCtx) {
        return;
      }

      particlesCtx.save();

      particlesCtx.globalAlpha =
        this.opacity;

      particlesCtx.fillStyle =
        this.color;

      particlesCtx.shadowBlur =
        this.size * 4;

      particlesCtx.shadowColor =
        this.color;

      particlesCtx.beginPath();

      particlesCtx.arc(
        this.x,
        this.y,
        this.size,
        0,
        Math.PI * 2
      );

      particlesCtx.fill();

      particlesCtx.restore();
    }
  }


  function createParticles() {

    if (!particlesCanvas) {
      return;
    }

    particlesArray =
      [];

    const count =
      Math.floor(
        (
          particlesCanvas.width *
          particlesCanvas.height
        ) /
        14000
      );

    for (
      let i = 0;
      i < count;
      i++
    ) {

      particlesArray.push(
        new Particle()
      );
    }
  }


  function animateParticles() {

    if (
      !particlesCtx ||
      !particlesCanvas
    ) {
      return;
    }

    particlesCtx.clearRect(
      0,
      0,
      particlesCanvas.width,
      particlesCanvas.height
    );

    particlesArray.forEach(
      particle => {

        particle.update();
        particle.draw();
      }
    );

    particleAnimationId =
      requestAnimationFrame(
        animateParticles
      );
  }


  /* =========================================================================
     CONFETTI
     ========================================================================= */

  let confettiArray = [];

  let confettiAnimationFrameId =
    null;


  function initConfettiCanvas() {

    if (!confettiCanvas) {
      return;
    }

    confettiCanvas.width =
      window.innerWidth;

    confettiCanvas.height =
      window.innerHeight;
  }


  class ConfettiPiece {

    constructor() {
      this.reset();
    }

    reset() {

      this.x =
        Math.random() *
        (
          confettiCanvas
            ? confettiCanvas.width
            : window.innerWidth
        );

      this.y =
        -20 -
        Math.random() *
        50;

      this.size =
        Math.random() * 10 +
        6;

      this.speedY =
        Math.random() * 3 +
        2;

      this.speedX =
        (
          Math.random() -
          0.5
        ) * 2;

      this.rotation =
        Math.random() *
        360;

      this.rotationSpeed =
        (
          Math.random() -
          0.5
        ) * 8;

      this.opacity =
        Math.random() *
        0.9 +
        0.1;

      this.isHeart =
        Math.random() >
        0.45;

      const colors = [
        "#f5c563",
        "#ff758c",
        "#ffffff",
        "#ffb3c1",
        "#e0a944"
      ];

      this.color =
        colors[
          Math.floor(
            Math.random() *
            colors.length
          )
        ];
    }

    update() {

      this.y +=
        this.speedY;

      this.x +=
        this.speedX;

      this.rotation +=
        this.rotationSpeed;


      if (
        confettiCanvas &&
        this.y >
          confettiCanvas.height +
          20
      ) {

        this.reset();
      }
    }

    draw() {

      if (!confettiCtx) {
        return;
      }

      confettiCtx.save();

      confettiCtx.translate(
        this.x,
        this.y
      );

      confettiCtx.rotate(
        (
          this.rotation *
          Math.PI
        ) /
        180
      );

      confettiCtx.globalAlpha =
        this.opacity;

      confettiCtx.fillStyle =
        this.color;


      if (this.isHeart) {

        const size =
          this.size;

        const top =
          size * 0.3;

        confettiCtx.beginPath();

        confettiCtx.moveTo(
          0,
          top
        );

        confettiCtx.bezierCurveTo(
          0,
          0,
          -size / 2,
          0,
          -size / 2,
          top
        );

        confettiCtx.bezierCurveTo(
          -size / 2,
          (
            size + top
          ) /
          2,
          0,
          size,
          0,
          size
        );

        confettiCtx.bezierCurveTo(
          0,
          size,
          size / 2,
          (
            size + top
          ) /
          2,
          size / 2,
          top
        );

        confettiCtx.bezierCurveTo(
          size / 2,
          0,
          0,
          0,
          0,
          top
        );

        confettiCtx.fill();

      } else {

        confettiCtx.fillRect(
          -this.size / 2,
          -this.size / 2,
          this.size,
          this.size * 0.6
        );
      }

      confettiCtx.restore();
    }
  }


  function startConfettiEngine() {

    if (!confettiCanvas) {
      return;
    }

    initConfettiCanvas();

    confettiArray = [];

    for (
      let i = 0;
      i < 110;
      i++
    ) {

      confettiArray.push(
        new ConfettiPiece()
      );
    }

    animateConfetti();
  }


  function animateConfetti() {

    if (!confettiCtx) {
      return;
    }

    confettiCtx.clearRect(
      0,
      0,
      confettiCanvas.width,
      confettiCanvas.height
    );

    confettiArray.forEach(
      piece => {

        piece.update();
        piece.draw();
      }
    );

    confettiAnimationFrameId =
      requestAnimationFrame(
        animateConfetti
      );
  }


  /* =========================================================================
     INTRO SPARKLES
     ========================================================================= */

  let sparkleAnimId = null;


  function initIntroSparkleParticles() {

    const sparkleCanvas =
      document.getElementById(
        "intro-sparkles-canvas"
      );

    if (!sparkleCanvas) {
      return;
    }

    const ctx =
      sparkleCanvas.getContext(
        "2d"
      );

    sparkleCanvas.width =
      window.innerWidth;

    sparkleCanvas.height =
      window.innerHeight;

    const particles = [];

    for (
      let i = 0;
      i < 45;
      i++
    ) {

      particles.push({

        x:
          Math.random() *
          sparkleCanvas.width,

        y:
          Math.random() *
          sparkleCanvas.height,

        radius:
          Math.random() *
            1.8 +
          0.5,

        alpha:
          Math.random() *
            0.6 +
          0.2,

        speedY:
          Math.random() *
            0.3 +
          0.1,

        speedX:
          (
            Math.random() -
            0.5
          ) * 0.15,

        pulseSpeed:
          Math.random() *
            0.02 +
          0.005
      });
    }


    function renderSparkles() {

      ctx.clearRect(
        0,
        0,
        sparkleCanvas.width,
        sparkleCanvas.height
      );


      particles.forEach(
        particle => {

          particle.y -=
            particle.speedY;

          particle.x +=
            particle.speedX;


          particle.alpha +=
            Math.sin(
              Date.now() *
              particle.pulseSpeed
            ) * 0.008;


          if (
            particle.y <
            -10
          ) {

            particle.y =
              sparkleCanvas.height +
              10;

            particle.x =
              Math.random() *
              sparkleCanvas.width;
          }


          ctx.save();

          ctx.beginPath();

          ctx.arc(
            particle.x,
            particle.y,
            particle.radius,
            0,
            Math.PI * 2
          );

          ctx.fillStyle =
            `rgba(
              245,
              197,
              99,
              ${Math.max(
                0.1,
                Math.min(
                  0.85,
                  particle.alpha
                )
              )}
            )`;

          ctx.shadowColor =
            "rgba(255,215,0,.8)";

          ctx.shadowBlur =
            12;

          ctx.fill();

          ctx.restore();
        }
      );


      sparkleAnimId =
        requestAnimationFrame(
          renderSparkles
        );
    }


    if (sparkleAnimId) {

      cancelAnimationFrame(
        sparkleAnimId
      );
    }

    renderSparkles();
  }


  /* =========================================================================
     PREMIUM INITIAL CINEMATIC TEXT INTRO
     
     IMPORTANT:
     NO CLICK SKIP.
     NO TOUCH SKIP.
     AUTOMATIC ONLY.
     ========================================================================= */

  let introAlreadyStarted =
    false;


  async function runCinematicTextSequence() {

    if (introAlreadyStarted) {
      return;
    }

    introAlreadyStarted = true;


    const introScreen =
      document.getElementById(
        "cinematic-text-intro"
      );

    const introWrapper =
      document.querySelector(
        ".intro-text-wrapper"
      );

    const sentence1 =
      document.getElementById(
        "cinematic-sentence-1"
      );

    const sentence2 =
      document.getElementById(
        "cinematic-sentence-2"
      );

    const sweepWrapper =
      document.querySelector(
        ".sweep-text-wrapper"
      );

    const heartEl =
      document.getElementById(
        "intro-heart"
      );


    if (
      !introScreen ||
      !sentence1 ||
      !sentence2
    ) {

      console.error(
        "Initial cinematic intro elements missing."
      );

      if (introCurtain) {

        introCurtain.classList.remove(
          "hidden-curtain"
        );

        introCurtain.classList.add(
          "active-curtain"
        );
      }

      return;
    }


    /* Lock scrolling */

    document.documentElement.style.overflow =
      "hidden";

    document.body.style.overflow =
      "hidden";


    /* Intro visible */

    introScreen.style.display =
      "flex";

    introScreen.style.visibility =
      "visible";

    introScreen.style.opacity =
      "1";

    /*
      IMPORTANT:
      The intro itself is NOT interactive.
      Therefore there is NO click listener.
      Pointer events are disabled.
    */

    introScreen.style.pointerEvents =
      "none";


    introScreen.classList.remove(
      "fade-out"
    );


    /* Reset wrapper */

    if (introWrapper) {

      introWrapper.classList.remove(
        "camera-push"
      );
    }


    sentence1.classList.remove(
      "visible",
      "fade-out"
    );

    sentence2.classList.remove(
      "visible",
      "fade-out"
    );


    if (sweepWrapper) {

      sweepWrapper.classList.remove(
        "do-sweep"
      );
    }


    if (heartEl) {

      heartEl.classList.remove(
        "heart-visible"
      );
    }


    /* Reset Front Page */

    if (introCurtain) {

      introCurtain.classList.remove(
        "active-curtain",
        "fade-out"
      );

      introCurtain.classList.add(
        "hidden-curtain"
      );

      introCurtain.style.visibility =
        "hidden";

      introCurtain.style.opacity =
        "0";

      introCurtain.style.pointerEvents =
        "none";
    }


    /* Start sparkles */

    initIntroSparkleParticles();


    /* ==========================================================
       CINEMATIC SEQUENCE
       ========================================================== */

    await delay(900);


    /* Camera enters */

    if (introWrapper) {

      introWrapper.classList.add(
        "camera-push"
      );
    }


    await delay(500);


    /* First sentence */

    sentence1.classList.add(
      "visible"
    );


    await delay(2200);


    /* First sentence hold */

    await delay(1800);


    /* First sentence exit */

    sentence1.classList.remove(
      "visible"
    );

    sentence1.classList.add(
      "fade-out"
    );


    await delay(1000);


    /* Empty cinematic pause */

    await delay(550);


    /* Second sentence */

    sentence2.classList.add(
      "visible"
    );


    await delay(2200);


    /* Light sweep */

    if (sweepWrapper) {

      sweepWrapper.classList.add(
        "do-sweep"
      );
    }


    await delay(550);


    /* Heart */

    if (heartEl) {

      heartEl.classList.add(
        "heart-visible"
      );
    }


    await delay(1800);


    /* Emotional hold */

    await delay(1800);


    /* Second sentence exit */

    sentence2.classList.remove(
      "visible"
    );

    sentence2.classList.add(
      "fade-out"
    );


    await delay(1100);


    /* Final pause */

    await delay(500);


    /* ==========================================================
       AUTOMATIC FRONT PAGE TRANSITION
       ========================================================== */

    if (sparkleAnimId) {

      cancelAnimationFrame(
        sparkleAnimId
      );

      sparkleAnimId =
        null;
    }


    introScreen.classList.add(
      "fade-out"
    );


    await delay(600);


    introScreen.style.display =
      "none";

    introScreen.style.visibility =
      "hidden";

    introScreen.style.opacity =
      "0";

    introScreen.style.pointerEvents =
      "none";


    if (introCurtain) {

      introCurtain.classList.remove(
        "hidden-curtain"
      );

      introCurtain.classList.add(
        "active-curtain"
      );

      introCurtain.style.display =
        "flex";

      introCurtain.style.visibility =
        "visible";

      introCurtain.style.opacity =
        "1";

      introCurtain.style.pointerEvents =
        "auto";
    }


    enableCinematicMode();


    console.log(
      "INITIAL INTRO COMPLETE → ORIGINAL FRONT PAGE"
    );
  }


  /* =========================================================================
     RESIZE
     ========================================================================= */

  window.addEventListener(
    "resize",
    () => {

      updateResponsiveUniverse();

      if (
        renderer &&
        camera
      ) {

        camera.aspect =
          window.innerWidth /
          window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
          window.innerWidth,
          window.innerHeight
        );
      }


      if (
        runRenderer &&
        runCamera
      ) {

        runCamera.aspect =
          window.innerWidth /
          window.innerHeight;

        runCamera.updateProjectionMatrix();

        runRenderer.setSize(
          window.innerWidth,
          window.innerHeight
        );
      }


      initCanvas();

      createParticles();

      initConfettiCanvas();
    }
  );


  /* =========================================================================
     SCROLL REVEALS
     ========================================================================= */

  function initScrollRevealObserver() {

    if (
      typeof IntersectionObserver ===
      "undefined"
    ) {
      return;
    }

    const elements =
      document.querySelectorAll(
        ".trait-card, .episode-card"
      );

    if (!elements.length) {
      return;
    }


    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(
            entry => {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "revealed"
                );
              }
            }
          );
        },
        {
          threshold: 0.15
        }
      );


    elements.forEach(
      element => {
        observer.observe(
          element
        );
      }
    );
  }


  /* =========================================================================
     REPLAY — START FROM INTRO
     ========================================================================= */

  if (finalReplayBtn) {

    finalReplayBtn.addEventListener(
      "click",
      () => {

        /*
          This is kept for compatibility,
          although Grand Celebration should
          no longer be part of the normal flow.
        */

        stopAllThemeMusic();

        if (
          confettiAnimationFrameId
        ) {

          cancelAnimationFrame(
            confettiAnimationFrameId
          );

          confettiAnimationFrameId =
            null;
        }

        introAlreadyStarted =
          false;

        showStage(
          "INTRO"
        );

        runCinematicTextSequence();
      }
    );
  }


  /* =========================================================================
     START
     ========================================================================= */

  initCanvas();

  createParticles();

  initConfettiCanvas();

  initScrollRevealObserver();

  /*
    THIS IS THE ONLY INITIAL INTRO START.

    No click.
    No touch.
    No skip.
    It automatically finishes.
  */

  runCinematicTextSequence();

});