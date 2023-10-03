"use client";

import { MutableRefObject, useEffect, useRef } from "react";
import { ShaderSettings } from "../_hooks/use_shader_settings";
import vertex from "../_shaders/vertex_shader";
import fragment from "../_shaders/bg_shader";
import planeFragment from "../_shaders/plane_fragment";
import * as THREE from "three";

function setUniform(ref: MutableRefObject<any>, settings: ShaderSettings) {
	ref.current?.setUniform("u_speed", settings.speed);
	ref.current?.setUniform("u_brightness", settings.brightness);
	ref.current?.setUniform("u_zoom", settings.zoom);
	ref.current?.setUniform("u_thickness_factor", settings.lineThickness);
}

const QualityToRes: Record<number, [number, number]> = {
	1: [1920, 1080],
	2: [1600, 900],
	3: [1280, 720],
	4: [960, 540],
	5: [640, 360],
};

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

function ceilPowerOf2(value: number) {
	return Math.pow(2, Math.ceil(Math.log(value) / Math.log(2)));
}

const desiredDelta = 1 / 30;

export function Shader() {
	useEffect(() => {
		const uniforms = {
			u_time: { type: "f", value: 1.0 },
			u_resolution: {
				type: "v2",
				value: new THREE.Vector2(window.innerWidth, window.innerHeight),
			},
			u_mouse: {
				type: "v2",
				value: new THREE.Vector2(0, 0),
			},
		};
		const renderer = new THREE.WebGLRenderer({
			antialias: true,
		});
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);

		const camera = new THREE.OrthographicCamera(
			0,
			window.innerWidth,
			0,
			window.innerHeight,
			1,
			1000
		);
		camera.position.set(0, 0, 100);
		camera.lookAt(0, 0, 0);

		const scene = new THREE.Scene();

		// const material = new THREE.LineBasicMaterial({
		// 	color: 0x0000ff,
		// });

		const lineMaterial = new THREE.ShaderMaterial({
			uniforms,
			vertexShader: vertex[0],
			fragmentShader: fragment[0],
			transparent: true,
			// color: new THREE.Color(0xffffff),
		});

		const planeMaterial = new THREE.ShaderMaterial({
			uniforms,
			vertexShader: vertex[0],
			fragmentShader: planeFragment[0],
			transparent: true,
			side: THREE.DoubleSide,
			blending: THREE.MultiplyBlending,
			// color: new THREE.Color(0xffffff),
		});

		let points: Array<THREE.Vector2> = [];

		let lines: Array<THREE.BufferGeometry> = [];
		const planeCoordsMap: Record<string, THREE.Vector2> = {};
		const seedsMap: Record<string, number> = {};

		let vertexSeeds: Array<number> = [];
		let opacitySeeds: Array<number> = [];
		const allOpacitySeeds: Array<number> = [];

		const step = 100;

		let xCoord = 0;
		for (let x = 0; x < window.innerWidth; x += step) {
			let yCoord = 0;
			for (let y = 0; y < window.innerHeight; y += step) {
				// if (Math.random() < 0.75) {
				// 	continue;
				// }

				const newPoints: Array<THREE.Vector2> = [];

				newPoints.push(new THREE.Vector2(x, y));
				newPoints.push(new THREE.Vector2(x + step, y));
				newPoints.push(new THREE.Vector2(x, y + step));
				newPoints.push(new THREE.Vector2(x, y));
				newPoints.push(new THREE.Vector2(x + step, y + step));

				for (let point of newPoints) {
					const key = `${point.x},${point.y}`;
					planeCoordsMap[key] = point;

					const existingSeed = seedsMap[key];
					if (!existingSeed) {
						console.log(existingSeed);
						seedsMap[key] = Math.random();
					}
					vertexSeeds.push(seedsMap[key]);

					const opacitySeed = Math.random();
					opacitySeeds.push(opacitySeed);
					allOpacitySeeds.push(opacitySeed);
				}

				points.push(...newPoints);

				yCoord++;
			}

			const geometry = new THREE.BufferGeometry().setFromPoints(points);
			geometry.setAttribute(
				"line_seed",
				new THREE.Float32BufferAttribute(opacitySeeds, 1)
			);

			geometry.setAttribute(
				"a_seed",
				new THREE.Float32BufferAttribute(vertexSeeds, 1)
			);
			lines.push(geometry);
			points = [];
			vertexSeeds = [];
			opacitySeeds = [];

			xCoord++;
		}

		for (let geometry of lines) {
			const line = new THREE.Line(geometry, lineMaterial);
			scene.add(line);
		}

		for (const circleCoord of Object.values(planeCoordsMap)) {
			const geometry = new THREE.PlaneGeometry(10, 10);

			const seed = seedsMap[`${circleCoord.x},${circleCoord.y}`];
			geometry.setAttribute(
				"a_seed",
				new THREE.Float32BufferAttribute([seed, seed, seed, seed], 1)
			);
			geometry.setAttribute(
				"line_seed",
				new THREE.Float32BufferAttribute([seed, seed, seed, seed], 1)
			);
			const plane = new THREE.Mesh(geometry, planeMaterial);
			plane.position.set(circleCoord.x, circleCoord.y, 0);
			scene.add(plane);
		}

		renderer.render(scene, camera);

		document
			.getElementById("shader-parent")
			?.replaceChildren(renderer.domElement);

		function animate() {
			requestAnimationFrame(animate);
			render();
		}

		function onMouseMove(e: MouseEvent) {
			uniforms.u_mouse.value.x = e.clientX;
			uniforms.u_mouse.value.y = e.clientY;
		}

		function onResize(e: UIEvent) {
			uniforms.u_resolution.value.x = window.innerWidth;
			uniforms.u_resolution.value.y = window.innerHeight;
		}

		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("resize", onResize);

		function render() {
			uniforms.u_time.value = performance.now() / 1000;
			renderer.render(scene, camera);
		}

		animate();

		return () => {
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("resize", onResize);
		};
	}, []);

	return (
		<>
			<div
				id="shader-parent"
				className="bg-transparent fixed top-0 left-0 -z-10"
			></div>
		</>
	);
}
