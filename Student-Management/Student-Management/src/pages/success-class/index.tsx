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
import { ClassResponse, SuccessClassResponse } from '../../models/class'
import classApi from '../../api/class'
import CardBoxModal from '../../components/CardBox/Modal'
import { formatDate } from '../../utils/dateUtil'
import { useAuth } from '../../context/AuthProvider'
import sessionApi from '../../api/session'

const ClassSuccessPage = () => {
  const router = useRouter()
  const { currentUser } = useAuth()
  const [lectures, setLectures] = useState<SuccessClassResponse[]>()
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
    const { ok, body } = await sessionApi.getSuccessClass()
    if (ok && body) {
      setLectures(body)
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
    if (currentUser.role === 2) {
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
    <ProtectedRoute roles={[1]}>
      <Head>
        <title>{getPageTitle('Tables')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton title="Joining Classes" icon={''}></SectionTitleLineWithButton>
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
                  <th>Class Name</th>
                  <th>Course Name</th>
                  <th>Number Of Session</th>
                  <th>Status</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                </tr>
              </thead>
              <tbody>
                {lectures &&
                  clientsPaginated.map((lecture: SuccessClassResponse) => (
                    <tr key={lecture.id}>
                      <td data-label="Class Name">{lecture.class.name}</td>
                      <td data-label="Course Name">{lecture.class.courseName}</td>
                      <td data-label="Number Of Session">{lecture.class.numberOfSession}</td>
                      <td data-label="Status">{lecture.class.status}</td>
                      <td data-label="Start Date">{formatDate(lecture.class.startDate)}</td>
                      <td data-label="End Date">{formatDate(lecture.class.endDate)}</td>
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

ClassSuccessPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default ClassSuccessPage
