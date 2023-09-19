"use client";

import { useEffect } from "react";
import test from "../_shaders/bg_shader";
const glslCanvas = require("glslCanvas");

export function Shader() {
	useEffect(() => {
		const canvas = document.createElement("canvas");
		canvas.style.width = "100vw";
		canvas.style.height = "100vh";

		const sandbox = new glslCanvas.default(canvas);

		sandbox.load(test[0]);

		document.getElementById("shader-parent")?.replaceChildren(canvas);
	}, []);

	return (
		<div
			id="shader-parent"
			className="bg-transparent fixed top-0 left-0 -z-10"
		></div>
	);
}
