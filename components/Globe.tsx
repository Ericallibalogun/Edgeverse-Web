"use client";

import { useEffect, useRef, useState } from "react";

/** Lagos and the African cities the arcs reach. [lat, lon] */
const LAGOS: [number, number] = [6.52, 3.38];
/** side: which side of the point the label sits, chosen so neighbours don't collide. */
type Side = "l" | "r" | "b";
const CITIES: { name: string; country: string; at: [number, number]; side: Side }[] = [
  { name: "Abuja", country: "Nigeria", at: [9.07, 7.4], side: "r" },
  { name: "Accra", country: "Ghana", at: [5.6, -0.19], side: "l" },
  { name: "Dakar", country: "Senegal", at: [14.72, -17.47], side: "l" },
  { name: "Cairo", country: "Egypt", at: [30.04, 31.24], side: "r" },
  { name: "Nairobi", country: "Kenya", at: [-1.29, 36.82], side: "r" },
  { name: "Kigali", country: "Rwanda", at: [-1.95, 30.06], side: "l" },
  { name: "Johannesburg", country: "South Africa", at: [-26.2, 28.05], side: "r" },
];

const C = { arc: 0x8fd0ff, lagos: 0xffb81c };
const TEX = "/img/earth/";

/** Where the sun is overhead right now (declination, longitude): drives the live terminator. */
function subsolar(d = new Date()) {
  const start = Date.UTC(d.getUTCFullYear(), 0, 0);
  const day = (d.getTime() - start) / 864e5;
  const decl = -23.44 * Math.cos(((2 * Math.PI) / 365) * (day + 10));
  const hours = d.getUTCHours() + d.getUTCMinutes() / 60;
  return [decl, -15 * (hours - 12)] as [number, number];
}

/**
 * Signature 3D piece: a photoreal Earth turned to Africa. Live day and night (the sun sits
 * where it really is for the visitor's current time), city lights on the night side, sun
 * glint on the oceans, terrain relief, a drifting cloud layer with shadows and a thin
 * atmosphere. Lagos glows and arcs draw out to cities across the continent.
 * Three.js and the textures load only when the section nears the viewport, rendering
 * pauses off-screen, drag to rotate. Reduced motion: drawn once, nothing drifts.
 */
export default function Globe({ label }: { label: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let cleanup: (() => void) | undefined;
    let started = false, gone = false;

    const start = async () => {
      if (started) return;
      started = true;
      try {
        const THREE = await import("three");
        const loader = new THREE.TextureLoader();
        const tex = await Promise.all(["day", "night", "water", "bump", "clouds"].map((n) => loader.loadAsync(`${TEX}${n}.webp`)));
        if (gone) { tex.forEach((t) => t.dispose()); return; }
        cleanup = mount(THREE, el, tex);
        setReady(true);
      } catch {
        setFailed(true);
      }
    };

    const near = new IntersectionObserver(([e]) => { if (e.isIntersecting) { near.disconnect(); start(); } }, { rootMargin: "400px 0px" });
    near.observe(el);
    return () => { gone = true; near.disconnect(); cleanup?.(); };
  }, []);

  return (
    <div className={`globe${failed ? " globe--failed" : ""}${ready ? " is-ready" : ""}`} ref={host} role="img" aria-label={label} />
  );
}

