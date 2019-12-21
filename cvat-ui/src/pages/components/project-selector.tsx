import React from 'react';

import {
    Select,
} from 'antd';

const { Option } = Select;

interface Props {
    value: number;
    projects: any[];
    onChange: (id: number) => void;
}

export default function ProjectSelector(props: Props): JSX.Element {
    const {
        value,
        projects,
        onChange,
    } = props;

    return (
        <Select
            defaultValue={value !== -1 ? value : undefined}
            showSearch
            allowClear
            placeholder='No project'
            optionFilterProp='children'
            style={{ width: 200 }}
            onChange={onChange}
        >
            { projects.map((item): JSX.Element => (
                <Option key={item.id} value={item.id}>
                    { item.name }
                </Option>
            ))}
        </Select>
    );
}
