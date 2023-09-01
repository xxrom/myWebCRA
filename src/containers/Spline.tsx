import * as THREE from 'three';
import React, { useEffect, useRef } from 'react';
import { styled } from '@linaria/react';

export const Spline = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

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
    camera.position.x = 5;
    camera.position.y = 0;
    camera.position.z = 5;

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);

    // 3D objects
    const geometry = new THREE.BoxGeometry(2, 2, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);

    scene.add(ambientLight);
    scene.add(cube);

    const target = cube.position.clone();
    camera.lookAt(target);

    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };
    animate();
  }, []);

  return <Canvas ref={canvasRef} />;
};

//export const Spline = () => renderer.domElement;

const Canvas = styled.canvas`
  background: linear-gradient(-45deg, #ee7752, #008888, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  /*animation: gradient-animation 45s ease infinite;*/

  @keyframes gradient-animation {
    0% {
      background-position: 50% 50%;
    }
    50% {
      background-position: 100% 80%;
    }
    100% {
      background-position: 5% 50%;
    }
  }
`;
