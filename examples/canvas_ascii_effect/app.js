window.onload = function () {
    var example = new CanvasAsciiEffectExample();
    example.init();
    example.animate();
};

var CanvasAsciiEffectExample = (function () {
    function CanvasAsciiEffectExample() {
        var _this = this;
        this.start = Date.now();
        this.onWindowResize = function () {
            _this.camera.aspect = window.innerWidth / window.innerHeight;
            _this.camera.updateProjectionMatrix();

            _this.renderer.setSize(window.innerWidth, window.innerHeight);
            _this.effect.setSize(window.innerWidth, window.innerHeight);
        };
        //
        this.animate = function () {
            requestAnimationFrame(_this.animate);

            _this.render();
            _this.stats.update();
        };
        this.render = function () {
            var timer = Date.now() - _this.start;

            _this.sphere.position.y = Math.abs(Math.sin(timer * 0.002)) * 150;
            _this.sphere.rotation.x = timer * 0.0003;
            _this.sphere.rotation.z = timer * 0.0002;

            _this.controls.update();

            _this.effect.render(_this.scene, _this.camera);
        };
    }
    CanvasAsciiEffectExample.prototype.init = function () {
        var width = window.innerWidth || 2;
        var height = window.innerHeight || 2;

        this.container = document.createElement('div');
        document.body.appendChild(this.container);

        var info = document.createElement('div');
        info.style.position = 'absolute';
        info.style.top = '10px';
        info.style.width = '100%';
        info.style.textAlign = 'center';
        info.innerHTML = 'Drag to change the view';
        this.container.appendChild(info);

        this.camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
        this.camera.position.y = 150;
        this.camera.position.z = 500;

        this.controls = new THREE.TrackballControls(this.camera);

        this.scene = new THREE.Scene();

        var light = new THREE.PointLight(0xffffff);
        light.position.set(500, 500, 500);
        this.scene.add(light);

        var light = new THREE.PointLight(0xffffff, 0.25);
        light.position.set(-500, -500, -500);
        this.scene.add(light);

        this.sphere = new THREE.Mesh(new THREE.SphereGeometry(200, 20, 10), new THREE.MeshLambertMaterial({ shading: THREE.FlatShading }));
        this.scene.add(this.sphere);

        // Plane
        this.plane = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), new THREE.MeshBasicMaterial({ color: 0xe0e0e0 }));
        this.plane.position.y = -200;
        this.plane.rotation.x = -Math.PI / 2;
        this.scene.add(this.plane);

        this.renderer = new THREE.CanvasRenderer();
        this.renderer.setSize(width, height);

        //this.effect = new THREE.AsciiEffect(this.renderer);
        this.effect.setSize(width, height);
        this.container.appendChild(this.effect.domElement);

        this.stats = new Stats();
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.top = '0px';
        this.container.appendChild(this.stats.domElement);

        //
        window.addEventListener('resize', this.onWindowResize, false);
    };
    return CanvasAsciiEffectExample;
})();
//# sourceMappingURL=app.js.map