const EARTH_VS = /* glsl */ `
varying vec2 vUv; varying vec3 vPos;
void main() { vUv = uv; vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;

const EARTH_FS = /* glsl */ `
uniform sampler2D tDay, tNight, tWater, tBump, tClouds;
uniform vec3 uSun, uCam; uniform vec2 uTexel; uniform float uCloudU;
varying vec2 vUv; varying vec3 vPos;
void main() {
  vec3 n = normalize(vPos);
  vec3 T = normalize(cross(vec3(0.0, 1.0, 0.0), n)); vec3 B = cross(n, T);
  float du = texture2D(tBump, vUv + vec2(uTexel.x, 0.0)).r - texture2D(tBump, vUv - vec2(uTexel.x, 0.0)).r;
  float dv = texture2D(tBump, vUv + vec2(0.0, uTexel.y)).r - texture2D(tBump, vUv - vec2(0.0, uTexel.y)).r;
  vec3 nb = normalize(n - (du * T + dv * B) * 1.6);

  float sunN = dot(n, uSun);
  float day = smoothstep(-0.10, 0.16, sunN);
  vec3 V = normalize(uCam - vPos);
  float water = texture2D(tWater, vUv).r;
  float cloud = texture2D(tClouds, vec2(fract(vUv.x - uCloudU + 0.004), vUv.y - 0.003)).r;

  vec3 dayCol = texture2D(tDay, vUv).rgb;
  dayCol = mix(dayCol, dayCol * vec3(0.86, 0.94, 1.08), water * 0.6);
  float lambert = max(dot(nb, uSun), 0.0);
  vec3 lit = dayCol * (0.03 + 1.12 * lambert) * (1.0 - cloud * 0.4);
  vec3 H = normalize(uSun + V);
  lit += vec3(1.0, 0.93, 0.8) * pow(max(dot(n, H), 0.0), 70.0) * water * 0.75 * (1.0 - cloud);
  lit += vec3(1.0, 0.42, 0.12) * dayCol * (1.0 - smoothstep(0.0, 0.22, abs(sunN))) * 0.35;

  vec3 lights = texture2D(tNight, vUv).rgb;
  lights = pow(lights, vec3(1.35)) * vec3(1.25, 0.95, 0.62) * 2.2 * (1.0 - cloud * 0.7);
  vec3 col = lit * day + lights * (1.0 - smoothstep(-0.18, 0.06, sunN)) + dayCol * 0.018;

  float fr = pow(1.0 - max(dot(n, V), 0.0), 2.6);
  col += vec3(0.32, 0.6, 1.0) * fr * (0.08 + 0.9 * smoothstep(-0.25, 0.5, sunN));
  gl_FragColor = vec4(col, 1.0);
}`;

const CLOUD_FS = /* glsl */ `
uniform sampler2D tClouds; uniform vec3 uSun;
varying vec2 vUv; varying vec3 vPos;
void main() {
  vec3 n = normalize(vPos);
  float a = texture2D(tClouds, vUv).r;
  float s = dot(n, uSun);
  float l = smoothstep(-0.12, 0.35, s);
  vec3 c = mix(vec3(0.04, 0.05, 0.08), vec3(1.0), l) + vec3(1.0, 0.5, 0.2) * (1.0 - smoothstep(0.0, 0.2, abs(s))) * 0.25;
  gl_FragColor = vec4(c, a * mix(0.25, 0.92, l));
}`;

const ATMO_VS = /* glsl */ `
varying vec3 vN; varying vec3 vW;
void main() { vN = normalize(normalMatrix * normal); vW = normalize((modelMatrix * vec4(position, 1.0)).xyz); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;

const ATMO_FS = /* glsl */ `
uniform vec3 uSunW; varying vec3 vN; varying vec3 vW;
void main() {
  float i = pow(clamp(0.72 - dot(vN, vec3(0.0, 0.0, 1.0)), 0.0, 1.0), 3.0);
  float lit = smoothstep(-0.35, 0.55, dot(vW, uSunW));
  gl_FragColor = vec4(vec3(0.35, 0.65, 1.0), i * (0.15 + 0.85 * lit));
}`;

function mount(THREE: typeof import("three"), el: HTMLDivElement, tex: InstanceType<typeof import("three").Texture>[]) {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const R = 1;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, premultipliedAlpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  el.appendChild(renderer.domElement);

  const aniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  tex.forEach((t) => { t.anisotropy = aniso; t.wrapS = THREE.RepeatWrapping; });
  const [tDay, tNight, tWater, tBump, tClouds] = tex;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 3.9);

  const globe = new THREE.Group();
  scene.add(globe);

  const toVec = (lat: number, lon: number, r = R) => {
    const phi = (90 - lat) * (Math.PI / 180), theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
  };

  // Sun direction in the globe's own frame, refreshed each minute.
  const sun = new THREE.Vector3();
  const updateSun = () => sun.copy(toVec(...subsolar())).normalize();
  updateSun();

  // Earth surface.
  const earthU = {
    tDay: { value: tDay }, tNight: { value: tNight }, tWater: { value: tWater }, tBump: { value: tBump }, tClouds: { value: tClouds },
    uSun: { value: sun }, uCam: { value: new THREE.Vector3() }, uTexel: { value: new THREE.Vector2(1 / 2048, 1 / 1024) }, uCloudU: { value: 0 },
  };
  const earth = new THREE.Mesh(new THREE.SphereGeometry(R, 128, 128), new THREE.ShaderMaterial({ uniforms: earthU, vertexShader: EARTH_VS, fragmentShader: EARTH_FS }));
  globe.add(earth);

  // Clouds: a slightly larger shell that drifts on its own.
  const cloudU = { tClouds: { value: tClouds }, uSun: { value: sun } };
  const clouds = new THREE.Mesh(new THREE.SphereGeometry(R * 1.008, 96, 96),
    new THREE.ShaderMaterial({ uniforms: cloudU, vertexShader: EARTH_VS, fragmentShader: CLOUD_FS, transparent: true, depthWrite: false }));
  globe.add(clouds);

  // Atmosphere: a back-faced halo outside the limb, brighter on the sunlit side.
  const atmoU = { uSunW: { value: new THREE.Vector3() } };
  const atmo = new THREE.Mesh(new THREE.SphereGeometry(R * 1.13, 64, 64),
    new THREE.ShaderMaterial({ uniforms: atmoU, vertexShader: ATMO_VS, fragmentShader: ATMO_FS, side: THREE.BackSide, transparent: true, depthWrite: false }));
  scene.add(atmo);

  // Lagos: a solid marker and a pulsing ring, above the clouds.
  const lagosV = toVec(...LAGOS, R * 1.014);
  const marker = new THREE.Mesh(new THREE.SphereGeometry(0.016, 16, 16), new THREE.MeshBasicMaterial({ color: C.lagos }));
  marker.position.copy(lagosV);
  globe.add(marker);
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.022, 0.03, 40), new THREE.MeshBasicMaterial({ color: C.lagos, transparent: true, side: THREE.DoubleSide, depthWrite: false }));
  ring.position.copy(lagosV);
  ring.lookAt(lagosV.clone().multiplyScalar(2));
  globe.add(ring);

  // Arcs from Lagos, lifted above the surface in proportion to distance.
  const SEG = 64;
  const arcs = CITIES.map(({ at }, k) => {
    const a = toVec(...LAGOS), b = toVec(...at);
    const lift = 1.02 + a.distanceTo(b) * 0.3;
    const mid = a.clone().add(b).normalize().multiplyScalar(R * lift);
    const curve = new THREE.QuadraticBezierCurve3(a.multiplyScalar(1.014), mid, b.multiplyScalar(1.014));
    const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(SEG));
    geo.setDrawRange(0, reduce ? SEG + 1 : 0);
    const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: C.arc, transparent: true, opacity: 0.9 }));
    globe.add(line);
    const end = new THREE.Mesh(new THREE.SphereGeometry(0.009, 10, 10), new THREE.MeshBasicMaterial({ color: C.arc }));
    end.position.copy(toVec(...at, R * 1.014));
    end.visible = reduce;
    globe.add(end);
    return { geo, end, delay: k * 0.35 };
  });

  // Labels: HTML tags pinned to each point (city, country), hidden on the far side.
  const layer = document.createElement("div");
  layer.className = "globe-labels";
  layer.setAttribute("aria-hidden", "true");
  el.appendChild(layer);
  const tag = (name: string, country: string, side: Side, lagos = false) => {
    const t = document.createElement("span");
    t.className = `globe-label globe-label--${side}${lagos ? " globe-label--lagos" : ""}`;
    t.innerHTML = `<b>${name}</b> ${country}`;
    layer.appendChild(t);
    return t;
  };
  const labels = [
    { el: tag("Lagos", "Nigeria", "b", true), at: lagosV.clone(), on: () => true },
    ...CITIES.map(({ name, country, at, side }, k) => ({ el: tag(name, country, side), at: toVec(...at, R * 1.014), on: () => arcs[k].end.visible })),
  ];
  const wp = new THREE.Vector3(), cam = new THREE.Vector3();
  const placeLabels = () => {
    const w = el.clientWidth, h = el.clientHeight;
    cam.copy(camera.position).normalize();
    for (const l of labels) {
      wp.copy(l.at).applyMatrix4(globe.matrixWorld);
      const facing = wp.clone().normalize().dot(cam);
      const o = l.on() ? Math.min(1, Math.max(0, (facing - 0.2) / 0.2)) : 0;
      wp.project(camera);
      l.el.style.transform = `translate(${((wp.x + 1) / 2) * w}px, ${((1 - wp.y) / 2) * h}px)`;
      l.el.style.opacity = String(o);
    }
  };
  // Face Africa towards the camera, tilted slightly.
  const face = toVec(4, 18);
  const baseY = -Math.atan2(face.x, face.z);
  globe.rotation.set(0.2, baseY, 0);

  // Size to the host.
  const resize = () => {
    const w = el.clientWidth, h = el.clientHeight || w;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    render();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(el);

  // Drag to rotate (pointer), with a gentle return to idle spin.
  let dragging = false, lastX = 0, lastY = 0, vel = 0, drift = 0, tilt = 0.2;
  const onDown = (e: PointerEvent) => { dragging = true; lastX = e.clientX; lastY = e.clientY; el.setPointerCapture(e.pointerId); el.classList.add("is-dragging"); };
  const onMove = (e: PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - lastX, dy = e.clientY - lastY;
    lastX = e.clientX; lastY = e.clientY;
    drift += dx * 0.006; vel = dx * 0.006;
    tilt = Math.max(-0.4, Math.min(0.6, tilt + dy * 0.004));
    if (reduce) render();
  };
  const onUp = () => { dragging = false; el.classList.remove("is-dragging"); };
  el.addEventListener("pointerdown", onDown);
  el.addEventListener("pointermove", onMove);
  el.addEventListener("pointerup", onUp);
  el.addEventListener("pointercancel", onUp);

  const q = new THREE.Quaternion();
  function render() {
    globe.rotation.y = baseY + drift;
    globe.rotation.x = tilt;
    globe.updateMatrixWorld();
    earthU.uCam.value.copy(camera.position).applyMatrix4(earth.matrixWorld.clone().invert());
    earthU.uCloudU.value = clouds.rotation.y / (Math.PI * 2);
    atmoU.uSunW.value.copy(sun).applyQuaternion(globe.getWorldQuaternion(q));
    renderer.render(scene, camera);
    placeLabels();
  }

  // Animate only while visible.
  let raf = 0, visible = false, t0 = performance.now(), last = t0;
  const loop = (now: number) => {
    const t = (now - t0) / 1000, dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    clouds.rotation.y += dt * 0.008; // clouds drift east, slowly
    if (!dragging) {
      // Inertia from a drag, then ease back to a gentle sway centred on Africa (Lagos stays in view).
      vel *= 0.92; drift += vel;
      const sway = Math.sin(t * 0.22) * 0.32;
      drift += (sway - drift) * 0.015;
      tilt += (0.2 - tilt) * 0.02;
    }
    arcs.forEach(({ geo, end, delay }) => {
      const p = Math.min(1, Math.max(0, (t - delay) / 1.4));
      geo.setDrawRange(0, Math.floor(p * SEG) + 1);
      end.visible = p >= 1;
    });
    const s = 1 + ((t * 0.8) % 1) * 1.6;
    ring.scale.setScalar(s);
    (ring.material as InstanceType<typeof THREE.MeshBasicMaterial>).opacity = 1 - ((t * 0.8) % 1);
    render();
    raf = requestAnimationFrame(loop);
  };
  const vis = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    cancelAnimationFrame(raf);
    if (visible && !reduce) raf = requestAnimationFrame(loop);
  });
  vis.observe(el);
  const onVis = () => { if (document.hidden) cancelAnimationFrame(raf); else if (visible && !reduce) raf = requestAnimationFrame(loop); };
  document.addEventListener("visibilitychange", onVis);

  const sunTimer = window.setInterval(() => { updateSun(); if (reduce) render(); }, 60_000);

  resize();

  return () => {
    cancelAnimationFrame(raf);
    window.clearInterval(sunTimer);
    tex.forEach((t) => t.dispose());
    vis.disconnect();
    ro.disconnect();
    document.removeEventListener("visibilitychange", onVis);
    el.removeEventListener("pointerdown", onDown);
    el.removeEventListener("pointermove", onMove);
    el.removeEventListener("pointerup", onUp);
    el.removeEventListener("pointercancel", onUp);
    scene.traverse((o) => {
      const m = o as unknown as { geometry?: { dispose(): void }; material?: { dispose(): void } };
      m.geometry?.dispose(); m.material?.dispose();
    });
    renderer.dispose();
    renderer.domElement.remove();
    layer.remove();
  };
}
