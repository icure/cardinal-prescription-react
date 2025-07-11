import React from 'react';

type ButtonViewType = 'primary' | 'withSpinner' | 'outlined';
interface Props$1 extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    view?: ButtonViewType;
    type?: 'button' | 'reset' | 'submit';
    form?: string;
    disabled?: boolean;
    handleClick?: () => void;
}
declare const Button: React.FC<Props$1>;

interface RadioOption {
    label: string;
    value: boolean;
    id: string;
}
interface RadioInputProps {
    label: string;
    name: string;
    options: RadioOption[];
    required?: boolean;
    errorMessage?: string;
    onChange?: (value: boolean) => void;
}
declare const RadioInput: React.FC<RadioInputProps>;

interface SelectOption {
    value: string | null;
    label: string;
}
interface SelectInputProps {
    label: string;
    id: string;
    required?: boolean;
    disabled?: boolean;
    options: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
    errorMessage?: string;
}
declare const SelectInput: React.FC<SelectInputProps>;

interface TextareaInputProps {
    label: string;
    id?: string;
    required?: boolean;
    disabled?: boolean;
    value?: string;
    onChange?: (value: string) => void;
    errorMessage?: string;
}
declare const TextareaInput: React.FC<TextareaInputProps>;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    required?: boolean;
    disabled?: boolean;
    errorMessage?: string;
    autoFocus?: boolean;
}
declare const TextInput: React.FC<Props>;

interface ToggleSwitchProps {
    id: string;
    value: string;
    checked: boolean;
    label?: string;
    onChange?: (checked: boolean) => void;
}
declare const ToggleSwitch: React.FC<ToggleSwitchProps>;

export { Button, type ButtonViewType, RadioInput, type RadioOption, SelectInput, type SelectOption, TextInput, TextareaInput, ToggleSwitch };
