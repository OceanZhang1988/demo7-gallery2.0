// abstract library
import { DrawingCommon } from './common';
import { Environment } from './gallery';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Character } from './character';
import { MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper';

const clock = new THREE.Clock();

//@ts-ignore
const Ammo = window.Ammo;

// A class for our application state and functionality
class Drawing extends DrawingCommon {

    orbitControl: OrbitControls;
    // animationMixer: THREE.AnimationMixer;
    character: Character;
    lastTime: DOMHighResTimeStamp = -1;

    constructor (canv: HTMLElement) {
        super (canv)

        this.character = this.scene.userData["character"];

        this.orbitControl = this.scene.userData["OrbitControls"];
        this.orbitControl.listenToKeyEvents( window ); // optional
        this.orbitControl.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        this.orbitControl.dampingFactor = 0.05;

        this.orbitControl.screenSpacePanning = false;
        this.orbitControl.enableRotate = true;

        //this.orbitControl.minDistance = 100;
        //this.orbitControl.maxDistance = 500;

        this.orbitControl.maxPolarAngle = Math.PI / 2;
        this.orbitControl.target =  this.character.miku.position;
        // this.animationMixer = this.scene.userData["animationMixer"];
        
    }


    setupLight() {
        // lights

        const directionalLight = new THREE.DirectionalLight( 0x887766, 1);
		directionalLight.position.set( -1, 1, 1 ).normalize();
        directionalLight.castShadow = true;
        //directionalLight.target.position.set(50, 0,  0);
        //this.scene.add( directionalLight.target );
		this.scene.add( directionalLight );
		
        this.scene.add(new THREE.CameraHelper(directionalLight.shadow.camera));


        const skyColor = 0x887766;  // light blue
        const groundColor = 0x887766;  // brownish orange
        const intensity = 0.1;
        const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
        this.scene.add(light);

    }

     /*
	Set up the scene during class construction
	*/
	initializeScene(){
        console.log("This is ammo:", Ammo);
        var shape = new Ammo.btBoxShape( new Ammo.btVector3( 1, 1, 1 ) );
        console.log("This is ammo shape:", shape);
        
        this.setupLight();
        //the root group
        const objectRoot: THREE.Group = new THREE.Group();
        objectRoot.name = "root";
        const env = new Environment();

        const gallery = env.getGallery();

        objectRoot.add(gallery);
        this.scene.add(objectRoot);

        const controls = new OrbitControls(this.camera, this.glCanvas);
        this.scene.userData["OrbitControls"] = controls;
        

        controls.enableKeys = false;

        // this.scene.add( new THREE.AxesHelper(500));

        //trial
        this.scene.userData["character"] = new Character(this.scene, this.camera, this.orbitControl);
        this.scene.userData["character"].initMiku();

    }

	/*
	Update the scene during requestAnimationFrame callback before rendering
	*/
	updateScene(time: DOMHighResTimeStamp){
        // this.orbitControl.center =  new THREE.Vector3(
        //     this.character.miku.position.x,
        //     this.character.miku.position.y,
        //     this.character.miku.position.z,
        // );
        if (this.character.miku) {
            this.orbitControl.target.set(this.character.miku.position.x
                , this.character.miku.position.y, this.character.miku.position.z);
        }
        this.orbitControl.update();
        if (this.lastTime == -1) {
            this.lastTime = time;
        }
        let delta = (time - this.lastTime) / 1000;
        if(this.character.getMixer()){
            this.character.manageMove(delta);
            //this.character.mixer.update(delta);
            //this.character.manageMove(delta)
        }

        this.lastTime = time;
         
    }

}

// a global variable for our state.  We implement the drawing as a class, and 
// will have one instance
var myDrawing: Drawing;

// main function that we call below.
// This is done to keep things together and keep the variables created self contained.
// It is a common pattern on the web, since otherwise the variables below woudl be in 
// the global name space.  Not a huge deal here, of course.

function exec() {
    // find our container
    var div = document.getElementById("drawing");

    if (!div) {
        console.warn("Your HTML page needs a DIV with id='drawing'")
        return;
    }

    // create a Drawing object
    myDrawing = new Drawing(div);
}

exec()