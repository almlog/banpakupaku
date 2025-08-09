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
export declare type ItineraryUpdateFormInputValues = {
    startTime?: string;
    title?: string;
    description?: string;
    points?: string;
};
export declare type ItineraryUpdateFormValidationValues = {
    startTime?: ValidationFunction<string>;
    title?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    points?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ItineraryUpdateFormOverridesProps = {
    ItineraryUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    startTime?: PrimitiveOverrideProps<TextFieldProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    points?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ItineraryUpdateFormProps = React.PropsWithChildren<{
    overrides?: ItineraryUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    itinerary?: any;
    onSubmit?: (fields: ItineraryUpdateFormInputValues) => ItineraryUpdateFormInputValues;
    onSuccess?: (fields: ItineraryUpdateFormInputValues) => void;
    onError?: (fields: ItineraryUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ItineraryUpdateFormInputValues) => ItineraryUpdateFormInputValues;
    onValidate?: ItineraryUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ItineraryUpdateForm(props: ItineraryUpdateFormProps): React.ReactElement;
