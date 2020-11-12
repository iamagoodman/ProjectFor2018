import React from 'react';
import { Upload, Button } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import style from './index.module.less';

interface Props {
  value?: UploadFile | UploadFile[];
  onChange?: (file: UploadFile | UploadFile[]) => void;
  accept?: string;
  children?: any;
  download?: boolean;
  downloadSrc?: string;
  multiple?: boolean;
}

interface State {
  value: UploadFile[];
}
const getValue = (value: UploadFile | UploadFile[]) => {
  if (value instanceof Array) {
    return value;
  } else {
    return value ? [value] : [];
  }
};

export default class CustomUpload extends React.Component<Props> {
  static defaultProps = {
    multiple: false,
    accept: '.xls,.xlsx'
  };
  static getDerivedStateFromProps(props: Props, state: State) {
    return {
      value: getValue(props.value)
    };
  }
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      value: getValue(props.value)
    };
  }

  handleChange = (value: UploadFile | UploadFile[]) => {
    const props = this.props;
    if (!('value' in props)) {
      this.setState({
        value: getValue(value)
      });
    }
    if (props.onChange) {
      props.onChange(value);
    }
  };
  render() {
    const props = this.props;
    const { value } = this.state;
    const uploadProps = {
      accept: props.accept,
      fileList: value,
      beforeUpload: (file: UploadFile) => {
        return false;
      },
      onRemove: (file: UploadFile) => {
        if (props.multiple) {
          const index = value.indexOf(file);
          const newValue = value.slice();
          newValue.splice(index, 1);
          this.handleChange(newValue);
        } else {
          this.handleChange(undefined);
        }
      },
      onChange: ({ file, fileList }: { file: UploadFile; fileList: UploadFile[] }) => {
        if (fileList.length) {
          this.handleChange(props.multiple ? fileList : file);
        }
      }
    };

    return (
      <div className={style.wrapper}>
        <Upload {...uploadProps}>{props.children || <Button icon='upload'>选择文件</Button>}</Upload>
        {props.download ? (
          <a href={props.downloadSrc} download>
            <Button className={style.download} icon='download'>
              下载模板
            </Button>
          </a>
        ) : null}
      </div>
    );
  }
}
