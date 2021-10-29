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
        
        this.orbitControl = this.scene.userData["OrbitControls"];
        this.character = this.scene.userData["character"];
        // this.animationMixer = this.scene.userData["animationMixer"];
        
    }


    setupLight() {
        // lights

        const directionalLight = new THREE.DirectionalLight( 0x887766, 1);
		directionalLight.position.set( - 1, 1, 1 ).normalize();
		this.scene.add( directionalLight );


		// const dirLight = new THREE.DirectionalLight( 0xffffff, 0.5);
        // dirLight.position.set(10, 50, 1).normalize();
        // dirLight.castShadow = true;

        // dirLight.shadow.mapSize.width = 1024;
        // dirLight.shadow.mapSize.height = 1024;

        // const d = 10;

        // dirLight.shadow.camera.left = - d;
        // dirLight.shadow.camera.right = d;
        // dirLight.shadow.camera.top = d;
        // dirLight.shadow.camera.bottom = - d;

        // dirLight.shadow.camera.far = 2000;
        // dirLight.shadow.camera.near = 0.1;
        // dirLight.shadow.bias = - 0.0001;
        
        // dirLight.target.position.set(30, 0,  0);

        // this.scene.add( dirLight.target );
        // this.scene.add( dirLight );
        this.scene.add(new THREE.CameraHelper(directionalLight.shadow.camera));


        // const skyColor = 0xffffff;  // light blue
        // const groundColor = 0xffffff;  // brownish orange
        // const intensity = 0.1;
        // const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
        // this.scene.add(light);

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
        controls.target.set(0, 20, 0);
        controls.enableKeys = false;

        // this.scene.add( new THREE.AxesHelper(500));

        //trial
        this.scene.userData["character"] = new Character(this.scene, this.camera);
        this.scene.userData["character"].getMiku();
    }

	/*
	Update the scene during requestAnimationFrame callback before rendering
	*/
	updateScene(time: DOMHighResTimeStamp){
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