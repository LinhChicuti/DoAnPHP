import { mdiCheckBold, mdiEye, mdiTableOff, mdiTrashCan } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'

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
import { Field, Formik } from 'formik'
import FormField from '../../../../components/Form/Field'
import { StudentRegisterReponse } from '../../../../models/class'
import classApi from '../../../../api/class'

const ClassStudentRegisterPage = () => {
  const router = useRouter()
  const [lectures, setLectures] = useState<StudentRegisterReponse[]>()
  const [selectedRecord, setSelectedRecord] = useState<number>()
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

  const handleSubmit = (values) => {
    alert(JSON.stringify(values, null, 2))
  }

  const getLecture = async () => {
    const { ok, body } = await classApi.getClassRegisnation()
    if (ok && body) {
      setLectures(body.filter((c) => c.classId === Number(router.query.slug)))
    }
  }
  useEffect(() => {
    getLecture()
  }, [router.query.slug])

  const approveStudent = async (classRegisId: number, studentId: number) => {
    const { ok } = await classApi.approveStudent(classRegisId, studentId)
    if (ok) {
      getLecture()
    }
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {lectures &&
                  clientsPaginated.map((client: StudentRegisterReponse) => (
                    <tr key={client.id}>
                      <td data-label="ID">{client.student.id}</td>
                      <td data-label="Name">{client.student.user.name}</td>
                      <td data-label="Email">{client.student.user.email}</td>
                      <td className="before:hidden lg:w-1 whitespace-nowrap">
                        <Buttons type="justify-start lg:justify-end" noWrap>
                          <Button
                            color="success"
                            icon={mdiCheckBold}
                            onClick={() => approveStudent(client.id, client.student.id)}
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

      <CardBoxModal
        title="Sample modal"
        buttonColor="info"
        buttonLabel="Done"
        isActive={isModalInfoActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <Formik
          initialValues={{
            score: '',
          }}
          onSubmit={handleSubmit}
        >
          <FormField label="Score" labelFor="score">
            <Field name="score" placeholder="Full name" />
          </FormField>
        </Formik>
      </CardBoxModal>
    </>
  )
}

ClassStudentRegisterPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default ClassStudentRegisterPage
