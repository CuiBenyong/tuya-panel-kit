import{NativeModules,Platform,NativeAppEventEmitter,DeviceEventEmitter,AlertIOS}from"react-native";import{EventEmitter}from"events";const INTERNAL_EVENT_TYPE=["error","newListener","removeListener","dpDataChange","deviceChanged","bluetoothChange","deviceStateChange","networkStateChange","linkageTimeUpdate","deviceLocalStateChange"],type=e=>Object.prototype.toString.call(e).slice(8,-1).toLowerCase(),isEmptyObj=e=>e.constructor===Object&&0===Object.keys(e).length,parseJson=str=>{let result;if(str&&"string"===type(str))try{result=JSON.parse(str)}catch(parseError){try{result=eval(`(${str})`)}catch(e){result=str}}else result=str||{};return result},formatValue=(e,t)=>{if("string"===type(e)){if("true"===e)return!0;if("false"===e)return!1}else if("undefined"===type(e))switch(t.type){case"bool":return!1;case"value":return t.min;default:return""}return e},formatDevJSON=e=>{let t,i,n,a,o,r;const s=e,{dps:v}=s,c=parseJson(s.schema);s.schema={},s.codeIds={},s.idCodes={},s.state={};for(const e in c)t=(i=c[e]).code,n=`${i.id}`,a=parseJson(i.property),i.dptype=i.type,(i=Object.assign({},i,a)).id=n,s.codeIds[t]=n,s.idCodes[n]=t,o=formatValue(v[n],i),s.state[t]=o,s.schema[t]=i,delete i.property;if(s.panelConfig){r=Object.assign({},s.panelConfig);for(const e in r)s.panelConfig[e]="string"==typeof r[e]?parseJson(r[e]):r[e]}else s.panelConfig={};return s};let AppDeviceEventEmitter={};const Event={},Device={},App={};let Native={},apiRequest;const TYDeviceData={};let TYMobileData={};if(NativeModules){AppDeviceEventEmitter=Platform.select({ios:()=>NativeAppEventEmitter,android:()=>DeviceEventEmitter})();const e=new EventEmitter;e.setMaxListeners(0);const t=["on","once","emit"];t.forEach(t=>{Event[t]=e[t].bind(e)}),Event.fire=e.emit.bind(e),Event.remove=e.removeListener.bind(e),Event.off=function(t){1===arguments.length&&e.removeAllListeners(t),2===arguments.length&&e.removeListener(t,arguments[1])};const{TYRCTPublicModule:i,TYRCTPublicManager:n,TYRCTDeviceModule:a,TYRCTPanelManager:o}=NativeModules,r=i||n,s=a||o;r&&s&&(Native={...r,...s},TYDeviceData.devInfo={},Device.formatDps=(e=>TYDeviceData.devInfo&&TYDeviceData.devInfo.idCodes?Object.keys(e).reduce((t,i)=>{const n=TYDeviceData.devInfo.idCodes[i];return{...t,[n]:e[i]}},{}):{}),Device.setState=((e,t)=>{const i={};if("object"===type(e)){for(let t in e){if(!Device.checkDpExist(t))return;i[t=/^\d+$/.test(t)?Device.getDpCodeById(t):t]=e[t]}if(!isEmptyObj(i)){TYDeviceData.devInfo.state={...TYDeviceData.devInfo.state,...i};for(const e in i)-1===INTERNAL_EVENT_TYPE.indexOf(e)?Object.prototype.hasOwnProperty.call(i,e)&&Event.emit(e,i):console.warn(`DP Code can not be one of [${INTERNAL_EVENT_TYPE}]`)}}else{if(!Device.checkDpExist(e))return;{const n=/^\d+$/.test(e)?Device.getDpCodeById(e):e;i[n]=t,isEmptyObj(i)||(TYDeviceData.devInfo.state={...TYDeviceData.devInfo.state,...i},Event.emit(n,i))}}return i}),Device.getDeviceInfo=(()=>new Promise(e=>{TYDeviceData.devInfo?e(TYDeviceData.devInfo):Device.initDevice().then(t=>{e(t)})})),Device.initDevice=(()=>Promise.all([new Promise(e=>s.getDevInfo({},t=>e(t))),App.getNetworkState()]).then(e=>{const t="undefined"===type(e[1].type)?e[1]:e[1].type;return Device.setDeviceInfo({networkType:t,...e[0]}),TYDeviceData.devInfo})),Device.setDeviceInfo=(e=>{if(e.devId){const t=e;t.deviceOnline=e.isOnline,delete t.isOnline;const i=formatDevJSON({appOnline:"NONE"!==e.networkType,...t});i.isVDevice=e.devId&&0===e.devId.indexOf("vdev"),TYDeviceData.devInfo=i}else TYDeviceData.devInfo={}}),Device.checkDpExist=(e=>Device.getDpIdByCode(e)||Device.getDpCodeById(e)),Device.getDpIdByCode=(e=>{if(TYDeviceData.devInfo){const{codeIds:t}=TYDeviceData.devInfo;return t[e]}}),Device.getDpCodeById=(e=>{if(TYDeviceData.devInfo){const{idCodes:t}=TYDeviceData.devInfo;return t[e]}}),Device.putDeviceData=(e=>new Promise((t,i)=>{const{option:n,...a}=e;let o,r=!0;const v={};for(const e in a)if(Device.checkDpExist(e)){v[/^\d+$/.test(e)?e:Device.getDpIdByCode(e)]=a[e],r=!1}if(r)return i(o={error:"param error"}),void Event.emit("message",o);__DEV__&&console.log("-----数据下发",e,v),s.putDpData({command:v,option:"undefined"===type(n)?3:n},()=>t({success:!0}),e=>{i(e),Event.emit("message",e)})})),Device.isMeshWifiDevice=(()=>{if(!TYDeviceData.devInfo)throw new Error("Device uninitialized");const{pcc:e}=TYDeviceData.devInfo;return void 0!==e?"0108"===e:e}),Device.isMeshDevice=(()=>{if(!TYDeviceData.devInfo)throw new Error("Device uninitialized");const{nodeId:e}=TYDeviceData.devInfo;return void 0!==e?e.length>0:e}),Device.isWifiDevice=(()=>{if(!TYDeviceData.devInfo)throw new Error("Device uninitialized");const{pcc:e}=TYDeviceData.devInfo;return void 0!==e?0===e.length:e}),Device.getBleManagerState=(()=>new Promise((e,t)=>{(s.getBleManagerState||function(){t()})(i=>{if(i)return e(i.state);t()})})),AppDeviceEventEmitter.addListener("deviceDataChange",e=>{Event.emit("deviceDataChange",{type:"dpData",payload:e})}),AppDeviceEventEmitter.addListener("dpDataChange",e=>{if(isEmptyObj(TYDeviceData.devInfo))TYDeviceData.__unInitializeDps=e;else{const t=Device.formatDps(e);isEmptyObj(t)||(__DEV__&&console.log("-----数据上报",t,e),Device.setState(t),Event.emit("deviceDataChange",{type:"dpData",payload:t}))}}),AppDeviceEventEmitter.addListener("deviceChanged",()=>{__DEV__&&console.warn("deviceChanged"),Device.initDevice().then(e=>Event.emit("deviceDataChange",{type:"devInfo",payload:e}))}),AppDeviceEventEmitter.addListener("bluetoothChange",e=>{Event.emit("bluetoothChange",e.state)}),AppDeviceEventEmitter.addListener("deviceStateChange",e=>{__DEV__&&console.warn("deviceStateChange"),void 0!==e&&void 0!==e.state&&Event.emit("deviceDataChange",{type:"deviceOnline",payload:{deviceOnline:e.state}})}),AppDeviceEventEmitter.addListener("networkStateChange",e=>{__DEV__&&console.warn("networkStateChange"),void 0!==e&&void 0!==e.state&&Event.emit("networkStateChange",{appOnline:e.state})}),AppDeviceEventEmitter.addListener("linkageTimeUpdate",()=>{Event.emit("linkageTimeUpdate",{})}),App.verSupported=(e=>!!(r&&r.mobileInfo&&r.mobileInfo.appRnVersion)&&r.mobileInfo.appRnVersion>=e),App.getNetworkState=(()=>new Promise(e=>{r.getNetworkType(t=>{e(t)})})),App.is24Hour=(()=>new Promise(e=>{r.is24Hour(t=>e(t))})),App.getMobileInfo=(()=>new Promise((e,t)=>{TYMobileData?t():r.getMobileInfo(t=>e(t))}).then(e=>TYMobileData=e,()=>TYMobileData)),App.jumpTo=(e=>{r.jumpTo(e||"")}),App.disablePopGesture=(()=>{"ios"===Platform.OS&&s.disablePopGesture()}),App.enablePopGesture=function(){"ios"===Platform.OS&&s.enablePopGesture()},App.showPromptDialog=((e,t,i,n,a,o,s)=>{if("ios"===Platform.OS)try{AlertIOS.prompt(i,n,[{text:e,onPress:e=>o(e),style:"default"},{text:t,onPress:()=>s(),style:"cancel"}],"plain-text",a)}catch(e){}else r.showPromptDialog(i,n,a,o,s)}),apiRequest=(e=>new Promise((t,i)=>{s.apiRNRequest(e,e=>{const i="object"==typeof e?e:JSON.parse(e);t({...i})},i)})))}const TySdk={mobile:App,device:Device,apiRequest:apiRequest,native:Native,event:Event,DeviceEventEmitter:AppDeviceEventEmitter,Navigator:{},applyNavigator:e=>{TySdk.Navigator=e}};export default TySdk;