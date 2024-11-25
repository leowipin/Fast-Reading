export default interface ButtonProps{
    type?: "submit" | "reset" | "button" | undefined;
    label: string;
    onClick?: () => void;
    disabled?: boolean;
};