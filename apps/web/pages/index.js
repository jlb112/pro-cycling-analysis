import Head from "next/head"
import Layout from "../components/layout"
import { Button } from "../components/ui/button"
import { CheckCircle, Zap, Shield, Globe } from "../components/icons"
import Link from "next/link"

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>CycleInsight | Pro Cycling Analysis</title>
        <meta name="description" content="In-depth analysis of professional cycling races, riders, and teams" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Pro cycling insights
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Meaninful analysis of parcours, riders and race dynamics, with the ultimate goal of better predicting race outcomes.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
                  Get Started
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
                <Link href="/about" passHref>
                  <Button
                    variant="outline"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  >
                    Learn more
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[350px] w-full overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 p-2 dark:from-gray-800 dark:to-gray-900">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-lg font-medium">Modern UI Preview</div>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">Your design will appear here</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                Analysis Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Comprehensive cycling coverage</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our platform provides in-depth analysis of races, riders, and teams across the professional cycling
                calendar.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="grid gap-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Race Breakdowns</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Detailed analysis of key moments, tactics, and decisive moves in every major race.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Zap className="h-8 w-8 text-amber-500" />
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Power Analysis</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Expert interpretation of power data, climbing performances, and sprint finishes.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Shield className="h-8 w-8 text-blue-500" />
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Team Tactics</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Insights into team strategies, domestique roles, and leadership decisions.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid gap-6">
              <div className="flex items-start gap-4">
                <Globe className="h-8 w-8 text-purple-500" />
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Global Coverage</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Analysis of all UCI WorldTour events, Grand Tours, Monuments, and major races.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Rider Profiles</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    In-depth profiles of top cyclists, rising stars, and legendary riders.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Zap className="h-8 w-8 text-amber-500" />
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Data Visualization</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Clear, insightful charts and graphics that bring cycling statistics to life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Ready to dive deeper into pro cycling?
            </h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Join thousands of cycling enthusiasts who rely on our expert analysis to understand the sport they love.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
            <Button className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
              Get Started
            </Button>
            <Button
              variant="outline"
              className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-2">
            <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
              Don't miss our coverage of the next big race.
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              From Grand Tours to one-day classics, our team of analysts provides the most comprehensive coverage of
              professional cycling available anywhere.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
            <Button className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
              Get Started
            </Button>
            <Button
              variant="outline"
              className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  )
}
