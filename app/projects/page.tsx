import type { Metadata } from 'next'
import { galleryItems, trimForClient } from '@/content/gallery'
import { PageHeader } from '@/components/ui/PageHeader'
import { ProjectsGallery } from '@/components/gallery/ProjectsGallery'

export const metadata: Metadata = {
  title: 'Projects — residential, commercial & temple woodwork',
  description:
    'Over five hundred photographs of hand-carved work from the Sarala workshop at Nandalike: main doors, pooja mantapas, temple doors, wardrobes, dining tables, railings and partitions across Karnataka.',
  alternates: { canonical: '/projects' },
  openGraph: { title: 'Projects — Sarala Wood Industries', url: '/projects' },
}

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title={[
          <>Five hundred</>,
          <>
            rooms, <em key="e" className="accent">one hand.</em>
          </>,
        ]}
        lead={`Every photograph here is work that left the Nandalike workshop — ${galleryItems.length} of them, filed the way we file them: by the space they went into and the thing they are.`}
      />
      <section className="surface-paper">
        <ProjectsGallery items={trimForClient(galleryItems)} space="all" />
      </section>
    </>
  )
}
