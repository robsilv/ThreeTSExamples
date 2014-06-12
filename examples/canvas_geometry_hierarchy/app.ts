window.onload = () => {
    var example = new CanvasGeometryHierarchyExample();
    example.init();
    example.animate();
};

class CanvasGeometryHierarchyExample {

    container: Element;
    stats: Stats;

    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    renderer: THREE.CanvasRenderer;

    geometry: THREE.CubeGeometry;
    group: THREE.Object3D;

    mouseX: number = 0;
    mouseY:number = 0;

    windowHalfX:number = window.innerWidth / 2;
    windowHalfY:number = window.innerHeight / 2;

    init() {
        
        document.addEventListener('mousemove', this.onDocumentMouseMove, false);

        this.container = document.createElement('div');
        document.body.appendChild(this.container );

        this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
        this.camera.position.z = 500;

        this.scene = new THREE.Scene();

	    var geometry = new THREE.BoxGeometry( 100, 100, 100 );
	    var material = new THREE.MeshNormalMaterial( { overdraw: 0.5 } );

        this.group = new THREE.Object3D();

	    for ( var i = 0; i < 200; i ++ ) {

		    var mesh = new THREE.Mesh( geometry, material );
		    mesh.position.x = Math.random() * 2000 - 1000;
		    mesh.position.y = Math.random() * 2000 - 1000;
		    mesh.position.z = Math.random() * 2000 - 1000;
		    mesh.rotation.x = Math.random() * 2 * Math.PI;
		    mesh.rotation.y = Math.random() * 2 * Math.PI;
		    mesh.matrixAutoUpdate = false;
		    mesh.updateMatrix();
            this.group.add( mesh );

	    }

        this.scene.add( this.group );

	    this.renderer = new THREE.CanvasRenderer();
        this.renderer.setClearColor( 0xffffff );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.container.appendChild(this.renderer.domElement );

        this.stats = new Stats();
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.top = '0px';
        this.stats.domElement.style.zIndex = "100";
        this.container.appendChild(this.stats.domElement );

	    //

        window.addEventListener('resize', this.onWindowResize, false);

    }

    public onWindowResize = ():void => {

        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( window.innerWidth, window.innerHeight );

    }

    public onDocumentMouseMove = (event:MouseEvent):void => {

        this.mouseX = (event.clientX - this.windowHalfX) * 10;
        this.mouseY = (event.clientY - this.windowHalfY) * 10;

    }

    //

    public animate = ():void => {

	    requestAnimationFrame( this.animate );

        this.render();
        this.stats.update();

    }

    public render = ():void => {

        this.camera.position.x += (this.mouseX - this.camera.position.x) * .05;
        this.camera.position.y += (- this.mouseY - this.camera.position.y) * .05;
        this.camera.lookAt(this.scene.position );

	    var currentSeconds = Date.now();
        this.group.rotation.x = Math.sin( currentSeconds * 0.0007 ) * 0.5;
        this.group.rotation.y = Math.sin( currentSeconds * 0.0003 ) * 0.5;
        this.group.rotation.z = Math.sin( currentSeconds * 0.0002 ) * 0.5;

        this.renderer.render(this.scene, this.camera);

    }
}