///<reference path="lib/stats.d.ts" />
///<reference path="lib/three.d.ts" />

window.onload = () => {
    var example = new CanvasGeometryCubeExample();
    example.init();
    example.animate();
};

class CanvasGeometryCubeExample {

    container: Element;
    stats: Stats;

    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    renderer: THREE.CanvasRenderer;

    cube: THREE.Mesh;
    plane: THREE.Mesh;

    targetRotation: number = 0;
    targetRotationOnMouseDown: number = 0;

    mouseX: number = 0;
    mouseXOnMouseDown: number = 0;

    windowHalfX: number = window.innerWidth / 2;
    windowHalfY: number = window.innerHeight / 2;

    constructor() {

    }

    public init():void {

        this.container = document.createElement('div');
        document.body.appendChild(this.container);

        var info = document.createElement('div');
        info.style.position = 'absolute';
        info.style.top = '10px';
        info.style.width = '100%';
        info.style.textAlign = 'center';
        info.innerHTML = 'Drag to spin the cube';
        this.container.appendChild(info);

        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.y = 150;
        this.camera.position.z = 500;

        this.scene = new THREE.Scene();

        // Cube

        var geometry = new THREE.BoxGeometry(200, 200, 200);

        for (var i = 0; i < geometry.faces.length; i += 2) {

            var hex = Math.random() * 0xffffff;
            geometry.faces[i].color.setHex(hex);
            geometry.faces[i + 1].color.setHex(hex);

        }

        var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors, overdraw: 0.5 });

        this.cube = new THREE.Mesh(geometry, material);
        this.cube.position.y = 150;
        this.scene.add(this.cube);

        // Plane

        var geometry = new THREE.PlaneGeometry(200, 200);
        geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

        var material = new THREE.MeshBasicMaterial({ color: 0xe0e0e0, overdraw: 0.5 });

        this.plane = new THREE.Mesh(geometry, material);
        this.scene.add(this.plane);

        this.renderer = new THREE.CanvasRenderer();
        this.renderer.setClearColor(0xf0f0f0);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.container.appendChild(this.renderer.domElement);

        this.stats = new Stats();
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.top = '0px';
        this.container.appendChild(this.stats.domElement);

        document.addEventListener('mousedown', this.onDocumentMouseDown, false);
        document.addEventListener('touchstart', this.onDocumentTouchStart, false);
        document.addEventListener('touchmove', this.onDocumentTouchMove, false);

        //

        window.addEventListener('resize', this.onWindowResize, false);

    }

    public onWindowResize = ():void => {

        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);

    }

    //

    public onDocumentMouseDown = (event: MouseEvent):void => {
        
        event.preventDefault();

        document.addEventListener('mousemove', this.onDocumentMouseMove, false);
        document.addEventListener('mouseup', this.onDocumentMouseUp, false);
        document.addEventListener('mouseout', this.onDocumentMouseOut, false);

        this.mouseXOnMouseDown = event.clientX - this.windowHalfX;
        this.targetRotationOnMouseDown = this.targetRotation;

    }

    public onDocumentMouseMove = (event: MouseEvent):void => {
        
        this.mouseX = event.clientX - this.windowHalfX;

        this.targetRotation = this.targetRotationOnMouseDown + (this.mouseX - this.mouseXOnMouseDown) * 0.02;

    }

    public onDocumentMouseUp = (event: MouseEvent):void => {
        
        document.removeEventListener('mousemove', this.onDocumentMouseMove, false);
        document.removeEventListener('mouseup', this.onDocumentMouseUp, false);
        document.removeEventListener('mouseout', this.onDocumentMouseOut, false);

    }

    public onDocumentMouseOut = (event: MouseEvent):void => {
        
        document.removeEventListener('mousemove', this.onDocumentMouseMove, false);
        document.removeEventListener('mouseup', this.onDocumentMouseUp, false);
        document.removeEventListener('mouseout', this.onDocumentMouseOut, false);

    }

    public onDocumentTouchStart = (event):void => {
        
        if (event.touches.length === 1) {

            event.preventDefault();

            this.mouseXOnMouseDown = event.touches[0].pageX - this.windowHalfX;
            this.targetRotationOnMouseDown = this.targetRotation;

        }

    }

    public onDocumentTouchMove = (event): void => {

        if (event.touches.length === 1) {

            event.preventDefault();

            this.mouseX = event.touches[0].pageX - this.windowHalfX;
            this.targetRotation = this.targetRotationOnMouseDown + (this.mouseX - this.mouseXOnMouseDown) * 0.05;

        }

    }

    //

    public render():void {

        this.plane.rotation.y = this.cube.rotation.y += (this.targetRotation - this.cube.rotation.y) * 0.05;
        this.renderer.render(this.scene, this.camera);

    }

    public animate = () => {

        requestAnimationFrame(this.animate);

        this.render();
        this.stats.update();

    }

}