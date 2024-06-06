import { ReactElement, useEffect } from 'react'
import LayoutAuthenticated from '../../layouts/Authenticated'

const DocumentPage = () => {
  useEffect(() => {
    const pdfUrl = '/static/document.pdf'

    window.open(pdfUrl, '_blank')
  }, [])
}

DocumentPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default DocumentPage
