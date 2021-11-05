var b=Object.defineProperty;var v=(c,e,t)=>e in c?b(c,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):c[e]=t;var s=(c,e,t)=>(v(c,typeof e!="symbol"?e+"":e,t),t);import{S as k,P as S,C as M,W as y,a as C,s as d,N as R,A as P,E as L,R as A,b as x,G as D,O as E,V as F,c as H,d as u,D as T,e as W,f,M as B,g as O,h as G,i as I,j as z,k as p,l as Y,m as j,H as V,n as _}from"./vendor.bd8f43a0.js";const K=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function t(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerpolicy&&(i.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?i.credentials="include":n.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=t(n);fetch(n.href,i)}};K();class N{constructor(e){s(this,"el");s(this,"_boundHandleFrame");s(this,"startTime",-1);s(this,"glCanvas",document.createElement("canvas"));s(this,"glContext");s(this,"scene",new k);s(this,"camera",new S(60,window.innerWidth/window.innerHeight,1,1e3));s(this,"renderer");s(this,"effect");s(this,"composer");this.el=e,this._boundHandleFrame=this._handleFrame.bind(this),e.appendChild(this.glCanvas),this.glCanvas.id="threecanvas",this.scene.background=new M(13421772),this.camera.position.set(40,50,100),this.scene.add(this.camera);let t=this.glCanvas.getContext("webgl2");if(!t)throw new Error("Cannot create WebGL render context in common.ts");this.glContext=t,this.renderer=new y({canvas:this.glCanvas,context:this.glContext,antialias:!0,alpha:!0}),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(this.glCanvas.offsetWidth,this.glCanvas.offsetHeight),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=C,this.renderer.outputEncoding=d,this.renderer.toneMapping=R,this.renderer.toneMappingExposure=1,console.log("webgl2?",this.renderer.capabilities.isWebGL2),this.camera.aspect=this.glCanvas.offsetWidth/this.glCanvas.offsetHeight,this.camera.updateProjectionMatrix();const o=new P(6710886,.8);this.scene.add(o),this.composer=new L(this.renderer),this.composer.addPass(new A(this.scene,this.camera)),this.composer.addPass(new x(D));const n=new E(new F(window.innerWidth,window.innerHeight),this.scene,this.camera);this.composer.addPass(n),this.effect=new H(this.renderer),this.initializeScene(),window.addEventListener("resize",i=>{this.camera.aspect=this.el.offsetWidth/this.el.offsetHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.el.offsetWidth,this.el.offsetHeight),this.effect.setSize(this.el.offsetWidth,this.el.offsetHeight)}),window.requestAnimationFrame(this._boundHandleFrame)}static offset(e){e=e||window.event;var t=e.target||e.srcElement,o=t.getBoundingClientRect(),n=e.clientX-o.left,i=e.clientY-o.top;return{x:n,y:i}}initializeScene(){}updateScene(e){}_handleFrame(e){window.requestAnimationFrame(this._boundHandleFrame),this.startTime==-1&&(this.startTime=e),this.updateScene(e),this.doRender()}doRender(){this.effect.render(this.scene,this.camera)}}class q{constructor(){}getGallery(){const e=new u;e.name="environment";const t=new T;t.setDecoderPath("three/examples/js/libs/draco/gltf/");const o=new W;o.setDRACOLoader(t);var n=function(a){if(a.lengthComputable){var r=a.loaded/a.total*100;console.log(Math.round(r)+"% downloaded")}};return o.loadAsync("./assets/gallery/gallery.glb",n).then(function(a){const r=a.scene;r.name="gallery",r.receiveShadow=!0,r.traverse(function(h){h.isMesh&&(h.receiveShadow=!0)}),a.scene.traverse(h=>{h.material&&(h.material.metalness=0)}),r.scale.set(20,20,20),r.position.set(0,0,0),e.add(r)}),e}}const m=window.Ammo;let l;new p;class U{constructor(e,t,o){s(this,"modelParams");s(this,"motionParams");s(this,"cameraParams");s(this,"poseParams");s(this,"miku");s(this,"helper");s(this,"loader");s(this,"scene");s(this,"camera");s(this,"mixer");s(this,"clips");s(this,"motionStatus",{inWalking:!1,inRunning:!1,inStartWalking:!1,inStartRunning:!1,inStopWalking:!1,inStopRunning:!1,inMovingForward:!1,inMovingBackward:!1,inRotatingLeft:!1,inRotatingRight:!1,direction:0,runFlag:!1,duration:0,elapsedTimeSinceStartWalking:0,elapsedTimeSinceStartRunning:0,elapsedTimeSinceStopWalking:0,elapsedTimeSinceStopRunning:0});s(this,"boneDictionary",{});s(this,"modelDictionary",{});s(this,"motionDictionary",{});s(this,"poses");s(this,"debug",!1);s(this,"ready",!1);s(this,"turnAround",!1);s(this,"orbitControl");s(this,"walkEnabled",!1);this.orbitControl=o,this.modelParams=[{name:"miku",file:"./assets/Yoimiya/Yoimiya.pmx",position:new f(30,0,0)}],this.motionParams=[{name:"walk",isMoving:!0,files:["./assets/vmd/walk/walk.vmd"]},{name:"run",isMoving:!0,files:["./assets/vmd/walk/run.vmd"]}],this.cameraParams=[{name:"camera",position:new f(0,0,-25)}],this.poseParams=[{name:"basic",file:"./assets/vpd/imas/makoto_basic.vpd"}],this.poses={},this.helper=new B({sync:!0,afterglow:0,pmxAnimation:!0,resetPhysicsOnLoop:!0}),this.helper.enable("physics",!0),this.helper.enable("ik",!0),this.helper.enable("grant",!0),this.helper.sharedPhysics=!1,console.log(this.helper),this.loader=new O,this.scene=e,this.camera=t,this.ready=!0,l=this,console.log("\u51C6\u5907\u597D\u4E86",this.ready)}getMixer(){return this.mixer}initMiku(){const e=new u;e.name="character";let t=this;this.loader.load(this.modelParams[0].file,function(o){t.miku=o,t.miku.castShadow=!0,t.miku.traverse(function(n){n instanceof G&&(n.material.forEach(i=>{i.emissiveMap&&(i.emissiveMap.encoding=d),i.aoMap&&(i.aoMap.encoding=d),i.lightMap&&(i.lightMap.encoding=d),i.gradientMap&&(i.gradientMap.encoding=d),i.map&&(i.map.encoding=d),i.color.encoding=d,i.emissive.encoding=d,i.dithering=!0,i.needsUpdate=!0}),console.log(n.material))}),console.log("model material:",t.miku.material),t.miku.scale.set(2,2,2),t.miku.position.add(t.modelParams[0].position),t.scene.add(t.miku),t.mixer=new I(o),t.loader.loadAnimation(t.motionParams[0].files[0],t.miku,function(n){var a,r;console.log(t.mixer);let i=n;t.helper.add(t.miku,{animation:[i],physics:!0}),console.log("mixer:",(a=t.helper.objects.get(t.miku))==null?void 0:a.mixer),t.mixer=(r=t.helper.objects.get(t.miku))==null?void 0:r.mixer,t.motionDictionary.walk=i})},this.onProgress,this.onError),document.addEventListener("keydown",this.onKeydown,!1),document.addEventListener("keyup",this.onKeyup,!1)}actionDone(e){console.log("\u76D1\u542C\u52A8\u4F5C\u7ED3\u675F",e.target),l.mixer.removeEventListener("finished",l.actionDone)}onKeydown(e){switch(e.key){case"Shift":l.motionStatus.runFlag=!0;break;case"ArrowLeft":l.motionStatus.inRotatingLeft=!0;break;case"ArrowUp":l.motionStatus.inMovingForward=!0;break;case"ArrowRight":l.motionStatus.inRotatingRight=!0;break;case"ArrowDown":l.motionStatus.inMovingBackward=!0;break}}onKeyup(e){switch(e.key){case"Shift":l.motionStatus.runFlag=!1;break;case"ArrowLeft":l.motionStatus.inRotatingLeft=!1;break;case"ArrowUp":l.motionStatus.inMovingForward=!1;break;case"ArrowRight":l.motionStatus.inRotatingRight=!1;break;case"ArrowDown":l.motionStatus.inMovingBackward=!1;break}}onProgress(e){if(e.lengthComputable){var t=e.loaded/e.total*100;console.log(Math.round(t)+"% downloaded")}}onError(e){console.log(e)}manageMove(e){var g;let t=.4*e*60,o=this.motionStatus.inMovingForward||this.motionStatus.inMovingBackward,n=this.motionStatus.inRotatingLeft||this.motionStatus.inRotatingRight;if((this.motionStatus.inMovingForward||this.motionStatus.inMovingBackward||this.motionStatus.inRotatingLeft||this.motionStatus.inRotatingRight)&&this.motionStatus.runFlag,o){var a=t*Math.cos(this.motionStatus.direction),r=t*Math.sin(this.motionStatus.direction);this.motionStatus.inMovingForward&&(this.turnAround&&(this.miku.rotateY(Math.PI),this.turnAround=!1),this.miku.position.z+=a,this.miku.position.x+=r,this.camera.position.z+=a,this.camera.position.x+=r),this.motionStatus.inMovingBackward&&(this.turnAround||(this.miku.rotateY(Math.PI),this.turnAround=!0),this.miku.position.z-=a,this.miku.position.x-=r,this.camera.position.z-=a,this.camera.position.x-=r)}if(n){var h=Math.PI*2/360*5*e*60;this.motionStatus.inRotatingLeft&&(this.motionStatus.direction+=h,this.miku.rotateY(h)),this.motionStatus.inRotatingRight&&(this.motionStatus.direction-=h,this.miku.rotateY(-h))}if(o&&!this.walkEnabled)console.log("call once!"),this.helper.enable("animation",!0),this.walkEnabled=!0;else if(!o&&(this.helper.enable("animation",!1),this.walkEnabled=!1,l.motionDictionary.walk)){const w=l.motionDictionary.walk;(g=this.mixer)==null||g.clipAction(w).reset()}this.helper.update(e),this.camera.lookAt(this.miku.position)}createRigidBody(e,t,o){var n=new m.btBoxShape(new m.btVector3(e[0],e[1],e[2])),i=new m.btVector3(0,0,0);n.calculateLocalInertia(t,i);var a=new m.btTransform;a.setIdentity(),a.setOrigin(new m.btVector3(o.x,o.y,o.z));var r=new m.btDefaultMotionState(a),h=new m.btRigidBodyConstructionInfo(t,r,n,i);return new m.btRigidBody(h)}createGround(){var e=new z(1e3,500);e.position.y=-15;var t=this.createRigidBody([1e3,1,1e3],0,e.position);t.setRestitution(1),t.setFriction(1),t.setDamping(0,0),t.setSleepingThresholds(0,0),this.scene.add(e)}}new p;const X=window.Ammo;class $ extends N{constructor(e){super(e);s(this,"orbitControl");s(this,"character");s(this,"lastTime",-1);this.character=this.scene.userData.character,this.orbitControl=this.scene.userData.OrbitControls,this.orbitControl.enableDamping=!0,this.orbitControl.dampingFactor=.05,this.orbitControl.screenSpacePanning=!1,this.orbitControl.enableRotate=!0,this.orbitControl.minDistance=100,this.orbitControl.maxDistance=150,this.orbitControl.maxPolarAngle=Math.PI/2.2,this.orbitControl.minPolarAngle=Math.PI/3.2}setupLight(){const e=new Y(8943462,1);e.position.set(-1,1,1).normalize(),e.castShadow=!0,this.scene.add(e),this.scene.add(new j(e.shadow.camera));const t=8943462,o=8943462,n=.1,i=new V(t,o,n);this.scene.add(i)}initializeScene(){console.log("This is ammo:",X),this.setupLight();const e=new u;e.name="root";const o=new q().getGallery();e.add(o),this.scene.add(e);const n=new _(this.camera,this.glCanvas);this.scene.userData.OrbitControls=n,n.enableKeys=!1,this.scene.userData.character=new U(this.scene,this.camera,this.orbitControl),this.scene.userData.character.initMiku()}updateScene(e){this.character.miku&&this.orbitControl.target.set(this.character.miku.position.x,this.character.miku.position.y,this.character.miku.position.z),this.orbitControl.update(),this.lastTime==-1&&(this.lastTime=e);let t=(e-this.lastTime)/1e3;this.character.getMixer()&&this.character.manageMove(t),this.lastTime=e}}function J(){var c=document.getElementById("drawing");if(!c){console.warn("Your HTML page needs a DIV with id='drawing'");return}new $(c)}J();