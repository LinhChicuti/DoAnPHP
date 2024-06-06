import { mdiBallotOutline, mdiCheckAll, mdiMonitorCellphone } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import Button from '../../components/Button'
import Buttons from '../../components/Buttons'
import Divider from '../../components/Divider'
import CardBox from '../../components/CardBox'
import FormField from '../../components/Form/Field'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/Section/Main'
import SectionTitleLineWithButton from '../../components/Section/TitleLineWithButton'
import { getPageTitle } from '../../config'
import { useRouter } from 'next/router'
import { CreateDepartmentRequest, DepartmentResponse } from '../../models/department'
import departmentApi from '../../api/department'
import NotificationBar from '../../components/NotificationBar'
import { useAppDispatch } from '../../stores/hooks'
import { setUpdateDepartmentResult } from '../../stores/departmentSlice'

const DepartmentDetail = () => {
  const router = useRouter()
  const [department, setDepartment] = useState<DepartmentResponse | null>(null)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const getDepartment = useCallback(async () => {
    const { ok, body } = await departmentApi.getDepartmentById(Number(router.query.slug))
    if (ok && body) {
      setDepartment(body)
    }
  }, [router.query.slug])

  useEffect(() => {
    getDepartment()
  }, [getDepartment])

  const handleSubmit = async (values: CreateDepartmentRequest) => {
    const { ok } = await departmentApi.updateDepartment(Number(router.query.slug), values)
    if (ok) {
      setIsSuccess(true)
      getDepartment()
      dispatch(setUpdateDepartmentResult())
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
        <title>{getPageTitle('Edit Department')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBallotOutline} title="Edit Department" main />
        {isSuccess && (
          <NotificationBar color="success" icon={mdiCheckAll} onClose={() => setIsSuccess(false)}>
            Update Department Success
          </NotificationBar>
        )}

        {department && (
          <CardBox>
            <Formik
              initialValues={{
                name: department.name,
              }}
              onSubmit={handleSubmit}
            >
              <Form>
                <FormField label="Deparment Name" labelFor="name">
                  <Field name="name" placeholder="Deparment Name" />
                </FormField>

                <Divider />

                <Buttons>
                  <Button type="submit" color="info" label="Submit" />
                  <Button type="reset" color="info" outline label="Reset" />
                </Buttons>
              </Form>
            </Formik>
          </CardBox>
        )}
      </SectionMain>
    </>
  )
}

DepartmentDetail.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default DepartmentDetail
