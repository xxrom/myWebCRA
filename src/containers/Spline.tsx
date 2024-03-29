import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { styled } from '@linaria/react';
import dat from 'dat.gui';
import { useWindowSize } from '../hooks';
import { Text } from '../components';
import { theme } from '../theme';
import { css } from '@linaria/core';
import Texture from '/textures/Crystal_001_DISP.jpg';
import { scrollSelectors } from '@/store/slices/scrollSlice';
import { NAV_Z_INDEX, infoCommonCss } from './Layout';
import { useAppSelector } from '@/store/store';

// info: /alieninterfaces/05-vesica/blob/main/src/main.js
const MOD3: any = window.MOD3 as any;
const THREE: any = window.THREE as any;
const IS_DEBUG = false;

const generate_noise2d = (width: number, height: number) => {
  const noise: Array<Array<number>> = [];

  for (let i = 0; i < width; i++) {
    noise[i] = [];
    for (let j = 0; j < height; j++) {
      noise[i][j] = Math.random();
    }
  }

  return noise;
};

export type ComponentsCommonTypes = {
  index?: number;
};
export type SplineProps = ComponentsCommonTypes;

export const Spline = memo(({ index }: SplineProps) => {
  const initRef = useRef(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const isInViewRef = useRef(true);
  const deltaRef = useRef(0);
  const { width, canvasScale } = useWindowSize();
  const [scene, setScene] = useState<any>();
  const [renderer, setRenderer] = useState<any>();
  const [spline, setSpline] = useState<any>();
  const [texture, setTexture] = useState<any>();
  const [_mStack, setMStack] = useState<any>();

  const { isInView = true } =
    useAppSelector(scrollSelectors.selectComponentInfoById(index)) || {};

  useEffect(() => {
    isInViewRef.current = isInView;
  }, [isInView]);

  // First model init
  useEffect(() => {
    if (
      !canvasRef.current ||
      !wrapperRef.current ||
      !THREE ||
      initRef.current
    ) {
      return;
    }

    // Init all values only once !
    initRef.current = true;

    const scene = new THREE.Scene();

    // Add fog for disappearing the tail in the fog-background
    // Fog starts from 25 to 61 from the camera, really cool effect
    scene.fog = new THREE.Fog(0x0000000f, 45, 71);

    const renderer = new THREE.WebGLRenderer({
      //canvas: canvasRef.current,
      powerPreference: 'low-power', // default
      antialias: true, // true
      alpha: true,
    });

    if (IS_DEBUG) {
      // Axes helpers
      const axesHelper = THREE.AxisHelper(15);

      scene.add(axesHelper);
      // Grid Helper
      const gridHelper = new THREE.GridHelper(15, 1);

      scene.add(gridHelper);
    }

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);

    ambientLight.position.set(10, 20, 20);
    scene.add(ambientLight);
    const skyLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.5);

    skyLight.position.set(0, -1, 4);
    scene.add(skyLight);
    const skyLight2 = new THREE.HemisphereLight(0xffffff, 0xff00ff, 0.3);

    skyLight2.position.set(0, -1, 4);
    scene.add(skyLight2);

    // Wave
    const shape = new THREE.Shape();
    const STAR_EDGES = 100; // + edgesShift;
    const STAR_SIZE = STAR_EDGES * 2;
    let r;

    for (let i = 0; i < STAR_SIZE; i++) {
      r = i % 2 === 0 ? 1.5 : 0.5;

      const angle = (i * 2 * Math.PI) / STAR_SIZE;
      const x = Math.pow(r, 2) * Math.cos(angle);
      const y = Math.pow(r, 2) * Math.sin(angle);

      if (i === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    }

    const extrudeSettings = {
      steps: 300, // steps for spline in line
      depth: 10, // ??
      bevelEnabled: false, // false
      bevelThickness: 1,
      bevelSize: 1,
      bavelSegments: 3,
      extrudePath: new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, -3),
        new THREE.Vector3(0, 2, 2),
        new THREE.Vector3(0, -2, 7),
        new THREE.Vector3(0, 2, 15),
        new THREE.Vector3(0, 1, 20),
      ]),
    };

    // USING THREE DATA TEXTURE To CREATE A RAW DATA TEXTURE
    const texture = new THREE.TextureLoader().load(
      Texture
      //'textures/Crystal_001_DISP.jpg'
    );

    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    // Get part of the texture
    texture.repeat.set(0.08, 0.01);

    // show shape
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshPhysicalMaterial({
      //color: 0x049ef488,
      //color: 0xffffff00,
      color: 0xffffff,
      //emissive: 0x0000ff,
      metalness: -3, // -2
      roughness: 0, // 0
      //reflectivity: 1,
      // clearcoat: 0,
      //depthWrite: true,
      //depthTest: true,
      //vertexColors: true,
      //flatShading: true,
      //fog: true,
      //wireframe: true,
      //side: THREE.bothSide,
      map: texture,
    });

    const spline = new THREE.Mesh(geometry, material);

    scene.add(spline);

    // MOD
    const mStack = new MOD3.ModifierStack(MOD3.LibraryThree, spline);
    // Taper (fade-off, to one point) across Z axis
    const taperZ0 = new MOD3.Taper(
      -1,
      8,
      MOD3.Vector3.Z(false),
      MOD3.Vector3.Z()
    );
    const taperZ1 = new MOD3.Taper(
      1,
      0.15,
      MOD3.Vector3.Z(true),
      MOD3.Vector3.Z(true)
    );
    const twistZDeg = 180;
    const twistZ = new MOD3.Twist(
      twistZDeg * (Math.PI / 180),
      MOD3.Vector3.Z()
    );
    const noise = new MOD3.CPerlin(0.4, generate_noise2d(100, 100), true);

    mStack.addModifier(taperZ0);
    mStack.addModifier(taperZ1);
    mStack.addModifier(twistZ);
    mStack.addModifier(noise);

    mStack.apply();

    // set
    setScene(scene);
    setRenderer(renderer);
    setSpline(spline);
    setTexture(texture);
    setMStack(mStack);

    const wrapper = wrapperRef.current;

    if (wrapperRef.current) {
      wrapperRef.current.appendChild(renderer.domElement);
    }

    return () => {
      if (
        !initRef.current &&
        wrapper &&
        wrapper.contains(renderer.domElement)
      ) {
        wrapper.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Main Render loop
  useEffect(() => {
    if (
      !canvasRef.current ||
      !THREE ||
      !scene ||
      !renderer ||
      !spline ||
      !texture ||
      width < 30
    ) {
      return;
    }

    const height = window.innerHeight;

    let fovShift = 13 * (height / 900);

    if (fovShift > 13) {
      fovShift = 13;
    }
    if (fovShift < 0) {
      fovShift = 0;
    }
    //console.log('fovShift', fovShift);
    const camera = new THREE.PerspectiveCamera(
      12 + fovShift, // fov = Field Of View
      width / height, // aspect ratio (dummy value)
      0.1, // near clipping plane
      1000 // far clipping plane
    );

    renderer.setSize(width * canvasScale, height * canvasScale);
    renderer.setClearColor(0x000000, 0);

    renderer.domElement.style.width = '100%';
    renderer.domElement.style.minWidth = '100vw';
    renderer.domElement.style.maxWidth = '100vw';
    renderer.domElement.style.height = '100%';
    camera.position.x = 62; // 52; // 30
    camera.position.y = 0; // 5; // 5
    camera.position.z = 0; // -12; // -2

    // GUI PART
    const showControls = IS_DEBUG;
    //const showHelpers = IS_DEBUG;

    const lights = [];
    const circles: any = [];
    let gui = null;
    let updateCircles = () => {};

    if (showControls) {
      // TODO move to useEffect ...
      gui = new dat.GUI({
        autoPlace: false,
        name: 'Controls',
      });
      //lightsFolder =  gui.addFolder('Lights');

      const sphereFolder = gui.addFolder('Sphere');

      // Add GUI on page
      gui.domElement.id = 'gui';
      document.body.appendChild(gui.domElement);

      const addSphere = (i: number) => {
        const folder = sphereFolder.addFolder(`Sphere ${i}`);

        folder.add(circles[i], 'speed', 0, 0.1).name('Speed');
        folder.add(circles[i], 'radius', 0, 2).name('Radius');
        folder.addColor(circles[i], 'color').name('Color');
        folder.add(circles[i].position, 'x', -10, 10).name('X');
        folder.add(circles[i].position, 'y', -10, 10).name('Y');
        folder.add(circles[i].position, 'z', -10, 10).name('Z');
      };

      updateCircles = () => {
        //console.log('circles', circles);
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
            //console.log(circles[i], x);
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
          //console.log(sphere);

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
    }

    const target = spline?.position?.clone();

    //target.x -= 70;
    //target.y -= 20;
    target.z += 10;

    camera.lookAt(target);
    // Change model angle to fit in the screen
    let widthShift = 35 * ((width - 300) / 1000);

    if (widthShift > 35) {
      widthShift = 35;
    }
    camera.rotation.z = (100 + widthShift) * (Math.PI / 180);
    camera.rotation.x = 180 * (Math.PI / 180); // 180
    camera.rotation.y = 70 * (Math.PI / 180);

    let frameId: number | null;

    function animate() {
      if (!isInViewRef.current) {
        console.log('SKIP RENDERING');
        const DELAY = 300;

        // Check isInView current component
        new Promise((res) => {
          // Track all timeouts
          const id = setTimeout(() => res(''), DELAY);

          if (timeoutId.current) {
            // Clear previous timeouts
            clearTimeout(timeoutId.current);
          }

          timeoutId.current = id;
        }).then(() => animate());

        return;
      }

      // Move textures across
      deltaRef.current += 0.0004;
      texture.offset.set(deltaRef.current, deltaRef.current / 2);

      //cube.rotation.x += 0.002;
      //cube.rotation.y += 0.01;
      spline.rotation.z += 0.005;

      // Update circles
      if (IS_DEBUG) {
        updateCircles();
      }

      frameId = requestAnimationFrame(animate);

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      if (typeof frameId === 'number') {
        cancelAnimationFrame(frameId);
      }
    };
  }, [width, canvasScale, scene, renderer, spline, texture]);

  return (
    <Wrapper data-component-index={index} ref={wrapperRef}>
      <div ref={canvasRef} />

      <TextWrapper>
        <Text variant="h1" data-info="me" className={textCSS}>
          Chernyshov Nikita
        </Text>
      </TextWrapper>

      <InfoText className={infoCommonCss}>
        {'Rendered in Three.js with MOD3'}
      </InfoText>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  height: 100vh;
  min-height: 100vh;
  max-height: 100%;
  width: 100vw;
  min-width: 100vw;
  max-width: 100vw;
  background: black;
  overflow: hidden;
  margin-bottom: ${theme.margin.block};
`;

const TextWrapper = styled.span`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  min-width: 100vw;
  z-index: 8;
  background: none;
`;

const textCSS = css`
  display: inline-block;
  color: ${theme.colors.fontInverted};
  padding: 2rem;
  margin: 0 2rem;

  background: #00000010;
  backdrop-filter: blur(4px);
  height: fit-content;
  border: 1px solid ${theme.colors.fontInverted};
  border-radius: ${theme.sizes.borderRadius};
  cursor: default;
`;

const InfoText = styled.span`
  z-index: ${NAV_Z_INDEX - 1};
  bottom: 4px;
  right: 4px;
  color: white;
`;
