webpackJsonp([135,150],{21:function(e,t,i){e.exports={default:i(39),__esModule:!0}},39:function(e,t,i){var a=i(22),n=a.JSON||(a.JSON={stringify:JSON.stringify});e.exports=function(e){return n.stringify.apply(n,arguments)}},42:function(e,t,i){i(48);var a=i(5)(i(45),i(47),null,null);i(49),e.exports=a.exports},45:function(e,t,i){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=i(182),o=a(n);t.default={name:"x-header",props:{leftOptions:Object,title:String,transition:String,rightOptions:{type:Object,default:function(){return{showMore:!1}}}},beforeMount:function(){this.$slots["overwrite-title"]&&(this.shouldOverWriteTitle=!0)},computed:{_leftOptions:function(){return(0,o.default)({showBack:!0,preventGoBack:!1},this.leftOptions||{})}},methods:{onClickBack:function(){this._leftOptions.preventGoBack?this.$emit("on-click-back"):this.$router?this.$router.back():window.history.back()}},data:function(){return{shouldOverWriteTitle:!1}}}},46:function(e,t,i){t=e.exports=i(3)(),t.push([e.id,'.vux-header{position:relative;padding:3px 0;box-sizing:border-box;background-color:#35495e}.vux-header .vux-header-title{line-height:40px;text-align:center;font-size:18px;font-weight:400;color:#fff}.vux-header-title-area,.vux-header .vux-header-title{margin:0 88px;height:40px;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.vux-header .vux-header-title>span{display:inline-block}.vux-header .vux-header-left,.vux-header .vux-header-right{position:absolute;top:14px;display:block;font-size:14px;line-height:21px;color:#ccc}.vux-header .vux-header-left a,.vux-header .vux-header-left button,.vux-header .vux-header-right a,.vux-header .vux-header-right button{float:left;margin-right:8px;color:#ccc}.vux-header .vux-header-left a:active,.vux-header .vux-header-left button:active,.vux-header .vux-header-right a:active,.vux-header .vux-header-right button:active{opacity:.5}.vux-header .vux-header-left{left:18px}.vux-header .vux-header-left .vux-header-back{padding-left:16px}.vux-header .vux-header-left .left-arrow{position:absolute;width:30px;height:30px;top:-5px;left:-5px}.vux-header .vux-header-left .left-arrow:before{content:"";position:absolute;width:12px;height:12px;border:1px solid #ccc;border-width:1px 0 0 1px;transform:rotate(315deg);top:8px;left:7px}.vux-header .vux-header-right{right:15px}.vux-header .vux-header-right a,.vux-header .vux-header-right button{margin-left:8px;margin-right:0}.vux-header .vux-header-right .vux-header-more:after{content:"\\2022   \\2022   \\2022   ";font-size:16px}.vux-header-fade-in-right-enter-active{animation:fadeinR .5s}.vux-header-fade-in-left-enter-active{animation:fadeinL .5s}@keyframes fadeinR{0%{opacity:0;transform:translateX(150px)}to{opacity:1;transform:translateX(0)}}@keyframes fadeinL{0%{opacity:0;transform:translateX(-150px)}to{opacity:1;transform:translateX(0)}}',""])},47:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"vux-header"},[i("div",{staticClass:"vux-header-left"},[e._t("overwrite-left",[i("transition",{attrs:{name:e.transition}},[i("a",{directives:[{name:"show",rawName:"v-show",value:e._leftOptions.showBack,expression:"_leftOptions.showBack"}],staticClass:"vux-header-back",on:{click:[function(t){if(!("button"in t)&&e._k(t.keyCode,"preventDefault",void 0,t.key,void 0))return null},e.onClickBack]}},[e._v(e._s("undefined"==typeof e._leftOptions.backText?"返回":e._leftOptions.backText))])]),e._v(" "),i("transition",{attrs:{name:e.transition}},[i("div",{directives:[{name:"show",rawName:"v-show",value:e._leftOptions.showBack,expression:"_leftOptions.showBack"}],staticClass:"left-arrow",on:{click:e.onClickBack}})])]),e._v(" "),e._t("left")],2),e._v(" "),e.shouldOverWriteTitle?e._e():i("h1",{staticClass:"vux-header-title",on:{click:function(t){e.$emit("on-click-title")}}},[e._t("default",[i("transition",{attrs:{name:e.transition}},[i("span",{directives:[{name:"show",rawName:"v-show",value:e.title,expression:"title"}]},[e._v(e._s(e.title))])])])],2),e._v(" "),e.shouldOverWriteTitle?i("div",{staticClass:"vux-header-title-area"},[e._t("overwrite-title")],2):e._e(),e._v(" "),i("div",{staticClass:"vux-header-right"},[e.rightOptions.showMore?i("a",{staticClass:"vux-header-more",on:{click:[function(t){if(!("button"in t)&&e._k(t.keyCode,"preventDefault",void 0,t.key,void 0))return null},function(t){e.$emit("on-click-more")}]}}):e._e(),e._v(" "),e._t("right")],2)])},staticRenderFns:[]}},48:function(e,t,i){var a=i(46);"string"==typeof a&&(a=[[e.id,a,""]]);i(4)(a,{});a.locals&&(e.exports=a.locals)},49:function(e,t){},186:function(e,t,i){"use strict";function a(e){return void 0===e?document.body:"string"==typeof e&&0===e.indexOf("?")?document.body:("string"==typeof e&&e.indexOf("?")>0&&(e=e.split("?")[0]),"body"===e||e===!0?document.body:e instanceof window.Node?e:document.querySelector(e))}function n(e){if(!e)return!1;if("string"==typeof e&&e.indexOf("?")>0)try{var t=JSON.parse(e.split("?")[1]);return t.autoUpdate||!1}catch(e){return!1}return!1}Object.defineProperty(t,"__esModule",{value:!0});var o=i(182),r={inserted:function(e,t,i){var n=t.value;e.className=e.className?e.className+" v-transfer-dom":"v-transfer-dom";var o=e.parentNode,r=document.createComment(""),s=!1;n!==!1&&(o.replaceChild(r,e),a(n).appendChild(e),s=!0),e.__transferDomData||(e.__transferDomData={parentNode:o,home:r,target:a(n),hasMovedOut:s})},componentUpdated:function(e,t){var i=t.value,r=n(i);if(r){var s=e.__transferDomData,c=s.parentNode,u=s.home,l=s.hasMovedOut;!l&&i?(c.replaceChild(u,e),a(i).appendChild(e),e.__transferDomData=o({},e.__transferDomData,{hasMovedOut:!0,target:a(i)})):l&&i===!1?(c.replaceChild(e,u),e.__transferDomData=o({},e.__transferDomData,{hasMovedOut:!1,target:a(i)})):i&&a(i).appendChild(e)}},unbind:function(e,t){e.className=e.className.replace("v-transfer-dom",""),e.__transferDomData&&e.__transferDomData.hasMovedOut===!0&&e.__transferDomData.parentNode&&e.__transferDomData.parentNode.appendChild(e),e.__transferDomData=null}};t.default=r},246:function(e,t,i){i(250);var a=i(5)(i(247),i(249),null,null);i(251),e.exports=a.exports},247:function(e,t,i){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=i(21),o=a(n),r=i(23),s=a(r);t.default={name:"actionsheet",mounted:function(){var e=this;this.hasHeaderSlot=!!this.$slots.header,this.$nextTick(function(){e.$tabbar=document.querySelector(".weui-tabbar"),e.$refs.iOSMenu&&e.$refs.iOSMenu.addEventListener("transitionend",e.onTransitionEnd)})},props:{value:Boolean,showCancel:Boolean,cancelText:String,theme:{type:String,default:"ios"},menus:{type:[Object,Array],default:function(){return{}}},closeOnClickingMask:{type:Boolean,default:!0},closeOnClickingMenu:{type:Boolean,default:!0}},data:function(){return{hasHeaderSlot:!1,show:!1}},methods:{onTransitionEnd:function(){this.$emit(this.show?"on-after-show":"on-after-hide")},onMenuClick:function(e,t){"string"==typeof e?this.emitEvent("on-click-menu",t,e):"disabled"!==e.type&&"info"!==e.type&&(e.value||0===e.value?this.emitEvent("on-click-menu",e.value,e):(this.emitEvent("on-click-menu","",e),this.show=!1))},onClickingMask:function(){this.$emit("on-click-mask"),this.closeOnClickingMask&&(this.show=!1)},emitEvent:function(e,t,i){if("on-click-menu"===e&&!/.noop/.test(t)){var a=i;"object"===("undefined"==typeof a?"undefined":(0,s.default)(a))&&(a=JSON.parse((0,o.default)(a))),this.$emit(e,t,a),this.$emit(e+"-"+t),this.closeOnClickingMenu&&(this.show=!1)}},fixIos:function(e){this.$el.parentNode&&this.$el.parentNode.className.indexOf("v-transfer-dom")!==-1||this.$tabbar&&/iphone/i.test(navigator.userAgent)&&(this.$tabbar.style.zIndex=e)}},watch:{show:function(e){var t=this;this.$emit("input",e),e?this.fixIos(-1):setTimeout(function(){t.fixIos(100)},200)},value:{handler:function(e){this.show=e},immediate:!0}},beforeDestroy:function(){this.fixIos(100),this.$refs.iOSMenu&&this.$refs.iOSMenu.removeEventListener("transitionend",this.onTransitionEnd)}}},248:function(e,t,i){t=e.exports=i(3)(),t.push([e.id,'.weui-mask{background:rgba(0,0,0,.6)}.weui-mask,.weui-mask_transparent{position:fixed;z-index:1000;top:0;right:0;left:0;bottom:0}.weui-actionsheet{position:fixed;left:0;bottom:0;transform:translateY(100%);-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:5000;width:100%;background-color:#efeff4;transition:transform .3s}.weui-actionsheet__menu{background-color:#fff}.weui-actionsheet__action{margin-top:6px;background-color:#fff}.weui-actionsheet__cell{position:relative;padding:10px 0;text-align:center;font-size:18px}.weui-actionsheet__cell:before{content:" ";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #d9d9d9;color:#d9d9d9;transform-origin:0 0;transform:scaleY(.5)}.weui-actionsheet__cell:active{background-color:#ececec}.weui-actionsheet__cell:first-child:before{display:none}.weui-skin_android .weui-actionsheet{position:fixed;left:50%;top:50%;bottom:auto;transform:translate(-50%,-50%);width:274px;box-sizing:border-box;-webkit-backface-visibility:hidden;backface-visibility:hidden;background:transparent;transition:transform .3s}.weui-skin_android .weui-actionsheet__action{display:none}.weui-skin_android .weui-actionsheet__menu{border-radius:2px;box-shadow:0 6px 30px 0 rgba(0,0,0,.1)}.weui-skin_android .weui-actionsheet__cell{padding:13px 24px;font-size:16px;line-height:1.4;text-align:left}.weui-skin_android .weui-actionsheet__cell:first-child{border-top-left-radius:2px;border-top-right-radius:2px}.weui-skin_android .weui-actionsheet__cell:last-child{border-bottom-left-radius:2px;border-bottom-right-radius:2px}.weui-actionsheet_toggle{transform:translate(0)}.vux-actionsheet-menu-primary{color:#1aad19}.vux-actionsheet-menu-warn{color:#e64340}.vux-actionsheet-menu-default{color:#000}.vux-actionsheet-menu-disabled{color:#ccc}.vux-actionsheet-mask-enter,.vux-actionsheet-mask-leave-active,.vux-android-actionsheet-enter,.vux-android-actionsheet-leave-active{opacity:0}.vux-actionsheet-mask-enter-active,.vux-actionsheet-mask-leave-active,.vux-android-actionsheet-enter-active,.vux-android-actionsheet-leave-active{transition:opacity .3s!important}',""])},249:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"vux-actionsheet"},[i("transition",{attrs:{name:"vux-actionsheet-mask"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],staticClass:"weui-mask weui-mask_transparent",on:{click:e.onClickingMask}})]),e._v(" "),"android"===e.theme?i("div",{staticClass:"weui-skin_android"},[i("transition",{attrs:{name:"vux-android-actionsheet"},on:{"after-enter":function(t){e.$emit("on-after-show")},"after-leave":function(t){e.$emit("on-after-hide")}}},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],staticClass:"weui-actionsheet"},[i("div",{staticClass:"weui-actionsheet__menu"},e._l(e.menus,function(t,a){return i("div",{staticClass:"weui-actionsheet__cell",domProps:{innerHTML:e._s(t.label||t)},on:{click:function(i){e.onMenuClick(t,a)}}})}))])])],1):i("div",{ref:"iOSMenu",staticClass:"weui-actionsheet",class:{"weui-actionsheet_toggle":e.show}},[i("div",{staticClass:"weui-actionsheet__menu"},[e.hasHeaderSlot?i("div",{staticClass:"weui-actionsheet__cell"},[e._t("header")],2):e._e(),e._v(" "),e._l(e.menus,function(t,a){return i("div",{staticClass:"weui-actionsheet__cell",class:"vux-actionsheet-menu-"+(t.type||"default"),domProps:{innerHTML:e._s(t.label||t)},on:{click:function(i){e.onMenuClick(t,a)}}})})],2),e._v(" "),e.showCancel?i("div",{staticClass:"weui-actionsheet__action",on:{click:function(t){e.emitEvent("on-click-menu","cancel")}}},[i("div",{staticClass:"weui-actionsheet__cell"},[e._v(e._s(e.cancelText||"取消"))])]):e._e()])],1)},staticRenderFns:[]}},250:function(e,t,i){var a=i(248);"string"==typeof a&&(a=[[e.id,a,""]]);i(4)(a,{});a.locals&&(e.exports=a.locals)},251:function(e,t){},1234:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=[{riskName:"金玉满堂长期护理保险",riskNo:"C164",count:9},{riskName:"金银花长期护理保险（万能型）",riskNo:"C158",count:12},{riskName:"附加聚宝盆长期意外伤害保险",riskNo:"A173",count:7},{riskName:"健康e生臻爱医疗保险",riskNo:"M127",count:16},{riskName:"个人综合意外险",riskNo:"A187",count:10},{riskName:"健康人生尊享重大疾病保险",riskNo:"I155",count:35},{riskName:"附加健康人生尊享长期护理险",riskNo:"C169",count:8},{riskName:"无忧豁免保险费重大疾病保险",riskNo:"I153",count:35},{riskName:"健康人生多倍保重大疾病保险",riskNo:"I149",count:40},{riskName:"畅行无忧综合意外伤害保险（2018）",riskNo:"A186",count:12},{riskName:"附加畅行无忧长期护理保险（2018）",riskNo:"C165",count:9},{riskName:"爱无忧C款重大疾病保险",riskNo:"I152",count:40},{riskName:"健康e生尊享医疗保险",riskNo:"M126",count:10},{riskName:"安心团体终身重大疾病保险（爱护版）",riskNo:"I213",count:38}];t.default=i},1268:function(e,t,i){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=i(42),o=a(n),r=i(186),s=a(r),c=i(246),u=a(c),l=i(1234),d=a(l);t.default={directives:{TransferDom:s.default},components:{XHeader:o.default,Actionsheet:u.default},data:function(){return{menus:{menu1:"返回首页",menu2:"分享"},showMenus:!1,showActive:"clause",riskNo:"",detail_TK:{},urlList:[],rule_url:""}},methods:{change:function(e){this.showActive=e}},created:function(){var e=this;this.riskNo=this.$route.params.riskNo,this.detail_TK=d.default.filter(function(t){return t.riskNo==e.riskNo})[0];for(var t=1;t<=this.detail_TK.count;t++)this.urlList[t-1]="https://uat-mosale.kunlunhealth.com.cn/img/"+this.riskNo+"/"+t+".png";this.rule_url="https://uat-mosale.kunlunhealth.com.cn/img/rule/"+this.riskNo+"/1.png"}}},1434:function(e,t,i){t=e.exports=i(3)(),t.push([e.id,".vux-header{background-color:#fff!important}.vux-header .vux-header-title{color:#000!important}.vux-header .vux-header-left .left-arrow:before{border:2px solid #000!important;border-right:none!important;border-bottom:none!important}.vux-header .vux-header-right .vux-header-more:after{color:#000!important}.vux-header .vux-header-left .vux-header-back{color:transparent!important}",""])},1435:function(e,t,i){t=e.exports=i(3)(),t.push([e.id,".rules[data-v-03139d42]{border:1px solid #c08f00;border-top-left-radius:5px;border-bottom-left-radius:5px}.clause[data-v-03139d42],.rules[data-v-03139d42]{width:50%;text-align:center;padding:4px;color:#c08f00}.clause[data-v-03139d42]{border:1px solid #c08f00;border-top-right-radius:5px;border-bottom-right-radius:5px}.active[data-v-03139d42]{background:#c08f00;color:#fff}",""])},1840:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("x-header",{attrs:{"right-options":{showMore:!0}},on:{"on-click-more":function(t){e.showMenus=!0}}},[e._v(e._s(this.detail_TK.riskName))]),e._v(" "),i("div",{directives:[{name:"transfer-dom",rawName:"v-transfer-dom"}]},[i("actionsheet",{attrs:{menus:e.menus,"show-cancel":""},model:{value:e.showMenus,callback:function(t){e.showMenus=t},expression:"showMenus"}})],1),e._v(" "),i("div",{staticStyle:{display:"flex",width:"100%",padding:"10px 15px","box-sizing":"border-box","margin-top":"40px"}},[i("div",{staticClass:"rules",class:{active:"rules"==e.showActive},on:{click:function(t){e.change("rules")}}},[e._v("投保规则")]),e._v(" "),i("div",{staticClass:"clause",class:{active:"clause"==e.showActive},on:{click:function(t){e.change("clause")}}},[e._v("条款")])]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:"rules"==e.showActive,expression:"showActive =='rules' "}],staticStyle:{width:"100%","text-align":"center"}},[i("img",{staticStyle:{width:"100%"},attrs:{src:e.rule_url,alt:"暂时没有规则"}})]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:"clause"==e.showActive,expression:"showActive =='clause' "}]},e._l(e.urlList,function(e){return i("div",{staticStyle:{width:"100%"}},[i("img",{staticStyle:{width:"100%"},attrs:{src:e}})])}))],1)},staticRenderFns:[]}},1980:function(e,t,i){var a=i(1434);"string"==typeof a&&(a=[[e.id,a,""]]);i(4)(a,{});a.locals&&(e.exports=a.locals)},1981:function(e,t,i){var a=i(1435);"string"==typeof a&&(a=[[e.id,a,""]]);i(4)(a,{});a.locals&&(e.exports=a.locals)},2251:function(e,t,i){i(1981),i(1980);var a=i(5)(i(1268),i(1840),"data-v-03139d42",null);e.exports=a.exports}});