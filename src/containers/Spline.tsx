import * as THREE from 'three';
import React, { useEffect, useRef } from 'react';

export const Spline = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const height = window.innerHeight;
    const width = window.innerWidth;
    const canvasScale = window.devicePixelRatio;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width * canvasScale, height * canvasScale);
    renderer.setClearColor(0x000000, 0);

    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    camera.position.x = 22;
    camera.position.y = 0;
    camera.position.z = 5;

    const geometry = new THREE.BoxGeometry(2, 2, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.lookAt(cube.position);

    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };
    animate();
  }, []);

  return <canvas ref={canvasRef} />;
};

//export const Spline = () => renderer.domElement;
