"use client"

import { Controller } from "react-hook-form"
import { Label, TextInput } from "flowbite-react"

interface PropsRegularInput {
    defaultValue?: string,
    placeholder?: string,
    type?: string,
    min?: number | null,
    minLength?: number | null,
    max?: number | null,
    maxLength?: number | null,
    labelName?: string,
    isRequired?: boolean,
    isDisabled?: boolean,
    isEditable?: boolean,
    control: any,
    name: string,
    onDataChange?: (e: string) => void,
}

export default function RegularInput({
    // ## Default Props ##
    defaultValue = "",
    placeholder = "input here",
    type = "text",
    min = 0,
    minLength = null,
    max = 0,
    maxLength = null,
    labelName = "",
    isRequired = false,
    isDisabled = false,
    isEditable = false,
    // onDataChange = (e: any) => {},

    // ## React Hook Forms Props ##
    control = null,
    name = "defaultinput",
}: PropsRegularInput) {

    return(
        <>
            <div className="w-full">
                <div>
                    <Controller
                        name={name}
                        control={control}
                        defaultValue={defaultValue}
                        rules={{
                            required: {
                                value: isRequired && !defaultValue,
                                message: "This field is required and cannot be empty",
                            },
                        }}

                        render={({ field, formState }) => {
                            const { onBlur, onChange, value, name } = field;
                            const { dirtyFields, errors } = formState;
                            
                            return(
                                <div className="w-full">
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor={name}
                                            className="mb-2 inline-block flex items-center gap-1 pl-1"
                                        >
                                            <span>{labelName || name}</span>
                                            <span>{isRequired && <sup className="text-red-700">*</sup>}</span>
                                        </Label>
                                    </div>
                                    <div>
                                        <TextInput
                                            id={name}
                                            onBlur={onBlur}
                                            onChange={(e) => {
                                                onChange(e); // Simpan perubahan dari input
                                            }}
                                            value={!value && !dirtyFields[name] ? defaultValue : value}
                                            type={type}
                                            disabled={isDisabled || !isEditable}
                                            min={min || 0}
                                            minLength={minLength || 1}
                                            max={max || undefined}
                                            maxLength={maxLength || undefined}
                                            placeholder={placeholder}
                                            color={
                                                (dirtyFields[name] && value !== defaultValue) ? "warning" :
                                                (dirtyFields[name] && value === defaultValue) ? "gray" :
                                                (errors[name] && isRequired && value === "") ? "warning" :
                                                (errors[name]) ? "failure" :
                                                isDisabled ? "#eeeeee" : "gray"
                                            }
                                            helperText={
                                                <>
                                                    {
                                                        !errors[name] ? "" :
                                                        errors[name]?.message ? (
                                                            <span className={`text-xs italic`}>{errors[name] && typeof errors[name].message === 'string' ? errors[name].message : ""}</span>
                                                        ) : (
                                                            (errors[name] && isRequired && value === "") ? (
                                                                <span className={`text-xs italic`}>This is required.</span>
                                                            ) : null
                                                        )
                                                    }
                                                </>
                                            }
                                        />


                                    </div>
                                </div>
                            )
                        }}
                    />
                </div>
            </div>
        </>
    )
}