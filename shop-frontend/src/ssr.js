import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter, matchPath} from 'react-router';
import {Provider} from 'react-redux';
import configure from 'store/configure';
import App from 'components/App';
import routes from './routes';
import axios from 'axios';
import transit from 'transit-immutable-js';


const preloadedState = window.__PRELOADED_STATE__ && transit.fromJSON(window.__PRELOADED_STATE__);
const store = configure(preloadedState);

const render = async (ctx) => {
    const {url, origin} = ctx;

    axios.defaults.baseURL = origin;


    
    const promises = [];


    routes.forEach(
        route => {
          const match = matchPath(url, route);
          if(!match) return; // 일치하지 않으면 무시
          // match 가 성공하면, 해당 라우트의 컴포넌트의 preload 를 호출
          // 그리고, 파싱된 params 를 preload 함수에 전달
          const { component } = route;
          const { preload } = component;
          if(!preload) return; // preload 없으면 무시
          const { params } = match; // Route 의 props 로 받는 match 와 동일한 객체
          // preload 를 통해 얻은 프로미스를 promises 배열에 등록
          const promise = preload(store.dispatch, params);
          promises.push(promise);
        }
      );

      try {
        // 등록된 모든 프로미스를 기다립니다.
        await Promise.all(promises);
      } catch (e) {
    
      }

    const html = ReactDOMServer.renderToString(
        <Provider store={store}>
            <StaticRouter location={url}>
                <App/>
            </StaticRouter>
        </Provider>
    )

    const preloadedState = JSON.stringify(transit.toJSON(store.getState()))
                            .replace(/</g, '\\u003c');

    return {html, preloadedState};
};

export default render;