import { mdiEye, mdiTrashCan } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useCallback, useState } from 'react'
import Button from '../../components/Button'
import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/Section/Main'
import SectionTitleLineWithButton from '../../components/Section/TitleLineWithButton'
import { getPageTitle } from '../../config'
import Buttons from '../../components/Buttons'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { selectDepartments, setUpdateDepartmentResult } from '../../stores/departmentSlice'
import ProtectedRoute from '../../components/ProtectedRoute'
import CardBoxModal from '../../components/CardBox/Modal'
import { DepartmentResponse } from '../../models/department'
import departmentApi from '../../api/department'

const DepartmentPage = () => {
  const router = useRouter()
  const selectedDepartments = useAppSelector(selectDepartments)
  const [selectedRecord, setSelectedRecord] = useState<number>()
  const dispatch = useAppDispatch()

  const perPage = 10

  const [currentPage, setCurrentPage] = useState(0)

  const clientsPaginated = selectedDepartments?.slice(
    perPage * currentPage,
    perPage * (currentPage + 1)
  )

  const numPages = selectedDepartments?.length / perPage

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)

  const handleSelectDelete = (id) => {
    setSelectedRecord(id)
    setIsModalTrashActive(true)
  }

  const handleModalAction = useCallback(async () => {
    const { ok } = await departmentApi.deleteDepartment(selectedRecord)
    if (ok) {
      dispatch(setUpdateDepartmentResult())
    }
    setIsModalTrashActive(false)
    setSelectedRecord(null)
  }, [selectedRecord])

  const handleAddClick = () => {
    router.push('/departments/add')
  }
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
        <SectionTitleLineWithButton title="Departments" icon={''}>
          <Button
            label="Add Department"
            color="contrast"
            roundedFull
            onClick={handleAddClick}
            small
          />
        </SectionTitleLineWithButton>
        <CardBox className="mb-6" hasTable>
          <>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              {selectedDepartments && (
                <tbody>
                  {clientsPaginated?.map((client: DepartmentResponse) => (
                    <tr key={client.id}>
                      <td data-label="ID">{client.id}</td>
                      <td data-label="Name">{client.name}</td>

                      <td className="before:hidden lg:w-1 whitespace-nowrap">
                        <Buttons type="justify-start lg:justify-end" noWrap>
                          <Button
                            color="info"
                            icon={mdiEye}
                            onClick={() => router.push(`/departments/${client.id}`)}
                            small
                          />
                          <Button
                            color="danger"
                            icon={mdiTrashCan}
                            onClick={() => handleSelectDelete(client.id)}
                            small
                          />
                        </Buttons>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
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
        title="Please confirm"
        buttonColor="danger"
        buttonLabel="Confirm"
        isActive={isModalTrashActive}
        onConfirm={handleModalAction}
        onCancel={onCancel}
      >
        <p className="font-bold text-center text-lg">Do you want to delete this record?</p>
      </CardBoxModal>
    </ProtectedRoute>
  )
}

DepartmentPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default DepartmentPage
