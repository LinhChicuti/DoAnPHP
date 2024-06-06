import { mdiCheckBold, mdiCheckboxMarkedCircleOutline, mdiEye, mdiTrashCan } from '@mdi/js'
import React, { useCallback, useEffect, useState } from 'react'
import { useSampleClients } from '../../hooks/sampleData'
import { Client } from '../../interfaces'
import Button from '../Button'
import Buttons from '../Buttons'
import CardBoxModal from '../CardBox/Modal'
import UserAvatar from '../UserAvatar'
import CardBox from '../CardBox'
import SectionTitleLineWithButton from '../Section/TitleLineWithButton'
import SessionForm from '../Modal/SessionForm'
import { useRouter } from 'next/router'
import { SessionReponse } from '../../models/session'
import sessionApi from '../../api/session'
import { formatDate } from '../../utils/dateUtil'

interface SessionTableProps {
  classId: number
  status: string
}

const SessionTable = ({ classId, status }: SessionTableProps) => {
  const [session, setSession] = useState<SessionReponse[]>()
  const [selectSession, setSelectSession] = useState<SessionReponse>()

  const getSession = useCallback(async () => {
    const { ok, body } = await sessionApi.getSessionByClassId(Number(classId))
    if (ok && body) {
      setSession(body)
    }
  }, [classId])

  useEffect(() => {
    getSession()
  }, [getSession])

  const route = useRouter()

  const perPage = 10

  const [currentPage, setCurrentPage] = useState(0)

  const clientsPaginated =
    session && session.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages = session && session.length / perPage

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false)

  const [isAddModal, setIsAddModal] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)

  const handleModalAction = useCallback(async () => {
    const { ok } = await sessionApi.deleteSession(selectSession.id)
    if (ok) {
      getSession()
    }
    setIsModalTrashActive(false)
    setSelectSession(null)
  }, [selectSession?.id])

  const handleSelectDelete = (item) => {
    setSelectSession(item)
    setIsModalTrashActive(true)
  }

  const handleEdit = (item) => {
    setSelectSession(item)
    setIsModalInfoActive(true)
  }

  const onCancel = () => {
    setSelectSession(null)
    setIsModalTrashActive(false)
  }

  const onStartSession = async (id: number) => {
    const { ok } = await sessionApi.startSession(id)
    if (ok) {
      route.push(`/class/session/${id}`)
    }
  }

  return (
    <>
      <SectionTitleLineWithButton title="Session" icon={''}>
        <Button
          label="Add Sesson"
          color="contrast"
          roundedFull
          small
          onClick={() => setIsAddModal(true)}
        />
      </SectionTitleLineWithButton>
      <CardBox className="mb-6" hasTable>
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
              <th>Id</th>
              <th>Location</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {session &&
              clientsPaginated.map((client: SessionReponse) => (
                <tr key={client.id}>
                  <td data-label="Id">{client.id}</td>
                  <td data-label="Locatiom">{client.sessionLocation}</td>
                  <td data-label="Date">{formatDate(client.sessionDate)}</td>

                  <td className="before:hidden lg:w-1 whitespace-nowrap">
                    <Buttons type="justify-start lg:justify-end" noWrap>
                      <Button color="info" icon={mdiEye} onClick={() => handleEdit(client)} small />
                      <Button
                        color="danger"
                        icon={mdiTrashCan}
                        onClick={() => handleSelectDelete(client)}
                        small
                      />
                      <Button
                        color="success"
                        icon={mdiCheckBold}
                        onClick={() =>
                          client.status === 0
                            ? onStartSession(client.id)
                            : route.push(`/class/session/${client.id}`)
                        }
                        small
                        disabled={status !== 'Open'}
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
      </CardBox>
      <SessionForm
        isActive={isAddModal}
        onClose={() => setIsAddModal(false)}
        title={'Add Session'}
        onRefresh={getSession}
      />
      {selectSession && (
        <SessionForm
          isActive={isModalInfoActive}
          onClose={() => setSelectSession(null)}
          title={'Edit Session'}
          onRefresh={getSession}
          session={selectSession}
        />
      )}
    </>
  )
}

export default SessionTable
