webpackJsonp([131,150],{21:function(e,t,n){e.exports={default:n(39),__esModule:!0}},27:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!/^javas/.test(e)&&e){var n="object"===("undefined"==typeof e?"undefined":(0,c.default)(e))||t&&"string"==typeof e&&!/http/.test(e);n?"object"===("undefined"==typeof e?"undefined":(0,c.default)(e))&&e.replace===!0?t.replace(e):"BACK"===e?t.go(-1):t.push(e):window.location.href=e}}function o(e,t){return!t||t._history||"string"!=typeof e||/http/.test(e)?e&&"object"!==("undefined"==typeof e?"undefined":(0,c.default)(e))?e:"javascript:void(0);":"#!"+e}Object.defineProperty(t,"__esModule",{value:!0});var r=n(23),c=i(r);t.go=a,t.getUrl=o},31:function(e,t,n){n(205);var i=n(5)(n(199),n(204),null,null);e.exports=i.exports},39:function(e,t,n){var i=n(22),a=i.JSON||(i.JSON={stringify:JSON.stringify});e.exports=function(e){return a.stringify.apply(a,arguments)}},42:function(e,t,n){n(48);var i=n(5)(n(45),n(47),null,null);n(49),e.exports=i.exports},45:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(182),o=i(a);t.default={name:"x-header",props:{leftOptions:Object,title:String,transition:String,rightOptions:{type:Object,default:function(){return{showMore:!1}}}},beforeMount:function(){this.$slots["overwrite-title"]&&(this.shouldOverWriteTitle=!0)},computed:{_leftOptions:function(){return(0,o.default)({showBack:!0,preventGoBack:!1},this.leftOptions||{})}},methods:{onClickBack:function(){this._leftOptions.preventGoBack?this.$emit("on-click-back"):this.$router?this.$router.back():window.history.back()}},data:function(){return{shouldOverWriteTitle:!1}}}},46:function(e,t,n){t=e.exports=n(3)(),t.push([e.id,'.vux-header{position:relative;padding:3px 0;box-sizing:border-box;background-color:#35495e}.vux-header .vux-header-title{line-height:40px;text-align:center;font-size:18px;font-weight:400;color:#fff}.vux-header-title-area,.vux-header .vux-header-title{margin:0 88px;height:40px;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.vux-header .vux-header-title>span{display:inline-block}.vux-header .vux-header-left,.vux-header .vux-header-right{position:absolute;top:14px;display:block;font-size:14px;line-height:21px;color:#ccc}.vux-header .vux-header-left a,.vux-header .vux-header-left button,.vux-header .vux-header-right a,.vux-header .vux-header-right button{float:left;margin-right:8px;color:#ccc}.vux-header .vux-header-left a:active,.vux-header .vux-header-left button:active,.vux-header .vux-header-right a:active,.vux-header .vux-header-right button:active{opacity:.5}.vux-header .vux-header-left{left:18px}.vux-header .vux-header-left .vux-header-back{padding-left:16px}.vux-header .vux-header-left .left-arrow{position:absolute;width:30px;height:30px;top:-5px;left:-5px}.vux-header .vux-header-left .left-arrow:before{content:"";position:absolute;width:12px;height:12px;border:1px solid #ccc;border-width:1px 0 0 1px;transform:rotate(315deg);top:8px;left:7px}.vux-header .vux-header-right{right:15px}.vux-header .vux-header-right a,.vux-header .vux-header-right button{margin-left:8px;margin-right:0}.vux-header .vux-header-right .vux-header-more:after{content:"\\2022   \\2022   \\2022   ";font-size:16px}.vux-header-fade-in-right-enter-active{animation:fadeinR .5s}.vux-header-fade-in-left-enter-active{animation:fadeinL .5s}@keyframes fadeinR{0%{opacity:0;transform:translateX(150px)}to{opacity:1;transform:translateX(0)}}@keyframes fadeinL{0%{opacity:0;transform:translateX(-150px)}to{opacity:1;transform:translateX(0)}}',""])},47:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"vux-header"},[n("div",{staticClass:"vux-header-left"},[e._t("overwrite-left",[n("transition",{attrs:{name:e.transition}},[n("a",{directives:[{name:"show",rawName:"v-show",value:e._leftOptions.showBack,expression:"_leftOptions.showBack"}],staticClass:"vux-header-back",on:{click:[function(t){if(!("button"in t)&&e._k(t.keyCode,"preventDefault",void 0,t.key,void 0))return null},e.onClickBack]}},[e._v(e._s("undefined"==typeof e._leftOptions.backText?"返回":e._leftOptions.backText))])]),e._v(" "),n("transition",{attrs:{name:e.transition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e._leftOptions.showBack,expression:"_leftOptions.showBack"}],staticClass:"left-arrow",on:{click:e.onClickBack}})])]),e._v(" "),e._t("left")],2),e._v(" "),e.shouldOverWriteTitle?e._e():n("h1",{staticClass:"vux-header-title",on:{click:function(t){e.$emit("on-click-title")}}},[e._t("default",[n("transition",{attrs:{name:e.transition}},[n("span",{directives:[{name:"show",rawName:"v-show",value:e.title,expression:"title"}]},[e._v(e._s(e.title))])])])],2),e._v(" "),e.shouldOverWriteTitle?n("div",{staticClass:"vux-header-title-area"},[e._t("overwrite-title")],2):e._e(),e._v(" "),n("div",{staticClass:"vux-header-right"},[e.rightOptions.showMore?n("a",{staticClass:"vux-header-more",on:{click:[function(t){if(!("button"in t)&&e._k(t.keyCode,"preventDefault",void 0,t.key,void 0))return null},function(t){e.$emit("on-click-more")}]}}):e._e(),e._v(" "),e._t("right")],2)])},staticRenderFns:[]}},48:function(e,t,n){var i=n(46);"string"==typeof i&&(i=[[e.id,i,""]]);n(4)(i,{});i.locals&&(e.exports=i.locals)},49:function(e,t){},186:function(e,t,n){"use strict";function i(e){return void 0===e?document.body:"string"==typeof e&&0===e.indexOf("?")?document.body:("string"==typeof e&&e.indexOf("?")>0&&(e=e.split("?")[0]),"body"===e||e===!0?document.body:e instanceof window.Node?e:document.querySelector(e))}function a(e){if(!e)return!1;if("string"==typeof e&&e.indexOf("?")>0)try{var t=JSON.parse(e.split("?")[1]);return t.autoUpdate||!1}catch(e){return!1}return!1}Object.defineProperty(t,"__esModule",{value:!0});var o=n(182),r={inserted:function(e,t,n){var a=t.value;e.className=e.className?e.className+" v-transfer-dom":"v-transfer-dom";var o=e.parentNode,r=document.createComment(""),c=!1;a!==!1&&(o.replaceChild(r,e),i(a).appendChild(e),c=!0),e.__transferDomData||(e.__transferDomData={parentNode:o,home:r,target:i(a),hasMovedOut:c})},componentUpdated:function(e,t){var n=t.value,r=a(n);if(r){var c=e.__transferDomData,d=c.parentNode,s=c.home,l=c.hasMovedOut;!l&&n?(d.replaceChild(s,e),i(n).appendChild(e),e.__transferDomData=o({},e.__transferDomData,{hasMovedOut:!0,target:i(n)})):l&&n===!1?(d.replaceChild(e,s),e.__transferDomData=o({},e.__transferDomData,{hasMovedOut:!1,target:i(n)})):n&&i(n).appendChild(e)}},unbind:function(e,t){e.className=e.className.replace("v-transfer-dom",""),e.__transferDomData&&e.__transferDomData.hasMovedOut===!0&&e.__transferDomData.parentNode&&e.__transferDomData.parentNode.appendChild(e),e.__transferDomData=null}};t.default=r},199:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(27);t.default={name:"x-button",props:{type:{default:"default"},disabled:Boolean,mini:Boolean,plain:Boolean,text:String,actionType:String,showLoading:Boolean,link:[String,Object],gradients:{type:Array,validator:function(e){return 2===e.length}}},methods:{onClick:function(){!this.disabled&&(0,i.go)(this.link,this.$router)}},computed:{noBorder:function(){return Array.isArray(this.gradients)},buttonStyle:function(){if(this.gradients)return{background:"linear-gradient(90deg, "+this.gradients[0]+", "+this.gradients[1]+")",color:"#FFFFFF"}},classes:function(){return[{"weui-btn_disabled":!this.plain&&this.disabled,"weui-btn_plain-disabled":this.plain&&this.disabled,"weui-btn_mini":this.mini,"vux-x-button-no-border":this.noBorder},this.plain?"":"weui-btn_"+this.type,this.plain?"weui-btn_plain-"+this.type:"",this.showLoading?"weui-btn_loading":""]}}}},203:function(e,t,n){t=e.exports=n(3)(),t.push([e.id,'.weui-btn{position:relative;display:block;margin-left:auto;margin-right:auto;padding-left:14px;padding-right:14px;box-sizing:border-box;font-size:18px;text-align:center;text-decoration:none;color:#fff;line-height:2.33333333;border-radius:5px;-webkit-tap-highlight-color:rgba(0,0,0,0);overflow:hidden}.weui-btn:after{content:" ";width:200%;height:200%;position:absolute;top:0;left:0;border:1px solid rgba(0,0,0,.2);transform:scale(.5);transform-origin:0 0;box-sizing:border-box;border-radius:10px}.weui-btn_inline{display:inline-block}.weui-btn_default{color:#000;background-color:#f8f8f8}.weui-btn_default:not(.weui-btn_disabled):visited{color:#000}.weui-btn_default:not(.weui-btn_disabled):active{color:rgba(0,0,0,.6);background-color:#dedede}.weui-btn_primary{background-color:#1aad19}.weui-btn_primary:not(.weui-btn_disabled):visited{color:#fff}.weui-btn_primary:not(.weui-btn_disabled):active{color:hsla(0,0%,100%,.6);background-color:#179b16}.weui-btn_warn{background-color:#e64340}.weui-btn_warn:not(.weui-btn_disabled):visited{color:#fff}.weui-btn_warn:not(.weui-btn_disabled):active{color:hsla(0,0%,100%,.6);background-color:#ce3c39}.weui-btn_disabled{color:hsla(0,0%,100%,.6)}.weui-btn_disabled.weui-btn_default{color:rgba(0,0,0,.3);background-color:#f7f7f7}.weui-btn_disabled.weui-btn_primary{background-color:#9ed99d}.weui-btn_disabled.weui-btn_warn{background-color:#ec8b89}.weui-btn_loading .weui-loading{margin:-.2em .34em 0 0}.weui-btn_loading.weui-btn_primary,.weui-btn_loading.weui-btn_warn{color:hsla(0,0%,100%,.6)}.weui-btn_loading.weui-btn_primary .weui-loading,.weui-btn_loading.weui-btn_warn .weui-loading{background-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMjAnIGhlaWdodD0nMTIwJyB2aWV3Qm94PScwIDAgMTAwIDEwMCc+PHBhdGggZmlsbD0nbm9uZScgZD0nTTAgMGgxMDB2MTAwSDB6Jy8+PHJlY3QgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjU2KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgwIC0zMCknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjUpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKDMwIDEwNS45OCA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjQzKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSg2MCA3NS45OCA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjM4KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSg5MCA2NSA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjMyKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgxMjAgNTguNjYgNjUpJy8+PHJlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4yOCknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoMTUwIDU0LjAyIDY1KScvPjxyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuMjUpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKDE4MCA1MCA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjIpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKC0xNTAgNDUuOTggNjUpJy8+PHJlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4xNyknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoLTEyMCA0MS4zNCA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjE0KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgtOTAgMzUgNjUpJy8+PHJlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4xKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgtNjAgMjQuMDIgNjUpJy8+PHJlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4wMyknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoLTMwIC01Ljk4IDY1KScvPjwvc3ZnPg==")}.weui-btn_loading.weui-btn_primary{background-color:#179b16}.weui-btn_loading.weui-btn_warn{background-color:#ce3c39}.weui-btn_plain-primary{color:#1aad19;border:1px solid #1aad19}.weui-btn_plain-primary:not(.weui-btn_plain-disabled):active{color:rgba(26,173,25,.6);border-color:rgba(26,173,25,.6);background-color:transparent}.weui-btn_plain-primary:after{border-width:0}.weui-btn_plain-default{color:#353535;border:1px solid #353535}.weui-btn_plain-default:not(.weui-btn_plain-disabled):active{color:rgba(53,53,53,.6);border-color:rgba(53,53,53,.6)}.weui-btn_plain-default:after{border-width:0}button.weui-btn.weui-btn_plain-warn,input.weui-btn.weui-btn_plain-warn{border-width:1px;background-color:transparent}.weui-btn_plain-warn{color:#ce3c39;border-color:#ce3c39;background:transparent}.weui-btn_plain-warn:not(.weui-btn_plain-disabled):active{color:rgba(206,60,57,.6);border-color:rgba(206,60,57,.6)}.weui-btn_plain-warn:after{border-width:0}.weui-btn_plain-disabled{color:rgba(0,0,0,.2);border-color:rgba(0,0,0,.2)}button.weui-btn,input.weui-btn{width:100%;border-width:0;outline:0;-webkit-appearance:none}button.weui-btn:focus,input.weui-btn:focus{outline:0}button.weui-btn_inline,button.weui-btn_mini,input.weui-btn_inline,input.weui-btn_mini{width:auto}button.weui-btn_plain-default,button.weui-btn_plain-primary,input.weui-btn_plain-default,input.weui-btn_plain-primary{border-width:1px;background-color:transparent}.weui-btn_mini{display:inline-block;padding:0 1.32em;line-height:2.3;font-size:13px}.weui-btn+.weui-btn{margin-top:15px}.weui-btn.weui-btn_inline+.weui-btn.weui-btn_inline{margin-top:auto;margin-left:15px}.weui-btn-area{margin:1.17647059em 15px .3em}.weui-btn-area_inline{display:-ms-flexbox;display:flex}.weui-btn-area_inline .weui-btn{margin-top:auto;margin-right:15px;width:100%;-ms-flex:1;flex:1}.weui-btn-area_inline .weui-btn:last-child{margin-right:0}.weui-loading{width:20px;height:20px;display:inline-block;vertical-align:middle;animation:weuiLoading 1s steps(12) infinite;background:transparent url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=") no-repeat;background-size:100%}.weui-loading.weui-loading_transparent{background-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMjAnIGhlaWdodD0nMTIwJyB2aWV3Qm94PScwIDAgMTAwIDEwMCc+PHBhdGggZmlsbD0nbm9uZScgZD0nTTAgMGgxMDB2MTAwSDB6Jy8+PHJlY3QgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjU2KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgwIC0zMCknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjUpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKDMwIDEwNS45OCA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjQzKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSg2MCA3NS45OCA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjM4KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSg5MCA2NSA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjMyKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgxMjAgNTguNjYgNjUpJy8+PHJlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4yOCknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoMTUwIDU0LjAyIDY1KScvPjxyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuMjUpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKDE4MCA1MCA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjIpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKC0xNTAgNDUuOTggNjUpJy8+PHJlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4xNyknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoLTEyMCA0MS4zNCA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjE0KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgtOTAgMzUgNjUpJy8+PHJlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4xKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgtNjAgMjQuMDIgNjUpJy8+PHJlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4wMyknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoLTMwIC01Ljk4IDY1KScvPjwvc3ZnPgo=")}@keyframes weuiLoading{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}.weui-btn.vux-x-button-no-border:after{display:none}',""])},204:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("button",{staticClass:"weui-btn",class:e.classes,style:e.buttonStyle,attrs:{disabled:e.disabled,type:e.actionType},on:{click:e.onClick}},[e.showLoading?n("i",{staticClass:"weui-loading"}):e._e(),e._v(" "),e._t("default",[e._v(e._s(e.text))])],2)},staticRenderFns:[]}},205:function(e,t,n){var i=n(203);"string"==typeof i&&(i=[[e.id,i,""]]);n(4)(i,{});i.locals&&(e.exports=i.locals)},246:function(e,t,n){n(250);var i=n(5)(n(247),n(249),null,null);n(251),e.exports=i.exports},247:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(21),o=i(a),r=n(23),c=i(r);t.default={name:"actionsheet",mounted:function(){var e=this;this.hasHeaderSlot=!!this.$slots.header,this.$nextTick(function(){e.$tabbar=document.querySelector(".weui-tabbar"),e.$refs.iOSMenu&&e.$refs.iOSMenu.addEventListener("transitionend",e.onTransitionEnd)})},props:{value:Boolean,showCancel:Boolean,cancelText:String,theme:{type:String,default:"ios"},menus:{type:[Object,Array],default:function(){return{}}},closeOnClickingMask:{type:Boolean,default:!0},closeOnClickingMenu:{type:Boolean,default:!0}},data:function(){return{hasHeaderSlot:!1,show:!1}},methods:{onTransitionEnd:function(){this.$emit(this.show?"on-after-show":"on-after-hide")},onMenuClick:function(e,t){"string"==typeof e?this.emitEvent("on-click-menu",t,e):"disabled"!==e.type&&"info"!==e.type&&(e.value||0===e.value?this.emitEvent("on-click-menu",e.value,e):(this.emitEvent("on-click-menu","",e),this.show=!1))},onClickingMask:function(){this.$emit("on-click-mask"),this.closeOnClickingMask&&(this.show=!1)},emitEvent:function(e,t,n){if("on-click-menu"===e&&!/.noop/.test(t)){var i=n;"object"===("undefined"==typeof i?"undefined":(0,c.default)(i))&&(i=JSON.parse((0,o.default)(i))),this.$emit(e,t,i),this.$emit(e+"-"+t),this.closeOnClickingMenu&&(this.show=!1)}},fixIos:function(e){this.$el.parentNode&&this.$el.parentNode.className.indexOf("v-transfer-dom")!==-1||this.$tabbar&&/iphone/i.test(navigator.userAgent)&&(this.$tabbar.style.zIndex=e)}},watch:{show:function(e){var t=this;this.$emit("input",e),e?this.fixIos(-1):setTimeout(function(){t.fixIos(100)},200)},value:{handler:function(e){this.show=e},immediate:!0}},beforeDestroy:function(){this.fixIos(100),this.$refs.iOSMenu&&this.$refs.iOSMenu.removeEventListener("transitionend",this.onTransitionEnd)}}},248:function(e,t,n){t=e.exports=n(3)(),t.push([e.id,'.weui-mask{background:rgba(0,0,0,.6)}.weui-mask,.weui-mask_transparent{position:fixed;z-index:1000;top:0;right:0;left:0;bottom:0}.weui-actionsheet{position:fixed;left:0;bottom:0;transform:translateY(100%);-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:5000;width:100%;background-color:#efeff4;transition:transform .3s}.weui-actionsheet__menu{background-color:#fff}.weui-actionsheet__action{margin-top:6px;background-color:#fff}.weui-actionsheet__cell{position:relative;padding:10px 0;text-align:center;font-size:18px}.weui-actionsheet__cell:before{content:" ";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #d9d9d9;color:#d9d9d9;transform-origin:0 0;transform:scaleY(.5)}.weui-actionsheet__cell:active{background-color:#ececec}.weui-actionsheet__cell:first-child:before{display:none}.weui-skin_android .weui-actionsheet{position:fixed;left:50%;top:50%;bottom:auto;transform:translate(-50%,-50%);width:274px;box-sizing:border-box;-webkit-backface-visibility:hidden;backface-visibility:hidden;background:transparent;transition:transform .3s}.weui-skin_android .weui-actionsheet__action{display:none}.weui-skin_android .weui-actionsheet__menu{border-radius:2px;box-shadow:0 6px 30px 0 rgba(0,0,0,.1)}.weui-skin_android .weui-actionsheet__cell{padding:13px 24px;font-size:16px;line-height:1.4;text-align:left}.weui-skin_android .weui-actionsheet__cell:first-child{border-top-left-radius:2px;border-top-right-radius:2px}.weui-skin_android .weui-actionsheet__cell:last-child{border-bottom-left-radius:2px;border-bottom-right-radius:2px}.weui-actionsheet_toggle{transform:translate(0)}.vux-actionsheet-menu-primary{color:#1aad19}.vux-actionsheet-menu-warn{color:#e64340}.vux-actionsheet-menu-default{color:#000}.vux-actionsheet-menu-disabled{color:#ccc}.vux-actionsheet-mask-enter,.vux-actionsheet-mask-leave-active,.vux-android-actionsheet-enter,.vux-android-actionsheet-leave-active{opacity:0}.vux-actionsheet-mask-enter-active,.vux-actionsheet-mask-leave-active,.vux-android-actionsheet-enter-active,.vux-android-actionsheet-leave-active{transition:opacity .3s!important}',""])},249:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"vux-actionsheet"},[n("transition",{attrs:{name:"vux-actionsheet-mask"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],staticClass:"weui-mask weui-mask_transparent",on:{click:e.onClickingMask}})]),e._v(" "),"android"===e.theme?n("div",{staticClass:"weui-skin_android"},[n("transition",{attrs:{name:"vux-android-actionsheet"},on:{"after-enter":function(t){e.$emit("on-after-show")},"after-leave":function(t){e.$emit("on-after-hide")}}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],staticClass:"weui-actionsheet"},[n("div",{staticClass:"weui-actionsheet__menu"},e._l(e.menus,function(t,i){return n("div",{staticClass:"weui-actionsheet__cell",domProps:{innerHTML:e._s(t.label||t)},on:{click:function(n){e.onMenuClick(t,i)}}})}))])])],1):n("div",{ref:"iOSMenu",staticClass:"weui-actionsheet",class:{"weui-actionsheet_toggle":e.show}},[n("div",{staticClass:"weui-actionsheet__menu"},[e.hasHeaderSlot?n("div",{staticClass:"weui-actionsheet__cell"},[e._t("header")],2):e._e(),e._v(" "),e._l(e.menus,function(t,i){return n("div",{staticClass:"weui-actionsheet__cell",class:"vux-actionsheet-menu-"+(t.type||"default"),domProps:{innerHTML:e._s(t.label||t)},on:{click:function(n){e.onMenuClick(t,i)}}})})],2),e._v(" "),e.showCancel?n("div",{staticClass:"weui-actionsheet__action",on:{click:function(t){e.emitEvent("on-click-menu","cancel")}}},[n("div",{staticClass:"weui-actionsheet__cell"},[e._v(e._s(e.cancelText||"取消"))])]):e._e()])],1)},staticRenderFns:[]}},250:function(e,t,n){var i=n(248);"string"==typeof i&&(i=[[e.id,i,""]]);n(4)(i,{});i.locals&&(e.exports=i.locals)},251:function(e,t){},1361:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(42),o=i(a),r=n(246),c=i(r),d=n(186),s=i(d),l=n(31),u=i(l);t.default={directives:{TransferDom:s.default},components:{XHeader:o.default,Actionsheet:c.default,XButton:u.default},data:function(){return{menus:{menu1:"Take Photo",menu2:"Choose from photos"},showMenus:!1,showChildren:!1,code:"",disabled:!0,col:"col",col2:"col2"}},created:function(){},methods:{click:function(e){console.log(e)},next:function(){this.$router.push("/payInsure")},as:function(){sessionStorage.setItem("confirmMark","0"),router.push({name:"confirmSignature"})},countDown:function(e){var t=this,n=e;this.code=n+"s";var i=setInterval(function(){n--,t.code=n+"s",0==n&&(clearInterval(i),t.code="已阅读",t.num="",t.disabled=!1)},1e3)}}}},1667:function(e,t,n){t=e.exports=n(3)(),t.push([e.id,".vux-header{background-color:#fff!important;position:fixed!important;top:0!important;width:100%!important;z-index:100!important}.vux-header .vux-header-title{color:#000!important}.vux-header .vux-header-left .left-arrow:before{border:2px solid #000!important;border-width:2px 0 0 2px!important}.vux-header .vux-header-right .vux-header-more:after{color:#000!important}.vux-header .vux-header-right a{color:#fff!important}.weui-btn:after{border-radius:5px!important}.weui-btn{color:#000!important}",""])},1668:function(e,t,n){t=e.exports=n(3)(),t.push([e.id,".confirmSignature[data-v-dd5bd17e]{width:100%;height:100%;background:#f0f0f2;position:relative;top:46px}.col[data-v-dd5bd17e]{background:red}.col2[data-v-dd5bd17e]{background:#a9a9a9}.textContnt[data-v-dd5bd17e]{padding:15px;font-size:14px}.textContnt p[data-v-dd5bd17e]{margin-top:5px}.textContnt p span[data-v-dd5bd17e]{color:red}",""])},1964:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"confirmSignature"},[n("x-header",{attrs:{"right-options":{backText:""},"left-options":{backText:"",preventGoBack:!0}},on:{"on-click-back":e.as,"on-click-more":function(t){e.showMenus=!0}}},[e._v("投被保人声明和授权")]),e._v(" "),e._m(0),e._v(" "),n("div",{staticStyle:{"text-align":"center"}},[n("x-button",{staticClass:"col",staticStyle:{height:"2rem","line-height":"2rem",width:"6rem","border-radius":"0px","font-size":"12px",color:"black"},nativeOn:{click:function(t){return e.as(t)}}},[e._v("已阅读")])],1)],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"textContnt"},[n("p",[e._v("1.本人声明涉及本次投保的基本信息及填写的各份问卷、文件的所有陈述和告知事项均真实、准确、完整；知晓上述一切陈述及本声明将成为昆仑健康保险股份有限公司（以下简称“昆仑健康保险”）是否同意承保的依据，本人同意将所有陈述及本声明作为保险合同一部分。本人如有不实告知，昆仑健康保险有权依法解除保险合同，并对合同解除前发生的保险事故不承担保险责任。")]),e._v(" "),n("p",[e._v("2."),n("span",{staticStyle:{color:"red"}},[e._v("本人已认真阅读昆仑健康保险提供的产品条款，并已经知晓了所有单独说明部分的概念、内容及其法律后果并同意遵守。")]),e._v("本人已经知晓其他任何人（包括销售人员）对保险条款、投保单等内容做出的与之相违背或增减的口头说明及书面陈述均为无效，一切内容均以保险合同载明为准。")]),e._v(" "),n("p",[e._v("3.对于所投保的万能保险产品，"),n("span",{staticStyle:{color:"red"}},[e._v("本人已阅读保险条款、人身保险投保提示和产品说明书，了解本产品的特点和保单利益的不确定性。")])]),e._v(" "),n("p",[e._v("4.如本次投保计划含健康保险产品，本人已认真阅读并理解了人身保险投保提示中的健康保险提示内容。")]),e._v(" "),n("p",[e._v("5.本人已了解一年期主险/一年期附加险的保险期间为一年，选择自动申请续保方式，如昆仑健康保险审核后同意续保、收取保险费后保险合同/附加保险合同继续有效；如昆仑健康保险审核后不同意续保、不再收取保险费，保险合同/附加保险合同满期终止。如本人决定终止续保，应于一年期主险/一年期附加险保险期间届满前办理终止续保手续。")]),e._v(" "),n("p",[e._v("6.本人同意昆仑健康保险向任何机构、组织和个人就本人任何有关保险事宜、健康及其他情况索取、查询有关资料和证明，并授权昆仑健康保险或任何与昆仑健康保险业务有关的机构或个人用于：1）处理及审核投保单及其他保险事宜；2）提供与该保险有关的服务；3）与本人联络")]),e._v(" "),n("p",[e._v("7.本人已了解昆仑健康保险对留存于公司内本人全部健康、财务及其他个人资料将承担保密义务，除本声明第6条列明的情况外不作他用。本人授权昆仑健康保险对本人进行所需的医疗评估和体格检查，并作为审核本投保申请的依据。")]),e._v(" "),n("p",[e._v("8.本人授权昆仑健康保险、政府监管部门（含政府监管部门授权或指定机构）和本地保险行业协会可以从第三方就保险服务事宜查询、收集与本人相关的信息。在法律允许的范围内，本人同意将本人提供的信息、本人接受昆仑健康保险保险服务产生的信息，用于昆仑健康保险及其因服务必要而委托的第三方，向本人提供服务、开展市场调查与信息数据分析。本人同意上述机构向本人提供的手机号码发送保险服务短信提示。本人知悉昆仑健康保险及其委托的第三方对上述个人信息依法承担保密和信息安全义务。本授权自本单证签署时生效，具有独立法律效力，不受合同成立与否及效力状态变化的影响。")])])}]}},2213:function(e,t,n){var i=n(1667);"string"==typeof i&&(i=[[e.id,i,""]]);n(4)(i,{});i.locals&&(e.exports=i.locals)},2214:function(e,t,n){var i=n(1668);"string"==typeof i&&(i=[[e.id,i,""]]);n(4)(i,{});i.locals&&(e.exports=i.locals)},2343:function(e,t,n){n(2214),n(2213);var i=n(5)(n(1361),n(1964),"data-v-dd5bd17e",null);e.exports=i.exports}});