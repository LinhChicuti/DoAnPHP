import { mdiEye, mdiTableOff, mdiTrashCan } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import Button from '../../components/Button'
import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/Section/Main'
import SectionTitleLineWithButton from '../../components/Section/TitleLineWithButton'
import { getPageTitle } from '../../config'
import Buttons from '../../components/Buttons'
import CardBoxModal from '../../components/CardBox/Modal'
import { useRouter } from 'next/router'
import ProtectedRoute from '../../components/ProtectedRoute'
import { UserResponse } from '../../models/auth'
import lecturesApi from '../../api/lectures'

const LecturerPage = () => {
  const router = useRouter()
  const [lectures, setLectures] = useState<UserResponse[]>()
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

  const [isModalTrashActive, setIsModalTrashActive] = useState(false)

  const handleModalAction = useCallback(async () => {
    const { ok } = await lecturesApi.deleteLecture(selectedRecord)
    if (ok) {
      getLecture()
    }
    setIsModalTrashActive(false)
  }, [selectedRecord])

  const handleAddClick = () => {
    router.push('/lectures/add')
  }

  const handleSelectDelete = (id) => {
    setSelectedRecord(id)
    setIsModalTrashActive(true)
  }

  const getLecture = async () => {
    const { ok, body } = await lecturesApi.getLectures()
    if (ok && body) {
      setLectures(body)
    }
  }
  useEffect(() => {
    getLecture()
  }, [])

  const onCancel = () => {
    setSelectedRecord(null)
    setIsModalTrashActive(false)
  }

  return (
    <ProtectedRoute roles={[3]}>
      <Head>
        <title>{getPageTitle('Tables')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton title="Lectures" icon={''}>
          <Button label="Add Lecture" color="contrast" roundedFull onClick={handleAddClick} small />
        </SectionTitleLineWithButton>
        <CardBox className="mb-6" hasTable>
          <>
            <CardBoxModal
              title="Please confirm"
              buttonColor="danger"
              buttonLabel="Confirm"
              isActive={isModalTrashActive}
              onConfirm={handleModalAction}
              onCancel={onCancel}
            >
              <p className="font-bold text-center text-lg">Do you want to delete this record?</p>
            </CardBoxModal>

            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Department</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {lectures &&
                  clientsPaginated.map((lecture: UserResponse) => (
                    <tr key={lecture.id}>
                      <td data-label="Name">{lecture.user.name}</td>
                      <td data-label="Username">{lecture.user.account.userName}</td>
                      <td data-label="Email">{lecture.user.email}</td>
                      <td data-label="Address">{lecture.user.address}</td>
                      <td data-label="Department">{lecture.department.name}</td>

                      <td className="before:hidden lg:w-1 whitespace-nowrap">
                        <Buttons type="justify-start lg:justify-end" noWrap>
                          <Button
                            color="info"
                            icon={mdiEye}
                            onClick={() => router.push(`/lectures/${lecture.id}`)}
                            small
                          />
                          <Button
                            color="danger"
                            icon={mdiTrashCan}
                            onClick={() => handleSelectDelete(lecture.id)}
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
    </ProtectedRoute>
  )
}

LecturerPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default LecturerPage
