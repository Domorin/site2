"use client";

import { MutableRefObject, useEffect, useRef, useState } from "react";
import test from "../_shaders/bg_shader";
import {
	ShaderSettings,
	ShaderSettingsContext,
	useShaderSettings,
} from "../_hooks/use_shader_settings";
import { ShaderDropdown } from "./shader_dropdown";
import { getGPUTier } from "detect-gpu";
import Image from "next/image";

function setUniform(ref: MutableRefObject<any>, settings: ShaderSettings) {
	ref.current?.setUniform("u_speed", settings.speed);
	ref.current?.setUniform("u_brightness", settings.brightness);
	ref.current?.setUniform("u_zoom", settings.zoom);
	ref.current?.setUniform("u_thickness_factor", settings.lineThickness);
}

function hasWebGLSupport() {
	try {
		var canvas = document.createElement("canvas");
		return (
			!!window.WebGLRenderingContext &&
			(canvas.getContext("webgl") ||
				canvas.getContext("experimental-webgl"))
		);
	} catch (e) {
		return false;
	}
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
	const hasInitialUseEffectRun = useRef(false);

	useEffect(() => {
		if (!shaderSettings.enabled) {
			return;
		}

		if (!hasWebGLSupport()) {
			setShaderSettings((prev) => ({ ...prev, enabled: 0 }));
			return;
		}

		getGPUTier()
			.then((val) => {
				console.log(val);
				// If this is not in the initial useEffect, user is opting in to enable the shader; let them
				if (val.tier < 2 && !hasInitialUseEffectRun.current) {
					console.log("Hello?");
					setShaderSettings((prev) => ({ ...prev, enabled: 0 }));
					return;
				}

				const glslCanvas = require("glslCanvas");

				const canvas = document.createElement("canvas");
				canvas.style.width = "100vw";
				canvas.style.height = "100vh";

				sandboxRef.current = new glslCanvas.default(canvas);

				sandboxRef.current.load(test[0]);

				setUniform(sandboxRef, shaderSettings);

				document
					.getElementById("shader-parent")
					?.replaceChildren(canvas);
			})
			.finally(() => (hasInitialUseEffectRun.current = true));
	}, [shaderSettings.enabled]);

	setUniform(sandboxRef, shaderSettings);

	console.log(Boolean(shaderSettings.enabled));

	return (
		<>
			<ShaderSettingsContext.Provider
				value={{
					shaderSettings: shaderSettings,
					setShaderSettings: setShaderSettings,
				}}
			>
				<ShaderDropdown />
				{Boolean(shaderSettings.enabled) ? (
					<div
						id="shader-parent"
						className="bg-transparent fixed top-0 left-0 -z-10"
					></div>
				) : (
					<div className="fixed top-0 left-0 -z-10 min-w-[1920px] min-h-[1080px]">
						<Image
							src="/shader_bg.png"
							layout="fill"
							alt="Still image of background shader"
						/>
					</div>
				)}
			</ShaderSettingsContext.Provider>
		</>
	);
}
