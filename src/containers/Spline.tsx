import React, { useEffect, useRef } from 'react';
import { styled } from '@linaria/react';

const MOD3: any = window.MOD3;
const THREE: any = window.THREE;

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
    const camera = new THREE.PerspectiveCamera(
      25, // fov = Field Of View
      width / height, // aspect ratio (dummy value)
      0.1, // near clipping plane
      1000 // far clipping plane
    );

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      powerPreference: 'low-power', // default
      //antialias: true,
      alpha: true,
    });
    renderer.setSize(width * canvasScale, height * canvasScale);
    renderer.setClearColor(0x000000, 0);

    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    camera.position.x = 52;
    camera.position.y = 5;
    camera.position.z = -15;

    // Control camera with mouse
    //const orbit = new OrbitControls(camera, renderer.domElement);
    // Axes helpers
    //const axesHelper = THREE.AxisHelper(15);
    //scene.add(axesHelper);
    // Grid Helper
    const gridHelper = new THREE.GridHelper(15, 1);
    scene.add(gridHelper);

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);
    /*
    const skyLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
    skyLight.position.set(0, -1, 4);
    scene.add(skyLight);
    const skyLight2 = new THREE.HemisphereLight(0xffffff, 0xff0000, 1.2);
    skyLight2.position.set(0, -1, 4);
    scene.add(skyLight2);
    */

    // Wave
    const shape = new THREE.Shape();
    let r;
    let STAR_SIZE = 4 * 2;
    for (let i = 0; i < STAR_SIZE; i++) {
      r = i % 2 === 0 ? 1.5 : 0.5;

      const angle = (i * 2 * Math.PI) / STAR_SIZE;
      const x = r * Math.cos(angle) * r;
      const y = r * Math.sin(angle) * r;

      if (i === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    }

    const extrudeSettings = {
      steps: 200,
      depth: 20,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 1,
      bavelSegments: 3,
      extrudePath: new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 1, 5),
        new THREE.Vector3(0, -4, 7),
        new THREE.Vector3(0, 0, 15),
        new THREE.Vector3(0, 0, 20),
      ]),
    };

    // USING THREE DATA TEXTURE To CREATE A RAW DATA TEXTURE
    const texture = new THREE.TextureLoader().load(
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/golfball.jpg'
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(0.1, 0.1);

    // show shape
    const geomentry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x049ef4,
      //color: 0xffffff,
      //emissive: 0x0000ff,
      metalness: -2,
      roughness: 0,
      reflectivity: 0,
      clearcoat: 0,
      //depthWrite: true,
      //depthTest: true,
      //vertexColors: true,
      //flatShading: true,
      //fog: true,
      //wireframe: true,
      side: THREE.FrontSide,
      map: texture,
    });

    const cube = new THREE.Mesh(geomentry, material);

    scene.add(cube);

    const target = cube.position.clone();
    target.z += 20;
    target.x -= 30;

    ambientLight.position.set(10, 20, 20);

    camera.lookAt(target);
    //orbit.update();

    // MOD
    const mstack = new MOD3.ModifierStack(MOD3.LibraryThree, cube);
    // Taper (fadeoff, to one point) across Z axis
    const taperZ0 = new MOD3.Taper(
      -1,
      3,
      MOD3.Vector3.Z(false),
      MOD3.Vector3.Z()
    );
    const taperZ1 = new MOD3.Taper(
      1,
      0.1,
      MOD3.Vector3.Z(false),
      MOD3.Vector3.Z()
    );
    const twistZ = new MOD3.Twist(90 * (Math.PI / 180), MOD3.Vector3.Z());

    mstack.addModifier(taperZ0);
    mstack.addModifier(taperZ1);
    mstack.addModifier(twistZ);

    mstack.apply();

    let delta = 0;
    const animate = () => {
      delta += 0.0001;
      texture.offset.set(delta, delta);

      requestAnimationFrame(animate);

      cube.rotation.x += 0.002;
      //cube.rotation.y += 0.01;
      //cube.rotation.z += 0.01;

      renderer.render(scene, camera);
    };
    animate();
  }, []);

  return <Canvas ref={canvasRef} />;
};

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