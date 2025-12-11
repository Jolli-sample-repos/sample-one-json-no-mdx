import { redirect, notFound } from 'next/navigation'
import ApiDocsClient from '../../../components/ApiDocsClient'

const VALID_SLUGS = ['valid-jolli-api-json']

export function generateStaticParams() {
  return [
    { slug: [] },
    { slug: ['valid-jolli-api-json'] }
  ]
}

export default async function ApiDocsPage(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const slugArray = params.slug || []

  // No slug provided - redirect to first API doc
  if (slugArray.length === 0) {
    redirect('/api-docs/valid-jolli-api-json')
  }

  const slug = slugArray[0]

  // Invalid slug - return 404
  if (!VALID_SLUGS.includes(slug)) {
    notFound()
  }

  return <ApiDocsClient slug={slug} />
}
