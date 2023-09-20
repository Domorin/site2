import classNames from "classnames";
import { ElectrolizeFont } from "./layout";
import { Card } from "./_components/card";
import Image from "next/image";

// https://coolors.co/000000-f0f0c9-f2bb05-d74e09-3454d1
export default function Home() {
	return (
		<main className="w-full h-full flex items-center flex-col bg-opacity-0">
			{/* <div className="flex flex-col items-center mt-24 bg-gradient-to-r from-black/0 via-blue-700 to-black/0 w-1/2 p-8 "> */}
			<div className="flex gap-8 flex-col items-center mt-16 w-[820px] p-8 bg-container/75 rounded-lg border-primary border">
				<h1 className="text-6xl">
					Hi, I'm{" "}
					<span className="font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
						Cody
					</span>
				</h1>
				<p>
					I'm a fullstack software engineer currently residing in
					Portland, Oregon. When I'm not creating cool stuff, you can
					find me{" "}
					<a
						className="link"
						href="https://www.hltv.org/stats/players/15128/domorin"
					>
						enjoying
					</a>{" "}
					<a
						className="link"
						href="https://liquipedia.net/starcraft2/Domorin"
					>
						competitive
					</a>{" "}
					<a
						className="link"
						href="https://www.youtube.com/@Doomorin"
					>
						gaming
					</a>
					, petting cats, and playing pickleball.
				</p>
				<h2 className="text-4xl mt-12">My Stuff</h2>
				<div className="flex gap-8 flex-wrap justify-center">
					<Card
						header={
							<div
								className={classNames(
									ElectrolizeFont.className,
									"text-4xl text-sesh w-full bg-sesh-bg mx-auto h-16 flex items-center justify-center"
								)}
							>
								sesh
							</div>
						}
						body={
							<p>
								A fully featured scheduling bot for Discord.
								sesh provides millions of users a way to create
								and manage events and polls with ease.
							</p>
						}
						footer={
							<p>
								Made with Typescript, Node.js, React, tRPC,
								PostgreSQL, Docker
							</p>
						}
						href={"https://sesh.fyi"}
					/>
					<Card
						header={
							<div className="w-full flex items-center bg-hackstack-bg h-16">
								<Image
									className="mx-auto my-auto"
									src={"/hackstack.png"}
									alt="HackStack logo"
									width={200}
									height={24}
								/>
							</div>
						}
						body={
							"A high action, high intensity iOS game about hacking. Wide variety of levels with tons of unique minigames."
						}
						footer={<p>Made with Lua/Moonscript, Love2D</p>}
						href={
							"https://apps.apple.com/gb/app/hackstack/id1490013747"
						}
					/>
					<Card
						header={
							<div className="w-full flex items-center bg-white text-black h-16 font-bold text-2xl">
								<div className="w-fit mx-auto flex items-center gap-2">
									<Image
										src={"/notecraft.png"}
										alt="NoteCraft logo"
										width={36}
										height={36}
									/>{" "}
									NoteCraft
								</div>
							</div>
						}
						body={
							"An open-source collaborative note editor with a focus on simplicity. Easy notes with no login required."
						}
						footer={
							<p>
								Made with Typescript, Next.js, React, tRPC,
								Prisma, Docker
							</p>
						}
						href={"https://notecraft.app"}
					/>
				</div>
			</div>
		</main>
	);
}
