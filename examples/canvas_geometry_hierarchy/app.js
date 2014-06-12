window.onload = function () {
    var example = new CanvasGeometryHierarchyExample();
    example.init();
    example.animate();
};

var CanvasGeometryHierarchyExample = (function () {
    function CanvasGeometryHierarchyExample() {
        var _this = this;
        this.mouseX = 0;
        this.mouseY = 0;
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
        this.onWindowResize = function () {
            _this.windowHalfX = window.innerWidth / 2;
            _this.windowHalfY = window.innerHeight / 2;

            _this.camera.aspect = window.innerWidth / window.innerHeight;
            _this.camera.updateProjectionMatrix();

            _this.renderer.setSize(window.innerWidth, window.innerHeight);
        };
        this.onDocumentMouseMove = function (event) {
            _this.mouseX = (event.clientX - _this.windowHalfX) * 10;
            _this.mouseY = (event.clientY - _this.windowHalfY) * 10;
        };
        //
        this.animate = function () {
            requestAnimationFrame(_this.animate);

            _this.render();
            _this.stats.update();
        };
        this.render = function () {
            _this.camera.position.x += (_this.mouseX - _this.camera.position.x) * .05;
            _this.camera.position.y += (-_this.mouseY - _this.camera.position.y) * .05;
            _this.camera.lookAt(_this.scene.position);

            var currentSeconds = Date.now();
            _this.group.rotation.x = Math.sin(currentSeconds * 0.0007) * 0.5;
            _this.group.rotation.y = Math.sin(currentSeconds * 0.0003) * 0.5;
            _this.group.rotation.z = Math.sin(currentSeconds * 0.0002) * 0.5;

            _this.renderer.render(_this.scene, _this.camera);
        };
    }
    CanvasGeometryHierarchyExample.prototype.init = function () {
        document.addEventListener('mousemove', this.onDocumentMouseMove, false);

        this.container = document.createElement('div');
        document.body.appendChild(this.container);

        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.z = 500;

        this.scene = new THREE.Scene();

        var geometry = new THREE.BoxGeometry(100, 100, 100);
        var material = new THREE.MeshNormalMaterial({ overdraw: 0.5 });

        this.group = new THREE.Object3D();

        for (var i = 0; i < 200; i++) {
            var mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = Math.random() * 2000 - 1000;
            mesh.position.y = Math.random() * 2000 - 1000;
            mesh.position.z = Math.random() * 2000 - 1000;
            mesh.rotation.x = Math.random() * 2 * Math.PI;
            mesh.rotation.y = Math.random() * 2 * Math.PI;
            mesh.matrixAutoUpdate = false;
            mesh.updateMatrix();
            this.group.add(mesh);
        }

        this.scene.add(this.group);

        this.renderer = new THREE.CanvasRenderer();
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);

        this.stats = new Stats();
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.top = '0px';
        this.stats.domElement.style.zIndex = "100";
        this.container.appendChild(this.stats.domElement);

        //
        window.addEventListener('resize', this.onWindowResize, false);
    };
    return CanvasGeometryHierarchyExample;
})();
//# sourceMappingURL=app.js.map
