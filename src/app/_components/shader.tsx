"use client";

import { useEffect, useRef, useState } from "react";
import test from "../_shaders/bg_shader";
import {
	ShaderSettings,
	ShaderSettingsContext,
	useShaderSettings,
} from "../_hooks/use_shader_settings";
import { ShaderDropdown } from "./shader_dropdown";
const glslCanvas = require("glslCanvas");

export function Shader() {
	const [shaderSettings, setShaderSettings] = useState({
		speed: 1,
		brightness: 1,
		enabled: 1,
		zoom: 1,
	} as ShaderSettings);

	const sandboxRef = useRef<any>(null);

	useEffect(() => {
		const canvas = document.createElement("canvas");
		canvas.style.width = "100vw";
		canvas.style.height = "100vh";

		sandboxRef.current = new glslCanvas.default(canvas);

		sandboxRef.current.load(test[0]);

		sandboxRef.current?.setUniform("u_speed", shaderSettings.speed);
		sandboxRef.current?.setUniform(
			"u_brightness",
			shaderSettings.brightness
		);
		sandboxRef.current?.setUniform("u_zoom", shaderSettings.zoom);

		document.getElementById("shader-parent")?.replaceChildren(canvas);
	}, [shaderSettings.enabled]);

	console.log(sandboxRef.current, shaderSettings.speed);

	sandboxRef.current?.setUniform("u_speed", shaderSettings.speed);
	sandboxRef.current?.setUniform("u_brightness", shaderSettings.brightness);
	sandboxRef.current?.setUniform("u_zoom", shaderSettings.zoom);

	return (
		<>
			<ShaderSettingsContext.Provider
				value={{
					shaderSettings: shaderSettings,
					setShaderSettings: setShaderSettings,
				}}
			>
				<ShaderDropdown />
				{Boolean(shaderSettings.enabled) && (
					<div
						id="shader-parent"
						className="bg-transparent fixed top-0 left-0 -z-10"
					></div>
				)}
			</ShaderSettingsContext.Provider>
		</>
	);
}
