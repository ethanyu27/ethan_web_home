import React from 'react';
import Slider from '@mui/material/Slider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './ColorGuesser.css';

interface ColorOpt {
    label: string;
    hexStr: string;
}

export const Colors: Record<string, ColorOpt> = {
    'red': {
        label: 'Red',
        hexStr: '#FF0000'
    },
    'green': {
        label: 'Green',
        hexStr: '#00FF00'
    },
    'blue': {
        label: 'Blue',
        hexStr: '#0000FF'
    }
}

export interface ColorPickerProps {
    onChange: (value: number) => void;
    color: ColorOpt;
    readOnly: boolean;
}

export function ColorPicker(props: ColorPickerProps) {
    const [value, setValue] = React.useState<number>(0);

    React.useEffect(() => {
        props.onChange(value);
    }, [value]);

    const theme = React.useMemo(() => createTheme({
        palette: {
            primary: {
                main: props.color.hexStr
            },
        }}),
        [props.color]
    )

    function onSliderChange(event: Event, newValue: number) {
        setValue(newValue);
    }

    const onInputChange = (event: any) => {
        const newValue = event.target.value;
        if (!isNaN(newValue) && (value >= 0 && newValue <= 255))
            setValue(newValue);
    }

    const onInputBlur = (event: any) => {
        if (!event.target.value)
            setValue(0);
    }

    return (
        <div style={{width:"500px"}}>
            <label className='ColorPickerLabel'>
                {props.color.label}
            </label>
            <div className='InlineRow'>
                <ThemeProvider theme={theme}>
                    <Slider
                        value={value}
                        onChange={onSliderChange}
                        min={0}
                        max={255}
                        step={1}
                        valueLabelDisplay='auto'
                        disabled={props.readOnly}
                    />
                </ThemeProvider>
                <input
                    className='ColorPickerInput'
                    value={value}
                    onChange={onInputChange}
                    onBlur={onInputBlur}
                    disabled={props.readOnly}
                />
            </div>
        </div>
    );
}