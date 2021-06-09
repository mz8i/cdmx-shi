import { useCallback } from "react";

export function useFeatureDataValue(variableSpec) {
    return useCallback((x) => x.properties[variableSpec.fullName], [variableSpec]);
}