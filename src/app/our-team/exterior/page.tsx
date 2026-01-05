"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function OurTeamExteriorPage() {
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
    let onInteract: ((e: KeyboardEvent) => void) | null = null;
    let weatherInterval: number | null = null;

    let insideOffice = false;

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

      if (weatherInterval) window.clearInterval(weatherInterval);

      if (detachCameraControls) detachCameraControls();

      if (renderer) {
        renderer.dispose?.();
        const el = renderer.domElement as HTMLCanvasElement | undefined;
        if (el?.parentElement) el.parentElement.removeChild(el);
      }

      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      if (onInteract) window.removeEventListener("keydown", onInteract);
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
        renderer.toneMappingExposure = 1.05;
        container.appendChild(renderer.domElement);

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x87c8ff);
        scene.fog = null;

        camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 600);
        camera.position.set(16, 12, 64);

        const streetLights: THREE.PointLight[] = [];
        const streetLamps: THREE.MeshStandardMaterial[] = [];

        let hemi: THREE.HemisphereLight;
        hemi = new THREE.HemisphereLight(0xcfe9ff, 0x2b2b2b, 0.55);
        scene.add(hemi);

        let sun: THREE.DirectionalLight;
        sun = new THREE.DirectionalLight(0xffffff, 1.15);
        sun.position.set(-20, 40, 20);
        sun.castShadow = true;
        sun.shadow.mapSize.width = 2048;
        sun.shadow.mapSize.height = 2048;
        sun.shadow.camera.near = 1;
        sun.shadow.camera.far = 140;
        sun.shadow.camera.left = -60;
        sun.shadow.camera.right = 60;
        sun.shadow.camera.top = 60;
        sun.shadow.camera.bottom = -60;
        scene.add(sun);

        const moon = new THREE.DirectionalLight(0x9fb6ff, 0.0);
        moon.position.set(26, 22, -18);
        moon.castShadow = false;
        scene.add(moon);

        const ambient = new THREE.AmbientLight(0xffffff, 0.0);
        scene.add(ambient);

        const groundMat = new THREE.MeshStandardMaterial({
          color: 0x2f8f4a,
          roughness: 1,
        });
        const ground = new THREE.Mesh(
          new THREE.PlaneGeometry(260, 260),
          groundMat
        );
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.08;
        ground.receiveShadow = true;
        scene.add(ground);

        const roadGroup = new THREE.Group();
        const roadMat = new THREE.MeshStandardMaterial({
          color: 0x1f2227,
          roughness: 0.95,
          metalness: 0,
        });
        const road = new THREE.Mesh(new THREE.BoxGeometry(14.6, 0.08, 200), roadMat);
        road.position.set(0, 0.04, 0);
        road.receiveShadow = true;
        roadGroup.add(road);

        const sidewalkMat = new THREE.MeshStandardMaterial({
          color: 0xc7c7c7,
          roughness: 1,
        });
        const sidewalkLeft = new THREE.Mesh(
          new THREE.BoxGeometry(4.2, 0.12, 200),
          sidewalkMat
        );
        sidewalkLeft.position.set(-9.6, 0.06, 0);
        sidewalkLeft.receiveShadow = true;
        roadGroup.add(sidewalkLeft);

        const sidewalkRight = sidewalkLeft.clone();
        sidewalkRight.position.x = 9.5;
        roadGroup.add(sidewalkRight);

        const lineMat = new THREE.MeshStandardMaterial({
          color: 0xf1f1f1,
          roughness: 0.8,
        });
        for (let i = 0; i < 36; i++) {
          const dash = new THREE.Mesh(
            new THREE.PlaneGeometry(0.18, 1.8),
            lineMat
          );
          dash.rotation.x = -Math.PI / 2;
          dash.position.set(0, 0.085, -95 + i * 5.4);
          roadGroup.add(dash);
        }

        const edgeLineMat = new THREE.MeshStandardMaterial({
          color: 0xffe08a,
          roughness: 0.8,
        });
        const edgeLineGeo = new THREE.PlaneGeometry(0.12, 200);
        const edgeLeft = new THREE.Mesh(edgeLineGeo, edgeLineMat);
        edgeLeft.rotation.x = -Math.PI / 2;
        edgeLeft.position.set(-6.9, 0.085, 0);
        roadGroup.add(edgeLeft);

        const edgeRight = edgeLeft.clone();
        edgeRight.position.x = 6.9;
        roadGroup.add(edgeRight);

        scene.add(roadGroup);

        const buildingGroup = new THREE.Group();
        buildingGroup.position.set(-28, 0, -10);
        buildingGroup.rotation.y = Math.PI / 2;
        buildingGroup.scale.set(1.6, 1.6, 1.4);

        const concrete = new THREE.MeshStandardMaterial({
          color: 0xe8edf2,
          roughness: 0.85,
        });
        const openingW = 12.4;
        const openingH = 7.2;
        const doorSystemH = 4.2;
        const depth = 20;

        const openingSideW = (34 - openingW) / 2;
        const leftBlock = new THREE.Mesh(
          new THREE.BoxGeometry(openingSideW, 16, depth), concrete);
        leftBlock.position.set(-(openingW / 2 + openingSideW / 2), 8, 0);
        leftBlock.castShadow = true;
        leftBlock.receiveShadow = true;
        buildingGroup.add(leftBlock);

        const rightBlock = leftBlock.clone();
        rightBlock.position.x = openingW / 2 + openingSideW / 2;
        buildingGroup.add(rightBlock);

        const topH = 16 - openingH;
        const topBlock = new THREE.Mesh(new THREE.BoxGeometry(openingW, topH, depth), concrete);
        topBlock.position.set(0, openingH + topH / 2, 0);
        topBlock.castShadow = true;
        topBlock.receiveShadow = true;
        buildingGroup.add(topBlock);

        const aboveDoorH = Math.max(0, openingH - doorSystemH);
        if (aboveDoorH > 0.01) {
          const transomWall = new THREE.Mesh(
            new THREE.BoxGeometry(openingW, aboveDoorH, 0.6),
            concrete
          );
          transomWall.position.set(0, doorSystemH + aboveDoorH / 2, 9.8);
          transomWall.castShadow = true;
          transomWall.receiveShadow = true;
          buildingGroup.add(transomWall);
        }

        const backWall = new THREE.Mesh(new THREE.BoxGeometry(34, 16, 0.6), concrete);
        backWall.position.set(0, 8, -depth / 2 + 0.3);
        backWall.castShadow = true;
        backWall.receiveShadow = true;
        buildingGroup.add(backWall);

        const darker = new THREE.MeshStandardMaterial({
          color: 0xcfd7e1,
          roughness: 0.9,
        });
        const bandDepth = 20.4;
        const bandH = 1.2;
        const bandSideW = (34.4 - openingW) / 2;
        const bandLeft = new THREE.Mesh(
          new THREE.BoxGeometry(bandSideW, bandH, bandDepth),
          darker
        );
        bandLeft.position.set(-(openingW / 2 + bandSideW / 2), 2.0, 0);
        bandLeft.castShadow = true;
        bandLeft.receiveShadow = true;
        buildingGroup.add(bandLeft);

        const bandRight = bandLeft.clone();
        bandRight.position.x = openingW / 2 + bandSideW / 2;
        buildingGroup.add(bandRight);

        const glass = new THREE.MeshPhysicalMaterial({
          color: 0x9fdcff,
          roughness: 0.08,
          metalness: 0.0,
          transmission: 0.88,
          thickness: 0.25,
          transparent: true,
          opacity: 1,
        });

        const windowRows = [
          { y: 10.8, h: 2.6 },
          { y: 7.3, h: 2.6 },
          { y: 3.8, h: 2.6 },
        ];

        const facadeZ = 10.15;
        const facadeHalfW = 34 / 2;
        const openingHalfW = openingW / 2;
        const facadeSidePaneW = Math.max(0.6, facadeHalfW - openingHalfW);

        windowRows.forEach((row) => {
          const leftPane = new THREE.Mesh(
            new THREE.PlaneGeometry(facadeSidePaneW, row.h),
            glass
          );
          leftPane.position.set(-(openingHalfW + facadeSidePaneW / 2), row.y, facadeZ);
          leftPane.castShadow = false;
          buildingGroup.add(leftPane);

          const rightPane = leftPane.clone();
          rightPane.position.x = openingHalfW + facadeSidePaneW / 2;
          buildingGroup.add(rightPane);

          if (row.y > openingH) {
            const topCenterPane = new THREE.Mesh(
              new THREE.PlaneGeometry(openingW, row.h),
              glass
            );
            topCenterPane.position.set(0, row.y, facadeZ);
            topCenterPane.castShadow = false;
            buildingGroup.add(topCenterPane);
          }
        });

        const entrance = new THREE.Group();
        entrance.position.set(0, 0, 10.18);
        buildingGroup.add(entrance);

        const triggerMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
        const door = new THREE.Mesh(new THREE.BoxGeometry(4.8, doorSystemH, 1.6), triggerMat);
        door.position.set(0, 2.1, 0.75);
        entrance.add(door);

        const frameMat = new THREE.MeshStandardMaterial({
          color: 0xf1f5f9,
          roughness: 0.28,
          metalness: 0.75,
        });
        const frameDark = new THREE.MeshStandardMaterial({
          color: 0xcbd5e1,
          roughness: 0.35,
          metalness: 0.65,
        });
        const doorGlassMat = new THREE.MeshStandardMaterial({
          color: 0x8fd3ff,
          roughness: 0.08,
          metalness: 0,
          transparent: true,
          opacity: 0.48,
          side: THREE.DoubleSide,
          depthWrite: true,
          emissive: new THREE.Color(0x163a52),
          emissiveIntensity: 0.06,
        });

        const doorSystem = new THREE.Group();
        doorSystem.position.set(0, 0.0, 0.12);
        entrance.add(doorSystem);

        const sysW = openingW - 0.2;
        const sysH = doorSystemH;
        const sysD = 0.12;
        const border = 0.12;
        const doorH = sysH;
        const sidePaneW = 0.0;
        const doorOpeningW = sysW - sidePaneW * 2;

        const leftPost = new THREE.Mesh(new THREE.BoxGeometry(border, sysH, sysD), frameMat);
        leftPost.position.set(-sysW / 2 + border / 2, sysH / 2, 0);
        leftPost.castShadow = true;
        doorSystem.add(leftPost);
        const rightPost = leftPost.clone();
        rightPost.position.x = sysW / 2 - border / 2;
        doorSystem.add(rightPost);

        const topBeam = new THREE.Mesh(new THREE.BoxGeometry(sysW, border, sysD), frameMat);
        topBeam.position.set(0, sysH - border / 2, 0);
        topBeam.castShadow = true;
        doorSystem.add(topBeam);
        const bottomBeam = topBeam.clone();
        bottomBeam.position.y = border / 2;
        doorSystem.add(bottomBeam);

        const sideGlassGeo = new THREE.PlaneGeometry(0.001, 0.001);
        const sideLeftGlass = new THREE.Mesh(sideGlassGeo, doorGlassMat);
        sideLeftGlass.visible = false;
        doorSystem.add(sideLeftGlass);

        const doorLeafW = doorOpeningW / 2 + 0.08;
        const leafFrameT = 0.08;
        const leaf = (isLeft: boolean, flip: 1 | -1) => {
          const g = new THREE.Group();

          const outerStile = new THREE.Mesh(
            new THREE.BoxGeometry(leafFrameT, doorH, sysD),
            frameDark
          );
          outerStile.position.set(
            (isLeft ? -doorLeafW / 2 + leafFrameT / 2 : doorLeafW / 2 - leafFrameT / 2),
            doorH / 2,
            0
          );
          g.add(outerStile);

          const innerStile = outerStile.clone();
          innerStile.position.x = isLeft
            ? doorLeafW / 2 - leafFrameT / 2
            : -doorLeafW / 2 + leafFrameT / 2;
          innerStile.scale.x = 0.35;
          innerStile.material = frameDark;
          innerStile.visible = false;
          g.add(innerStile);
          const railT = new THREE.Mesh(new THREE.BoxGeometry(doorLeafW, leafFrameT, sysD), frameDark);
          railT.position.set(0, doorH - leafFrameT / 2, 0);
          g.add(railT);
          const railB = railT.clone();
          railB.position.y = leafFrameT / 2;
          g.add(railB);

          const pane = new THREE.Mesh(
            new THREE.BoxGeometry(
              doorLeafW - leafFrameT * 2.2,
              doorH - leafFrameT * 2.2,
              0.02
            ),
            doorGlassMat
          );
          pane.position.set(0, doorH / 2, 0);
          g.add(pane);

          const handle = new THREE.Mesh(
            new THREE.CylinderGeometry(0.035, 0.035, 0.65, 12),
            new THREE.MeshStandardMaterial({ color: 0xe5e7eb, roughness: 0.25, metalness: 0.85 })
          );
          handle.rotation.z = Math.PI / 2;
          handle.position.set(flip * (doorLeafW * 0.14), 2.1, sysD / 2 + 0.05);
          g.add(handle);

          return g;
        };

        const meetOverlap = 0.04;
        const leftClosedX = -doorOpeningW / 4 + meetOverlap / 2;
        const rightClosedX = doorOpeningW / 4 - meetOverlap / 2;

        const leftLeaf = leaf(true, -1);
        leftLeaf.position.set(leftClosedX, 0, 0);
        doorSystem.add(leftLeaf);
        const rightLeaf = leaf(false, 1);
        rightLeaf.position.set(rightClosedX, 0, 0);
        doorSystem.add(rightLeaf);

        const sensor = new THREE.Mesh(
          new THREE.SphereGeometry(0.09, 12, 10),
          new THREE.MeshStandardMaterial({ color: 0x0b1220, roughness: 0.6, metalness: 0.1 })
        );
        sensor.position.set(0, sysH - 0.45, sysD / 2 + 0.08);
        doorSystem.add(sensor);

        let slideOpenT = 0;

        const lobby = new THREE.Group();
        lobby.position.set(0, 0.0, 6.4);
        buildingGroup.add(lobby);

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
            const sat = 42 + Math.random() * 12;
            const light = 30 + Math.random() * 12;
            woodCtx.fillStyle = `hsl(${hue} ${sat}% ${light}%)`;
            woodCtx.fillRect(x, 0, plankW - 2, 1024);
            woodCtx.fillStyle = "rgba(0,0,0,0.12)";
            woodCtx.fillRect(x + plankW - 2, 0, 2, 1024);
            for (let i = 0; i < 16; i++) {
              const yy = Math.random() * 1024;
              const len = 40 + Math.random() * 240;
              woodCtx.strokeStyle = "rgba(0,0,0,0.08)";
              woodCtx.lineWidth = 1;
              woodCtx.beginPath();
              woodCtx.moveTo(x + 10 + Math.random() * (plankW - 20), yy);
              woodCtx.lineTo(x + 10 + Math.random() * (plankW - 20), yy + len);
              woodCtx.stroke();
            }
          }
        }
        const woodTex = new THREE.CanvasTexture(woodCanvas);
        woodTex.colorSpace = THREE.SRGBColorSpace;
        woodTex.wrapS = THREE.RepeatWrapping;
        woodTex.wrapT = THREE.RepeatWrapping;
        woodTex.repeat.set(2.4, 1.5);
        woodTex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
        woodTex.needsUpdate = true;

        const lobbyFloor = new THREE.Mesh(
          new THREE.BoxGeometry(12.2, 0.16, 9.8),
          new THREE.MeshStandardMaterial({ map: woodTex, roughness: 0.55, metalness: 0.08 })
        );
        lobbyFloor.position.set(0, 0.08, 0);
        lobbyFloor.receiveShadow = true;
        lobby.add(lobbyFloor);

        const rug = new THREE.Mesh(
          new THREE.BoxGeometry(10.6, 0.06, 7.6),
          new THREE.MeshStandardMaterial({ color: 0xd7d3c8, roughness: 0.95 })
        );
        rug.position.set(0, 0.15, 0);
        rug.receiveShadow = true;
        lobby.add(rug);

        const lobbyCeil = new THREE.Mesh(
          new THREE.BoxGeometry(12.2, 0.2, 9.8),
          new THREE.MeshStandardMaterial({ color: 0xf3f4f6, roughness: 0.95 })
        );
        lobbyCeil.position.set(0, 4.2, 0);
        lobbyCeil.receiveShadow = false;
        lobby.add(lobbyCeil);

        const lobbyLight = new THREE.PointLight(0xffffff, 1.65, 26, 2);
        lobbyLight.castShadow = false;
        lobbyLight.position.set(0, 3.9, -0.4);
        lobby.add(lobbyLight);

        const lobbyFill = new THREE.PointLight(0xfff2d1, 0.95, 24, 2);
        lobbyFill.castShadow = false;
        lobbyFill.position.set(0, 2.8, 2.2);
        lobby.add(lobbyFill);

        const lobbySideMat = new THREE.MeshStandardMaterial({ color: 0xe8edf2, roughness: 0.95 });
        const lobbySideL = new THREE.Mesh(new THREE.PlaneGeometry(9.8, 4.6), lobbySideMat);
        lobbySideL.position.set(-6.05, 2.3, 0);
        lobbySideL.rotation.y = Math.PI / 2;
        lobby.add(lobbySideL);
        const lobbySideR = lobbySideL.clone();
        lobbySideR.position.x = 6.05;
        lobbySideR.rotation.y = -Math.PI / 2;
        lobby.add(lobbySideR);

        const officeInterior = new THREE.Group();
        officeInterior.position.set(0, 0, -1.3);
        officeInterior.scale.set(0.38, 0.38, 0.38);
        buildingGroup.add(officeInterior);

        const officeHemi = new THREE.HemisphereLight(0xcfe9ff, 0x0a0d12, 0.38);
        officeInterior.add(officeHemi);
        const officeAmbient = new THREE.AmbientLight(0xffffff, 0.18);
        officeInterior.add(officeAmbient);

        const interiorWoodCanvas = document.createElement("canvas");
        interiorWoodCanvas.width = 1024;
        interiorWoodCanvas.height = 1024;
        const interiorWoodCtx = interiorWoodCanvas.getContext("2d");
        if (interiorWoodCtx) {
          interiorWoodCtx.fillStyle = "#7a4e2d";
          interiorWoodCtx.fillRect(0, 0, 1024, 1024);

          const plankW = 128;
          for (let x = 0; x < 1024; x += plankW) {
            const hue = 24 + Math.random() * 10;
            const sat = 42 + Math.random() * 10;
            const light = 30 + Math.random() * 10;
            interiorWoodCtx.fillStyle = `hsl(${hue} ${sat}% ${light}%)`;
            interiorWoodCtx.fillRect(x, 0, plankW - 2, 1024);
            interiorWoodCtx.fillStyle = "rgba(0,0,0,0.12)";
            interiorWoodCtx.fillRect(x + plankW - 2, 0, 2, 1024);

            for (let i = 0; i < 18; i++) {
              const yy = Math.random() * 1024;
              const len = 20 + Math.random() * 220;
              interiorWoodCtx.strokeStyle = "rgba(0,0,0,0.08)";
              interiorWoodCtx.lineWidth = 1;
              interiorWoodCtx.beginPath();
              interiorWoodCtx.moveTo(x + 10 + Math.random() * (plankW - 20), yy);
              interiorWoodCtx.lineTo(x + 10 + Math.random() * (plankW - 20), yy + len);
              interiorWoodCtx.stroke();
            }
          }

          interiorWoodCtx.fillStyle = "rgba(255,255,255,0.04)";
          for (let i = 0; i < 1200; i++) {
            const px = Math.random() * 1024;
            const py = Math.random() * 1024;
            interiorWoodCtx.fillRect(px, py, 1, 1);
          }
        }

        const interiorWoodTex = new THREE.CanvasTexture(interiorWoodCanvas);
        interiorWoodTex.colorSpace = THREE.SRGBColorSpace;
        interiorWoodTex.wrapS = THREE.RepeatWrapping;
        interiorWoodTex.wrapT = THREE.RepeatWrapping;
        interiorWoodTex.repeat.set(3.2, 2.2);
        interiorWoodTex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
        interiorWoodTex.needsUpdate = true;

        const officeFloorMat = new THREE.MeshStandardMaterial({
          map: interiorWoodTex,
          roughness: 0.55,
          metalness: 0.08,
        });
        const officeFloor = new THREE.Mesh(new THREE.BoxGeometry(64, 0.2, 46), officeFloorMat);
        officeFloor.position.set(0, -0.1, 0);
        officeFloor.receiveShadow = true;
        officeInterior.add(officeFloor);

        const officeWallMat = new THREE.MeshStandardMaterial({
          color: 0xe8edf2,
          roughness: 0.92,
          metalness: 0,
        });
        const officeWallBack = new THREE.Mesh(new THREE.BoxGeometry(64, 10, 0.6), officeWallMat);
        officeWallBack.position.set(0, 5, -23);
        officeWallBack.castShadow = true;
        officeWallBack.receiveShadow = true;
        officeInterior.add(officeWallBack);

        const officeWallLeft = new THREE.Mesh(new THREE.BoxGeometry(0.6, 10, 46), officeWallMat);
        officeWallLeft.position.set(-32, 5, 0);
        officeWallLeft.castShadow = true;
        officeWallLeft.receiveShadow = true;
        officeInterior.add(officeWallLeft);

        const officeWallRight = officeWallLeft.clone();
        officeWallRight.position.x = 32;
        officeInterior.add(officeWallRight);

        const officeCeilingMat = new THREE.MeshStandardMaterial({
          color: 0xb7c1cb,
          roughness: 0.95,
        });
        const officeCeiling = new THREE.Mesh(new THREE.BoxGeometry(64, 0.35, 46), officeCeilingMat);
        officeCeiling.position.set(0, 10.1, 0);
        officeCeiling.receiveShadow = true;
        officeInterior.add(officeCeiling);

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
          officeInterior.add(panel);

          const light = new THREE.PointLight(0xffffff, 0.65, 22, 2);
          light.position.set(x, 9.5, z);
          light.castShadow = false;
          officeInterior.add(light);
        };

        for (let rz = -16; rz <= 16; rz += 8) {
          makeCeilingPanel(-14, rz);
          makeCeilingPanel(0, rz);
          makeCeilingPanel(14, rz);
        }

        const officeCarpetMat = new THREE.MeshStandardMaterial({
          color: 0xd7d3c8,
          roughness: 0.95,
          metalness: 0,
        });
        const officeCarpet = new THREE.Mesh(new THREE.BoxGeometry(58, 0.08, 40), officeCarpetMat);
        officeCarpet.position.set(0, 0.01, 0);
        officeCarpet.receiveShadow = true;
        officeInterior.add(officeCarpet);

        const officeGlassWallMat = new THREE.MeshPhysicalMaterial({
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

          const back = new THREE.Mesh(new THREE.BoxGeometry(w2, h, t), officeGlassWallMat);
          back.position.set(0, h / 2, -d2 / 2);
          cabin.add(back);

          const left = new THREE.Mesh(new THREE.BoxGeometry(t, h, d2), officeGlassWallMat);
          left.position.set(-w2 / 2, h / 2, 0);
          cabin.add(left);

          const right = left.clone();
          right.position.x = w2 / 2;
          cabin.add(right);

          const frontLeft = new THREE.Mesh(new THREE.BoxGeometry(w2 / 2 - 1.1, h, t), officeGlassWallMat);
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

          officeInterior.add(cabin);
          return cabin;
        };

        createCabin("CEO Cabin", 0, -15.5, 22, 13);

        const deskMat = new THREE.MeshStandardMaterial({
          color: 0x0f172a,
          roughness: 0.5,
          metalness: 0.25,
        });
        const deskWoodMat = new THREE.MeshStandardMaterial({
          color: 0x7a4e2d,
          roughness: 0.85,
        });

        const makeDesk = (x: number, z: number, scale = 1) => {
          const g = new THREE.Group();
          const top = new THREE.Mesh(new THREE.BoxGeometry(2.7 * scale, 0.14, 1.3 * scale), deskWoodMat);
          top.position.set(0, 1.0 * scale, 0);
          top.castShadow = true;
          top.receiveShadow = true;
          g.add(top);

          const frame = new THREE.Mesh(new THREE.BoxGeometry(2.75 * scale, 0.06, 1.35 * scale), deskMat);
          frame.position.set(0, 0.92 * scale, 0);
          frame.castShadow = true;
          g.add(frame);

          const legGeo = new THREE.CylinderGeometry(0.06 * scale, 0.06 * scale, 0.9 * scale, 10);
          const legs = [
            [-1.25 * scale, 0.46 * scale, -0.55 * scale],
            [1.25 * scale, 0.46 * scale, -0.55 * scale],
            [-1.25 * scale, 0.46 * scale, 0.55 * scale],
            [1.25 * scale, 0.46 * scale, 0.55 * scale],
          ];
          legs.forEach(([lx, ly, lz]) => {
            const leg = new THREE.Mesh(legGeo, deskMat);
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
          officeInterior.add(g);
          return g;
        };

        const makeChair = (x: number, z: number) => {
          const c = new THREE.Group();
          const seatMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.8 });

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
          officeInterior.add(c);
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
          const torsoMaterial = new THREE.MeshStandardMaterial({ color: new THREE.Color(shirtColor) });
          const torso = new THREE.Mesh(torsoGeometry, torsoMaterial);
          torso.position.y = 0.6;
          torso.castShadow = true;
          group.add(torso);

          const armGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.6, 6);
          const armMaterial = new THREE.MeshStandardMaterial({ color: new THREE.Color(shirtColor) });

          const leftArm = new THREE.Mesh(armGeometry, armMaterial);
          leftArm.position.set(-0.3, 0.7, 0);
          leftArm.rotation.z = Math.PI / 8;
          group.add(leftArm);

          const rightArm = new THREE.Mesh(armGeometry, armMaterial);
          rightArm.position.set(0.3, 0.7, 0);
          rightArm.rotation.z = -Math.PI / 8;
          group.add(rightArm);

          const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.8, 6);
          const legMaterial = new THREE.MeshStandardMaterial({ color: new THREE.Color(0x2c3e50) });

          const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
          leftLeg.position.set(-0.15, 0.4, 0);
          group.add(leftLeg);

          const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
          rightLeg.position.set(0.15, 0.4, 0);
          group.add(rightLeg);

          const headGeometry = new THREE.SphereGeometry(0.25, 8, 6);
          const headMaterial = new THREE.MeshStandardMaterial({ color: new THREE.Color(0xffdbac) });
          const head = new THREE.Mesh(headGeometry, headMaterial);
          head.position.y = 1.25;
          head.castShadow = true;
          group.add(head);

          const hairGeometry = new THREE.SphereGeometry(0.27, 8, 6);
          const hairMaterial = new THREE.MeshStandardMaterial({ color: new THREE.Color(characterData.hairColor) });
          const hair = new THREE.Mesh(hairGeometry, hairMaterial);
          hair.position.y = 1.35;
          hair.scale.y = 0.6;
          group.add(hair);

          const eyeGeometry = new THREE.SphereGeometry(0.03, 4, 4);
          const eyeMaterial = new THREE.MeshStandardMaterial({ color: new THREE.Color(0x000000) });

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

          officeInterior.add(group);
          return group;
        };

        const team = [
          { name: "Pravin", role: "Co-founder", spotIdx: 0, shirt: 0xff6b6b, hair: 0x2d3436, seated: true },
          { name: "Sarthak", role: "Co-founder", spotIdx: 3, shirt: 0x4ecdc4, hair: 0x34495e, seated: true },
          { name: "Sahil", role: "Developer", spotIdx: 4, shirt: 0xf39c12, hair: 0x5f3b23, seated: true },
          { name: "Shivam", role: "Developer", spotIdx: 5, shirt: 0x9b59b6, hair: 0x3e2723, seated: true },
          { name: "Satish", role: "Developer", spotIdx: 6, shirt: 0x3498db, hair: 0x424242, seated: true },
          { name: "Sagar", role: "UI/UX Designer", spotIdx: 8, shirt: 0xe74c3c, hair: 0x4a2c2a, seated: true },
          { name: "Ridhima", role: "UI/UX Designer", spotIdx: 9, shirt: 0xff69b4, hair: 0x6a1b4d, seated: true },
          { name: "Antra", role: "UI/UX Designer", spotIdx: 10, shirt: 0xffd93d, hair: 0x4e342e, seated: true },
          { name: "Om", role: "Flutter Developer", spotIdx: 7, shirt: 0x00d2ff, hair: 0x1a1a1a, seated: true },
          { name: "Vishal", role: "Flutter Developer", spotIdx: 1, shirt: 0x6bcf7f, hair: 0x3d2817, seated: true },
          { name: "Amit", role: "Management", spotIdx: 2, shirt: 0xff8c00, hair: 0x2c2c2c, seated: true },
          { name: "Ajay", role: "Management", spotIdx: 11, shirt: 0x20b2aa, hair: 0x1a1a1a, seated: true },
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
        officeInterior.add(wallSign);

        const signCanvas = document.createElement("canvas");
        signCanvas.width = 1024;
        signCanvas.height = 256;
        const signCtx = signCanvas.getContext("2d");
        if (!signCtx) throw new Error("Missing canvas context");

        const grd = signCtx.createLinearGradient(0, 0, 1024, 256);
        grd.addColorStop(0, "#0b1220");
        grd.addColorStop(1, "#101b2f");
        signCtx.fillStyle = grd;
        signCtx.fillRect(0, 0, 1024, 256);

        signCtx.fillStyle = "rgba(255,255,255,0.06)";
        for (let i = 0; i < 10; i++) {
          signCtx.fillRect(60 + i * 88, 14, 2, 228);
        }

        signCtx.fillStyle = "#ffffff";
        signCtx.font = "700 92px system-ui, -apple-system, Segoe UI, Roboto";
        signCtx.textBaseline = "middle";
        signCtx.fillText("XARDENT", 330, 128);

        signCtx.fillStyle = "rgba(255,255,255,0.75)";
        signCtx.font = "500 28px system-ui, -apple-system, Segoe UI, Roboto";
        signCtx.fillText("Software • AI • Automation", 334, 188);

        const signTex = new THREE.CanvasTexture(signCanvas);
        signTex.colorSpace = THREE.SRGBColorSpace;
        signTex.needsUpdate = true;

        const logoImg = new Image();
        logoImg.src = "/images/logo.svg";
        logoImg.onload = () => {
          if (disposed) return;
          signCtx.save();
          signCtx.globalCompositeOperation = "source-over";
          signCtx.fillStyle = "rgba(255,255,255,0.08)";
          signCtx.fillRect(42, 44, 240, 168);
          signCtx.restore();
          signCtx.drawImage(logoImg, 80, 64, 160, 128);
          signTex.needsUpdate = true;
        };

        const signMat = new THREE.MeshStandardMaterial({
          map: signTex,
          roughness: 0.35,
          metalness: 0.1,
          emissive: new THREE.Color(0x101020),
          emissiveIntensity: 0.65,
        });
        const sign = new THREE.Mesh(new THREE.PlaneGeometry(16, 4), signMat);
        sign.position.set(0, 13.1, 10.25);
        sign.castShadow = true;
        buildingGroup.add(sign);

        const lobbyGlow = new THREE.PointLight(0xfff2d1, 0.8, 22, 2);
        lobbyGlow.castShadow = false;
        lobbyGlow.position.set(0, 4, 7.5);
        buildingGroup.add(lobbyGlow);

        const roofTop = new THREE.Mesh(
          new THREE.BoxGeometry(36, 1.2, 22),
          new THREE.MeshStandardMaterial({ color: 0xb7c1cb, roughness: 0.95 })
        );
        roofTop.position.set(0, 16.4, 0);
        roofTop.castShadow = true;
        roofTop.receiveShadow = true;
        buildingGroup.add(roofTop);

        scene.add(buildingGroup);

        const player = new THREE.Group();
        const playerBody = new THREE.Mesh(
          new THREE.CapsuleGeometry(0.38, 1.1, 10, 18),
          new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.6 })
        );
        playerBody.castShadow = true;
        playerBody.position.y = 1.05;
        player.add(playerBody);

        const playerHead = new THREE.Mesh(
          new THREE.SphereGeometry(0.28, 18, 14),
          new THREE.MeshStandardMaterial({ color: 0xffdbac, roughness: 0.9 })
        );
        playerHead.castShadow = true;
        playerHead.position.y = 2.05;
        player.add(playerHead);

        player.position.set(-9.6, 0, 18);
        scene.add(player);

        const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

        const eyeHeight = 1.65;
        let camYaw = 0;
        let camPitch = 0;
        let pointerLocked = false;
        const camEuler = new THREE.Euler(0, 0, 0, "YXZ");

        const lookAtBuilding = new THREE.Vector3(-28 - player.position.x, 0, -10 - player.position.z);
        camYaw = Math.atan2(lookAtBuilding.x, lookAtBuilding.z);

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
            camPitch = clamp(camPitch, -1.12, 1.12);
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

        playerBody.visible = false;
        playerHead.visible = false;

        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);

        const makeStreetLight = (x: number, z: number) => {
          const g = new THREE.Group();
          const pole = new THREE.Mesh(
            new THREE.CylinderGeometry(0.14, 0.18, 7.5, 10),
            new THREE.MeshStandardMaterial({
              color: 0x2a2f3a,
              roughness: 0.8,
              metalness: 0.35,
            })
          );
          pole.position.y = 3.75;
          pole.castShadow = true;
          g.add(pole);

          const arm = new THREE.Mesh(
            new THREE.BoxGeometry(1.8, 0.14, 0.14),
            new THREE.MeshStandardMaterial({
              color: 0x2a2f3a,
              roughness: 0.8,
              metalness: 0.35,
            })
          );
          arm.position.set(0.9, 7.1, 0);
          arm.castShadow = true;
          g.add(arm);

          const lampMat = new THREE.MeshStandardMaterial({
            color: 0xfff0c9,
            emissive: 0xffe7b5,
            emissiveIntensity: 0.8,
            roughness: 0.35,
          });
          const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 10), lampMat);
          lamp.position.set(1.8, 7.1, 0);
          g.add(lamp);

          const light = new THREE.PointLight(0xfff0c9, 0.65, 26, 2);
          light.position.set(1.8, 7.1, 0);
          light.castShadow = false;
          g.add(light);

          (light as any).userData.baseIntensity = 0.65;
          streetLights.push(light);
          streetLamps.push(lampMat);

          g.position.set(x, 0, z);
          scene.add(g);
        };

        for (let i = 0; i < 9; i++) {
          makeStreetLight(-11.7, -90 + i * 18);
          makeStreetLight(11.7, -90 + i * 18);
        }

        let isRaining = false;
        let rainStrength = 0;

        const rainCount = 2200;
        const rainPositions = new Float32Array(rainCount * 3);
        const rainVel = new Float32Array(rainCount);
        for (let i = 0; i < rainCount; i++) {
          rainPositions[i * 3 + 0] = -50 + Math.random() * 100;
          rainPositions[i * 3 + 1] = 10 + Math.random() * 40;
          rainPositions[i * 3 + 2] = -120 + Math.random() * 240;
          rainVel[i] = 18 + Math.random() * 20;
        }
        const rainGeo = new THREE.BufferGeometry();
        rainGeo.setAttribute("position", new THREE.BufferAttribute(rainPositions, 3));
        const rainMat = new THREE.PointsMaterial({
          color: 0xaadfff,
          size: 0.09,
          transparent: true,
          opacity: 0.65,
          depthWrite: false,
        });
        const rain = new THREE.Points(rainGeo, rainMat);
        rain.visible = false;
        scene.add(rain);

        const roadDryColor = new THREE.Color(0x1f2227);
        const roadWetColor = new THREE.Color(0x14171c);

        const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
        const smooth01 = (x: number) => x * x * (3 - 2 * x);
        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

        const getDayFactor = (d: Date) => {
          const h = d.getHours() + d.getMinutes() / 60 + d.getSeconds() / 3600;
          const dawnStart = 6.0;
          const dawnEnd = 7.4;
          const duskStart = 17.2;
          const duskEnd = 18.6;
          if (h >= dawnStart && h < dawnEnd) {
            return smooth01(clamp01((h - dawnStart) / (dawnEnd - dawnStart)));
          }
          if (h >= dawnEnd && h < duskStart) return 1;
          if (h >= duskStart && h < duskEnd) {
            return 1 - smooth01(clamp01((h - duskStart) / (duskEnd - duskStart)));
          }
          return 0;
        };

        const applyEnvironment = (dt: number) => {
          const now = new Date();
          const dayFactor = getDayFactor(now);
          const nightFactor = 1 - dayFactor;

          const wet = rainStrength;
          const skyDay = new THREE.Color(0x87c8ff);
          const skyNight = new THREE.Color(0x071535);
          (scene.background as THREE.Color).copy(skyNight).lerp(skyDay, dayFactor);

          hemi.intensity = lerp(0.32, 0.6, dayFactor);
          ambient.intensity = lerp(0.22, 0.06, dayFactor);
          sun.intensity = lerp(0.08, 1.15, dayFactor) * (1 - wet * 0.25);
          sun.position.set(-20, lerp(10, 40, dayFactor), 20);

          moon.intensity = lerp(0.55, 0.0, dayFactor) * (1 - wet * 0.2);

          renderer.toneMappingExposure = lerp(0.95, 1.08, dayFactor) * (1 - wet * 0.12);

          const signEm = lerp(1.25, 0.5, dayFactor);
          signMat.emissiveIntensity = signEm;
          lobbyGlow.intensity = lerp(1.7, 0.35, dayFactor);

          const lightMul = nightFactor * (2.4 + wet * 0.5);
          streetLights.forEach((l) => {
            const base = (l as any).userData.baseIntensity ?? 0.65;
            l.intensity = base * lightMul;
          });
          streetLamps.forEach((m) => {
            m.emissiveIntensity = 0.1 + 1.1 * lightMul;
          });

          roadMat.color.copy(roadDryColor).lerp(roadWetColor, wet);
          roadMat.roughness = lerp(0.95, 0.35, wet);
          roadMat.metalness = lerp(0.0, 0.12, wet);
        };

        const fetchWeatherFor = async (lat: number, lon: number) => {
          const url =
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
            `&current=precipitation,rain,weather_code&timezone=auto`;
          const res = await fetch(url);
          const data = await res.json();
          const cur = data?.current;
          const rainMm = Number(cur?.rain ?? 0);
          const precip = Number(cur?.precipitation ?? 0);
          const code = Number(cur?.weather_code ?? 0);
          const rainyCode =
            (code >= 51 && code <= 67) ||
            (code >= 80 && code <= 82) ||
            (code >= 95 && code <= 99);
          isRaining = rainyCode || rainMm > 0.01 || precip > 0.01;
        };

        const initWeather = () => {
          if (!navigator.geolocation) return;
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              if (disposed) return;
              const lat = pos.coords.latitude;
              const lon = pos.coords.longitude;
              fetchWeatherFor(lat, lon).catch(() => {});
              weatherInterval = window.setInterval(() => {
                fetchWeatherFor(lat, lon).catch(() => {});
              }, 10 * 60 * 1000);
            },
            () => {}
          );
        };

        initWeather();

        const pedestrians: {
          mesh: any;
          speed: number;
          dir: 1 | -1;
          laneX: number;
          phase: number;
        }[] = [];

        const makePerson = (laneX: number, z: number, dir: 1 | -1) => {
          const p = new THREE.Group();

          const skin = new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(0.07 + Math.random() * 0.07, 0.4, 0.7),
            roughness: 0.95,
          });
          const cloth = new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(Math.random(), 0.6, 0.45),
            roughness: 0.85,
          });

          const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 14, 12), skin);
          head.position.y = 1.62;
          head.castShadow = true;
          p.add(head);

          const torso = new THREE.Mesh(
            new THREE.CapsuleGeometry(0.22, 0.55, 8, 16),
            cloth
          );
          torso.position.y = 1.05;
          torso.castShadow = true;
          p.add(torso);

          const legGeo = new THREE.CylinderGeometry(0.08, 0.09, 0.72, 10);
          const legMat = new THREE.MeshStandardMaterial({
            color: 0x1f2937,
            roughness: 0.95,
          });

          const leftLeg = new THREE.Mesh(legGeo, legMat);
          leftLeg.position.set(-0.12, 0.48, 0);
          leftLeg.castShadow = true;
          p.add(leftLeg);

          const rightLeg = leftLeg.clone();
          rightLeg.position.x = 0.12;
          p.add(rightLeg);

          p.userData.leftLeg = leftLeg;
          p.userData.rightLeg = rightLeg;

          p.position.set(laneX, 0.02, z);
          p.rotation.y = dir === 1 ? 0 : Math.PI;
          scene.add(p);

          pedestrians.push({
            mesh: p,
            speed: 1.5 + Math.random() * 1.3,
            dir,
            laneX,
            phase: Math.random() * Math.PI * 2,
          });
        };

        for (let i = 0; i < 9; i++) {
          makePerson(-9.5, -78 + i * 18, 1);
          makePerson(9.5, 72 - i * 18, -1);
        }

        const makeTree = (x: number, z: number) => {
          const t = new THREE.Group();

          const trunk = new THREE.Mesh(
            new THREE.CylinderGeometry(0.22, 0.3, 2.1, 10),
            new THREE.MeshStandardMaterial({ color: 0x7a4e2d, roughness: 1 })
          );
          trunk.position.y = 1.05;
          trunk.castShadow = true;
          t.add(trunk);

          const leaf = new THREE.Mesh(
            new THREE.SphereGeometry(1.05, 16, 12),
            new THREE.MeshStandardMaterial({ color: 0x1f8f4a, roughness: 0.95 })
          );
          leaf.position.y = 2.25;
          leaf.castShadow = true;
          t.add(leaf);

          t.position.set(x, 0, z);
          scene.add(t);
        };

        for (let i = 0; i < 10; i++) {
          makeTree(-16.5, -88 + i * 18);
          makeTree(16.5, -88 + i * 18);
        }

        const clock = new THREE.Clock();

        const doorWorld = new THREE.Vector3();

        const animate = () => {
          const dt = Math.min(clock.getDelta(), 0.033);
          const t = clock.elapsedTime;

          const targetRain = isRaining ? 1 : 0;
          rainStrength += (targetRain - rainStrength) * Math.min(1, dt * 0.55);
          rain.visible = rainStrength > 0.02;
          rainMat.opacity = 0.15 + 0.5 * rainStrength;
          rainMat.size = 0.07 + 0.06 * rainStrength;

          if (rain.visible) {
            const posAttr = rainGeo.getAttribute("position") as THREE.BufferAttribute;
            for (let i = 0; i < rainCount; i++) {
              const idx = i * 3 + 1;
              rainPositions[idx] -= rainVel[i] * dt * (0.6 + 0.6 * rainStrength);
              if (rainPositions[idx] < 0.2) {
                rainPositions[i * 3 + 0] = -50 + Math.random() * 100;
                rainPositions[idx] = 14 + Math.random() * 40;
                rainPositions[i * 3 + 2] = -120 + Math.random() * 240;
              }
            }
            posAttr.needsUpdate = true;
          }

          applyEnvironment(dt);

          door.getWorldPosition(doorWorld);
          const dx = player.position.x - doorWorld.x;
          const dz = player.position.z - doorWorld.z;
          const dist = Math.sqrt(dx * dx + dz * dz);

          const openTarget = 0;
          slideOpenT += (openTarget - slideOpenT) * Math.min(1, dt * 7);
          const s = slideOpenT * slideOpenT * (3 - 2 * slideOpenT);
          const slide = (doorOpeningW / 2 - 0.15) * s;
          leftLeaf.position.x = leftClosedX - slide;
          rightLeaf.position.x = rightClosedX + slide;

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

            const speed = 5.2;
            player.position.addScaledVector(dir, speed * dt);

            const pLocal = buildingGroup.worldToLocal(player.position.clone());
            const nearEntrance =
              Math.abs(pLocal.x) < openingW / 2 + 1.2 && pLocal.z > 6.8 && pLocal.z < 13.2;
            if (!insideOffice && dist < 3.0 && nearEntrance) insideOffice = true;
            const exitDoorway = Math.abs(pLocal.x) < openingW / 2 + 1.2 && pLocal.z > 13.6;
            if (insideOffice && exitDoorway) insideOffice = false;

            if (insideOffice) {
              pLocal.x = Math.min(16.0, Math.max(-16.0, pLocal.x));
              pLocal.z = Math.min(15.8, Math.max(-9.4, pLocal.z));
              pLocal.y = 0;
              player.position.copy(buildingGroup.localToWorld(pLocal));
            } else {
              player.position.x = Math.min(12, Math.max(-20, player.position.x));
              player.position.z = Math.min(110, Math.max(-60, player.position.z));
            }

          }

          updateFirstPersonCamera();

          pedestrians.forEach((p) => {
            p.mesh.position.z += p.dir * p.speed * dt;
            if (p.dir === 1 && p.mesh.position.z > 122) p.mesh.position.z = -82;
            if (p.dir === -1 && p.mesh.position.z < -82) p.mesh.position.z = 122;

            const swing = Math.sin(t * 6 + p.phase) * 0.6;
            const leftLeg = p.mesh.userData.leftLeg;
            const rightLeg = p.mesh.userData.rightLeg;
            if (leftLeg && rightLeg) {
              leftLeg.rotation.x = swing;
              rightLeg.rotation.x = -swing;
            }
          });

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
    <main
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "100vh" }}
    >
      <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10">
        <div className="mx-auto flex max-w-6xl items-start justify-between gap-4 px-4 pt-20 md:pt-24">
          <div className="rounded-2xl border border-white/10 bg-black/45 px-4 py-3 text-white backdrop-blur">
            <div className="text-sm font-semibold tracking-wide">
              Our Team — Office Exterior
            </div>
            <div className="mt-1 text-xs text-white/80">
              Click scene to look (mouse lock) • WASD to walk • Doors open when you get close • Walk inside
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
