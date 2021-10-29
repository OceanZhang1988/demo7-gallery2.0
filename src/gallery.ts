// abstract library
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

// A class for our application state and functionality
export class Environment  {

    constructor () {}

    getGallery(): THREE.Group {
        //environment group under root
        const env: THREE.Group = new THREE.Group();
        env.name = "environment";

        const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath( 'three/examples/js/libs/draco/gltf/' );
        const loader = new GLTFLoader();
        loader.setDRACOLoader( dracoLoader );

        var onProgress = function ( xhr: any ) {
            if ( xhr.lengthComputable ) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log( Math.round(percentComplete) + '% downloaded' );
            }
        };

        var onError = function ( error: any ) {
            console.log(error)
        };

        let promise = loader.loadAsync( './assets/gallery/gallery.glb',  onProgress);
        promise.then(function ( gltf ) {
            const model = gltf.scene;
            model.name = "gallery";
            model.receiveShadow = true;
            model.traverse( function ( object: THREE.Object3D ) {
                //@ts-ignore
                if ( object.isMesh ) object.receiveShadow = true;
                
            } );

            gltf.scene.traverse( child => {
                //@ts-ignore
                if ( child.material ) child.material.metalness = 0;
            } );
          
            model.scale.set( 20, 20, 20 );
            model.position.set(0, 0, 0);
            env.add( model );
            
        });
        return env;
    }
}

