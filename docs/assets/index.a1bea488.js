var p=Object.defineProperty;var w=(l,e,t)=>e in l?p(l,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):l[e]=t;var a=(l,e,t)=>(w(l,typeof e!="symbol"?e+"":e,t),t);import{S as b,P as v,C as k,W as S,a as y,s as d,N as M,A as C,E as R,R as L,b as P,G as D,O as x,V as A,c as E,d as u,D as F,e as H,f as g,M as T,g as W,h as B,i as O,j as G,k as f,l as z,m as I,H as V,n as Y}from"./vendor.bd8f43a0.js";const _=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerpolicy&&(i.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?i.credentials="include":n.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=t(n);fetch(n.href,i)}};_();class K{constructor(e){a(this,"el");a(this,"_boundHandleFrame");a(this,"startTime",-1);a(this,"glCanvas",document.createElement("canvas"));a(this,"glContext");a(this,"scene",new b);a(this,"camera",new v(60,window.innerWidth/window.innerHeight,1,1e3));a(this,"renderer");a(this,"effect");a(this,"composer");this.el=e,this._boundHandleFrame=this._handleFrame.bind(this),e.appendChild(this.glCanvas),this.glCanvas.id="threecanvas",this.scene.background=new k(13421772),this.camera.position.set(40,45,100),this.scene.add(this.camera);let t=this.glCanvas.getContext("webgl2");if(!t)throw new Error("Cannot create WebGL render context in common.ts");this.glContext=t,this.renderer=new S({canvas:this.glCanvas,context:this.glContext,antialias:!0,alpha:!0}),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(this.glCanvas.offsetWidth,this.glCanvas.offsetHeight),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=y,this.renderer.outputEncoding=d,this.renderer.toneMapping=M,this.renderer.toneMappingExposure=1,console.log("webgl2?",this.renderer.capabilities.isWebGL2),this.camera.aspect=this.glCanvas.offsetWidth/this.glCanvas.offsetHeight,this.camera.updateProjectionMatrix();const s=new C(6710886,.8);this.scene.add(s),this.composer=new R(this.renderer),this.composer.addPass(new L(this.scene,this.camera)),this.composer.addPass(new P(D));const n=new x(new A(window.innerWidth,window.innerHeight),this.scene,this.camera);this.composer.addPass(n),this.effect=new E(this.renderer),this.initializeScene(),window.addEventListener("resize",i=>{this.camera.aspect=this.el.offsetWidth/this.el.offsetHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.el.offsetWidth,this.el.offsetHeight),this.effect.setSize(this.el.offsetWidth,this.el.offsetHeight)}),window.requestAnimationFrame(this._boundHandleFrame)}static offset(e){e=e||window.event;var t=e.target||e.srcElement,s=t.getBoundingClientRect(),n=e.clientX-s.left,i=e.clientY-s.top;return{x:n,y:i}}initializeScene(){}updateScene(e){}_handleFrame(e){window.requestAnimationFrame(this._boundHandleFrame),this.startTime==-1&&(this.startTime=e),this.updateScene(e),this.doRender()}doRender(){this.effect.render(this.scene,this.camera)}}class j{constructor(){}getGallery(){const e=new u;e.name="environment";const t=new F;t.setDecoderPath("three/examples/js/libs/draco/gltf/");const s=new H;s.setDRACOLoader(t);var n=function(o){if(o.lengthComputable){var c=o.loaded/o.total*100;console.log(Math.round(c)+"% downloaded")}};return s.loadAsync("./assets/gallery/gallery.glb",n).then(function(o){const c=o.scene;c.name="gallery",c.receiveShadow=!0,c.traverse(function(h){h.isMesh&&(h.receiveShadow=!0)}),o.scene.traverse(h=>{h.material&&(h.material.metalness=0)}),c.scale.set(20,20,20),c.position.set(0,0,0),e.add(c)}),e}}const m=window.Ammo;let r;new f;class N{constructor(e,t,s){a(this,"modelParams");a(this,"motionParams");a(this,"cameraParams");a(this,"poseParams");a(this,"miku");a(this,"helper");a(this,"loader");a(this,"scene");a(this,"camera");a(this,"mixer");a(this,"clips");a(this,"motionStatus",{inWalking:!1,inRunning:!1,inStartWalking:!1,inStartRunning:!1,inStopWalking:!1,inStopRunning:!1,inMovingForward:!1,inMovingBackward:!1,inRotatingLeft:!1,inRotatingRight:!1,direction:0,runFlag:!1,duration:0,elapsedTimeSinceStartWalking:0,elapsedTimeSinceStartRunning:0,elapsedTimeSinceStopWalking:0,elapsedTimeSinceStopRunning:0});a(this,"boneDictionary",{});a(this,"modelDictionary",{});a(this,"motionDictionary",{});a(this,"poses");a(this,"debug",!1);a(this,"ready",!1);a(this,"orbitControl");a(this,"walkEnabled",!1);this.orbitControl=s,this.modelParams=[{name:"miku",file:"./assets/Yoimiya/Yoimiya.pmx",position:new g(30,0,0)}],this.motionParams=[{name:"walk",isMoving:!0,files:["./assets/vmd/walk/walk.vmd"]},{name:"run",isMoving:!0,files:["./assets/vmd/walk/run.vmd"]}],this.cameraParams=[{name:"camera",position:new g(0,0,-25)}],this.poseParams=[{name:"basic",file:"./assets/vpd/imas/makoto_basic.vpd"}],this.poses={},this.helper=new T({sync:!0,afterglow:2,pmxAnimation:!0}),this.helper.enable("physics",!0),this.helper.enable("ik",!0),this.helper.enable("grant",!0),console.log(this.helper),this.loader=new W,this.scene=e,this.camera=t,this.ready=!0,r=this,console.log("\u51C6\u5907\u597D\u4E86",this.ready)}getMixer(){return this.mixer}initMiku(){const e=new u;e.name="character";let t=this;this.loader.load(this.modelParams[0].file,function(s){t.miku=s,t.miku.castShadow=!0,t.miku.traverse(function(n){n instanceof B&&(n.material.forEach(i=>{i.emissiveMap&&(i.emissiveMap.encoding=d),i.aoMap&&(i.aoMap.encoding=d),i.lightMap&&(i.lightMap.encoding=d),i.gradientMap&&(i.gradientMap.encoding=d),i.map&&(i.map.encoding=d),i.color.encoding=d,i.emissive.encoding=d,i.dithering=!0,i.needsUpdate=!0}),console.log(n.material))}),console.log("model material:",t.miku.material),t.miku.scale.set(2,2,2),t.miku.position.add(t.modelParams[0].position),t.scene.add(t.miku),t.mixer=new O(s),t.loader.loadAnimation(t.motionParams[0].files[0],t.miku,function(n){console.log(t.mixer);let i=[n];t.helper.add(t.miku,{animation:i,physics:!0});const o=t.mixer.clipAction(i[0]);t.motionDictionary.walk=o})},this.onProgress,this.onError),document.addEventListener("keydown",this.onKeydown,!1),document.addEventListener("keyup",this.onKeyup,!1)}actionDone(e){console.log("\u76D1\u542C\u52A8\u4F5C\u7ED3\u675F",e.target),r.mixer.removeEventListener("finished",r.actionDone),r.motionDictionary.walk.fadeOut(.5)}onKeydown(e){switch(e.key){case"Shift":r.motionStatus.runFlag=!0;break;case"ArrowLeft":r.motionStatus.inRotatingLeft=!0;break;case"ArrowUp":r.motionStatus.inMovingForward=!0;break;case"ArrowRight":r.motionStatus.inRotatingRight=!0;break;case"ArrowDown":r.motionStatus.inMovingBackward=!0;break}}onKeyup(e){switch(e.key){case"Shift":r.motionStatus.runFlag=!1;break;case"ArrowLeft":r.motionStatus.inRotatingLeft=!1;break;case"ArrowUp":r.motionStatus.inMovingForward=!1;break;case"ArrowRight":r.motionStatus.inRotatingRight=!1;break;case"ArrowDown":r.motionStatus.inMovingBackward=!1;break}}onProgress(e){if(e.lengthComputable){var t=e.loaded/e.total*100;console.log(Math.round(t)+"% downloaded")}}onError(e){console.log(e)}manageMove(e){let t=.4*e*60,s=this.motionStatus.inMovingForward||this.motionStatus.inMovingBackward,n=this.motionStatus.inRotatingLeft||this.motionStatus.inRotatingRight;if((this.motionStatus.inMovingForward||this.motionStatus.inMovingBackward||this.motionStatus.inRotatingLeft||this.motionStatus.inRotatingRight)&&this.motionStatus.runFlag,s){var o=t*Math.cos(this.motionStatus.direction),c=t*Math.sin(this.motionStatus.direction);this.motionStatus.inMovingForward&&(this.miku.position.z+=o,this.miku.position.x+=c,this.camera.position.z+=o,this.camera.position.x+=c),this.motionStatus.inMovingBackward&&(this.miku.position.z-=o,this.miku.position.x-=c,this.camera.position.z-=o,this.camera.position.x-=c)}if(n){var h=Math.PI*2/360*5*e*60;this.motionStatus.inRotatingLeft&&(this.motionStatus.direction+=h,this.miku.rotateY(h)),this.motionStatus.inRotatingRight&&(this.motionStatus.direction-=h,this.miku.rotateY(-h))}s&&!this.walkEnabled?(console.log("call once!"),this.helper.enable("animation",!0),this.helper.enable("physics",!0),this.helper.enable("ik",!0),this.helper.enable("grant",!0),this.walkEnabled=!0):s||(this.helper.enable("animation",!1),this.walkEnabled=!1,r.motionDictionary.walk&&r.motionDictionary.walk.stop()),this.helper.update(e),this.camera.lookAt(this.miku.position)}createRigidBody(e,t,s){var n=new m.btBoxShape(new m.btVector3(e[0],e[1],e[2])),i=new m.btVector3(0,0,0);n.calculateLocalInertia(t,i);var o=new m.btTransform;o.setIdentity(),o.setOrigin(new m.btVector3(s.x,s.y,s.z));var c=new m.btDefaultMotionState(o),h=new m.btRigidBodyConstructionInfo(t,c,n,i);return new m.btRigidBody(h)}createGround(){var e=new G(1e3,500);e.position.y=-15;var t=this.createRigidBody([1e3,1,1e3],0,e.position);t.setRestitution(1),t.setFriction(1),t.setDamping(0,0),t.setSleepingThresholds(0,0),this.scene.add(e)}}new f;const q=window.Ammo;class U extends K{constructor(e){super(e);a(this,"orbitControl");a(this,"character");a(this,"lastTime",-1);this.character=this.scene.userData.character,this.orbitControl=this.scene.userData.OrbitControls,this.orbitControl.enableDamping=!0,this.orbitControl.dampingFactor=.05,this.orbitControl.screenSpacePanning=!1,this.orbitControl.enableRotate=!0,this.orbitControl.maxPolarAngle=Math.PI/2}setupLight(){const e=new z(8943462,1);e.position.set(-1,1,1).normalize(),e.castShadow=!0,this.scene.add(e),this.scene.add(new I(e.shadow.camera));const t=8943462,s=8943462,n=.1,i=new V(t,s,n);this.scene.add(i)}initializeScene(){console.log("This is ammo:",q),this.setupLight();const e=new u;e.name="root";const s=new j().getGallery();e.add(s),this.scene.add(e);const n=new Y(this.camera,this.glCanvas);this.scene.userData.OrbitControls=n,n.enableKeys=!1,this.scene.userData.character=new N(this.scene,this.camera,this.orbitControl),this.scene.userData.character.initMiku()}updateScene(e){this.character.miku&&this.orbitControl.target.set(this.character.miku.position.x,this.character.miku.position.y,this.character.miku.position.z),this.orbitControl.update(),this.lastTime==-1&&(this.lastTime=e);let t=(e-this.lastTime)/1e3;this.character.getMixer()&&this.character.manageMove(t),this.lastTime=e}}function X(){var l=document.getElementById("drawing");if(!l){console.warn("Your HTML page needs a DIV with id='drawing'");return}new U(l)}X();