import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {OutlineEffect} from 'three/examples/jsm/effects/OutlineEffect';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass';
import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass';
import {OutlinePass} from 'three/examples/jsm/postprocessing/OutlinePass';
import {GammaCorrectionShader} from 'three/examples/jsm/shaders/GammaCorrectionShader';



export class DrawingCommon {
    private _boundHandleFrame: (t: DOMHighResTimeStamp) => any;

    // convenience
    startTime = -1

    // DOM items
    glCanvas = document.createElement('canvas')
	glContext: WebGL2RenderingContext;

    // Three.js items
    scene = new THREE.Scene() 
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
    renderer: THREE.WebGLRenderer;
    effect: OutlineEffect;

    composer: EffectComposer;

    constructor(public el: HTMLElement){
        // make it a method that's bound to this object
		this._boundHandleFrame = this._handleFrame.bind(this) 

        // let's create a canvas and to draw in
        el.appendChild(this.glCanvas);

        this.glCanvas.id = "threecanvas";

        // define scene view
        this.scene.background = new THREE.Color( 0xcccccc );

        this.camera.position.set(40, 50, 100);
		this.scene.add(this.camera)

		// Create a canvas and context for the session layer
		let ctx = this.glCanvas.getContext('webgl2')
        if (!ctx) {
            throw new Error("Cannot create WebGL render context in common.ts")
        }
        this.glContext = ctx

		// Set up the THREE renderer with the session's layer's glContext
		this.renderer = new THREE.WebGLRenderer({
			canvas: this.glCanvas,
			context: this.glContext,
			antialias: true,
			alpha: true
		})
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( this.glCanvas.offsetWidth, this.glCanvas.offsetHeight );
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.NoToneMapping;
        this.renderer.toneMappingExposure = 1;
        
        console.log("webgl2?",this.renderer.capabilities.isWebGL2);
        // update the camera
        this.camera.aspect = this.glCanvas.offsetWidth / this.glCanvas.offsetHeight;
        this.camera.updateProjectionMatrix();

        // just ambient light
		const ambientLight = new THREE.AmbientLight( 0x666666, 0.8);
		this.scene.add( ambientLight );

        //post processing
        this.composer = new EffectComposer( this.renderer );
		this.composer.addPass( new RenderPass( this.scene, this.camera ) );

        this.composer.addPass(new ShaderPass(GammaCorrectionShader));

        const outlinePass = new OutlinePass( 
            new THREE.Vector2( window.innerWidth, window.innerHeight ), this.scene, this.camera );
		this.composer.addPass( outlinePass );

		// const effect2 = new ShaderPass( RGBShiftShader );
		// effect2.uniforms[ 'amount' ].value = 0.0015;
		// this.composer.addPass( effect2 );
        
        //effect
        this.effect = new OutlineEffect(this.renderer);

		// Give extending classes the opportunity to initially populate the scene
		this.initializeScene()

        window.addEventListener('resize', (event) => {
            this.camera.aspect = this.el.offsetWidth / this.el.offsetHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize( this.el.offsetWidth, this.el.offsetHeight );
            this.effect.setSize( this.el.offsetWidth, this.el.offsetHeight );

			//this.composer.setSize( this.el.offsetWidth, this.el.offsetHeight  );
        });

        window.requestAnimationFrame(this._boundHandleFrame)
	}


    // a simple wrapper to reliably get the offset within an DOM element
    // We need this because the mouse position in the mouse event is
    // relative to the Window, but we want to specify draw coordinates
    // relative to the canvas DOM element  
    // see: http://www.jacklmoore.com/notes/mouse-position/
    static offset(e: MouseEvent): ps.MousePosition {
        e = e || <MouseEvent> window.event;

        var target = <Element> (e.target || e.srcElement),
            rect = target.getBoundingClientRect(),
            offsetX = e.clientX - rect.left,
            offsetY = e.clientY - rect.top;

        return {x: offsetX, y: offsetY};
    }

	/*
	Extending classes should override this to set up the scene during class construction
	*/
	initializeScene(){}

	/*
	Extending classes that need to update the layer during each frame should override this method
	*/
	updateScene(time: DOMHighResTimeStamp){}

	_handleFrame(t: DOMHighResTimeStamp){
		const nextFrameRequest = window.requestAnimationFrame(this._boundHandleFrame)

        if (this.startTime == -1) { 
            this.startTime = t
        }
        // Let the extending class update the scene before each render
		this.updateScene(t)

	    this.doRender()
    }

	doRender() {
		//this.renderer.render(this.scene, this.camera);
        this.effect.render(this.scene, this.camera);
        //this.composer.render();
	}
}
