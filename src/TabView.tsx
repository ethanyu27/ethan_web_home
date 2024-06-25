import * as React from 'react';

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
    
    React.useEffect(() => {

    }, [selected]);

    const buttons = props.tabs.map((tab, ind) => {
        return (
            <button className="TabView-Tab" onClick={() => setSelected(ind)}>{tab.title}</button>
        );
    })

    return (<div>
        {buttons}
        <div style={{marginTop: `${10 * (props.tabs[selected]?.spacing ?? 0)}px`}}/>
        {props.tabs[selected].component ?? <></>}
    </div>);
}

export default TabView;