import React, { useEffect, useRef } from 'react';
import { styled } from '@linaria/react';
import dat from 'dat.gui';

const MOD3: any = window.MOD3;
const THREE: any = window.THREE;

const generate_noise2d = (width: number, height: number) => {
  const noise: Array<Array<Number>> = [];
  for (let i = 0; i < width; i++) {
    noise[i] = [];
    for (let j = 0; j < height; j++) {
      noise[i][j] = Math.random();
    }
  }

  return noise;
};

export const Spline = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderRef = useRef(false);

  // Helper
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    // Open useEffect only once
    if (renderRef.current) {
      return;
    }
    renderRef.current = true;

    // Common values
    const height = window.innerHeight;
    const width = window.innerWidth;
    const canvasScale = window.devicePixelRatio;
    const scene = new THREE.Scene();

    // Add fog for disappiaring the tail in the fog-background
    // Fog starts from 25 to 61 from the camera, really cool effect
    scene.fog = new THREE.Fog(0x142641, 25, 61);

    const camera = new THREE.PerspectiveCamera(
      35, // fov = Field Of View
      width / height, // aspect ratio (dummy value)
      0.1, // near clipping plane
      1000 // far clipping plane
    );

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      powerPreference: 'low-power', // default
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width * canvasScale, height * canvasScale);
    renderer.setClearColor(0x000000, 0);

    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    camera.position.x = 52; // 30
    camera.position.y = 5; // 5
    camera.position.z = -12; // -2

    //
    // GUI PART
    //
    const showControls = true;
    const showHelpers = true;

    const lights = [];

    const circles: any = [];

    const gui = new dat.GUI({
      autoPlace: false,
      name: 'Controls',
    });

    if (!showControls) {
      gui.hide();

      return;
    }

    // Add GUI on page
    gui.domElement.id = 'gui';
    document.body.appendChild(gui.domElement);

    const lightsFolder = gui.addFolder('Lights');

    const sphereFolder = gui.addFolder('Sphere');

    function addSphere(i: number) {
      const folder = sphereFolder.addFolder(`Sphere ${i}`);
      folder.add(circles[i], 'speed', 0, 0.1).name('Speed');
      folder.add(circles[i], 'radius', 0, 2).name('Radius');
      folder.addColor(circles[i], 'color').name('Color');
      folder.add(circles[i].position, 'x', -10, 10).name('X');
      folder.add(circles[i].position, 'y', -10, 10).name('Y');
      folder.add(circles[i].position, 'z', -10, 10).name('Z');
    }
    const updateCircles = () => {
      console.log('circles', circles);

      circles.forEach(
        (
          {
            position: { x, y, z },
            color,
            radius,
            mesh: { scale, position, material },
          }: any,
          i: number
        ) => {
          console.log(circles[i], x);
          material.color = new THREE.Color(color || 0x00ff00);
          scale.set(radius, radius, radius);
          position.set(x, y, z);
        }
      );
    };

    circles.forEach(addSphere);

    const button = {
      addSphere: function () {
        const newCircle: any = {
          speed: 0.01,
          radius: 0.8,
          color: 0x00ff00,
          position: { x: 0, y: 0, z: 0 },
        };

        const geometry2 = new THREE.SphereGeometry(15, 32, 16);
        const material2 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const sphere = new THREE.Mesh(geometry2, material2);
        sphere.castShadow = true;
        sphere.receiveShadow = true;
        console.log(sphere);

        circles.push({ ...newCircle, mesh: sphere });
        const size = circles.length - 1;
        circles[size].delta = Math.random() * 10;

        scene.add(circles[size].mesh);

        addSphere(size);
      },
      addLight: () => {
        lights.push({
          color: 0xffffff,
          intensity: 1,
          distance: 0,
          position: { x: 0, y: 0, z: 0 },
          target: { x: 0, y: 0, z: 0 },
        });
      },
    };

    gui.add(button, 'addSphere').name('Add Sphere');
    gui.add(button, 'addLight').name('Add Light');

    // MAIN RENDER

    // Control camera with mouse
    //const orbit = new OrbitControls(camera, renderer.domElement);
    // Axes helpers
    //const axesHelper = THREE.AxisHelper(15);
    //scene.add(axesHelper);
    // Grid Helper
    const gridHelper = new THREE.GridHelper(15, 1);
    scene.add(gridHelper);

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.9);
    scene.add(ambientLight);

    const skyLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
    skyLight.position.set(0, -1, 4);
    scene.add(skyLight);
    const skyLight2 = new THREE.HemisphereLight(0xffffff, 0xff0000, 1.2);
    skyLight2.position.set(0, -1, 4);
    scene.add(skyLight2);

    // Wave
    const shape = new THREE.Shape();
    let r;
    const STAR_EDGES = 50;
    let STAR_SIZE = STAR_EDGES * 2;
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
        new THREE.Vector3(0, 1, 3),
        new THREE.Vector3(0, -1, 7),
        new THREE.Vector3(0, 0, 15),
        new THREE.Vector3(0, 0, 20),
      ]),
    };

    // USING THREE DATA TEXTURE To CREATE A RAW DATA TEXTURE
    const texture = new THREE.TextureLoader().load(
      process.env.PUBLIC_URL + 'textures/Crystal_001_DISP.jpg'
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    // Get part of the texture
    texture.repeat.set(0.01, 0.01);

    // show shape
    const geomentry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshPhysicalMaterial({
      //color: 0x049ef4,
      color: 0xffffff,
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
      side: THREE.bothSide,
      map: texture,
    });

    const cube = new THREE.Mesh(geomentry, material);
    scene.add(cube);

    const target = cube.position.clone();
    //target.x -= 70;
    //target.y -= 20;
    target.z += 10;

    ambientLight.position.set(10, 20, 20);

    camera.lookAt(target);
    camera.rotation.z = 130 * (Math.PI / 180);
    camera.rotation.x = 190 * (Math.PI / 180);
    camera.rotation.y = 70 * (Math.PI / 180);

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
      0.15,
      MOD3.Vector3.Z(false),
      MOD3.Vector3.Z()
    );
    const twistZDeg = 90;
    const twistZ = new MOD3.Twist(
      twistZDeg * (Math.PI / 180),
      MOD3.Vector3.Z()
    );
    const noise = new MOD3.CPerlin(0.9, generate_noise2d(100, 100), true);

    mstack.addModifier(taperZ0);
    mstack.addModifier(taperZ1);
    mstack.addModifier(twistZ);
    mstack.addModifier(noise);

    mstack.apply();

    let delta = 0;

    function animate() {
      // Move textures across
      delta += 0.0004;
      texture.offset.set(delta, delta / 2);
      mstack.apply();

      //cube.rotation.x += 0.002;
      //cube.rotation.y += 0.01;
      cube.rotation.z += 0.01;

      // Update circles
      updateCircles();

      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    animate();
  }, []);

  return <Canvas ref={canvasRef} />;
};

const Canvas = styled.canvas`
  background: linear-gradient(56deg, #000000, #000000, #23a6d5, #23d5ab);
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
