import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types'
import { LoadingOutlined } from '@ant-design/icons';

const Icon = <LoadingOutlined style={{ fontSize: 35 }} spin />

const Loading = (props) => {
    return (
        <div hidden={props.hidden} className={`loading text-center cover-inline`}>
            <Spin indicator={Icon} />
        </div>
    )
}


export default Loading
