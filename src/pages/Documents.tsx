import { useEffect, useMemo, useState } from 'react'

import { signItems, type SignItem } from '@/data/signs'
import pdfSource from '@/assets/DL-37-R11-2009-English-Secured.pdf'
import RoadSign from '@/components/RoadSign'

const DocumentsPage = () => {
  const items = signItems as SignItem[]
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const ITEMS_PER_PAGE_OPTIONS = [5, 10, 15, 20]

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage))
  const currentRangeStart = items.length ? (currentPage - 1) * itemsPerPage + 1 : 0
  const currentRangeEnd = items.length ? Math.min(currentPage * itemsPerPage, items.length) : 0

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const currentItems = useMemo(
    () => items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [items, currentPage, itemsPerPage],
  )

  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, index) => index + 1),
    [totalPages],
  )

  const goToPage = (page: number) => {
    const clampedPage = Math.min(Math.max(page, 1), totalPages)
    setCurrentPage(clampedPage)
  }

  const PaginationControls = () =>
    items.length ? (
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2 sm:space-y-0 sm:space-x-3">
          <p className="text-sm text-slate-300">
            Showing{' '}
            <span className="font-semibold text-white">
              {currentRangeStart}-{currentRangeEnd}
            </span>{' '}
            of <span className="font-semibold text-white">{items.length}</span> signs
          </p>
          <label className="inline-flex items-center gap-2 text-sm text-slate-300">
            Items per page
            <select
              value={itemsPerPage}
              onChange={(event) => {
                const value = Number(event.target.value)
                setItemsPerPage(value)
                setCurrentPage(1)
              }}
              className="rounded-lg border border-slate-700/80 bg-slate-900/80 px-3 py-1 text-sm font-semibold text-white focus:border-brand focus:outline-none"
            >
              {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
            className={`rounded-xl border px-3 py-1 text-sm font-semibold transition ${
              currentPage === 1
                ? 'cursor-not-allowed border-slate-800/70 bg-slate-900/70 text-slate-500'
                : 'border-slate-700/80 bg-slate-900/70 text-slate-200 hover:border-brand hover:text-white'
            }`}
          >
            First
          </button>
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`rounded-xl border px-3 py-1 text-sm font-semibold transition ${
              currentPage === 1
                ? 'cursor-not-allowed border-slate-800/70 bg-slate-900/70 text-slate-500'
                : 'border-slate-700/80 bg-slate-900/70 text-slate-200 hover:border-brand hover:text-white'
            }`}
          >
            Previous
          </button>
          {pageNumbers.map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => goToPage(page)}
              aria-current={currentPage === page ? 'page' : undefined}
              className={`rounded-xl border px-3 py-1 text-sm font-semibold transition ${
                currentPage === page
                  ? 'border-brand bg-brand text-slate-950 shadow-elevated'
                  : 'border-slate-700/80 bg-slate-900/70 text-slate-200 hover:border-brand hover:text-white'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`rounded-xl border px-3 py-1 text-sm font-semibold transition ${
              currentPage === totalPages
                ? 'cursor-not-allowed border-slate-800/70 bg-slate-900/70 text-slate-500'
                : 'border-slate-700/80 bg-slate-900/70 text-slate-200 hover:border-brand hover:text-white'
            }`}
          >
            Next
          </button>
          <button
            type="button"
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
            className={`rounded-xl border px-3 py-1 text-sm font-semibold transition ${
              currentPage === totalPages
                ? 'cursor-not-allowed border-slate-800/70 bg-slate-900/70 text-slate-500'
                : 'border-slate-700/80 bg-slate-900/70 text-slate-200 hover:border-brand hover:text-white'
            }`}
          >
            Last
          </button>
        </div>
      </div>
    ) : null

  const speakText = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser.')
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = 1
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
          Document Library
        </p>
        <h1 className="text-3xl font-bold text-white">Traffic sign quick reference</h1>
        <p className="text-slate-300">
          Converted from the static HTML layout into a reusable React + Tailwind component. Each
          item mirrors the original question, prompt, and sign image pulled directly from the DMV
          PDF stored with the app.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={pdfSource}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-brand/60 bg-brand/10 px-4 py-2 text-sm font-semibold text-brand transition hover:border-brand hover:bg-brand/20 hover:text-white"
          >
            View full PDF
          </a>
          <p className="text-xs text-slate-400">
            Local assets: DL-37-R11-2009-English-Secured.pdf, dl-37-1.png, dl-37-2.png
          </p>
        </div>
      </header>

      <PaginationControls />

      <div className="flex flex-col gap-6">
        {currentItems.map((item) => (
          <article
            key={item.id}
            className="flex flex-col gap-4 rounded-2xl border border-slate-800/80 bg-card/80 p-6 shadow-elevated lg:flex-row lg:items-start lg:justify-between"
          >
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand">{item.category}</p>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-white">{item.prompt.en}</h2>
                <button
                  type="button"
                  onClick={() => speakText(item.prompt.en)}
                  aria-label={`Play prompt for ${item.category}`}
                  className="rounded-full border border-slate-700/80 bg-slate-900/70 px-3 py-1 text-xs font-semibold text-slate-200 transition hover:border-brand hover:text-white"
                >
                  ▶︎
                </button>
              </div>
              {item.prompt.km ? (
                <h2 className="text-xl font-semibold text-white">{item.prompt.km}</h2>
              ) : null}
              <div className="flex items-center gap-2">
                <p className="text-base text-slate-200">{item.answer.en}</p>
                <button
                  type="button"
                  onClick={() => speakText(item.answer.en)}
                  aria-label={`Play answer for ${item.question}`}
                  className="rounded-full border border-slate-700/80 bg-slate-900/70 px-3 py-1 text-xs font-semibold text-slate-200 transition hover:border-brand hover:text-white"
                >
                  ▶︎
                </button>
              </div>
              {item.answer.km ? <p className="text-base text-slate-200">{item.answer.km}</p> : null}
            </div>
            <div className="flex h-40 w-40 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-700">
              <RoadSign sprite={item.sprite} size={150} ariaLabel={item.alt} className="h-full w-full" />
            </div>
          </article>
        ))}
      </div>

      <PaginationControls />
    </section>
  )
}

export default DocumentsPage
