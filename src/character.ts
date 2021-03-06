// abstract library
import * as THREE from 'three'
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader';
import { MMDAnimationHelper} from 'three/examples/jsm/animation/MMDAnimationHelper';
import { AnimationAction, AnimationClip, AnimationMixer, MathUtils, Mesh, MeshToonMaterial, SkinnedMesh, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//@ts-ignore
const Ammo = window.Ammo;
let globalCharacter: Character;
const clock = new THREE.Clock();

// A class for our application state and functionality
export class Character  {
    modelParams: Array<any>;
    motionParams: Array<any>;
    cameraParams: Array<any>;
    poseParams: Array<any>;

    miku!: THREE.SkinnedMesh;

    helper: MMDAnimationHelper;
    loader: MMDLoader;

    scene: THREE.Scene;
    camera: THREE.Camera;
    mixer!: THREE.AnimationMixer | undefined;
    clips!: THREE.AnimationClip[];

    motionStatus = {
        inWalking: false,
        inRunning: false,
        inStartWalking: false,
        inStartRunning: false,
        inStopWalking: false,
        inStopRunning: false,
        inMovingForward: false,
        inMovingBackward: false,
        inRotatingLeft: false,
        inRotatingRight: false,
        direction: 0,
        runFlag: false,
        duration: 0.0,
        elapsedTimeSinceStartWalking: 0.0,
        elapsedTimeSinceStartRunning: 0.0,
        elapsedTimeSinceStopWalking: 0.0,
        elapsedTimeSinceStopRunning: 0.0
    };

    boneDictionary: Record<string, number> = {};
    modelDictionary: Record<string, number> = {};
    motionDictionary: Record<string, AnimationClip> = {};
    poses: Record<string, any>;
    debug: boolean = false;
    ready: boolean  = false;

    turnAround: boolean = false;

    orbitControl: OrbitControls;

    walkEnabled: boolean = false;

    constructor (scene: THREE.Scene, camera: THREE.Camera, control: OrbitControls) {

        this.orbitControl = control;

        this.modelParams = [
            {
                name: 'miku',
                file: './assets/Yoimiya/Yoimiya.pmx',
                position: new THREE.Vector3( 30, 0,  0 )
            }
        ];

        this.motionParams = [
            {
                name: 'walk',
                isMoving: true,
                files: [ './assets/vmd/walk/walk.vmd' ]
            },
            {
                name: 'run',
                isMoving: true,
                files: [ './assets/vmd/walk/run.vmd' ]
            }
        ];

        this.cameraParams = [
            {
                name: 'camera',
                position: new THREE.Vector3( 0, 0, -25 )
            }
        ];

        this.poseParams = [
            {
                name: 'basic',
                file: './assets/vpd/imas/makoto_basic.vpd'
            }
        ];

        this.poses = {};
        //@ts-ignore
        this.helper = new MMDAnimationHelper({sync: true, afterglow: 0, pmxAnimation: true, resetPhysicsOnLoop: true});
        this.helper.enable("physics", true);
        this.helper.enable("ik", true);
        this.helper.enable("grant", true);
        this.helper.sharedPhysics = false;
        

        console.log(this.helper);
		this.loader = new MMDLoader();
        this.scene = scene;
        this.camera = camera;

        this.ready = true;
        globalCharacter = this;
        console.log("????????????",this.ready);

    }
    getMixer(): AnimationMixer{
        return this.mixer;
    }

    initMiku() {
        //environment group under root
        const miku: THREE.Group = new THREE.Group();
        miku.name = "character";

		let self = this;

        this.loader.load(
            // path to PMD/PMX file
            this.modelParams[0].file,
            // called when the resource is loaded
            function ( mmd: THREE.SkinnedMesh ) {
                self.miku = mmd;
                self.miku.castShadow = true;

                self.miku.traverse(function(child){
                    if ( child instanceof Mesh ) {
                        child.material.forEach( (material: MeshToonMaterial) => {
                            if (material.emissiveMap) {
                                material.emissiveMap.encoding = THREE.sRGBEncoding;
                            }

                            if (material.aoMap) {
                                material.aoMap.encoding = THREE.sRGBEncoding;
                            }

                            if (material.lightMap) {
                                material.lightMap.encoding = THREE.sRGBEncoding;
                            }

                            if (material.gradientMap) {
                                material.gradientMap.encoding = THREE.sRGBEncoding;
                                
                            }
                            if (material.map ) {
                                material.map.encoding = THREE.sRGBEncoding;

                                //material.map.mapping = THREE.EquirectangularReflectionMapping;
                                //material.gradientMap.mapping = THREE.EquirectangularReflectionMapping;
                                //material.shininess = 0.1
                                //material.emissiveIntensity = 1
                                //material.color = material.color.convertSRGBToLinear();
                            }
                            material.color.encoding = THREE.sRGBEncoding;
                            material.emissive.encoding = THREE.sRGBEncoding;

                            material.dithering = true;
                            //material.shininess = 5;
                            material.needsUpdate = true;       
                        });
                        console.log(child.material);
                    }
                });
                console.log("model material:", self.miku.material);
                
                self.miku.scale.set(2,2,2);
                self.miku.position.add( self.modelParams[0].position);

                self.scene.add( self.miku );
                self.mixer = new THREE.AnimationMixer(mmd);

                self.loader.loadAnimation(self.motionParams[0].files[0], self.miku, function (vmd){
                    console.log(self.mixer);
                    let clip = vmd as AnimationClip;
                    
                    self.helper.add( self.miku, {
                        animation: [clip],
                        physics: true
                    } );
                    console.log("mixer:", self.helper.objects.get(self.miku)?.mixer)
                    
                    self.mixer = self.helper.objects.get(self.miku)?.mixer;
                    
                    self.motionDictionary['walk'] = clip;
                })
            },
            // called when loading is in progresses
            this.onProgress,
            // called when loading has errors
            this.onError
        );

        document.addEventListener( 'keydown', this.onKeydown, false );
		document.addEventListener( 'keyup', this.onKeyup, false );
    }


    actionDone(e: THREE.Event) {
        console.log("??????????????????", e.target);
        globalCharacter.mixer.removeEventListener('finished', globalCharacter.actionDone);
        //globalCharacter.motionDictionary['walk'].fadeOut(0.5);
    }


    onKeydown ( event: KeyboardEvent ) {

        // if ( ! this.ready ) {
        //     console.log("???ready");
        //     return;

        // }

        switch ( event.key ) {

            case "Shift": // shift
                globalCharacter.motionStatus.runFlag = true;
                break;

            case "ArrowLeft": // left
                globalCharacter.motionStatus.inRotatingLeft = true;
                break;

            case "ArrowUp": // up
                // console.log("??????");
                //globalCharacter.miku.rotateOnAxis(new Vector3(0,1,0),90);
                globalCharacter.motionStatus.inMovingForward = true;
          
                break;

            case "ArrowRight": // right
                globalCharacter.motionStatus.inRotatingRight = true;
                break;

            case "ArrowDown": // down
                
                //console.log("??????");
                //globalCharacter.miku.lookAt(0, 0, -1);
                globalCharacter.motionStatus.inMovingBackward = true;
                //globalCharacter.motionStatus.inStartWalking = true;
                break;

            case "Space": // space
                //globalCharacter.resetPosition();
                break;

            default:
                break;

        }

    }

    onKeyup ( event: KeyboardEvent ) {

        switch ( event.key ) {

            case "Shift": // shift
                globalCharacter.motionStatus.runFlag = false;
                break;

            case "ArrowLeft": // left
                globalCharacter.motionStatus.inRotatingLeft = false;
                break;

            case "ArrowUp": // up
                //console.log("arrow up?????????");
                globalCharacter.motionStatus.inMovingForward = false;
                
                break;

            case "ArrowRight": // right
                globalCharacter.motionStatus.inRotatingRight = false;
                break;

            case "ArrowDown": // down
                //console.log("arrow down?????????");
                globalCharacter.motionStatus.inMovingBackward = false;
               // globalCharacter.motionStatus.inStartWalking = false;
               // globalCharacter.miku.position.z -= 1;
                break;

            default:
                break;

        }

    }


    onProgress ( xhr: any ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round(percentComplete) + '% downloaded' );
        }
    }

    onError ( error: any ) {
        console.log(error)
    }

    manageMove(delta: number){

        let speed = 0.4 * delta * 60;

        let isMoving = this.motionStatus.inMovingForward || this.motionStatus.inMovingBackward;
		let isRotating = this.motionStatus.inRotatingLeft || this.motionStatus.inRotatingRight;

		let isWalking = this.motionStatus.inMovingForward || this.motionStatus.inMovingBackward ||
        this.motionStatus.inRotatingLeft  || this.motionStatus.inRotatingRight;

		let isRunning = isWalking && this.motionStatus.runFlag;

        if ( isMoving ) {

            //var speed = ( motionStatus.runFlag ? 0.6 : 0.2 ) * delta * 60;
           
            var dz = speed * Math.cos( this.motionStatus.direction );
            var dx = speed * Math.sin( this.motionStatus.direction );

            if ( this.motionStatus.inMovingForward ) {

                if (this.turnAround) {
                    //this.helper.sharedPhysics = true;
                   
                    this.miku.rotateY(Math.PI);
                    this.turnAround = false;

                    //this.helper.sharedPhysics = false;
                }

                this.miku.position.z += dz;
                this.miku.position.x += dx;

                this.camera.position.z += dz;
                this.camera.position.x += dx;

            }

            if ( this.motionStatus.inMovingBackward ) {
                if (!this.turnAround) {
                   // this.helper.sharedPhysics = true;
                   
                    this.miku.rotateY( Math.PI );
                    this.turnAround = true;

                    //this.helper.sharedPhysics = false;
                }
                

                this.miku.position.z -= dz;
                this.miku.position.x -= dx;

                this.camera.position.z -= dz;
                this.camera.position.x -= dx;

            }

        }

        if ( isRotating ) {

            var dr = Math.PI * 2 / 360 * 5 * delta * 60;

            if ( this.motionStatus.inRotatingLeft ) {

                this.motionStatus.direction += dr;
                this.miku.rotateY( dr );
            }

            if ( this.motionStatus.inRotatingRight ) {

                this.motionStatus.direction -= dr;
                this.miku.rotateY( -dr );
            }

        }
        
        // if (delta < 1000/60) {
        //     return;
        // }

        if (isMoving && !this.walkEnabled) {
            console.log("call once!");
            // if (this.helper.sharedPhysics) {
            //     this.helper.sharedPhysics = false;
            // }
            this.helper.enable("animation", true);
            // this.helper.enable("physics", true);
            // this.helper.enable("ik", true);
            // this.helper.enable("grant", true);

            
            this.walkEnabled = true;

        } else if(!isMoving) {
            this.helper.enable("animation", false);
            // this.helper.enable("physics", false);
            // this.helper.enable("ik", false);
            // this.helper.enable("grant", false);
           
            this.walkEnabled = false;
           
            if (globalCharacter.motionDictionary['walk']) {
                const clip = globalCharacter.motionDictionary['walk'];
                this.mixer?.clipAction(clip).reset();
                
            }
           
        }
        
        this.helper.update(delta);
        this.camera.lookAt(this.miku.position);
    }


    createRigidBody ( size:number[], weight:number, position:THREE.Vector3 ) {

        var shape = new Ammo.btBoxShape( new Ammo.btVector3( size[ 0 ], size[ 1 ], size[ 2 ] ) );
        var localInertia = new Ammo.btVector3( 0, 0, 0 );
        shape.calculateLocalInertia( weight, localInertia );

        var form = new Ammo.btTransform();
        form.setIdentity();
        form.setOrigin( new Ammo.btVector3( position.x, position.y, position.z ) );

        var state = new Ammo.btDefaultMotionState( form );
        var info = new Ammo.btRigidBodyConstructionInfo( weight, state, shape, localInertia );

        return new Ammo.btRigidBody( info );

    }

    createGround () {

        var gridHelper = new THREE.GridHelper( 1000, 500 );
        gridHelper.position.y = -15;

        var body = this.createRigidBody( [ 1000, 1, 1000 ], 0, gridHelper.position );
        body.setRestitution( 1 );
        body.setFriction( 1 );
        body.setDamping( 0, 0 );
        body.setSleepingThresholds( 0, 0 );
        //this.world.addRigidBody( body );

        this.scene.add( gridHelper );

    }

}