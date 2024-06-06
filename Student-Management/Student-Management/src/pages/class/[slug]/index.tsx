import { mdiAsterisk, mdiBallotOutline, mdiCheckAll } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import Button from '../../../components/Button'
import Buttons from '../../../components/Buttons'
import Divider from '../../../components/Divider'
import CardBox from '../../../components/CardBox'
import FormField from '../../../components/Form/Field'
import LayoutAuthenticated from '../../../layouts/Authenticated'
import SectionMain from '../../../components/Section/Main'
import SectionTitleLineWithButton from '../../../components/Section/TitleLineWithButton'
import { getPageTitle } from '../../../config'
import SessionTable from '../../../components/Table/SessionTable'
import { useRouter } from 'next/router'
import { ClassResponse } from '../../../models/class'
import classApi from '../../../api/class'
import NotificationBar from '../../../components/NotificationBar'

const EditClass = () => {
  const router = useRouter()
  const [myclass, setMyClass] = useState<ClassResponse | null>(null)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const getDepartment = useCallback(async () => {
    const { ok, body } = await classApi.getClassById(Number(router.query.slug))
    if (ok && body) {
      setMyClass(body)
    }
  }, [router.query.slug])

  useEffect(() => {
    getDepartment()
  }, [getDepartment])

  const handleSubmit = (values) => {
    alert(JSON.stringify(values, null, 2))
  }

  const handleOpenClass = async () => {
    if (myclass.status === 'Unopen') {
      const { ok } = await classApi.updateStatus(Number(router.query.slug), 'Open')
      if (ok) {
        setIsSuccess(true)
        getDepartment()
      }
    }
    if (myclass.status === 'Open') {
      const { ok } = await classApi.updateStatus(Number(router.query.slug), 'Finish')
      if (ok) {
        setIsSuccess(true)
        getDepartment()
      }
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isSuccess) {
        setIsSuccess(false)
      }
    }, 2000)
    return () => clearTimeout(timeoutId)
  }, [isSuccess])
  return (
    <>
      <Head>
        <title>{getPageTitle('Edit Class')}</title>
      </Head>

      <SectionMain>
        {isSuccess && (
          <NotificationBar color="success" icon={mdiCheckAll} onClose={() => setIsSuccess(false)}>
            Update Class Success
          </NotificationBar>
        )}
        <SectionTitleLineWithButton icon={mdiBallotOutline} title="Edit Class" main>
          <Buttons>
            <Button
              label="List Student"
              color="contrast"
              roundedFull
              onClick={() =>
                myclass.status === 'Unopen'
                  ? router.push(`/class/${router.query.slug}/student-register`)
                  : router.push(`/class/${router.query.slug}/students`)
              }
              small
            />
            {myclass && myclass.status !== 'Unapprove' && (
              <Button
                label={myclass.status === 'Unopen' ? 'Open Class' : 'Finish Class'}
                color="success"
                roundedFull
                onClick={handleOpenClass}
                small
              />
            )}
          </Buttons>
        </SectionTitleLineWithButton>

        <CardBox>
          {myclass && (
            <Formik
              initialValues={{
                name: myclass.name,
                courseName: myclass.courseName,
                numberOfSession: myclass.numberOfSession,
                status: myclass.status,
              }}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6">
                  <FormField label="Class Name" labelFor="name">
                    <Field name="name" placeholder="Class Name" disabled />
                  </FormField>
                  <FormField label="Status" labelFor="status">
                    <Field name="status" placeholder="Status" disabled />
                  </FormField>
                  <FormField label="Course Name" labelFor="courseName">
                    <Field name="courseName" placeholder="Course Name" disabled />
                  </FormField>
                  <FormField label="Number of Session" labelFor="numberOfSession">
                    <Field name="numberOfSession" placeholder="Number of Session" disabled />
                  </FormField>
                </div>

                <Divider />
              </Form>
            </Formik>
          )}
        </CardBox>
      </SectionMain>

      <SectionMain>
        <SessionTable classId={Number(router.query.slug)} status={myclass?.status} />
      </SectionMain>
    </>
  )
}

EditClass.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default EditClass
