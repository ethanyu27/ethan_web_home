import * as React from 'react';
import './App.css';

export interface Tab {
    title: string;
    component: React.ReactNode;
    spacing?: number;
}
 
export interface TabViewProps {
    tabs: Tab[];
    defaultSelected?: number;
}

export function TabView(props: TabViewProps) {

    const [selected, setSelected] = React.useState<number>(props.defaultSelected ?? 0);

    const buttons = props.tabs.map((tab, ind) => {
        return (<button 
            className={`TabView-Tab${selected === ind ? '-Selected' : ''}`}
            onClick={() => setSelected(ind)}>{tab.title}
        </button>);
    });

    return (
    <div className={'TabView-Tab-Bar'}>
        {buttons}
        <div style={{marginTop: `${10 * (props.tabs[selected]?.spacing ?? 0)}px`}}/>
        <div className={'TabView-Content'}>
            {props.tabs[selected].component ?? <></>}
        </div>
       
    </div>);
}

export default TabView;