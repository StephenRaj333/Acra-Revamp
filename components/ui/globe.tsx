"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";

type ArcPoint = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: { lat: number; lng: number };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

type WorldProps = {
  data: ArcPoint[];
  globeConfig: GlobeConfig;
};

type RingPoint = {
  lat: number;
  lng: number;
  color: string;
};

type HexCollection = {
  features: object[];
};

export function World({ data, globeConfig }: WorldProps) {
  const globeRef = useRef<any>(null);
  const hasInitRef = useRef(false);
  const [hexData, setHexData] = useState<object[]>([]);
  const [ringData, setRingData] = useState<RingPoint[]>([]);

  const points = useMemo(() => {
    const list: RingPoint[] = [];
    data.forEach((arc) => {
      list.push({ lat: arc.startLat, lng: arc.startLng, color: arc.color });
      list.push({ lat: arc.endLat, lng: arc.endLng, color: arc.color });
    });
    return list;
  }, [data]);

  useEffect(() => {
    let mounted = true;
    async function loadHexes() {
      try {
        const geoRes = await fetch("https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson");
        const geo = (await geoRes.json()) as HexCollection;
        if (mounted) {
          setHexData(Array.isArray(geo.features) ? geo.features : []);
        }
      } catch {
        if (mounted) setHexData([]);
      }
    }

    void loadHexes();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!hasInitRef.current) return;
    configureGlobe(globeRef.current, globeConfig);
  }, [globeConfig]);

  useEffect(() => {
    const timer = setInterval(() => {
      const count = globeConfig.maxRings ?? 3;
      const chosen = [...points].sort(() => 0.5 - Math.random()).slice(0, count);
      setRingData(chosen);
    }, 1800);

    return () => clearInterval(timer);
  }, [points, globeConfig.maxRings]);

  return (
    <div className="relative h-full w-full">
      <Globe
        ref={globeRef}
        onGlobeReady={() => {
          hasInitRef.current = true;
          configureGlobe(globeRef.current, globeConfig);
        }}
        width={700}
        height={700}
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere={globeConfig.showAtmosphere ?? true}
        atmosphereColor={globeConfig.atmosphereColor ?? "#ffffff"}
        atmosphereAltitude={globeConfig.atmosphereAltitude ?? 0.1}
        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
        hexPolygonsData={hexData}
        hexPolygonResolution={3}
        hexPolygonMargin={0.7}
        hexPolygonUseDots
        hexPolygonColor={() => globeConfig.polygonColor ?? "rgba(255,255,255,0.7)"}
        arcsData={data}
        arcStartLat={(d: object) => (d as ArcPoint).startLat}
        arcStartLng={(d: object) => (d as ArcPoint).startLng}
        arcEndLat={(d: object) => (d as ArcPoint).endLat}
        arcEndLng={(d: object) => (d as ArcPoint).endLng}
        arcColor={(d: object) => (d as ArcPoint).color}
        arcAltitude={(d: object) => (d as ArcPoint).arcAlt}
        arcStroke={0.6}
        arcDashLength={globeConfig.arcLength ?? 0.9}
        arcDashGap={0.75}
        arcDashInitialGap={(d: object) => (d as ArcPoint).order}
        arcDashAnimateTime={globeConfig.arcTime ?? 1000}
        arcsTransitionDuration={0}
        pointsData={points}
        pointLat={(d: object) => (d as RingPoint).lat}
        pointLng={(d: object) => (d as RingPoint).lng}
        pointColor={(d: object) => (d as RingPoint).color}
        pointRadius={0.2 * (globeConfig.pointSize ?? 4)}
        pointAltitude={0.01}
        pointsMerge
        ringsData={ringData}
        ringLat={(d: object) => (d as RingPoint).lat}
        ringLng={(d: object) => (d as RingPoint).lng}
        ringColor={(d: object) => (d as RingPoint).color}
        ringMaxRadius={5}
        ringPropagationSpeed={2}
        ringRepeatPeriod={1000 / (globeConfig.rings ?? 1)}
      />
    </div>
  );
}

function configureGlobe(globe: any, globeConfig: GlobeConfig) {
  if (!globe) return;
  if (typeof globe.globeMaterial !== "function") return;
  if (typeof globe.scene !== "function") return;
  if (typeof globe.controls !== "function") return;

  const material = globe.globeMaterial() as THREE.MeshPhongMaterial;
  material.color = new THREE.Color(globeConfig.globeColor ?? "#062056");
  material.emissive = new THREE.Color(globeConfig.emissive ?? "#062056");
  material.emissiveIntensity = globeConfig.emissiveIntensity ?? 0.1;
  material.shininess = globeConfig.shininess ?? 0.9;

  const scene = globe.scene() as THREE.Scene;
  scene.add(new THREE.AmbientLight(globeConfig.ambientLight ?? "#38bdf8", 0.6));

  const leftLight = new THREE.DirectionalLight(globeConfig.directionalLeftLight ?? "#ffffff", 0.55);
  leftLight.position.set(-220, 120, 180);
  scene.add(leftLight);

  const topLight = new THREE.DirectionalLight(globeConfig.directionalTopLight ?? "#ffffff", 0.6);
  topLight.position.set(0, 280, 120);
  scene.add(topLight);

  const point = new THREE.PointLight(globeConfig.pointLight ?? "#ffffff", 0.7);
  point.position.set(160, 120, 220);
  scene.add(point);

  const controls = globe.controls();
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.minDistance = 300;
  controls.maxDistance = 300;
  controls.autoRotate = globeConfig.autoRotate ?? true;
  controls.autoRotateSpeed = globeConfig.autoRotateSpeed ?? 0.5;

  if (globeConfig.initialPosition && typeof globe.pointOfView === "function") {
    globe.pointOfView(
      { lat: globeConfig.initialPosition.lat, lng: globeConfig.initialPosition.lng, altitude: 1.8 },
      0
    );
  }
}
