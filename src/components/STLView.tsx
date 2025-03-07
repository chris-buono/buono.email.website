import { useEffect } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

const ThreejsViewer = ({ stlUrl }: { stlUrl: string }) => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('stl-container')?.appendChild(renderer.domElement);

    const loader = new STLLoader();
    loader.load(stlUrl, (geometry) => {
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      camera.position.z = 5;

      const animate = () => {
        requestAnimationFrame(animate);
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
        renderer.render(scene, camera);
      };

      animate();
    });

    return () => {
      scene.dispose();
      renderer.dispose();
    };
  }, [stlUrl]);

  return <div id="stl-container" className="w-full h-96"></div>;
};

export default ThreejsViewer;