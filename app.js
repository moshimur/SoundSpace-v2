// ===== グローバル変数 =====
let scene, camera, renderer, raycaster, mouse;
let cubes = [];
let audioContext;
let masterGain, reverbNode, filterNode;
let isAudioStarted = false;
let playCount = 0;

// シンセサイザー設定
let synthSettings = {
    waveform: 'sine',
    attack: 0.01,
    release: 0.5,
    filterFreq: 20000
};

// 音階の定義 (C Major Chord + Octave)
const notes = [
    { name: 'C4', frequency: 261.63, color: 0xff6b6b, position: { x: -3, y: 0, z: 0 } },
    { name: 'E4', frequency: 329.63, color: 0x4ecdc4, position: { x: -1, y: 0, z: 0 } },
    { name: 'G4', frequency: 392.00, color: 0x45b7d1, position: { x: 1, y: 0, z: 0 } },
    { name: 'C5', frequency: 523.25, color: 0x96ceb4, position: { x: 3, y: 0, z: 0 } }
];

// ===== 初期化 =====
function init() {
    // シーンの作成
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    scene.fog = new THREE.Fog(0x1a1a2e, 10, 50);

    // カメラの作成
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);

    // レンダラーの作成
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Raycaster（クリック検出用）
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // ライトの追加
    addLights();

    // グリッドフロアの追加
    addFloor();

    // サウンドキューブの作成
    createSoundCubes();

    // パーティクルエフェクト
    addParticles();

    // イベントリスナー
    setupEventListeners();

    // アニメーションループ開始
    animate();

    // ローディング完了
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('app').classList.add('ready');
    }, 1500);
}

// ===== ライトの設定 =====
function addLights() {
    // 環境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // ディレクショナルライト
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    scene.add(directionalLight);

    // ポイントライト（カラフルな雰囲気）
    const pointLight1 = new THREE.PointLight(0x4ecdc4, 1, 20);
    pointLight1.position.set(-5, 3, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff6b6b, 1, 20);
    pointLight2.position.set(5, 3, -5);
    scene.add(pointLight2);
}

// ===== フロアの作成 =====
function addFloor() {
    const gridHelper = new THREE.GridHelper(20, 20, 0x4ecdc4, 0x2a2a40);
    gridHelper.position.y = -2;
    scene.add(gridHelper);

    // 反射面
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a2e,
        roughness: 0.8,
        metalness: 0.2
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2;
    floor.receiveShadow = true;
    scene.add(floor);
}

// ===== サウンドキューブの作成 =====
function createSoundCubes() {
    notes.forEach(note => {
        // キューブのジオメトリ
        const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
        const material = new THREE.MeshStandardMaterial({
            color: note.color,
            roughness: 0.3,
            metalness: 0.7,
            emissive: note.color,
            emissiveIntensity: 0.2
        });

        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(note.position.x, note.position.y, note.position.z);
        cube.castShadow = true;
        cube.receiveShadow = true;

        // データ保存
        cube.userData = {
            note: note.name,
            frequency: note.frequency,
            originalColor: note.color,
            originalY: note.position.y
        };

        scene.add(cube);
        cubes.push(cube);
    });
}

// ===== パーティクル追加 =====
function addParticles() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 50;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0x4ecdc4,
        transparent: true,
        opacity: 0.6
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
}

// ===== Web Audio API 初期化 =====
function initAudio() {
    if (audioContext) return;

    audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // マスターゲイン
    masterGain = audioContext.createGain();
    masterGain.gain.value = 0.7;

    // リバーブ（簡易版）
    reverbNode = audioContext.createGain();
    reverbNode.gain.value = 0.3;

    // フィルター
    filterNode = audioContext.createBiquadFilter();
    filterNode.type = 'lowpass';
    filterNode.frequency.value = 20000;
    filterNode.Q.value = 1;

    // 接続
    filterNode.connect(reverbNode);
    reverbNode.connect(masterGain);
    masterGain.connect(audioContext.destination);

    isAudioStarted = true;
    document.getElementById('playBtn').disabled = false;
    document.getElementById('playBtn').innerHTML = '<span>🎵 Audio Ready</span>';
}

// ===== 音を鳴らす（Phase 2対応） =====
function playNote(frequency, duration = 0.8) {
    if (!audioContext) {
        initAudio();
    }

    const now = audioContext.currentTime;

    // オシレーター作成
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    // 波形設定
    oscillator.type = synthSettings.waveform;
    oscillator.frequency.setValueAtTime(frequency, now);

    // ADSR エンベロープ
    const attack = synthSettings.attack;
    const release = synthSettings.release;

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.3, now + attack);
    gainNode.gain.setValueAtTime(0.3, now + duration - release);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

    // 接続
    oscillator.connect(gainNode);
    gainNode.connect(filterNode);

    // 再生
    oscillator.start(now);
    oscillator.stop(now + duration);
}

