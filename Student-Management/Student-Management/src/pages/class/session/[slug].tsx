import { mdiEye, mdiTableOff, mdiTrashCan } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import Button from '../../../components/Button'
import CardBox from '../../../components/CardBox'
import LayoutAuthenticated from '../../../layouts/Authenticated'
import SectionMain from '../../../components/Section/Main'
import SectionTitleLineWithButton from '../../../components/Section/TitleLineWithButton'
import { getPageTitle } from '../../../config'
import { useSampleClients } from '../../../hooks/sampleData'
import Buttons from '../../../components/Buttons'
import { Client } from '../../../interfaces'
import UserAvatar from '../../../components/UserAvatar'
import { useRouter } from 'next/router'
import { AttendanceReponse } from '../../../models/auth'
import sessionApi from '../../../api/session'
import FormField from '../../../components/Form/Field'
import { Field } from 'formik'

const AtendancePage = () => {
  const router = useRouter()
  const [lectures, setLectures] = useState<AttendanceReponse[]>()

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

  const getLecture = useCallback(async () => {
    const { ok, body } = await sessionApi.getAttandnace()
    if (ok && body && router.query.slug) {
      setLectures(body.filter((a) => a.sessionId === Number(router.query.slug)))
    }
  }, [router.query.slug])

  useEffect(() => {
    getLecture()
  }, [getLecture])

  const handleChangeStatus = async (attendanceId: number, status: number) => {
    const { ok } = await sessionApi.updateAttendance(attendanceId, status)
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
        <SectionTitleLineWithButton title={`Session`} icon={''}></SectionTitleLineWithButton>
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
                  clientsPaginated.map((client: AttendanceReponse) => (
                    <tr key={client.id}>
                      <td data-label="ID">{client.studentId}</td>

                      <td data-label="Name">{client.student.user.name}</td>
                      <td data-label="Email">{client.student.user.email}</td>

                      <td className="before:hidden w-[150px] whitespace-nowrap">
                        <select
                          id="countries"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={client.status}
                          onChange={(event) =>
                            handleChangeStatus(client.id, Number(event.target.value))
                          }
                        >
                          <option value={-1}>Absent</option>
                          <option value={1}>Present</option>
                        </select>
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
    </>
  )
}

AtendancePage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default AtendancePage
