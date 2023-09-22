"use client";

import { MutableRefObject, useEffect, useRef, useState } from "react";
import test from "../_shaders/bg_shader";
import {
	ShaderSettings,
	ShaderSettingsContext,
	useShaderSettings,
} from "../_hooks/use_shader_settings";
import { ShaderDropdown } from "./shader_dropdown";

function setUniform(ref: MutableRefObject<any>, settings: ShaderSettings) {
	ref.current?.setUniform("u_speed", settings.speed);
	ref.current?.setUniform("u_brightness", settings.brightness);
	ref.current?.setUniform("u_zoom", settings.zoom);
	ref.current?.setUniform("u_thickness_factor", settings.lineThickness);
}

export function Shader() {
	const [shaderSettings, setShaderSettings] = useState({
		speed: 1,
		brightness: 1,
		enabled: 1,
		zoom: 1,
		lineThickness: 1,
	} as ShaderSettings);

	const sandboxRef = useRef<any>(null);

	useEffect(() => {
		const glslCanvas = require("glslCanvas");

		const canvas = document.createElement("canvas");
		canvas.style.width = "100vw";
		canvas.style.height = "100vh";

		sandboxRef.current = new glslCanvas.default(canvas);

		sandboxRef.current.load(test[0]);

		setUniform(sandboxRef, shaderSettings);

		document.getElementById("shader-parent")?.replaceChildren(canvas);
	}, [shaderSettings.enabled]);

	setUniform(sandboxRef, shaderSettings);

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
