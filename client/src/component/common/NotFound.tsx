/**
 * Created by xiaoduan on 2016/11/15.
 */

import * as React from 'react';
import {Link} from 'react-router';
import 'css/errorPage.less';
export default class NotFound extends React.Component<void,void>{
    private   basCls=`Error-Page`;
    render(){
        return(
            <div className={this.basCls}>
            <section>
                <div className={`${this.basCls}-container`}>

                    <section className="error-wrapper text-center">
                        <h1><img alt="" src="common/libs/images/404-error.png"/></h1>
                        <h2>抱歉！页面无法访问……</h2>
                        <p>可能因为：</p>
                        <h3>网址有错误>请检查地址是否完整或存在多余字符</h3>
                        <Link to='user-login' className="back-btn">Back To Login</Link>
                    </section>

                </div>
            </section>
            </div>
        )
    }
}