// ===== イベントリスナーの設定 =====
function setupEventListeners() {
    // ウィンドウリサイズ
    window.addEventListener('resize', onWindowResize);

    // マウスクリック
    renderer.domElement.addEventListener('click', onMouseClick);

    // マウス移動（ホバーエフェクト）
    renderer.domElement.addEventListener('mousemove', onMouseMove);

    // Audio Start ボタン
    document.getElementById('playBtn').addEventListener('click', () => {
        initAudio();
    });

    // Reset ボタン
    document.getElementById('resetBtn').addEventListener('click', resetScene);

    // ボリュームコントロール
    document.getElementById('volumeSlider').addEventListener('input', (e) => {
        const value = e.target.value;
        document.getElementById('volumeValue').textContent = value + '%';
        if (masterGain) {
            masterGain.gain.value = value / 100;
        }
    });

    // リバーブコントロール
    document.getElementById('reverbSlider').addEventListener('input', (e) => {
        const value = e.target.value;
        document.getElementById('reverbValue').textContent = value + '%';
        if (reverbNode) {
            reverbNode.gain.value = value / 100;
        }
    });

    // 波形選択
    document.getElementById('waveformSelect').addEventListener('change', (e) => {
        synthSettings.waveform = e.target.value;
        console.log('波形変更:', synthSettings.waveform);
    });

    // Attack スライダー
    document.getElementById('attackSlider').addEventListener('input', (e) => {
        const value = e.target.value;
        synthSettings.attack = (value / 100) * 0.5; // 0〜0.5秒
        document.getElementById('attackValue').textContent = synthSettings.attack.toFixed(2) + 's';
    });

    // Release スライダー
    document.getElementById('releaseSlider').addEventListener('input', (e) => {
        const value = e.target.value;
        synthSettings.release = (value / 100) * 2; // 0〜2秒
        document.getElementById('releaseValue').textContent = synthSettings.release.toFixed(2) + 's';
    });

    // Filter スライダー
    document.getElementById('filterSlider').addEventListener('input', (e) => {
        const value = e.target.value;
        const freq = 100 + (value / 100) * 19900; // 100Hz〜20000Hz
        synthSettings.filterFreq = freq;
        document.getElementById('filterValue').textContent = Math.round(freq) + 'Hz';
        if (filterNode) {
            filterNode.frequency.value = freq;
        }
    });
}

// ===== マウスクリック処理 =====
function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(cubes);

    if (intersects.length > 0) {
        const clickedCube = intersects[0].object;
        
        // 音を再生
        playNote(clickedCube.userData.frequency);

        // ビジュアルフィードバック
        animateCubeClick(clickedCube);

        // 統計更新
        playCount++;
        document.getElementById('playCount').textContent = playCount;
        document.getElementById('lastNote').textContent = clickedCube.userData.note;
    }
}

// ===== マウス移動処理（ホバー） =====
function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(cubes);

    // 全キューブをリセット
    cubes.forEach(cube => {
        cube.material.emissiveIntensity = 0.2;
        cube.scale.set(1, 1, 1);
    });

    // ホバー中のキューブを強調
    if (intersects.length > 0) {
        const hoveredCube = intersects[0].object;
        hoveredCube.material.emissiveIntensity = 0.5;
        hoveredCube.scale.set(1.1, 1.1, 1.1);
        renderer.domElement.style.cursor = 'pointer';
    } else {
        renderer.domElement.style.cursor = 'grab';
    }
}

// ===== キューブクリックアニメーション =====
function animateCubeClick(cube) {
    const originalY = cube.userData.originalY;
    const originalIntensity = 0.2;
    
    let progress = 0;
    const duration = 500;
    const startTime = Date.now();
    
    function animate() {
        const elapsed = Date.now() - startTime;
        progress = Math.min(elapsed / duration, 1);
        
        if (progress <= 0.5) {
            const t = progress * 2;
            cube.position.y = originalY + (t * 2);
            cube.material.emissiveIntensity = originalIntensity + (t * 0.8);
        } else {
            const t = (progress - 0.5) * 2;
            cube.position.y = originalY + ((1 - t) * 2);
            cube.material.emissiveIntensity = originalIntensity + ((1 - t) * 0.8);
        }
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            cube.position.y = originalY;
            cube.material.emissiveIntensity = originalIntensity;
        }
    }
    
    animate();
}

// ===== シーンリセット =====
function resetScene() {
    playCount = 0;
    document.getElementById('playCount').textContent = '0';
    document.getElementById('lastNote').textContent = '-';

    cubes.forEach(cube => {
        cube.position.y = cube.userData.originalY;
        cube.rotation.set(0, 0, 0);
        cube.material.emissiveIntensity = 0.2;
    });
}

// ===== ウィンドウリサイズ =====
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// ===== アニメーションループ =====
function animate() {
    requestAnimationFrame(animate);

    // キューブの自動回転
    cubes.forEach((cube, index) => {
        cube.rotation.y += 0.005 * (index + 1);
        
        // フローティングエフェクト
        const time = Date.now() * 0.001;
        const originalY = cube.userData.originalY;
        if (Math.abs(cube.position.y - originalY) < 0.3) {
            cube.position.y = originalY + Math.sin(time + index) * 0.2;
        }
    });

    // カメラの自動回転
    const time = Date.now() * 0.0001;
    camera.position.x = Math.sin(time) * 10;
    camera.position.z = Math.cos(time) * 10;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
}

// ===== 起動 =====
window.addEventListener('DOMContentLoaded', init);
