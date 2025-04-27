<script>
    import { onMount, onDestroy } from 'svelte';
    import * as THREE from 'three';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
  
    // props
    export let currentSection;
    export let totalSections;
  
    // 참조
    let containerElement;
    let scene;
    let camera;
    let renderer;
    let room;
    let controls;
    let requestId;
  
    // 초기화 및 정리
    onMount(() => {
      initThreeJS();
      animate();
  
      // 창 크기 변경 이벤트 리스너
      const handleResize = () => {
        if (camera && renderer) {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        }
      };
      window.addEventListener('resize', handleResize);
  
      // 컴포넌트가 파괴될 때 정리
      return () => {
        window.removeEventListener('resize', handleResize);
        if (requestId) {
          cancelAnimationFrame(requestId);
        }
        if (renderer && containerElement) {
          containerElement.removeChild(renderer.domElement);
        }
        
        // 메모리 정리
        if (scene) {
          disposeScene(scene);
        }
      };
    });
  
    // Three.js 초기화
    function initThreeJS() {
      // 씬 생성
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf8f7ff);
  
      // 카메라 설정
      camera = new THREE.PerspectiveCamera(
        75, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000
      );
      camera.position.z = 5;
      camera.position.y = 1;
  
      // 렌더러 설정
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.shadowMap.enabled = true;
      containerElement.appendChild(renderer.domElement);
  
      // 조명 설정
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
  
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5);
      directionalLight.castShadow = true;
      scene.add(directionalLight);
  
      // 간단한 방 모델 생성
      const roomGeometry = new THREE.BoxGeometry(4, 3, 4);
      const materials = [
        new THREE.MeshStandardMaterial({ color: 0xaa99ff, side: THREE.BackSide }), // right
        new THREE.MeshStandardMaterial({ color: 0x9988ff, side: THREE.BackSide }), // left
        new THREE.MeshStandardMaterial({ color: 0xbb99ff, side: THREE.BackSide }), // top
        new THREE.MeshStandardMaterial({ color: 0x9977ff, side: THREE.BackSide }), // bottom
        new THREE.MeshStandardMaterial({ color: 0x8866ff, side: THREE.BackSide }), // front
        new THREE.MeshStandardMaterial({ color: 0xaa88ff, side: THREE.BackSide }), // back
      ];
      room = new THREE.Mesh(roomGeometry, materials);
      scene.add(room);
  
      // 가구 추가 (간단한 예시)
      // 테이블
      const tableGeometry = new THREE.BoxGeometry(1.5, 0.1, 0.8);
      const tableMaterial = new THREE.MeshStandardMaterial({ color: 0x6d4c41 });
      const table = new THREE.Mesh(tableGeometry, tableMaterial);
      table.position.set(0, -0.5, 0);
      table.castShadow = true;
      table.receiveShadow = true;
      room.add(table);
  
      // 의자
      const chairGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      const chairMaterial = new THREE.MeshStandardMaterial({ color: 0x8d6e63 });
      const chair = new THREE.Mesh(chairGeometry, chairMaterial);
      chair.position.set(0, -0.8, 1);
      chair.castShadow = true;
      chair.receiveShadow = true;
      room.add(chair);
  
      // 노트북
      const laptopBaseGeometry = new THREE.BoxGeometry(0.6, 0.05, 0.4);
      const laptopBase = new THREE.Mesh(
        laptopBaseGeometry,
        new THREE.MeshStandardMaterial({ color: 0x212121 })
      );
      laptopBase.position.set(0, -0.4, 0);
      laptopBase.castShadow = true;
      room.add(laptopBase);
  
      const laptopScreenGeometry = new THREE.BoxGeometry(0.6, 0.4, 0.02);
      const laptopScreen = new THREE.Mesh(
        laptopScreenGeometry,
        new THREE.MeshStandardMaterial({ color: 0x424242 })
      );
      laptopScreen.position.set(0, -0.2, -0.2);
      laptopScreen.rotation.x = -Math.PI / 4;
      laptopScreen.castShadow = true;
      room.add(laptopScreen);
  
      // 책장
      const bookshelfGeometry = new THREE.BoxGeometry(1, 2, 0.3);
      const bookshelfMaterial = new THREE.MeshStandardMaterial({ color: 0x5d4037 });
      const bookshelf = new THREE.Mesh(bookshelfGeometry, bookshelfMaterial);
      bookshelf.position.set(-1.5, 0, -1.7);
      bookshelf.castShadow = true;
      bookshelf.receiveShadow = true;
      room.add(bookshelf);
  
      // 창문
      const windowGeometry = new THREE.PlaneGeometry(1, 1.2);
      const windowMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xadd8e6, 
        transparent: true,
        opacity: 0.7
      });
      const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
      window1.position.set(0, 0.5, -1.99); // 벽에 바로 붙이기
      room.add(window1);
  
      // 창틀
      const windowFrameGeometry = new THREE.BoxGeometry(1.1, 1.3, 0.05);
      const windowFrameMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const windowFrame = new THREE.Mesh(windowFrameGeometry, windowFrameMaterial);
      windowFrame.position.set(0, 0.5, -1.97);
      room.add(windowFrame);
  
      // OrbitControls 설정
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = false;
      controls.autoRotate = false;
      controls.enablePan = false;
    }
  
    // 애니메이션 루프
    function animate() {
      requestId = requestAnimationFrame(animate);
      
      if (controls) {
        controls.update();
      }
      
      // 현재 섹션에 따른 방 회전
      if (room) {
        const sectionRatio = currentSection / (totalSections - 1);
        const targetRotationY = sectionRatio * Math.PI * 2; // 0 ~ 2π (한 바퀴)
        const targetRotationX = Math.sin(sectionRatio * Math.PI) * 0.2;
        
        // 부드러운 애니메이션
        room.rotation.y += (targetRotationY - room.rotation.y) * 0.05;
        room.rotation.x += (targetRotationX - room.rotation.x) * 0.05;
      }
      
      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    }
  
    // Three.js 객체 정리 함수
    function disposeScene(scene) {
      scene.traverse(object => {
        if (object.geometry) {
          object.geometry.dispose();
        }
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    }
  </script>
  
  <div 
    bind:this={containerElement}
    style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; pointer-events: none; opacity: 0.85;"
  ></div>