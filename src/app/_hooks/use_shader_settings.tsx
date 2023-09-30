import { createContext, useContext } from "react";

export type ShaderSettings = {
	speed: number;
	brightness: number;
	zoom: number;
	enabled: number;
	lineThickness: number;
	isPaused: boolean;
};

export const ShaderSettingsContext = createContext({
	shaderSettings: { speed: 1, brightness: 1 } as ShaderSettings,
	setShaderSettings: (settings: ShaderSettings) => {},
});

export function useShaderSettings() {
	return useContext(ShaderSettingsContext);
}
