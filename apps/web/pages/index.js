import Head from "next/head"
import Layout from "../components/layout"
import { Button } from "../components/ui/button"
import { CheckCircle, Zap, Shield, Globe } from "../components/icons"
import Link from "next/link"

export default function Home() {
  const posts = [
    {
      id: 1,
      title: "The Art of Climbing: Analyzing the Best Climbers in the Peloton",
      excerpt: "Discover what makes the best climbers stand out in professional cycling.",
      link: "/blog/the-art-of-climbing",
    },
    {
      id: 2,
      title: "Sprint Tactics: How Teams Set Up Their Fast Finishers",
      excerpt: "A deep dive into the strategies behind successful sprint finishes.",
      link: "/blog/sprint-tactics",
    },
    {
      id: 3,
      title: "Grand Tour Predictions: Who Will Dominate This Season?",
      excerpt: "Our expert predictions for the upcoming Grand Tours.",
      link: "/blog/grand-tour-predictions",
    },
  ];

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

     

      {/* Blog Feed Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-8">
            Latest Posts
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950"
              >
                <h3 className="text-xl font-bold">{post.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{post.excerpt}</p>
                <Link
                  href={post.link}
                  className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  Read more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      
    </Layout>
  )
}
