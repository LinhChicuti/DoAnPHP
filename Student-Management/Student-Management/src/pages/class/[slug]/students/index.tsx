import { mdiEye, mdiTableOff, mdiTrashCan } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useCallback, useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { useSampleClients } from '../../../../hooks/sampleData'
import { getPageTitle } from '../../../../config'
import LayoutAuthenticated from '../../../../layouts/Authenticated'
import SectionMain from '../../../../components/Section/Main'
import CardBox from '../../../../components/CardBox'
import Buttons from '../../../../components/Buttons'
import Button from '../../../../components/Button'
import SectionTitleLineWithButton from '../../../../components/Section/TitleLineWithButton'
import { Client } from '../../../../interfaces'
import CardBoxModal from '../../../../components/CardBox/Modal'
import { Field, Form, Formik } from 'formik'
import FormField from '../../../../components/Form/Field'
import { StudentClassResponse } from '../../../../models/class'
import classApi from '../../../../api/class'
import Divider from '../../../../components/Divider'
import ScoreForm from '../../../../components/Modal/ScoreForm'

const ClassStudentPage = () => {
  const router = useRouter()
  const [lectures, setLectures] = useState<StudentClassResponse[]>()
  const [selectedRecord, setSelectedRecord] = useState<StudentClassResponse>()
  const perPage = 10

  const [currentPage, setCurrentPage] = useState(0)

  const clientsPaginated =
    lectures && lectures.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages = lectures && lectures.length / perPage

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)

  const handleModalAction = () => {
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }

  const handleSubmit = useCallback(
    async (values: { score: number }) => {
      const { ok } = await classApi.updateScore(values.score, selectedRecord.id)
      if (ok) {
      }
    },

    [selectedRecord]
  )

  const getLecture = async () => {
    const { ok, body } = await classApi.getStudentInClass(Number(router.query.slug))
    if (ok && body) {
      setLectures(body)
    }
  }
  useEffect(() => {
    getLecture()
  }, [router.query.slug])

  const handleSelect = (item) => {
    setSelectedRecord(item)
    setIsModalInfoActive(true)
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Tables')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton title="Students" icon={''}></SectionTitleLineWithButton>
        <CardBox className="mb-6" hasTable>
          <>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Score</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {lectures &&
                  clientsPaginated.map((client: StudentClassResponse) => (
                    <tr key={client.id}>
                      <td data-label="ID">{client.studentId}</td>

                      <td data-label="Name">{client.student.user.name}</td>
                      <td data-label="Email">{client.student.user.email}</td>
                      <td data-label="Score">{client.score}</td>

                      <td className="before:hidden lg:w-1 whitespace-nowrap">
                        <Buttons type="justify-start lg:justify-end" noWrap>
                          <Button
                            color="info"
                            icon={mdiEye}
                            onClick={() => handleSelect(client)}
                            small
                          />
                        </Buttons>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
              <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
                <Buttons>
                  {pagesList.map((page) => (
                    <Button
                      key={page}
                      active={page === currentPage}
                      label={page + 1}
                      color={page === currentPage ? 'lightDark' : 'whiteDark'}
                      small
                      onClick={() => setCurrentPage(page)}
                    />
                  ))}
                </Buttons>
                <small className="mt-6 md:mt-0">
                  Page {currentPage + 1} of {Math.ceil(numPages)}
                </small>
              </div>
            </div>
          </>
        </CardBox>

        {/* <CardBox>
          <CardBoxComponentEmpty />
        </CardBox> */}
      </SectionMain>
      {selectedRecord && (
        <ScoreForm
          isActive={isModalInfoActive}
          onClose={() => setSelectedRecord(null)}
          title={'Update Score'}
          onRefresh={getLecture}
          session={selectedRecord}
        />
      )}
    </>
  )
}

ClassStudentPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default ClassStudentPage
