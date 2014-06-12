
window.onload = () => {
    var example = new CanvasAsciiEffectExample();
    example.init();
    example.animate();
};

class CanvasAsciiEffectExample {

    container: Element;
    stats: Stats;
    
    camera: THREE.PerspectiveCamera;
    controls: THREE.TrackballControls;
    effect: THREE.AsciiEffect;
    scene: THREE.Scene;
    renderer: THREE.CanvasRenderer;

    sphere: THREE.Mesh;
    plane: THREE.Mesh;

    start: number = Date.now();

    public init() {

	    var width = window.innerWidth || 2;
	    var height = window.innerHeight || 2;

	    this.container = document.createElement( 'div' );
        document.body.appendChild(this.container);

	    var info = document.createElement( 'div' );
	    info.style.position = 'absolute';
	    info.style.top = '10px';
	    info.style.width = '100%';
	    info.style.textAlign = 'center';
	    info.innerHTML = 'Drag to change the view';
        this.container.appendChild( info );

        this.camera = new THREE.PerspectiveCamera( 70, width / height, 1, 1000 );
        this.camera.position.y = 150;
        this.camera.position.z = 500;

        this.controls = new THREE.TrackballControls(this.camera);

        this.scene = new THREE.Scene();

	    var light = new THREE.PointLight( 0xffffff );
	    light.position.set( 500, 500, 500 );
        this.scene.add( light );

	    var light = new THREE.PointLight( 0xffffff, 0.25 );
	    light.position.set( - 500, - 500, - 500 );
        this.scene.add( light );

        this.sphere = new THREE.Mesh( new THREE.SphereGeometry( 200, 20, 10 ), new THREE.MeshLambertMaterial( { shading: THREE.FlatShading } ) );
        this.scene.add(this.sphere);

	    // Plane

        this.plane = new THREE.Mesh( new THREE.PlaneGeometry( 400, 400 ), new THREE.MeshBasicMaterial( { color: 0xe0e0e0 } ) );
        this.plane.position.y = - 200;
        this.plane.rotation.x = - Math.PI / 2;
        this.scene.add(this.plane );

        this.renderer = new THREE.CanvasRenderer();
        this.renderer.setSize( width, height );

        //this.effect = new THREE.AsciiEffect(this.renderer);
        this.effect.setSize( width, height );
        this.container.appendChild(this.effect.domElement);

        this.stats = new Stats();
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.top = '0px';
        this.container.appendChild(this.stats.domElement);

	    //

        window.addEventListener('resize', this.onWindowResize, false);

    }

    public onWindowResize = ():void => {

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.effect.setSize( window.innerWidth, window.innerHeight );

    }

    //

    public animate = ():void => {

        requestAnimationFrame(this.animate);

        this.render();
        this.stats.update();

    }

    public render = ():void => {

        var timer = Date.now() - this.start;

        this.sphere.position.y = Math.abs(Math.sin(timer * 0.002)) * 150;
        this.sphere.rotation.x = timer * 0.0003;
        this.sphere.rotation.z = timer * 0.0002;

        this.controls.update();

        this.effect.render(this.scene, this.camera);

    }
}