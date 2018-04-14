import React, {Component} from 'react';
import styles from './MarkdownRender.scss';
import classNames from 'classnames/bind';
import marked from 'marked';
import 'prismjs/themes/prism-okaidia.css';
// 지원 할 코드 형식들을 불러옵니다
// http://prismjs.com/#languages-list 참조

const cx = classNames.bind(styles);

let Prism = null;
const isBrowser = process.env.APP_ENV === 'browser';
if(isBrowser) {
  Prism = require('prismjs');
  require('prismjs/components/prism-bash.min.js');
  require('prismjs/components/prism-javascript.min.js');
  require('prismjs/components/prism-jsx.min.js');
  require('prismjs/components/prism-css.min.js');
}


class MarkdownRender extends Component {

  state = {
    html: ''
  }

  renderMarkdown = () => {
    const { markdown } = this.props;
    if(!markdown) {
      this.setState({html: ''});
      return;
    }
    this.setState({
      html: marked(markdown, {
        breaks: true,
        sanitize: true
      })
    })
  }

  componentWillMount() {
    this.renderMarkdown();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.markdown !== this.props.markdown) {
      this.renderMarkdown();
    }
    if(prevState.html !== this.state.html) {
      Prism.highlightAll();
    }
  }
  render() {
    const { html } = this.state;
    const markup = {
      __html: html
    };
    return (
      <div className={cx('markdown-render')} dangerouslySetInnerHTML={markup}/>
    );
  }
}

export default MarkdownRender;