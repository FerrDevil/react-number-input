
export interface INumberInput{
    min?: number,
    max?: number,
    defaultNumber?: number,
    onChange?: (value: number) => void
}

export interface INumberInputGroup{
    numberInputsParams: INumberInput[] | number,
    onChange?: (value: number[]) => void
}

