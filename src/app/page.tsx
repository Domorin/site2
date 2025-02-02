import classNames from "classnames";
import { ElectrolizeFont } from "./layout";
import { Card } from "./_components/card";
import Image from "next/image";
import { ExperienceItem } from "./_components/experience_item";
import { Container } from "./_components/container";
import { Section } from "./_components/section";
import { CatImage } from "./_components/cat_image";
import { TestGlow } from "./_components/glow/test_glow";

// https://coolors.co/000000-f0f0c9-f2bb05-d74e09-3454d1
export default function Home() {
	return (
		<main className="w-full h-full flex items-center flex-col bg-opacity-0 px-1">
			{/* <div className="flex flex-col items-center mt-24 bg-gradient-to-r from-black/0 via-blue-700 to-black/0 w-1/2 p-8 "> */}
			<div className="flex gap-8 flex-col items-center h-full w-full sm:w-[860px] rounded-lg">
				<div className="flex h-screen items-center">
					<div className="flex flex-col h-fit gap-8 justify-center">
						<h1 className="sm:text-8xl text-6xl flex gap-4">
							<div className="text-center w-full">
								Hi, I'm{" "}
								<span className="font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
									Cody
								</span>
							</div>
						</h1>
						<TestGlow color="#F2BB05">
							<Container className="p-4">
								<p>
									I'm a fullstack software engineer currently
									residing in Portland, Oregon. My passion
									lies in crafting innovative product designs
									and bringing them to life. When I'm not
									creating cool stuff, you can find me{" "}
									<a
										className="link"
										href="https://www.hltv.org/stats/players/15128/domorin"
										target="_blank"
									>
										enjoying
									</a>{" "}
									<a
										className="link"
										href="https://liquipedia.net/starcraft2/Domorin"
										target="_blank"
									>
										competitive
									</a>{" "}
									<a
										className="link"
										href="https://www.youtube.com/@Doomorin"
										target="_blank"
									>
										gaming
									</a>
									, playing pickleball, and petting{" "}
									<a className="link" href="#cats">
										cats
									</a>
									.
								</p>
							</Container>
						</TestGlow>
					</div>
				</div>
				<TestGlow color="#F2BB05">
					<Section id="stuff" title="My Stuff">
						<div className="flex gap-8 justify-center items-stretch flex-wrap">
							<Card
								className="border-sesh-bg/75"
								header={
									<Container
										className={classNames(
											ElectrolizeFont.className,
											"text-4xl text-sesh w-full mx-auto h-16 flex items-center justify-center"
										)}
										color="sesh-bg"
										opacity="75"
										noRounded
										noBorder
										disableGlow
									>
										sesh
									</Container>
								}
								body={
									<p>
										A fully featured scheduling bot for
										Discord. sesh provides millions of users
										a way to create and manage events and
										polls with ease.
									</p>
								}
								footer={
									<p>
										Made with Typescript, Node.js, React,
										tRPC, Tailwind, PostgreSQL, Docker
									</p>
								}
								href={"https://sesh.fyi"}
							/>
							<Card
								className="border-hackstack-bg/75"
								header={
									<Container
										className={classNames(
											ElectrolizeFont.className,
											"w-full h-16 flex items-center justify-center"
										)}
										color="hackstack-bg"
										opacity="75"
										noRounded
										noBorder
										disableGlow
									>
										<Image
											className="mx-auto my-auto"
											src={"/hackstack.png"}
											alt="HackStack logo"
											width={200}
											height={24}
										/>
									</Container>
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
								className="border-white/75"
								header={
									<Container
										color="notecraft-bg"
										className="w-full flex items-center h-16 font-bold text-2xl text-black"
										opacity="75"
										noBorder
										noRounded
										disableGlow
									>
										<div className="w-fit mx-auto flex items-center gap-2">
											<Image
												src={"/notecraft.png"}
												alt="NoteCraft logo"
												width={36}
												height={36}
											/>{" "}
											NoteCraft
										</div>
									</Container>
								}
								body={
									"An open-source collaborative note editor with a focus on simplicity. Easy notes with no login required."
								}
								footer={
									<p>
										Made with Typescript, Next.js, React,
										tRPC, Tailwind, Prisma, Docker
									</p>
								}
								href={"https://notecraft.app"}
							/>
						</div>
					</Section>
				</TestGlow>
				<Section id="experience" title="My Experience">
					<div className="flex flex-col gap-4 w-full">
						<TestGlow color="#F2BB05">
							<Container className="flex flex-col gap-4 p-8">
								<div className="text-2xl w-full">Tunks LLC</div>
								<div className="flex flex-col gap-4">
									<ExperienceItem
										title="sesh - Engineering + Product"
										date="2019"
										endDate="Present"
										bullets={[
											"Created sesh, a Discord scheduling bot in hundreds of thousands of servers, with millions of users",
											"Implemented and designed a fully featured user facing web dashboard, along with a robust API",
											"Managed and integrated directly with Stripe payments to create a seamless user experience",
											"Designed, planned, and implemented new features on a consistent basis leading to growth in both user base and revenue",
										]}
									/>
									<ExperienceItem
										title="HackStack - Engineering + Design"
										date="2018"
										endDate="2019"
										bullets={[
											"Developed HackStack, a high intensity, well received iOS game",
											"Designed gameplay mechanics, visuals, and user interface to create a captivating and immersive player experience",
											"Utilized Lua along with love2d to build a seamless and responsive gaming environment",
										]}
									/>
									<ExperienceItem
										title="Co-Founder"
										date="2017"
										endDate="Present"
										bullets={[
											"Co-founded Tunks LLC, where we focused on SaaS products along with indie games",
											"Worked on many prototypes improving game development and general software skills",
											"Worked directly with contractors and clients to develop software solutions",
										]}
									/>
								</div>
							</Container>
						</TestGlow>
						<TestGlow color="#F2BB05">
							<Container className="p-8">
								<ExperienceItem
									title="Cloud Software Engineer Intern"
									company="Gerber Technology"
									date="2017"
									bullets={[
										"Designed and implemented web dashboard for internal use",
										"Learned and developed AWS and front-end development skills",
									]}
								/>
							</Container>
						</TestGlow>
					</div>
				</Section>
				<Section id="education" title="My Education">
					<div className="flex flex-col w-full gap-4">
						<TestGlow color="#F2BB05">
							<Container className="p-8">
								<ExperienceItem
									title="Bachelor of Science, Computer Science, Minor in Math"
									company="University of Connecticut, Storrs"
									date="2016"
									endDate="2018"
									bullets={["Magna Cum Laude"]}
								/>
							</Container>
						</TestGlow>
						<TestGlow color="#F2BB05">
							<Container className="p-8">
								<ExperienceItem
									title="Associate in Arts, Math/Science"
									company="Norwalk Community College"
									date="2013"
									endDate="2015"
									bullets={["Summa Cum Laude"]}
								/>
							</Container>
						</TestGlow>
					</div>
				</Section>
				<Section id="cats" title="My Cats">
					<div className="flex sm:flex-row flex-col w-full sm:h-[42rem]">
						<div className="h-[42rem] sm:w-1/2">
							<CatImage
								cuteImage={{
									src: "/cats/cute_egbert.JPEG",
									title: "Egbert",
								}}
								weirdImage={{
									src: "/cats/ugly_egbert.JPEG",
									title: "Weird Egbert",
								}}
							/>
						</div>
						<div className="h-[42rem] sm:w-1/2">
							<CatImage
								cuteImage={{
									src: "/cats/cute_sypha.JPEG",
									title: "Sypha",
								}}
								weirdImage={{
									src: "/cats/weird_sypha.JPEG",
									title: "Weird Sypha",
								}}
							/>
						</div>
					</div>
				</Section>
			</div>
		</main>
	);
}
