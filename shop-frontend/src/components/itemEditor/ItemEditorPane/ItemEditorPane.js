import React, {Component} from 'react';
import styles from './ItemEditorPane.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';
import axios from 'axios';


// CodeMirror 를 위한 CSS 스타일
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';

import ItemEditorWrapper from 'components/itemEditor/ItemEditorWrapper';
import {withRouter} from 'react-router-dom';

const cx = classNames.bind(styles);

if (typeof window === 'undefined') {
  global.window = {}
}
let CodeMirror = null;
const isBrowser = process.env.APP_ENV === 'browser';
if(isBrowser) {
  CodeMirror = require('codemirror');
  require('codemirror/mode/markdown/markdown');
  require('codemirror/mode/javascript/javascript');
  require('codemirror/mode/jsx/jsx');
  require('codemirror/mode/css/css');
  require('codemirror/mode/shell/shell');
  
}


const $ = window.$;

class ItemEditorPane extends Component {

  content = null;
  codeMirror = null;
  cursor = null;

  imageIndex = -1;

  state = {
    selectedFile: null,
    imageNames: []
  }

  initializeEditor = () => {
    this.codeMirror = CodeMirror(this.content, {
      mode: 'markdown',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true
    });
    this
      .codeMirror
      .on('change', this.handleChangeMarkdown);
  }
  componentDidMount() {
    this.initializeEditor();
  }

  handleChangeInput = (e) => {
    const {name, value} = e.target;
    const {onChangeInput} = this.props;
    onChangeInput({name, value});
  }

  handleFileChange = async(e) => {
    const {files} = e.target;
    try {
      await this.setState({selectedFile: files[0]});

      const fd = new FormData();
      fd.append('file', this.state.selectedFile);
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      await axios
        .post(`/api/item/image`, fd, config)
        .then((res) => {
          console.log(res.data.imageName);
          this.setState({
            imageNames: this
              .state
              .imageNames
              .concat(res.data.imageName)
          });
          this.imageIndex += 1;
        });

      await axios.get(`/api/images?${this.state.imageNames[this.imageIndex]}`);
      $("#file-viewer").append(`<img src="/images/${this.state.imageNames[this.imageIndex]}"/>`);
    } catch (e) {
      console.log(e);
    }

  }

  handleChangeMarkdown = (doc) => {
    const {onChangeInput} = this.props;
    this.cursor = doc.getCursor();
    onChangeInput({
      name: 'markdown',
      value: doc.getValue()
    });
  }

  handleSubmit = async() => {
    const {title, markdown, price, history} = this.props;
    const { imageNames } = this.state;
    let images = "";
    for (let imageName of imageNames){
      images += imageName + ",";
    }
    try {
      await axios.post(`/api/item`, {title, markdown, price, images}).then(
        (res) => {
          history.push(`/item/${res.data._id}`);
        }
      )
      
    } catch (e) {
      console.log(e);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.markdown !== this.props.markdown) {
      const {codeMirror, cursor} = this;
      if (!codeMirror) 
        return;
      codeMirror.setValue(this.props.markdown);
      if (!cursor) 
        return;
      codeMirror.setCursor(cursor);
    }
  }

  handleBack = async() => {
    const {history} = this.props;
    history.goBack();
  }
  render() {
    const {handleFileChange, handleChangeInput, handleBack, handleSubmit} = this;
    const {title, markdown, price} = this.props;
    return (
      <ItemEditorWrapper onGoBack={handleBack} onSubmit={handleSubmit}>
        <div className={cx('item-editor-pane')}>
          <input
            type="text"
            name="title"
            className={cx('title')}
            placeholder="상품 제목을 입력해주세요."
            value={title}
            onChange={handleChangeInput}></input>
          <div className={cx('content')} ref={ref => this.content = ref}></div>
          <div className={cx('detail-wrapper')}>
            <input
              type="text"
              name="price"
              className={cx('price')}
              placeholder="가격을 입력해주세요."
              value={price}
              onChange={handleChangeInput}></input>
            <div className={cx('file-wrapper')}>
              <input
                type="file"
                style={{
                display: 'none'
              }}
                ref={ref => this.imageUploader = ref}
                onChange={handleFileChange}/>
              <Button
                onClick={() => {
                this
                  .imageUploader
                  .click()
              }}
                theme="gray">이미지 추가하기</Button>
              <div id="file-viewer" className={cx('file-viewer')}></div>
            </div>
          </div>
          <button
            style={{
            display: 'none'
          }}
            ref={ref => this.submitButton = ref}
            onClick={() => {
            alert('hi')
          }}>Gray Button</button>
        </div>
      </ItemEditorWrapper>
    )
  }
}

export default withRouter(ItemEditorPane);