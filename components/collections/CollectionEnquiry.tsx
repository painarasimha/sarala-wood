'use client'

import Link from 'next/link'
import { whatsappLink } from '@/lib/whatsapp'

/**
 * Both routes out of a collection page carry the collection with them: the
 * enquiry form opens pre-selected, and the WhatsApp message arrives already
 * saying which line the visitor is asking about.
 */
export function CollectionEnquiry({ collection }: { collection: string }) {
  return (
    <div className="mt-10 flex flex-wrap gap-4">
      <Link
        href={`/contact?interest=${encodeURIComponent(collection)}`}
        className="btn btn-solid"
      >
        Enquire about {collection.toLowerCase()}
      </Link>
      <a
        href={whatsappLink({ interest: collection })}
        target="_blank"
        rel="noopener noreferrer"
        className="btn"
      >
        Ask on WhatsApp
      </a>
    </div>
  )
}
