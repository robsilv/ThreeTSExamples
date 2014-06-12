///<reference path="lib/stats.d.ts" />
///<reference path="lib/three.d.ts" />
window.onload = function () {
    var example = new CanvasGeometryCubeExample();
    example.init();
    example.animate();
};

var CanvasGeometryCubeExample = (function () {
    function CanvasGeometryCubeExample() {
        var _this = this;
        this.targetRotation = 0;
        this.targetRotationOnMouseDown = 0;
        this.mouseX = 0;
        this.mouseXOnMouseDown = 0;
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
        this.onWindowResize = function () {
            _this.windowHalfX = window.innerWidth / 2;
            _this.windowHalfY = window.innerHeight / 2;

            _this.camera.aspect = window.innerWidth / window.innerHeight;
            _this.camera.updateProjectionMatrix();

            _this.renderer.setSize(window.innerWidth, window.innerHeight);
        };
        //
        this.onDocumentMouseDown = function (event) {
            event.preventDefault();

            document.addEventListener('mousemove', _this.onDocumentMouseMove, false);
            document.addEventListener('mouseup', _this.onDocumentMouseUp, false);
            document.addEventListener('mouseout', _this.onDocumentMouseOut, false);

            _this.mouseXOnMouseDown = event.clientX - _this.windowHalfX;
            _this.targetRotationOnMouseDown = _this.targetRotation;
        };
        this.onDocumentMouseMove = function (event) {
            _this.mouseX = event.clientX - _this.windowHalfX;

            _this.targetRotation = _this.targetRotationOnMouseDown + (_this.mouseX - _this.mouseXOnMouseDown) * 0.02;
        };
        this.onDocumentMouseUp = function (event) {
            document.removeEventListener('mousemove', _this.onDocumentMouseMove, false);
            document.removeEventListener('mouseup', _this.onDocumentMouseUp, false);
            document.removeEventListener('mouseout', _this.onDocumentMouseOut, false);
        };
        this.onDocumentMouseOut = function (event) {
            document.removeEventListener('mousemove', _this.onDocumentMouseMove, false);
            document.removeEventListener('mouseup', _this.onDocumentMouseUp, false);
            document.removeEventListener('mouseout', _this.onDocumentMouseOut, false);
        };
        this.onDocumentTouchStart = function (event) {
            if (event.touches.length === 1) {
                event.preventDefault();

                _this.mouseXOnMouseDown = event.touches[0].pageX - _this.windowHalfX;
                _this.targetRotationOnMouseDown = _this.targetRotation;
            }
        };
        this.onDocumentTouchMove = function (event) {
            if (event.touches.length === 1) {
                event.preventDefault();

                _this.mouseX = event.touches[0].pageX - _this.windowHalfX;
                _this.targetRotation = _this.targetRotationOnMouseDown + (_this.mouseX - _this.mouseXOnMouseDown) * 0.05;
            }
        };
        this.animate = function () {
            requestAnimationFrame(_this.animate);

            _this.render();
            _this.stats.update();
        };
    }
    CanvasGeometryCubeExample.prototype.init = function () {
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
    };

    //
    CanvasGeometryCubeExample.prototype.render = function () {
        this.plane.rotation.y = this.cube.rotation.y += (this.targetRotation - this.cube.rotation.y) * 0.05;
        this.renderer.render(this.scene, this.camera);
    };
    return CanvasGeometryCubeExample;
})();
//# sourceMappingURL=app.js.map
