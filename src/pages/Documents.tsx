import { useEffect, useMemo, useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

import { signItems, type SignItem } from '@/data/signs'
import pdfSource from '@/assets/DL-37-R11-2009-English-Secured.pdf'
import RoadSign from '@/components/RoadSign'

const DocumentsPage = () => {
  const items = signItems as SignItem[]
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [isExporting, setIsExporting] = useState(false)
  const exportRef = useRef<HTMLDivElement | null>(null)

  const ITEMS_PER_PAGE_OPTIONS = [5, 10, 15, 20]
  const EXPORT_ITEMS_PER_PAGE = 4

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

  const exportPages = useMemo(() => {
    const pages: SignItem[][] = []
    for (let index = 0; index < items.length; index += EXPORT_ITEMS_PER_PAGE) {
      pages.push(items.slice(index, index + EXPORT_ITEMS_PER_PAGE))
    }
    return pages
  }, [items])

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

  const downloadAllItemsPdf = async () => {
    if (!exportRef.current) return

    try {
      setIsExporting(true)
      await new Promise((resolve) => setTimeout(resolve, 100))

      const pdf = new jsPDF('p', 'pt', 'letter')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const pageNodes = Array.from(
        exportRef.current.querySelectorAll<HTMLElement>('[data-export-page]'),
      )

      for (let index = 0; index < pageNodes.length; index += 1) {
        const pageNode = pageNodes[index]
        const canvas = await html2canvas(pageNode, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
        })
        const imgData = canvas.toDataURL('image/png')
        const imgProps = pdf.getImageProperties(imgData)
        const imgWidth = pageWidth
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width

        if (index > 0) {
          pdf.addPage()
        }

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
      }

      pdf.save('traffic-signs.pdf')
    } finally {
      setIsExporting(false)
    }
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
          item mirrors the original question, question, and sign image pulled directly from the DMV
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
          <button
            type="button"
            onClick={downloadAllItemsPdf}
            disabled={isExporting}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
              isExporting
                ? 'cursor-not-allowed border-slate-700/70 bg-slate-900/70 text-slate-400'
                : 'border-slate-700/80 bg-slate-900/80 text-slate-200 hover:border-brand hover:text-white'
            }`}
          >
            {isExporting ? 'Preparing PDF…' : 'Download all items as PDF'}
          </button>
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
              <p className="text-sm font-semibold uppercase tracking-wide text-brand">{item.id}. {item.category} | {item.alt}</p>
              <div className="flex items-center gap-2">
                <p className="text-xl text-white">{item.question.en}</p>
                <button
                  type="button"
                  onClick={() => speakText(item.question.en)}
                  aria-label={`Play question for ${item.category}`}
                  className="rounded-full border border-slate-700/80 bg-slate-900/70 px-3 py-1 text-xs font-semibold text-slate-200 transition hover:border-brand hover:text-white"
                >
                  ▶︎
                </button>
              </div>
              <p className="text-xl text-white">{item.question.kh}</p>
              <div className="flex items-center gap-2">
                <p className="text-base text-slate-200">{item.answer.en}</p>
                <button
                  type="button"
                  onClick={() => speakText(item.answer.en)}
                  aria-label={`Play answer for ${item.category}`}
                  className="rounded-full border border-slate-700/80 bg-slate-900/70 px-3 py-1 text-xs font-semibold text-slate-200 transition hover:border-brand hover:text-white"
                >
                  ▶︎
                </button>
              </div>
              <p className="text-xl text-slate-200">{item.answer.kh}</p>
            </div>
            <div className="flex h-40 w-40 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-700">
              <RoadSign sprite={item.sprite} size={150} ariaLabel={item.alt} className="h-full w-full" />
            </div>
          </article>
        ))}
      </div>

      <PaginationControls />

      <div className="fixed left-0 top-0 -z-10 opacity-0 pointer-events-none">
        <div ref={exportRef} className="space-y-8 bg-white text-black">
          {exportPages.map((pageItems, pageIndex) => (
            <div
              key={`export-page-${pageIndex}`}
              data-export-page
              style={{ width: '816px', minHeight: '1056px' }}
              className="box-border space-y-6 bg-white px-8 pt-4 pb-12 text-black"
            >
              <div className={`space-y-2 ${pageIndex === 0 ? '' : 'invisible'}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black">
                  Document Library
                </p>
                <h1 className="text-3xl font-bold text-black">Traffic sign quick reference</h1>
                <p className="text-sm text-black">
                  Exported on {new Date().toLocaleDateString('en-US')}
                </p>
              </div>
              <div className="space-y-6">
                {pageItems.map((item) => (
                  <article
                    key={`export-${item.id}`}
                    className="flex gap-4 rounded-2xl border border-black/10 bg-white p-6"
                  >
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-wide text-black">
                        {item.id}. {item.category} | {item.alt}
                      </p>
                      <p className="text-lg text-black">{item.question.en}</p>
                      <p className="text-xl text-black">{item.question.kh}</p>
                      <p className="text-lg text-black">{item.answer.en}</p>
                      <p className="text-xl text-black">{item.answer.kh}</p>
                    </div>
                    <div className="ml-auto flex h-32 w-32 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border-black/10 bg-white">
                      <RoadSign
                        sprite={item.sprite}
                        size={110}
                        ariaLabel={item.alt}
                        className="h-full w-full"
                      />
                    </div>
                  </article>
                ))}
              </div>
              <div className="pt-2 text-right text-xs text-black/70">
                {pageIndex + 1}/{exportPages.length}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DocumentsPage
