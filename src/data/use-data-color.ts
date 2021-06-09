import { useCallback } from "react"
import { COLOR_SCALES } from "../config/color-scales";

export function useDataColor(variableSpec) {
    return useCallback((d) => COLOR_SCALES[variableSpec.variable](d), [variableSpec]);
}

export function useFeatureDataColor(variableSpec) {
    return useCallback((f) => COLOR_SCALES[variableSpec.variable](f.properties[variableSpec.fullName]), [variableSpec])
}