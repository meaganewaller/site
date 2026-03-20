import Image from 'next/image'
import stardivider from '~/images/dividers/bouncing-stars.gif'
import { getAll } from '@/lib/content'

export default async function Home() {
  const logs = getAll("logs");
  return (
    <section className="mx-auto my-0 w-full">
      <div className="grid grid-cols-[1fr] gap-(--layout-grid-gap) [grid-template-areas:'welcome_welcome'_'updates_updates'_'status_status'_'vibes_vibes'] lg:[grid-template-areas:'welcome_welcome'_'status_vibes'_'updates_vibes']">
        <div className="border-2 border-dashed border-accent bg-surface/50 [grid-area:welcome]">
          <div className="items-center justify-center text-center text-on-surface">
            <h1
              className="text-center [font-family:var(--font-pixel-serif)] text-[2.5rem] tracking-[1px]"
            >
              welcome!
            </h1>
            <div
              className="w-full [grid-area:welcome]"
            >
              <p className="text-lg leading-6">
                Welcome to my personal website! I'm Meagan, a software engineer
                with a passion for building delightful user experiences. This is
                where I share my projects, thoughts, and updates on what I'm
                working on. Feel free to explore and reach out if you'd like to
                connect!
              </p>
            </div>
            <figure>
              <Image
                className="mx-auto my-0 mb-3 w-auto"
                src={stardivider.src}
                width={stardivider.width}
                height={stardivider.height}
                alt=""
              />
            </figure>
          </div>
        </div>
        <div
          id="recent-logs"
          className="bg-surface-variant border-accent border-2 self-center rounded-lg [grid-area:updates] p-3 relative"
        >
          <div className="border-5 border-dotted border-accent my-0 mx-auto p-4 relative rounded-lg box-border flex flex-col">
            <div className="bg-surface-variant text-xl font-bold font-cute leading-4 absolute py-0 px-2 right-0 lowercase -top-2.5 z-2">
              <span className="decoration-on-surface-variant text-on-accent decoration-wavy underline underline-offset-4">
                Changelog
              </span>
            </div>
            <ul className="mt-4 space-y-3 list-none p-0">
              {logs.map(log => (
                <li key={log.slug} className="flex flex-col gap-0.5">
                  <span className="text-xs font-mono text-on-surface/60">
                    {log.date &&
                      new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(
                        new Date(log.date)
                      )}
                  </span>
                  <span className="text-sm font-semibold text-on-surface">{log.meta.title}</span>
                  {log.meta.summary && (
                    <span className="text-sm text-on-surface/80">{log.meta.summary}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
