/**
 * The carving vocabulary.
 *
 * WHAT IS VERIFIED: every motif below is visible in the workshop's own
 * photographs. The lotus roundels and the kalasha panel are on the main doors;
 * the running vine and bead mouldings edge the frames; the pierced rosette
 * screens are on the mantapa backs; the diamond crosshatch is cut into the
 * turned pilasters. The drawings are faithful records of that carving.
 *
 * WHAT IS NOT: the workshop has never published names for these. Three of the
 * terms here — padma, kalasha, jaali — are standard, widely used in Indian
 * woodwork, and safe to put in their mouth. "Mantapa", "pooja" and "ratha" are
 * their own words, taken from their gallery headings. The remaining motifs are
 * given plain English names rather than invented Sanskrit ones, and the copy
 * never claims the workshop uses this vocabulary with customers.
 *
 * {{TODO: show this list to Mr. Hegde. If the carvers have their own names for
 * these — in Kannada or Tulu — his words beat ours, and the section gets much
 * better for it.}}
 */

export type Motif = {
  /** The component key in components/ornament/Ornaments.tsx */
  motif: 'padma' | 'kalasha' | 'patra-lata' | 'jaali' | 'bead' | 'diaper'
  name: string
  gloss: string
  /** Where it appears in their work — all checked against the photographs. */
  seenOn: string
}

export const vocabulary: Motif[] = [
  {
    motif: 'padma',
    name: 'Padma',
    gloss: 'lotus roundel',
    seenOn: 'Door panels and pooja mantapas',
  },
  {
    motif: 'kalasha',
    name: 'Kalasha',
    gloss: 'the pot and finial',
    seenOn: 'The centre panel of a main door',
  },
  {
    motif: 'patra-lata',
    name: 'Running vine',
    gloss: 'leaf and tendril',
    seenOn: 'Door frames and lintels',
  },
  {
    motif: 'jaali',
    name: 'Jaali',
    gloss: 'pierced screen',
    seenOn: 'Mantapa backs and partitions',
  },
  {
    motif: 'bead',
    name: 'Bead moulding',
    gloss: 'bead and reel',
    seenOn: 'The edge of every panel',
  },
  {
    motif: 'diaper',
    name: 'Diamond diaper',
    gloss: 'cut crosshatch',
    seenOn: 'Turned and square pilasters',
  },
]

export const vocabularyIntro = {
  eyebrow: 'The vocabulary',
  heading: 'A grammar of six marks.',
  lead: 'Nearly every piece that leaves the workshop is assembled from the same handful of forms, drawn from the temple architecture of this coast. These are the six you will see most often.',
}
