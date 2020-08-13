"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e,t=require("react"),r=(e=t)&&"object"==typeof e&&"default"in e?e.default:e;function n(e){var r=t.useRef([]),n=t.useRef(0),o=t.useRef(performance.now()),i=t.useRef(0),u=t.useState([]),a=u[0],c=u[1],p=function(){var t=performance.now();if(n.current+=1,t>o.current+1e3){var u=t-o.current,a=Math.round(1e3*n.current/u);if(r.current=r.current.concat(a),u>1500)for(var l=1;l<=(u-1e3)/1e3;l++)r.current=r.current.concat(0);r.current=r.current.slice(Math.min(r.current.length-e,0)),c(r.current),n.current=0,o.current=performance.now()}i.current=requestAnimationFrame(p)};t.useEffect((function(){return i.current=requestAnimationFrame(p),function(){cancelAnimationFrame(i.current)}}),[]);var l=(a.reduce((function(e,t){return e+t}),0)/a.length).toFixed(2);return{fps:a,avgFps:l,maxFps:Math.max.apply(Math.max,a),currentFps:a[a.length-1]}}exports.FpsView=function(e){var o=e.top,i=void 0===o?0:o,u=e.left,a=void 0===u?0:u,c=e.bottom,p=void 0===c?"auto":c,l=e.right,s=void 0===l?"auto":l,f=e.width,d=void 0===f?140:f,x=e.height,g=void 0===x?60:x,h=n(Math.floor(d/2)),m=h.fps,b=h.avgFps,v=h.maxFps,F=h.currentFps,y=function(e,r,n,o,i,u,a){return{wrapperStyle:t.useMemo((function(){return{zIndex:999999,position:"fixed",width:e+6+"px",height:r+30+"px",padding:"3px",backgroundColor:"#21006f",color:"#26F0FD",fontSize:"1rem",lineHeight:"1.3rem",fontFamily:"Helvetica, Arial, sans-serif",fontWeight:300,boxSizing:"border-box",top:n,right:o,bottom:i,left:u}}),[e,r,n,o,i,u]),graphStyle:t.useMemo((function(){return{position:"absolute",left:"3px",right:"3px",bottom:"3px",height:r,backgroundColor:"#282844",MozBoxSizing:"border-box",boxSizing:"border-box"}}),[r]),barStyle:t.useCallback((function(e,t){return{position:"absolute",bottom:"0",right:4*(a-1-t)+"px",height:e+"px",width:"4px",backgroundColor:"#E200F7",MozBoxSizing:"border-box",boxSizing:"border-box"}}),[a])}}(d,g,i,s,p,a,m.length),S=y.graphStyle,M=y.barStyle,w=y.wrapperStyle;return r.createElement("div",{style:w},r.createElement("span",null,F," FPS (",b," Avg)"),r.createElement("div",{style:S},m.map((function(e,t){return r.createElement("div",{key:t,style:M(g*e/v,t)})}))))},exports.useFps=n;
//# sourceMappingURL=index.js.map
