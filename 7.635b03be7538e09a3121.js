(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{VuTa:function(n,e,l){"use strict";l.r(e);var t=l("keVe"),i=function(){return function(){}}(),u=l("fYis"),r=function(){function n(){}return n.prototype.ngOnInit=function(){},n}(),s=t.lb({encapsulation:0,styles:[[".spinner[_ngcontent-%COMP%]{position:absolute;top:0;bottom:0;left:0;right:0;width:35%;height:35%;min-height:200px;min-width:200px;margin:auto;display:block;vertical-align:middle}"]],data:{}});function o(n){return t.Bb(0,[(n()(),t.nb(0,0,null,null,0,"img",[["alt","Loading..."],["class","spinner"],["src","assets/loading-spinner.svg"]],null,null,null,null,null))],null,null)}var a=l("bb6g"),c=l("1ob4"),d=l("6CUI"),h=l.n(d),b=l("ixZW"),p=l("JLJU"),f=l("4w17"),g=function(){function n(n,e,l,t,i){this.navigationService=n,this.route=e,this.web3Service=l,this.raidenService=t,this.zone=i,this.title="",this.loading=!1,this.receiving=!1,this.bytesReceived=0,this.tokenAddress="0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",this.paymentBuffer=0,this.price=.1}return Object.defineProperty(n.prototype,"mainVideoEl",{set:function(n){this.videoPlayer=n.nativeElement},enumerable:!0,configurable:!0}),n.prototype.ngOnInit=function(){return a.b(this,void 0,void 0,function(){var n,e;return a.e(this,function(l){switch(l.label){case 0:return this.navigationService.showBackButton=!0,this.id=this.route.snapshot.paramMap.get("id"),"cryptomaniacs"!==this.id?[3,1]:(this.title='Crypto Maniacs @ ETHCapeTown <span class="badge badge-success">FREE</span>',[3,6]);case 1:this.title="Stream",l.label=2;case 2:return l.trys.push([2,4,,5]),n=this,[4,this.web3Service.provider.lookupAddress(this.id)];case 3:return n.username=l.sent(),[3,5];case 4:return e=l.sent(),console.log(e),[3,5];case 5:this.username||(this.username=this.id+" (ENS not set)"),l.label=6;case 6:return this.connect(),[2]}})})},n.prototype.connect=function(){return a.b(this,void 0,void 0,function(){var n,e,l,t,i,u,r,s,o,c=this;return a.e(this,function(a){switch(a.label){case 0:this.loading=!0,a.label=1;case 1:return a.trys.push([1,3,,4]),[4,this.web3Service.signMessage(this.id)];case 2:return n=a.sent(),[3,4];case 3:return e=a.sent(),console.log(e),n=this.id,[3,4];case 4:return a.trys.push([4,6,,7]),[4,this.raidenService.createChannel(this.tokenAddress,this.id,0xe1d6c891569df)];case 5:return t=a.sent(),console.log("createResult",t),[3,7];case 6:return l=a.sent(),console.log(l),409!==l.status&&"cryptomaniacs"!==this.id?[2]:[3,7];case 7:return a.trys.push([7,9,,10]),[4,this.raidenService.pay(this.tokenAddress,this.id,1)];case 8:return t=a.sent(),console.log("createResult",t),[3,10];case 9:return i=a.sent(),console.log(i),[3,10];case 10:return this.peer=new h.a,this.peer.on("open",function(){console.log("PeerID:",c.peer.id)}),this.peer.on("error",function(n){c.loading=!0,alert(n),console.error(n),window.location.reload()}),u=function(){var n=new(window.AudioContext||window.webkitAudioContext||!1),e=n.createOscillator(),l=e.connect(n.createMediaStreamDestination());e.start();var t=l.stream.getAudioTracks()[0];return Object.assign(t,{enabled:!1})}(),r=function(n){var e=n.width,l=n.height,t=Object.assign(document.createElement("canvas"),{width:e,height:l});t.getContext("2d").fillRect(0,0,e,l);var i=t.captureStream().getVideoTracks()[0];return Object.assign(i,{enabled:!1})}({width:1280,height:720}),s=new MediaStream([u,r]),o=this.peer.call("NUTUBE_NETWORK_"+this.id,s,{metadata:n}),console.log("call",o),this.initStatus(o.peer,o.peerConnection),o.on("stream",function(n){console.log("remoteStream",n),c.receiving=!0,c.videoPlayer.srcObject=n,c.videoPlayer.play(),c.remoteStream=n,c.loading=!1}),o.on("error",function(n){c.loading=!0,alert(n),console.log("Error",n),window.location.reload()}),[2]}})})},n.prototype.initStatus=function(n,e){return a.b(this,void 0,void 0,function(){var n=this;return a.e(this,function(l){return f(e,function(e){return a.b(n,void 0,void 0,function(){var n,l,t=this;return a.e(this,function(i){switch(i.label){case 0:if(this.paymentBuffer+=e.video.bytesReceived-this.bytesReceived,console.log("this.paymentBuffer",this.paymentBuffer),this.zone.run(function(){return a.b(t,void 0,void 0,function(){return a.e(this,function(n){return this.bytesReceived=e.video.bytesReceived,[2]})})}),!(this.paymentBuffer>1048576&&"cryptomaniacs"!==this.id))return[3,5];i.label=1;case 1:return i.trys.push([1,3,,4]),console.log("price",this.paymentBuffer*this.price/1073741824),[4,this.raidenService.pay(this.tokenAddress,this.id,Math.ceil(this.paymentBuffer*this.price*1e18/1073741824/168))];case 2:return n=i.sent(),console.log("payResult",n),[3,4];case 3:return l=i.sent(),console.log(l),[3,4];case 4:this.paymentBuffer=0,i.label=5;case 5:return[2]}})})},2e3),[2]})})},n}(),v=l("X+PR"),m=t.lb({encapsulation:0,styles:[[""]],data:{}});function y(n){return t.Bb(0,[t.yb(402653184,1,{mainVideoEl:0}),(n()(),t.nb(1,0,null,null,22,"div",[["class","container mt-4"]],null,null,null,null,null)),(n()(),t.nb(2,0,null,null,1,"button",[["class","btn btn-info float-right"]],null,null,null,null,null)),(n()(),t.Ab(-1,null,["RELAY"])),(n()(),t.nb(4,0,null,null,4,"h4",[],null,null,null,null,null)),(n()(),t.nb(5,0,null,null,1,"span",[["class","badge badge-danger text-blink"]],null,null,null,null,null)),(n()(),t.Ab(-1,null,["LIVE!"])),(n()(),t.Ab(-1,null,["\xa0"])),(n()(),t.nb(8,0,null,null,0,"span",[],[[8,"innerHTML",1]],null,null,null,null)),(n()(),t.nb(9,0,null,null,0,"hr",[],null,null,null,null,null)),(n()(),t.nb(10,0,null,null,1,"app-loading-spinner",[],[[8,"hidden",0]],null,null,o,s)),t.mb(11,114688,null,0,r,[],null,null),(n()(),t.nb(12,0,[[1,0],["videoPlayer",1]],null,1,"video",[["controls",""],["height","420"],["width","100%"]],[[8,"hidden",0]],null,null,null,null)),(n()(),t.Ab(-1,null,[" Your browser does not support the video tag. "])),(n()(),t.nb(14,0,null,null,9,"div",[["class","text-center"]],[[8,"hidden",0]],null,null,null,null)),(n()(),t.nb(15,0,null,null,0,"hr",[],null,null,null,null,null)),(n()(),t.nb(16,0,null,null,1,"h4",[["style","white-space: normal;"]],null,null,null,null,null)),(n()(),t.Ab(17,null,["ENS: ",""])),(n()(),t.nb(18,0,null,null,1,"h4",[],null,null,null,null,null)),(n()(),t.Ab(19,null,["Price: ","$ / GB"])),(n()(),t.nb(20,0,null,null,1,"h4",[],null,null,null,null,null)),(n()(),t.Ab(21,null,["Received: "," MB"])),(n()(),t.nb(22,0,null,null,1,"h4",[],null,null,null,null,null)),(n()(),t.Ab(23,null,["Costs: "," $"]))],function(n,e){n(e,11,0)},function(n,e){var l=e.component;n(e,8,0,l.title),n(e,10,0,l.receiving&&!l.loading),n(e,12,0,!l.receiving&&l.loading),n(e,14,0,!l.receiving&&l.loading||"cryptomaniacs"===l.id),n(e,17,0,l.username),n(e,19,0,l.price),n(e,21,0,(l.bytesReceived/1024/1024).toFixed(2)),n(e,23,0,(l.price/1073741824*l.bytesReceived).toFixed(8))})}function w(n){return t.Bb(0,[(n()(),t.nb(0,0,null,null,1,"app-view",[],null,null,null,y,m)),t.mb(1,114688,null,0,g,[c.a,v.a,b.a,p.a,t.z],null,null)],function(n,e){n(e,1,0)},null)}var A=t.jb("app-view",g,w,{},{},[]),S=l("TOqr"),k=function(){return function(){}}();l.d(e,"ViewModuleNgFactory",function(){return B});var B=t.kb(i,[],function(n){return t.tb([t.ub(512,t.j,t.ab,[[8,[u.a,A]],[3,t.j],t.x]),t.ub(4608,S.i,S.h,[t.u,[2,S.o]]),t.ub(1073742336,S.b,S.b,[]),t.ub(1073742336,v.n,v.n,[[2,v.t],[2,v.k]]),t.ub(1073742336,k,k,[]),t.ub(1073742336,i,i,[]),t.ub(1024,v.i,function(){return[[{path:"",component:g}]]},[])])})}}]);