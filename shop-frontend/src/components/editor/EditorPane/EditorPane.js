import React, { Component } from 'react';
import styles from './EditorPane.scss';
import classNames from 'classnames/bind';


// CodeMirror 를 위한 CSS 스타일
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';

const cx = classNames.bind(styles);

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

class EditorPane extends Component {

  editor = null;
  codeMirror = null;
  cursor = null;

  initializeEditor = () => {
    this.codeMirror = CodeMirror(this.editor, {
      mode: 'markdown',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true
    });
    this.codeMirror.on('change', this.handleChangeMarkdown);
  }

  componentDidMount() {
    this.initializeEditor();
  }

  handleChange = (e) => {
    const { onChangeInput } = this.props;
    const { name, value } = e.target;
    onChangeInput({name, value});
  }

  handleChangeMarkdown = (doc) => {
    const { onChangeInput } = this.props;
    this.cursor = doc.getCursor();
    onChangeInput({
      name: 'markdown',
      value: doc.getValue()
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.markdown !== this.props.markdown) {
      const { codeMirror, cursor } = this;
      if(!codeMirror) {
        return;
      }
      codeMirror.setValue(this.props.markdown);
      if(!cursor) {
        return;
      }
      codeMirror.setCursor(cursor);
    }
  }

  handleError = () => {
    const { onError } = this.props;
    alert("제목과 내용을 빠짐없이 기록해주세요.");
    onError();
    
  }
  render() {
    const { title, tags, error } = this.props;
    const { handleChange, handleError } = this;
    if(error) {
      handleError();
    }
    return (
      <div className={cx('editor-pane')}>
        <input className={cx('title')} placeholder="제목을 입력하세요" value={title} name="title" onChange={handleChange}/>
        <div className={cx('code-editor')} ref={ref=>this.editor=ref}></div>
      </div>
    );
  }
}

export default EditorPane;