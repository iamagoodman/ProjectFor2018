import React from 'react';

export default class Editor extends React.Component {
  componentDidMount() {
    const props = this.props;
    this.initEditor();
  }
  componentWillUnmount() {
    if (this.ueEditor) {
      UE.delEditor('editor');
    }
    window.ueEditor = null;
    // this.props.onBack();
  }
  initEditor() {
    const props = this.props;
    window.ueEditor = this.ueEditor = UE.getEditor('editor', {
      lang: 'zh-cn',
      toolbars: [
        [
          'source',
          '|',
          'undo',
          'redo',
          '|',
          'bold',
          'italic',
          'underline',
          'fontborder',
          'strikethrough',
          '|',
          'forecolor',
          'backcolor',
          'insertorderedlist',
          'insertunorderedlist',
          '|',
          'lineheight',
          '|',
          'customstyle',
          'paragraph',
          'fontsize',
          '|',
          'justifyleft',
          'justifycenter',
          'justifyright',
          'justifyjustify',
          '|',
          // 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
          'simpleupload',
          '|',
          'horizontal',
          '|',
          'inserttable',
          'upload'
        ]
      ],
      allowDivTransToP: false,
      insertorderedlist: {
        decimal: '', //'1,2,3...'
        'lower-alpha': '', // 'a,b,c...'
        'lower-roman': '', //'i,ii,iii...'
        'upper-alpha': '', //'A,B,C'
        'upper-roman': '' //'I,II,III...'
      },
      insertunorderedlist: {
        //自定的样式
        circle: '', // '○ 小圆圈'
        disc: '', // '● 小圆点'
        square: '' //'■ 小方块'
      },
      filterTxtRules: (function() {
        function transP(node) {
          node.tagName = 'p';
          node.setStyle();
        }
        return {
          //直接删除及其字节点内容
          '-': 'object iframe embed select',
          p: { $: {} },
          br: { $: {} },
          div: { $: {} },
          li: { $: {} },
          caption: transP,
          th: transP,
          tr: transP,
          h1: transP,
          h2: transP,
          h3: transP,
          h4: transP,
          h5: transP,
          h6: transP,
          td: function(node) {
            //没有内容的td直接删掉
            var txt = !!node.innerText();
            if (txt) {
              node.parentNode.insertAfter(UE.uNode.createText(' &nbsp; &nbsp;'), node);
            }
            node.parentNode.removeChild(node, node.innerText());
          }
        };
      })()
    });
    const self = this;
    this.ueEditor.ready(ueditor => {
      if (!ueditor) {
        UE.delEditor('editor');
        self.initEditor();
      }
      const content = (props.content || '')
        .replace(/<!DOCTYPE html><html><head>([\s\S]*)<\/head><body>([\s\S]*)<\/body>([\s\S]*)<\/html>/, '$1$2$3')
        .replace(/\n|<!--!doctype-->/, '');
      self.ueEditor.setContent(content);
    });
  }

  render() {
    return (
      <div>
        <script id='editor' name='content' type='text/plain' style={{ height: 800 }}></script>
      </div>
    );
  }
}
