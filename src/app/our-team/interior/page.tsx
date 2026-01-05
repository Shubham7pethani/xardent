"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function OurTeamInteriorPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );

  useEffect(() => {
    let disposed = false;
    let renderer: any;
    let scene: any;
    let camera: any;
    let raf = 0;

    let detachCameraControls: (() => void) | null = null;

    const keys = {
      w: false,
      a: false,
      s: false,
      d: false,
    };

    const cleanup = () => {
      if (disposed) return;
      disposed = true;
      if (raf) cancelAnimationFrame(raf);

      if (detachCameraControls) detachCameraControls();

      if (renderer) {
        renderer.dispose?.();
        const el = renderer.domElement as HTMLCanvasElement | undefined;
        if (el?.parentElement) el.parentElement.removeChild(el);
      }

      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "w" || k === "a" || k === "s" || k === "d") {
        (keys as any)[k] = true;
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "w" || k === "a" || k === "s" || k === "d") {
        (keys as any)[k] = false;
      }
    };

    const onResize = () => {
      if (!renderer || !camera || !containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    };

    const run = async () => {
      try {
        const container = containerRef.current;
        if (!container) throw new Error("Missing container");

        const w = container.clientWidth;
        const h = container.clientHeight;

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
        renderer.setSize(w, h);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.18;
        container.appendChild(renderer.domElement);

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0b1324);
        scene.fog = null;

        camera = new THREE.PerspectiveCamera(70, w / h, 0.1, 400);
        camera.position.set(0, 1.65, 15);

        const hemi = new THREE.HemisphereLight(0xcfe9ff, 0x0a0d12, 0.55);
        scene.add(hemi);

        const ambient = new THREE.AmbientLight(0xffffff, 0.32);
        scene.add(ambient);

        const keyLight = new THREE.DirectionalLight(0xffffff, 0.65);
        keyLight.position.set(-20, 28, 16);
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.width = 2048;
        keyLight.shadow.mapSize.height = 2048;
        keyLight.shadow.camera.near = 1;
        keyLight.shadow.camera.far = 140;
        keyLight.shadow.camera.left = -60;
        keyLight.shadow.camera.right = 60;
        keyLight.shadow.camera.top = 60;
        keyLight.shadow.camera.bottom = -60;
        scene.add(keyLight);

        const fillA = new THREE.PointLight(0xffffff, 0.35, 60, 2);
        fillA.position.set(-10, 6, 10);
        fillA.castShadow = false;
        scene.add(fillA);

        const fillB = new THREE.PointLight(0xffffff, 0.32, 60, 2);
        fillB.position.set(12, 6, -6);
        fillB.castShadow = false;
        scene.add(fillB);

        const officeGroup = new THREE.Group();
        scene.add(officeGroup);

        const woodCanvas = document.createElement("canvas");
        woodCanvas.width = 1024;
        woodCanvas.height = 1024;
        const woodCtx = woodCanvas.getContext("2d");
        if (woodCtx) {
          woodCtx.fillStyle = "#7a4e2d";
          woodCtx.fillRect(0, 0, 1024, 1024);

          const plankW = 128;
          for (let x = 0; x < 1024; x += plankW) {
            const hue = 24 + Math.random() * 10;
            const sat = 42 + Math.random() * 10;
            const light = 30 + Math.random() * 10;
            woodCtx.fillStyle = `hsl(${hue} ${sat}% ${light}%)`;
            woodCtx.fillRect(x, 0, plankW - 2, 1024);
            woodCtx.fillStyle = "rgba(0,0,0,0.12)";
            woodCtx.fillRect(x + plankW - 2, 0, 2, 1024);

            for (let i = 0; i < 18; i++) {
              const yy = Math.random() * 1024;
              const len = 20 + Math.random() * 220;
              woodCtx.strokeStyle = "rgba(0,0,0,0.08)";
              woodCtx.lineWidth = 1;
              woodCtx.beginPath();
              woodCtx.moveTo(x + 10 + Math.random() * (plankW - 20), yy);
              woodCtx.lineTo(x + 10 + Math.random() * (plankW - 20), yy + len);
              woodCtx.stroke();
            }
          }

          woodCtx.fillStyle = "rgba(255,255,255,0.04)";
          for (let i = 0; i < 1200; i++) {
            const px = Math.random() * 1024;
            const py = Math.random() * 1024;
            woodCtx.fillRect(px, py, 1, 1);
          }
        }

        const woodTex = new THREE.CanvasTexture(woodCanvas);
        woodTex.colorSpace = THREE.SRGBColorSpace;
        woodTex.wrapS = THREE.RepeatWrapping;
        woodTex.wrapT = THREE.RepeatWrapping;
        woodTex.repeat.set(3.2, 2.2);
        woodTex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
        woodTex.needsUpdate = true;

        const floorMat = new THREE.MeshStandardMaterial({
          map: woodTex,
          roughness: 0.55,
          metalness: 0.08,
        });
        const floor = new THREE.Mesh(new THREE.BoxGeometry(64, 0.2, 46), floorMat);
        floor.position.set(0, -0.1, 0);
        floor.receiveShadow = true;
        officeGroup.add(floor);

        const wallMat = new THREE.MeshStandardMaterial({
          color: 0xe8edf2,
          roughness: 0.92,
          metalness: 0,
        });
        const wallBack = new THREE.Mesh(new THREE.BoxGeometry(64, 10, 0.6), wallMat);
        wallBack.position.set(0, 5, -23);
        wallBack.castShadow = true;
        wallBack.receiveShadow = true;
        officeGroup.add(wallBack);

        const wallFront = wallBack.clone();
        wallFront.position.z = 23;
        officeGroup.add(wallFront);

        const wallLeft = new THREE.Mesh(new THREE.BoxGeometry(0.6, 10, 46), wallMat);
        wallLeft.position.set(-32, 5, 0);
        wallLeft.castShadow = true;
        wallLeft.receiveShadow = true;
        officeGroup.add(wallLeft);

        const wallRight = wallLeft.clone();
        wallRight.position.x = 32;
        officeGroup.add(wallRight);

        const ceilingMat = new THREE.MeshStandardMaterial({
          color: 0xb7c1cb,
          roughness: 0.95,
        });
        const ceiling = new THREE.Mesh(new THREE.BoxGeometry(64, 0.35, 46), ceilingMat);
        ceiling.position.set(0, 10.1, 0);
        ceiling.receiveShadow = true;
        officeGroup.add(ceiling);

        const makeCeilingPanel = (x: number, z: number) => {
          const panelMat = new THREE.MeshStandardMaterial({
            color: 0xe5e7eb,
            emissive: 0xffffff,
            emissiveIntensity: 0.55,
            roughness: 0.8,
          });
          const panel = new THREE.Mesh(new THREE.BoxGeometry(7.5, 0.15, 3.5), panelMat);
          panel.position.set(x, 9.75, z);
          panel.castShadow = false;
          officeGroup.add(panel);

          const light = new THREE.PointLight(0xffffff, 0.65, 22, 2);
          light.position.set(x, 9.5, z);
          light.castShadow = false;
          officeGroup.add(light);
        };

        for (let rz = -16; rz <= 16; rz += 8) {
          makeCeilingPanel(-14, rz);
          makeCeilingPanel(0, rz);
          makeCeilingPanel(14, rz);
        }

        const carpetMat = new THREE.MeshStandardMaterial({
          color: 0xd7d3c8,
          roughness: 0.95,
          metalness: 0,
        });
        const carpet = new THREE.Mesh(new THREE.BoxGeometry(58, 0.08, 40), carpetMat);
        carpet.position.set(0, 0.01, 0);
        carpet.receiveShadow = true;
        officeGroup.add(carpet);

        const glassWallMat = new THREE.MeshPhysicalMaterial({
          color: 0x9fdcff,
          roughness: 0.1,
          metalness: 0,
          transmission: 0.9,
          thickness: 0.25,
          transparent: true,
          opacity: 1,
        });

        const createCabin = (label: string, x: number, z: number, w2: number, d2: number) => {
          const cabin = new THREE.Group();
          cabin.position.set(x, 0, z);

          const base = new THREE.Mesh(
            new THREE.BoxGeometry(w2, 0.08, d2),
            new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9 })
          );
          base.position.set(0, 0.05, 0);
          base.receiveShadow = true;
          cabin.add(base);

          const h = 4.2;
          const t = 0.18;

          const back = new THREE.Mesh(new THREE.BoxGeometry(w2, h, t), glassWallMat);
          back.position.set(0, h / 2, -d2 / 2);
          cabin.add(back);

          const left = new THREE.Mesh(new THREE.BoxGeometry(t, h, d2), glassWallMat);
          left.position.set(-w2 / 2, h / 2, 0);
          cabin.add(left);

          const right = left.clone();
          right.position.x = w2 / 2;
          cabin.add(right);

          const frontLeft = new THREE.Mesh(new THREE.BoxGeometry(w2 / 2 - 1.1, h, t), glassWallMat);
          frontLeft.position.set(-w2 / 4 - 0.55, h / 2, d2 / 2);
          cabin.add(frontLeft);

          const frontRight = frontLeft.clone();
          frontRight.position.x = w2 / 4 + 0.55;
          cabin.add(frontRight);

          const signCanvas = document.createElement("canvas");
          signCanvas.width = 512;
          signCanvas.height = 128;
          const ctx = signCanvas.getContext("2d");
          if (ctx) {
            ctx.fillStyle = "rgba(15, 23, 42, 0.86)";
            ctx.fillRect(0, 0, 512, 128);
            ctx.fillStyle = "rgba(255,255,255,0.92)";
            ctx.font = "700 44px system-ui, -apple-system, Segoe UI, Roboto";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(label, 256, 64);
          }
          const tex = new THREE.CanvasTexture(signCanvas);
          tex.colorSpace = THREE.SRGBColorSpace;
          const sign = new THREE.Mesh(
            new THREE.PlaneGeometry(5.2, 1.3),
            new THREE.MeshStandardMaterial({
              map: tex,
              emissive: new THREE.Color(0x101020),
              emissiveIntensity: 0.5,
              roughness: 0.4,
              metalness: 0.05,
            })
          );
          sign.position.set(0, 4.6, d2 / 2 + 0.25);
          cabin.add(sign);

          officeGroup.add(cabin);
          return cabin;
        };

        const ceoCabin = createCabin("CEO Cabin", 0, -15.5, 22, 13);

        const deskMat = new THREE.MeshStandardMaterial({
          color: 0x0f172a,
          roughness: 0.5,
          metalness: 0.25,
        });
        const woodMat = new THREE.MeshStandardMaterial({
          color: 0x7a4e2d,
          roughness: 0.85,
        });

        const makeDesk = (x: number, z: number, scale = 1) => {
          const g = new THREE.Group();

          const top = new THREE.Mesh(
            new THREE.BoxGeometry(2.7 * scale, 0.14, 1.3 * scale),
            woodMat
          );
          top.position.set(0, 1.0 * scale, 0);
          top.castShadow = true;
          top.receiveShadow = true;
          g.add(top);

          const frame = new THREE.Mesh(
            new THREE.BoxGeometry(2.75 * scale, 0.06, 1.35 * scale),
            deskMat
          );
          frame.position.set(0, 0.92 * scale, 0);
          frame.castShadow = true;
          g.add(frame);

          const legGeo = new THREE.CylinderGeometry(0.06 * scale, 0.06 * scale, 0.9 * scale, 10);
          const legMat = deskMat;
          const legs = [
            [-1.25 * scale, 0.46 * scale, -0.55 * scale],
            [1.25 * scale, 0.46 * scale, -0.55 * scale],
            [-1.25 * scale, 0.46 * scale, 0.55 * scale],
            [1.25 * scale, 0.46 * scale, 0.55 * scale],
          ];
          legs.forEach(([lx, ly, lz]) => {
            const leg = new THREE.Mesh(legGeo, legMat);
            leg.position.set(lx, ly, lz);
            leg.castShadow = true;
            g.add(leg);
          });

          const monitor = new THREE.Mesh(
            new THREE.BoxGeometry(0.9 * scale, 0.55 * scale, 0.06 * scale),
            new THREE.MeshStandardMaterial({
              color: 0x0b1220,
              roughness: 0.4,
              metalness: 0.2,
              emissive: new THREE.Color(0x1d4ed8),
              emissiveIntensity: 0.12,
            })
          );
          monitor.position.set(0, 1.35 * scale, -0.25 * scale);
          g.add(monitor);

          g.position.set(x, 0, z);
          officeGroup.add(g);
          return g;
        };

        const makeChair = (x: number, z: number) => {
          const c = new THREE.Group();

          const seatMat = new THREE.MeshStandardMaterial({
            color: 0x1f2937,
            roughness: 0.8,
          });

          const seat = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.12, 0.95), seatMat);
          seat.position.set(0, 0.55, 0);
          seat.castShadow = true;
          c.add(seat);

          const back = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.85, 0.12), seatMat);
          back.position.set(0, 0.95, -0.42);
          back.castShadow = true;
          c.add(back);

          const stem = new THREE.Mesh(
            new THREE.CylinderGeometry(0.08, 0.1, 0.55, 10),
            new THREE.MeshStandardMaterial({ color: 0x111318, roughness: 0.9 })
          );
          stem.position.set(0, 0.25, 0);
          stem.castShadow = true;
          c.add(stem);

          const base = new THREE.Mesh(
            new THREE.CylinderGeometry(0.45, 0.45, 0.06, 16),
            new THREE.MeshStandardMaterial({ color: 0x111318, roughness: 0.9 })
          );
          base.position.set(0, 0.03, 0);
          c.add(base);

          c.position.set(x, 0, z);
          officeGroup.add(c);
          return c;
        };

        const chairSpots = [
          { x: -15, z: -9.2, ry: 0 },
          { x: -5, z: -9.2, ry: 0 },
          { x: 5, z: -9.2, ry: 0 },
          { x: 15, z: -9.2, ry: 0 },
          { x: -15, z: 0.8, ry: 0 },
          { x: -5, z: 0.8, ry: 0 },
          { x: 5, z: 0.8, ry: 0 },
          { x: 15, z: 0.8, ry: 0 },
          { x: -10, z: 8.8, ry: 0 },
          { x: 0, z: 8.8, ry: 0 },
          { x: 10, z: 8.8, ry: 0 },
          { x: -10, z: -7.2, ry: 0 },
        ];

        const createCharacter = (
          name: string,
          role: string,
          x: number,
          z: number,
          shirtColor: number,
          characterData: any
        ) => {
          const group = new THREE.Group();

          const torsoGeometry = new THREE.CylinderGeometry(0.25, 0.3, 0.8, 8);
          const torsoMaterial = new THREE.MeshStandardMaterial({
            color: new THREE.Color(shirtColor),
          });
          const torso = new THREE.Mesh(torsoGeometry, torsoMaterial);
          torso.position.y = 0.6;
          torso.castShadow = true;
          group.add(torso);

          const armGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.6, 6);
          const armMaterial = new THREE.MeshStandardMaterial({
            color: new THREE.Color(shirtColor),
          });

          const leftArm = new THREE.Mesh(armGeometry, armMaterial);
          leftArm.position.set(-0.3, 0.7, 0);
          leftArm.rotation.z = Math.PI / 8;
          group.add(leftArm);

          const rightArm = new THREE.Mesh(armGeometry, armMaterial);
          rightArm.position.set(0.3, 0.7, 0);
          rightArm.rotation.z = -Math.PI / 8;
          group.add(rightArm);

          const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.8, 6);
          const legMaterial = new THREE.MeshStandardMaterial({
            color: new THREE.Color(0x2c3e50),
          });

          const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
          leftLeg.position.set(-0.15, 0.4, 0);
          group.add(leftLeg);

          const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
          rightLeg.position.set(0.15, 0.4, 0);
          group.add(rightLeg);

          const headGeometry = new THREE.SphereGeometry(0.25, 8, 6);
          const headMaterial = new THREE.MeshStandardMaterial({
            color: new THREE.Color(0xffdbac),
          });
          const head = new THREE.Mesh(headGeometry, headMaterial);
          head.position.y = 1.25;
          head.castShadow = true;
          group.add(head);

          const hairGeometry = new THREE.SphereGeometry(0.27, 8, 6);
          const hairMaterial = new THREE.MeshStandardMaterial({
            color: new THREE.Color(characterData.hairColor),
          });
          const hair = new THREE.Mesh(hairGeometry, hairMaterial);
          hair.position.y = 1.35;
          hair.scale.y = 0.6;
          group.add(hair);

          const eyeGeometry = new THREE.SphereGeometry(0.03, 4, 4);
          const eyeMaterial = new THREE.MeshStandardMaterial({
            color: new THREE.Color(0x000000),
          });

          const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
          leftEye.position.set(-0.08, 1.25, 0.22);
          group.add(leftEye);

          const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
          rightEye.position.set(0.08, 1.25, 0.22);
          group.add(rightEye);

          const canvas = document.createElement("canvas");
          canvas.width = 256;
          canvas.height = 64;
          const context = canvas.getContext("2d");
          if (context) {
            context.fillStyle = "rgba(255, 255, 255, 0.92)";
            context.fillRect(0, 0, 256, 64);
            context.fillStyle = "#0b1220";
            context.font = "bold 20px system-ui, -apple-system, Segoe UI, Roboto";
            context.textAlign = "center";
            context.fillText(name, 128, 25);
            context.font = "16px system-ui, -apple-system, Segoe UI, Roboto";
            context.fillStyle = "#64748b";
            context.fillText(role, 128, 48);
          }

          const texture = new THREE.CanvasTexture(canvas);
          texture.colorSpace = THREE.SRGBColorSpace;
          const labelMaterial = new THREE.SpriteMaterial({ map: texture });
          const label = new THREE.Sprite(labelMaterial);
          label.position.y = 1.8;
          label.scale.set(2, 0.5, 1);
          group.add(label);

          if (characterData?.seated) {
            torso.position.y = 0.95;
            leftArm.position.y = 1.05;
            rightArm.position.y = 1.05;

            leftLeg.rotation.x = Math.PI / 2;
            rightLeg.rotation.x = Math.PI / 2;
            leftLeg.position.set(-0.15, 0.55, 0.25);
            rightLeg.position.set(0.15, 0.55, 0.25);

            head.position.y = 1.6;
            hair.position.y = 1.7;
            leftEye.position.y = 1.6;
            rightEye.position.y = 1.6;
            label.position.y = 2.15;
          }

          group.position.set(x, 0, z);
          group.rotation.y = characterData?.ry ?? 0;
          group.userData = { name, role, ...characterData };

          officeGroup.add(group);
          return group;
        };

        const team = [
          {
            name: "Pravin",
            role: "Co-founder",
            spotIdx: 0,
            shirt: 0xff6b6b,
            hair: 0x2d3436,
            seated: true,
          },
          {
            name: "Sarthak",
            role: "Co-founder",
            spotIdx: 3,
            shirt: 0x4ecdc4,
            hair: 0x34495e,
            seated: true,
          },
          {
            name: "Sahil",
            role: "Developer",
            spotIdx: 4,
            shirt: 0xf39c12,
            hair: 0x5f3b23,
            seated: true,
          },
          {
            name: "Shivam",
            role: "Developer",
            spotIdx: 5,
            shirt: 0x9b59b6,
            hair: 0x3e2723,
            seated: true,
          },
          {
            name: "Satish",
            role: "Developer",
            spotIdx: 6,
            shirt: 0x3498db,
            hair: 0x424242,
            seated: true,
          },
          {
            name: "Sagar",
            role: "UI/UX Designer",
            spotIdx: 8,
            shirt: 0xe74c3c,
            hair: 0x4a2c2a,
            seated: true,
          },
          {
            name: "Ridhima",
            role: "UI/UX Designer",
            spotIdx: 9,
            shirt: 0xff69b4,
            hair: 0x6a1b4d,
            seated: true,
          },
          {
            name: "Antra",
            role: "UI/UX Designer",
            spotIdx: 10,
            shirt: 0xffd93d,
            hair: 0x4e342e,
            seated: true,
          },
          {
            name: "Om",
            role: "Flutter Developer",
            spotIdx: 7,
            shirt: 0x00d2ff,
            hair: 0x1a1a1a,
            seated: true,
          },
          {
            name: "Vishal",
            role: "Flutter Developer",
            spotIdx: 1,
            shirt: 0x6bcf7f,
            hair: 0x3d2817,
            seated: true,
          },
          {
            name: "Amit",
            role: "Management",
            spotIdx: 2,
            shirt: 0xff8c00,
            hair: 0x2c2c2c,
            seated: true,
          },
          {
            name: "Ajay",
            role: "Management",
            spotIdx: 11,
            shirt: 0x20b2aa,
            hair: 0x1a1a1a,
            seated: true,
          },
        ];

        team.forEach((m) => {
          const s = chairSpots[m.spotIdx];
          const inCeoCabin = m.name === "Pravin";

          const z = inCeoCabin ? -18.2 : s.z;
          const x = inCeoCabin ? 0 : s.x;

          if (inCeoCabin) {
            makeDesk(0, -20.3, 1.25);
            makeChair(0, -18.6);
          } else {
            makeDesk(x, z - 2.1);
            makeChair(x, z);
          }

          createCharacter(m.name, m.role, x, z, m.shirt, {
            hairColor: m.hair,
            seated: true,
            ry: s.ry,
          });
        });

        const wallSignCanvas = document.createElement("canvas");
        wallSignCanvas.width = 1024;
        wallSignCanvas.height = 256;
        const wallCtx = wallSignCanvas.getContext("2d");
        if (wallCtx) {
          const g = wallCtx.createLinearGradient(0, 0, 1024, 256);
          g.addColorStop(0, "#0b1220");
          g.addColorStop(1, "#101b2f");
          wallCtx.fillStyle = g;
          wallCtx.fillRect(0, 0, 1024, 256);
          wallCtx.fillStyle = "rgba(255,255,255,0.08)";
          wallCtx.fillRect(64, 32, 256, 192);
          wallCtx.fillStyle = "rgba(255,255,255,0.92)";
          wallCtx.font = "800 92px system-ui, -apple-system, Segoe UI, Roboto";
          wallCtx.textAlign = "left";
          wallCtx.textBaseline = "middle";
          wallCtx.fillText("XARDENT", 360, 112);
          wallCtx.fillStyle = "rgba(255,255,255,0.75)";
          wallCtx.font = "500 30px system-ui, -apple-system, Segoe UI, Roboto";
          wallCtx.fillText("Office • Product • Engineering", 364, 176);
        }
        const wallTex = new THREE.CanvasTexture(wallSignCanvas);
        wallTex.colorSpace = THREE.SRGBColorSpace;
        const wallSign = new THREE.Mesh(
          new THREE.PlaneGeometry(18, 4.5),
          new THREE.MeshStandardMaterial({
            map: wallTex,
            roughness: 0.4,
            metalness: 0.05,
            emissive: new THREE.Color(0x101020),
            emissiveIntensity: 0.55,
          })
        );
        wallSign.position.set(0, 6.4, -22.65);
        officeGroup.add(wallSign);

        const player = new THREE.Group();
        player.position.set(0, 0, 18);
        scene.add(player);

        const clampBound = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
        const eyeHeight = 1.65;
        let camYaw = 0;
        let camPitch = 0;
        let pointerLocked = false;
        const camEuler = new THREE.Euler(0, 0, 0, "YXZ");

        const attachFirstPersonCamera = () => {
          const el = renderer.domElement as HTMLCanvasElement;

          const onClick = () => {
            if (document.pointerLockElement !== el) {
              el.requestPointerLock?.();
            }
          };

          const onPointerLockChange = () => {
            pointerLocked = document.pointerLockElement === el;
          };

          const onMouseMove = (e: MouseEvent) => {
            if (!pointerLocked) return;
            camYaw -= e.movementX * 0.0022;
            camPitch -= e.movementY * 0.0022;
            camPitch = clampBound(camPitch, -1.12, 1.12);
          };

          el.addEventListener("click", onClick);
          document.addEventListener("pointerlockchange", onPointerLockChange);
          document.addEventListener("mousemove", onMouseMove);

          detachCameraControls = () => {
            el.removeEventListener("click", onClick);
            document.removeEventListener("pointerlockchange", onPointerLockChange);
            document.removeEventListener("mousemove", onMouseMove);
            detachCameraControls = null;
          };
        };

        const updateFirstPersonCamera = () => {
          camEuler.set(camPitch, camYaw, 0);
          camera.quaternion.setFromEuler(camEuler);
          camera.position.set(player.position.x, player.position.y + eyeHeight, player.position.z);
          player.rotation.y = camYaw;
        };

        attachFirstPersonCamera();
        updateFirstPersonCamera();

        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);

        const clock = new THREE.Clock();

        const animate = () => {
          const dt = Math.min(clock.getDelta(), 0.033);

          const moveX = (keys.d ? 1 : 0) - (keys.a ? 1 : 0);
          const moveZ = (keys.w ? 1 : 0) - (keys.s ? 1 : 0);

          if (moveX !== 0 || moveZ !== 0) {
            const forward = new THREE.Vector3();
            camera.getWorldDirection(forward);
            forward.y = 0;
            forward.normalize();
            const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0));
            right.normalize();

            const dir = new THREE.Vector3();
            dir.addScaledVector(forward, moveZ);
            dir.addScaledVector(right, moveX);
            if (dir.lengthSq() > 0) dir.normalize();

            const speed = 5.0;
            player.position.addScaledVector(dir, speed * dt);

            player.position.x = clampBound(player.position.x, -29.5, 29.5);
            player.position.z = clampBound(player.position.z, -20.5, 20.5);
          }

          updateFirstPersonCamera();
          renderer.render(scene, camera);
          raf = requestAnimationFrame(animate);
        };

        window.addEventListener("resize", onResize);
        onResize();

        setStatus("ready");
        animate();
      } catch (err) {
        if (!disposed) {
          setErrorMessage(err instanceof Error ? err.message : String(err));
          setStatus("error");
        }
      }
    };

    run();
    return cleanup;
  }, []);

  return (
    <main className="relative w-full overflow-hidden bg-black" style={{ height: "100vh" }}>
      <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10">
        <div className="mx-auto flex max-w-6xl items-start justify-between gap-4 px-4 pt-20 md:pt-24">
          <div className="rounded-2xl border border-white/10 bg-black/45 px-4 py-3 text-white backdrop-blur">
            <div className="text-sm font-semibold tracking-wide">
              Our Team — Office Interior
            </div>
            <div className="mt-1 text-xs text-white/80">
              Click scene to look (mouse lock) • WASD to walk • Esc to unlock
            </div>
            <div className="mt-2 text-[11px] text-white/70">
              Team members are seated at their desks • CEO Cabin included
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/45 px-4 py-3 text-white/90 backdrop-blur">
            <div className="text-xs">
              Status: {status === "loading" ? "Loading…" : status === "ready" ? "Ready" : "Failed"}
            </div>
            {status === "error" && errorMessage ? (
              <div className="mt-1 max-w-[320px] text-[11px] text-white/70">
                {errorMessage}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {status !== "ready" ? (
        <div className="absolute inset-0 grid place-items-center">
          <div className="rounded-2xl border border-white/10 bg-black/55 px-5 py-4 text-sm text-white backdrop-blur">
            {status === "loading" ? "Loading 3D scene…" : "Could not load the 3D scene."}
          </div>
        </div>
      ) : null}
    </main>
  );
}
