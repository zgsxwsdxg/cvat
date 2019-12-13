import React from 'react';

import {
    Select,
} from 'antd';

const { Option } = Select;

interface Props {
    value: string | null;
    projects: any[];
    onChange: (project: string) => void;
}

export default function ProjectSelector(props: Props): JSX.Element {
    const {
        value,
        projects,
        onChange,
    } = props;

    return (
        <Select
            defaultValue={value || '—'}
            size='small'
            showSearch
            className='cvat-project-selector'
            onChange={onChange}
        >

            <Option key='-1' value='—'>—</Option>
            { projects.map((item): JSX.Element => (
                <Option key={item.id} value={`#${item.id}: ${item.name}`}>
                    {`#${item.id}: ${item.name}`}
                </Option>
            ))}
        </Select>

    );
}
