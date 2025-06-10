import Link from "next/link"
import { StagesSection } from "@/components/stages-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="w-full min-h-[80vh] flex items-center justify-center bg-[#E6E6FA] py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="space-y-4">
              <h1 className="font-handwriting text-4xl md:text-5xl lg:text-6xl font-medium text-gray-800">
                Still Here With You
              </h1>
              <p className="font-handwriting text-xl md:text-2xl text-gray-600 max-w-[700px] mx-auto">
                Holding hands through every stage. You&apos;re not alone.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Link
                href="#learn-more"
                className="inline-flex h-10 items-center justify-center rounded-md bg-[#9370DB] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#8A5FD7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9370DB]"
              >
                Learn More
              </Link>
              <Link
                href="#caregiver-support"
                className="inline-flex h-10 items-center justify-center rounded-md border border-[#9370DB] bg-white px-8 text-sm font-medium text-[#9370DB] shadow-sm transition-colors hover:bg-gray-100 hover:text-[#8A5FD7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9370DB]"
              >
                Caregiver Support
              </Link>
            </div>
          </div>
        </div>
      </section>

      <StagesSection />
    </main>
  )
}
