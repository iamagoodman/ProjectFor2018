webpackJsonp([141,150],{42:function(e,t,r){r(48);var i=r(5)(r(45),r(47),null,null);r(49),e.exports=i.exports},45:function(e,t,r){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(182),o=i(a);t.default={name:"x-header",props:{leftOptions:Object,title:String,transition:String,rightOptions:{type:Object,default:function(){return{showMore:!1}}}},beforeMount:function(){this.$slots["overwrite-title"]&&(this.shouldOverWriteTitle=!0)},computed:{_leftOptions:function(){return(0,o.default)({showBack:!0,preventGoBack:!1},this.leftOptions||{})}},methods:{onClickBack:function(){this._leftOptions.preventGoBack?this.$emit("on-click-back"):this.$router?this.$router.back():window.history.back()}},data:function(){return{shouldOverWriteTitle:!1}}}},46:function(e,t,r){t=e.exports=r(3)(),t.push([e.id,'.vux-header{position:relative;padding:3px 0;box-sizing:border-box;background-color:#35495e}.vux-header .vux-header-title{line-height:40px;text-align:center;font-size:18px;font-weight:400;color:#fff}.vux-header-title-area,.vux-header .vux-header-title{margin:0 88px;height:40px;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.vux-header .vux-header-title>span{display:inline-block}.vux-header .vux-header-left,.vux-header .vux-header-right{position:absolute;top:14px;display:block;font-size:14px;line-height:21px;color:#ccc}.vux-header .vux-header-left a,.vux-header .vux-header-left button,.vux-header .vux-header-right a,.vux-header .vux-header-right button{float:left;margin-right:8px;color:#ccc}.vux-header .vux-header-left a:active,.vux-header .vux-header-left button:active,.vux-header .vux-header-right a:active,.vux-header .vux-header-right button:active{opacity:.5}.vux-header .vux-header-left{left:18px}.vux-header .vux-header-left .vux-header-back{padding-left:16px}.vux-header .vux-header-left .left-arrow{position:absolute;width:30px;height:30px;top:-5px;left:-5px}.vux-header .vux-header-left .left-arrow:before{content:"";position:absolute;width:12px;height:12px;border:1px solid #ccc;border-width:1px 0 0 1px;transform:rotate(315deg);top:8px;left:7px}.vux-header .vux-header-right{right:15px}.vux-header .vux-header-right a,.vux-header .vux-header-right button{margin-left:8px;margin-right:0}.vux-header .vux-header-right .vux-header-more:after{content:"\\2022   \\2022   \\2022   ";font-size:16px}.vux-header-fade-in-right-enter-active{animation:fadeinR .5s}.vux-header-fade-in-left-enter-active{animation:fadeinL .5s}@keyframes fadeinR{0%{opacity:0;transform:translateX(150px)}to{opacity:1;transform:translateX(0)}}@keyframes fadeinL{0%{opacity:0;transform:translateX(-150px)}to{opacity:1;transform:translateX(0)}}',""])},47:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"vux-header"},[r("div",{staticClass:"vux-header-left"},[e._t("overwrite-left",[r("transition",{attrs:{name:e.transition}},[r("a",{directives:[{name:"show",rawName:"v-show",value:e._leftOptions.showBack,expression:"_leftOptions.showBack"}],staticClass:"vux-header-back",on:{click:[function(t){if(!("button"in t)&&e._k(t.keyCode,"preventDefault",void 0,t.key,void 0))return null},e.onClickBack]}},[e._v(e._s("undefined"==typeof e._leftOptions.backText?"返回":e._leftOptions.backText))])]),e._v(" "),r("transition",{attrs:{name:e.transition}},[r("div",{directives:[{name:"show",rawName:"v-show",value:e._leftOptions.showBack,expression:"_leftOptions.showBack"}],staticClass:"left-arrow",on:{click:e.onClickBack}})])]),e._v(" "),e._t("left")],2),e._v(" "),e.shouldOverWriteTitle?e._e():r("h1",{staticClass:"vux-header-title",on:{click:function(t){e.$emit("on-click-title")}}},[e._t("default",[r("transition",{attrs:{name:e.transition}},[r("span",{directives:[{name:"show",rawName:"v-show",value:e.title,expression:"title"}]},[e._v(e._s(e.title))])])])],2),e._v(" "),e.shouldOverWriteTitle?r("div",{staticClass:"vux-header-title-area"},[e._t("overwrite-title")],2):e._e(),e._v(" "),r("div",{staticClass:"vux-header-right"},[e.rightOptions.showMore?r("a",{staticClass:"vux-header-more",on:{click:[function(t){if(!("button"in t)&&e._k(t.keyCode,"preventDefault",void 0,t.key,void 0))return null},function(t){e.$emit("on-click-more")}]}}):e._e(),e._v(" "),e._t("right")],2)])},staticRenderFns:[]}},48:function(e,t,r){var i=r(46);"string"==typeof i&&(i=[[e.id,i,""]]);r(4)(i,{});i.locals&&(e.exports=i.locals)},49:function(e,t){},1302:function(e,t,r){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=r(42),o=i(a);t.default={components:{XHeader:o.default}}},1538:function(e,t,r){t=e.exports=r(3)(),t.push([e.id,".vux-header{padding:0!important;background-color:#409d27!important}.vux-header .vux-header-title{font-size:14px!important}.vux-header .vux-header-left .left-arrow{top:-8px!important}.vux-header .vux-header-right{top:10px!important}",""])},1539:function(e,t,r){t=e.exports=r(3)(),t.push([e.id,"",""])},1896:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("x-header",{attrs:{"left-options":{backText:"",preventGoBack:!0}}},[e._v("短信验证"),r("a",{attrs:{slot:"right"},slot:"right"})]),e._v(" "),e._m(0)],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticStyle:{display:"flex",margin:"3rem 10%"}},[r("i",{staticClass:"iconfont icon-wenxintishi",staticStyle:{"font-size":"2.5rem",color:"#409D27"}}),e._v(" "),r("span",{staticStyle:{"margin-left":"1rem"}},[e._v("该投保链接已失效，请联系您的业务员，谢谢。")])])}]}},2084:function(e,t,r){var i=r(1538);"string"==typeof i&&(i=[[e.id,i,""]]);r(4)(i,{});i.locals&&(e.exports=i.locals)},2085:function(e,t,r){var i=r(1539);"string"==typeof i&&(i=[[e.id,i,""]]);r(4)(i,{});i.locals&&(e.exports=i.locals)},2284:function(e,t,r){r(2085),r(2084);var i=r(5)(r(1302),r(1896),"data-v-4376e0c5",null);e.exports=i.exports}});