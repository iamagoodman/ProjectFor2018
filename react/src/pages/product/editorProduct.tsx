import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Button } from 'antd';
import Back from '@/components/back';
import Editor from './components/editor';
import { HTML } from '@/constans';
import { ProductEditor, SetKey } from '@/types';
import { RootState } from '@/stores/reducers';
import { doSetProductShowKey, doUpdateProductHtml } from '@/stores/actions';

const FormItem = Form.Item;

interface Props extends ProductEditor {
  onModify: (data: any) => void;
  onBack: (data: SetKey) => void;
}

class EditorProduct extends React.Component<Props> {
  handleSubmit = () => {
    const props = this.props;
    const h5Source = this.setHtml();
    const newData: ProductEditor & { dataType: string } = {
      id: props.id,
      h5Sourse: h5Source,
      dataType: 'formData'
    };

    props.onModify(newData);
  };
  setHtml = () => {
    const content = window.ueEditor ? window.ueEditor.getContent() : '';
    const metaRe = /<meta [\s\S]*?>/g,
      linkRe = /<link [\s\S]*?>/g,
      scriptRe = /<script[^>]*>[^<>]*<\/script>/g;
    // bodyRe = /<body[^>]*>(.*)<\/body>/;
    const metas = content.match(metaRe) || [];
    const links = content.match(linkRe) || [];
    const scripts = content.match(scriptRe) || [];
    const newContent = content
      .replace(metaRe, '')
      .replace(scriptRe, '')
      .replace(linkRe, '')
      .replace(/&nbsp;|\n|<!--!doctype-->/g, '');
    return HTML.replace('{%meta%}', metas.join(''))
      .replace('{%link%}', links.join(''))
      .replace('{%script%}', scripts.join(''))
      .replace('{%content%}', newContent);
  };
  render() {
    const props = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    };
    const items = [
      {
        name: 'productManage',
        displayName: '产品管理',
        onBack: () => {
          props.onBack({ show: 'list', key: 'editor', data: {} });
        }
      },
      {
        name: 'product',
        displayName: `修改产品H5`
      }
    ];
    return (
      <div>
        <Back items={items} />
        <Form className='operate-wrapper'>
          <FormItem {...formItemLayout} label='产品H5' colon={false} className='editor-item'>
            <Editor content={props.h5Sourse} />
          </FormItem>
          <FormItem {...formItemLayout} label='&emsp;' colon={false}>
            <Button type='primary' onClick={this.handleSubmit}>
              提交
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  ...state.product.editor
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onModify: (data: any) => doUpdateProductHtml.request(data),
      onBack: (data: SetKey) => doSetProductShowKey(data)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EditorProduct);
