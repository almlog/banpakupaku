/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ItineraryCreateFormInputValues = {
    startTime?: string;
    title?: string;
    description?: string;
    points?: string;
};
export declare type ItineraryCreateFormValidationValues = {
    startTime?: ValidationFunction<string>;
    title?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    points?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ItineraryCreateFormOverridesProps = {
    ItineraryCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    startTime?: PrimitiveOverrideProps<TextFieldProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    points?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ItineraryCreateFormProps = React.PropsWithChildren<{
    overrides?: ItineraryCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ItineraryCreateFormInputValues) => ItineraryCreateFormInputValues;
    onSuccess?: (fields: ItineraryCreateFormInputValues) => void;
    onError?: (fields: ItineraryCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ItineraryCreateFormInputValues) => ItineraryCreateFormInputValues;
    onValidate?: ItineraryCreateFormValidationValues;
} & React.CSSProperties>;
export default function ItineraryCreateForm(props: ItineraryCreateFormProps): React.ReactElement;
