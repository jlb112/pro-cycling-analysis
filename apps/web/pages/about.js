import Head from "next/head"
import Layout from "../components/layout"
import { Button } from "../components/ui/button"
import { Users, Building, Award } from "../components/icons"
import Link from "next/link"

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About Us | CycleInsight</title>
        <meta name="description" content="Learn more about our cycling analysis team and mission" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Anticipate</h1>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Aiming to deliver actionable insights into professional cycling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Our Story</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">From fans to analysts</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Founded in 2015 by a group of cycling enthusiasts with backgrounds in sports science, data analysis,
                  and professional racing, CycleInsight began as a small blog covering the major European races.
                </p>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Today, we've grown into a respected voice in cycling analysis, providing coverage of races worldwide
                  and working with teams, coaches, and riders to bring you insider perspectives on the sport.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[350px] w-full overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 p-2 dark:from-gray-800 dark:to-gray-900">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-lg font-medium">Company Image</div>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">Team photo will appear here</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Core Values</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                These principles guide our approach to cycling analysis and content creation.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <Users className="h-12 w-12 text-gray-900 dark:text-gray-50" />
              <h3 className="text-xl font-bold">Analytical Depth</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                We go beyond results to explain the how and why behind racing outcomes.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <Building className="h-12 w-12 text-gray-900 dark:text-gray-50" />
              <h3 className="text-xl font-bold">Technical Accuracy</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Our analysis is grounded in sports science, power data, and tactical understanding.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <Award className="h-12 w-12 text-gray-900 dark:text-gray-50" />
              <h3 className="text-xl font-bold">Rider Respect</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                We provide honest analysis while respecting the tremendous efforts of all cyclists.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Analysis Team</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Former pros, coaches, and cycling data specialists who bring you expert insights.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center space-y-4">
                <div className="relative h-40 w-40 overflow-hidden rounded-full">
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                    <span className="text-xl font-medium text-gray-500 dark:text-gray-400">Team Member {i}</span>
                  </div>
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold">Team Member {i}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Co-Founder & CEO</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 border-t">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Join our team</h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              We're always looking for passionate cycling analysts and writers to join our growing team.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
            <Link href="/careers" passHref>
              <Button className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
                Join Our Team
                <span className="ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}
