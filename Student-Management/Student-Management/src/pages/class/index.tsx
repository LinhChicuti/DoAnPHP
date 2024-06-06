import { mdiAccountPlus, mdiCheckBold, mdiEye, mdiTableOff, mdiTrashCan } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import Button from '../../components/Button'
import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/Section/Main'
import SectionTitleLineWithButton from '../../components/Section/TitleLineWithButton'
import { getPageTitle } from '../../config'
import Buttons from '../../components/Buttons'
import { useRouter } from 'next/router'
import ProtectedRoute from '../../components/ProtectedRoute'
import { ClassResponse } from '../../models/class'
import classApi from '../../api/class'
import CardBoxModal from '../../components/CardBox/Modal'
import { formatDate } from '../../utils/dateUtil'
import { useAuth } from '../../context/AuthProvider'

const ClassPage = () => {
  const router = useRouter()
  const { currentUser } = useAuth()
  const [lectures, setLectures] = useState<ClassResponse[]>()
  const [selectedRecord, setSelectedRecord] = useState<number>()
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)
  const [isModalApprove, setIsModalApprove] = useState(false)

  const perPage = 10

  const [currentPage, setCurrentPage] = useState(0)

  const clientsPaginated =
    lectures && lectures.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages = lectures && lectures.length / perPage

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  const handleSelectDelete = (id) => {
    setSelectedRecord(id)
    setIsModalTrashActive(true)
  }

  const handleModalAction = useCallback(async () => {
    const { ok } = await classApi.deleteClass(selectedRecord)
    if (ok) {
      getLecture()
    }
    setIsModalTrashActive(false)
  }, [selectedRecord])

  const handleAddClick = () => {
    router.push('/class/add')
  }

  const getLecture = async () => {
    if (currentUser) {
      if (currentUser.role === 3) {
        const { ok, body } = await classApi.getAll()
        if (ok && body) {
          setLectures(body)
        }
      }
      if (currentUser.role === 2) {
        const { ok, body } = await classApi.getByTeacherId()
        if (ok && body) {
          setLectures(body)
        }
      }
      if (currentUser.role === 1) {
        const { ok, body } = await classApi.getByStudent()
        if (ok && body) {
          setLectures(body)
        }
      }
    }
  }
  useEffect(() => {
    getLecture()
  }, [currentUser])

  const onCancel = () => {
    setSelectedRecord(null)
    setIsModalTrashActive(false)
    setIsModalApprove(false)
  }

  const onApproveClass = useCallback(async () => {
    if (currentUser.role === 1) {
      const { ok } = await classApi.registerClass({ classId: selectedRecord })
      if (ok) {
        onCancel()
      }
    }
    if (currentUser.role === 3) {
      const { ok } = await classApi.updateStatus(selectedRecord, 'Unopen')
      if (ok) {
        onCancel()
        getLecture()
      }
    }
  }, [selectedRecord])

  const handleSelectApprove = (id) => {
    setSelectedRecord(id)
    setIsModalApprove(true)
  }

  return (
    <ProtectedRoute>
      <Head>
        <title>{getPageTitle('Tables')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton title="Classes" icon={''}>
          {currentUser?.role === 2 && (
            <Button label="Add Class" color="contrast" roundedFull onClick={handleAddClick} small />
          )}
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
            <CardBoxModal
              title="Please confirm"
              buttonColor="success"
              buttonLabel="Confirm"
              isActive={isModalApprove}
              onConfirm={onApproveClass}
              onCancel={onCancel}
            >
              <p className="font-bold text-center text-lg">Do you want to approve this class?</p>
            </CardBoxModal>
            <CardBoxModal
              title="Please confirm"
              buttonColor="success"
              buttonLabel="Confirm"
              isActive={isModalApprove}
              onConfirm={onApproveClass}
              onCancel={onCancel}
            >
              <p className="font-bold text-center text-lg">Do you want to register this class?</p>
            </CardBoxModal>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Teacher</th>
                  <th>Course Name</th>
                  <th>Number Of Session</th>
                  <th>Status</th>
                  <th>Department</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {lectures &&
                  clientsPaginated.map((lecture: ClassResponse) => (
                    <tr key={lecture.id}>
                      <td data-label="Name">{lecture.name}</td>
                      <td data-label="Teacher">{lecture.teacher.user.name}</td>
                      <td data-label="Course Name">{lecture.courseName}</td>
                      <td data-label="Number Of Session">{lecture.numberOfSession}</td>
                      <td data-label="Status">{lecture.status}</td>
                      <td data-label="Department">{lecture.department.name}</td>
                      <td data-label="Start Date">{formatDate(lecture.startDate)}</td>
                      <td data-label="End Date">{formatDate(lecture.endDate)}</td>

                      <td className="before:hidden lg:w-1 whitespace-nowrap">
                        {currentUser?.role === 3 && (
                          <Buttons type="justify-start lg:justify-end" noWrap>
                            <Button
                              color="success"
                              icon={mdiCheckBold}
                              onClick={() => handleSelectApprove(lecture.id)}
                              small
                              disabled={lecture.status !== 'Unapprove'}
                            />
                          </Buttons>
                        )}
                        {currentUser?.role === 2 && (
                          <Buttons type="justify-start lg:justify-end" noWrap>
                            <Button
                              color="info"
                              icon={mdiEye}
                              onClick={() => router.push(`/class/${lecture.id}`)}
                              small
                            />
                            <Button
                              color="danger"
                              icon={mdiTrashCan}
                              onClick={() => handleSelectDelete(lecture.id)}
                              small
                            />
                          </Buttons>
                        )}

                        {currentUser?.role === 1 && (
                          <Buttons type="justify-start lg:justify-end" noWrap>
                            <Button
                              color="success"
                              icon={mdiAccountPlus}
                              onClick={() => handleSelectApprove(lecture.id)}
                              small
                              disabled={lecture.status !== 'Unopen'}
                            />
                          </Buttons>
                        )}
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

ClassPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default ClassPage
